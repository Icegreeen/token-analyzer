<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class BlockchainService
{
    protected $network;
    protected $apiUrl;
    protected $apiKey;

    public function __construct(string $network = 'ethereum')
    {
        $this->network = $network;
        $config = config("blockchain.{$network}");
        $this->apiUrl = $config['api_url'];
        $this->apiKey = $config['api_key'];
    }

    /**
     * Get token information
     */
    public function getTokenInfo(string $address): array
    {
        try {
            // Get contract source (most reliable endpoint)
            $source = $this->getContractSource($address);
            
            $verified = !empty($source['SourceCode']);
            $name = $source['ContractName'] ?? null;
            
            // For well-known tokens, use hardcoded data (temporary solution until API v2)
            $knownTokens = [
                '0x514910771af9ca656af840dff83e8264ecf986ca' => ['symbol' => 'LINK', 'name' => 'ChainLink Token'],
                '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984' => ['symbol' => 'UNI', 'name' => 'Uniswap'],
                '0xdac17f958d2ee523a2206206994597c13d831ec7' => ['symbol' => 'USDT', 'name' => 'Tether USD'],
            ];
            
            $lowerAddress = strtolower($address);
            if (isset($knownTokens[$lowerAddress])) {
                $name = $knownTokens[$lowerAddress]['name'];
                $symbol = $knownTokens[$lowerAddress]['symbol'];
            } else {
                $symbol = $this->extractSymbolFromName($name);
            }
            
            // Get total supply (still works)
            $totalSupply = $this->getTotalSupply($address);
            
            return [
                'name' => $name,
                'symbol' => $symbol,
                'total_supply' => $totalSupply,
                'verified' => $verified,
                'address' => $address,
            ];
        } catch (\Exception $e) {
            Log::error("Error getting token info: " . $e->getMessage());
            return [];
        }
    }
    
    /**
     * Extract symbol from contract name
     */
    protected function extractSymbolFromName(?string $name): ?string
    {
        if (!$name) return null;
        
        // Try to extract symbol (usually in uppercase)
        if (preg_match('/\b([A-Z]{2,10})\b/', $name, $matches)) {
            return $matches[1];
        }
        
        return null;
    }

    /**
     * Get top token holders
     */
    public function getTopHolders(string $address, int $limit = 10): array
    {
        try {
            $response = Http::get($this->apiUrl, [
                'module' => 'token',
                'action' => 'tokenholderlist',
                'contractaddress' => $address,
                'page' => 1,
                'offset' => $limit,
                'apikey' => $this->apiKey,
            ]);

            if ($response->successful() && $response->json('status') === '1') {
                return $response->json('result', []);
            }

            return [];
        } catch (\Exception $e) {
            Log::error("Error getting token holders: " . $e->getMessage());
            return [];
        }
    }

    /**
     * Calculate holder concentration percentage
     */
    public function calculateHolderConcentration(string $address): float
    {
        $holders = $this->getTopHolders($address, 1);
        
        if (empty($holders)) {
            return 0;
        }

        $totalSupply = $this->getTotalSupply($address);
        
        if (!$totalSupply || $totalSupply === '0') {
            return 0;
        }

        $topHolderBalance = $holders[0]['TokenHolderQuantity'] ?? $holders[0]['value'] ?? 0;
        
        return ($topHolderBalance / $totalSupply) * 100;
    }

    /**
     * Get contract source code
     */
    public function getContractSource(string $address): array
    {
        try {
            $response = Http::get($this->apiUrl, [
                'module' => 'contract',
                'action' => 'getsourcecode',
                'address' => $address,
                'apikey' => $this->apiKey,
            ]);

            if ($response->successful() && $response->json('status') === '1') {
                $result = $response->json('result')[0] ?? [];
                return $result;
            }

            return [];
        } catch (\Exception $e) {
            Log::error("Error getting contract source: " . $e->getMessage());
            return [];
        }
    }

    /**
     * Check if contract is verified
     */
    public function isContractVerified(string $address): bool
    {
        $source = $this->getContractSource($address);
        return !empty($source['SourceCode']);
    }

    /**
     * Get token transactions
     */
    public function getTokenTransactions(string $address, int $limit = 100): array
    {
        try {
            $response = Http::get($this->apiUrl, [
                'module' => 'account',
                'action' => 'tokentx',
                'contractaddress' => $address,
                'page' => 1,
                'offset' => $limit,
                'sort' => 'desc',
                'apikey' => $this->apiKey,
            ]);

            if ($response->successful() && $response->json('status') === '1') {
                return $response->json('result', []);
            }

            return [];
        } catch (\Exception $e) {
            Log::error("Error getting token transactions: " . $e->getMessage());
            return [];
        }
    }

    /**
     * Get liquidity pair info (simplified - would need DEX-specific logic)
     */
    public function getLiquidityInfo(string $address): array
    {
        // This is a simplified version
        // In production, you'd need to check specific DEX contracts (Uniswap, PancakeSwap, etc.)
        return [
            'has_liquidity' => true, // Placeholder
            'locked' => false, // Placeholder
            'lock_duration' => null, // Placeholder
        ];
    }

    /**
     * Helper: Get token name
     */
    protected function getTokenName(string $address): ?string
    {
        $source = $this->getContractSource($address);
        return $source['ContractName'] ?? null;
    }

    /**
     * Helper: Get token symbol
     */
    protected function getTokenSymbol(string $address): ?string
    {
        try {
            // Use contract source to get symbol (more reliable)
            $source = $this->getContractSource($address);
            
            // Try to extract symbol from contract name or use generic approach
            if (!empty($source['ContractName'])) {
                // For now, return null - will be extracted from events/transfers
                return null;
            }

            return null;
        } catch (\Exception $e) {
            return null;
        }
    }

    /**
     * Helper: Get total supply
     */
    protected function getTotalSupply(string $address): ?string
    {
        try {
            $response = Http::get($this->apiUrl, [
                'module' => 'stats',
                'action' => 'tokensupply',
                'contractaddress' => $address,
                'apikey' => $this->apiKey,
            ]);

            if ($response->successful() && $response->json('status') === '1') {
                return $response->json('result');
            }

            return null;
        } catch (\Exception $e) {
            return null;
        }
    }

    /**
     * Get Etherscan/BSCScan URL for evidence
     */
    public function getExplorerUrl(string $address): string
    {
        $baseUrls = [
            'ethereum' => 'https://etherscan.io',
            'bsc' => 'https://bscscan.com',
            'polygon' => 'https://polygonscan.com',
        ];

        $baseUrl = $baseUrls[$this->network] ?? $baseUrls['ethereum'];
        
        return "{$baseUrl}/address/{$address}";
    }
}

