<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TokenAnalysis;
use App\Services\RiskAnalysisService;
use App\Services\BlockchainService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TokenAnalysisController extends Controller
{
    /**
     * Analyze a token
     */
    public function analyze(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'address' => 'required|string|regex:/^0x[a-fA-F0-9]{40}$/',
            'network' => 'nullable|string|in:ethereum,bsc,polygon',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid token address format',
                'errors' => $validator->errors(),
            ], 422);
        }

        $user = $request->user();
        
        // Check if user can analyze
        if (!$user->canAnalyze()) {
            return response()->json([
                'success' => false,
                'message' => 'Daily analysis limit reached. Upgrade your plan for more analyses.',
                'limit_reached' => true,
            ], 429);
        }

        try {
            $address = $request->input('address');
            $network = $request->input('network', 'ethereum');

            // Check if analysis exists in last 24h (cache)
            $existingAnalysis = TokenAnalysis::where('token_address', $address)
                ->where('network', $network)
                ->where('created_at', '>=', now()->subDay())
                ->first();

            if ($existingAnalysis) {
                return response()->json([
                    'success' => true,
                    'data' => $existingAnalysis,
                    'cached' => true,
                ]);
            }

            // Perform new analysis
            $blockchainService = new BlockchainService($network);
            $riskAnalysisService = new RiskAnalysisService($blockchainService);
            
            $analysisData = $riskAnalysisService->analyzeToken($address, $network);

            // Save analysis
            $analysis = TokenAnalysis::create([
                'user_id' => $user->id,
                'token_address' => $address,
                'network' => $network,
                ...$analysisData,
            ]);

            // Increment user's analysis count
            $user->incrementAnalysesCount();

            return response()->json([
                'success' => true,
                'data' => $analysis,
                'cached' => false,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to analyze token: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Analyze a token (public - no auth required)
     */
    public function analyzePublic(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'address' => 'required|string|regex:/^0x[a-fA-F0-9]{40}$/',
            'network' => 'nullable|string|in:ethereum,bsc,polygon',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid token address format',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $address = $request->input('address');
            $network = $request->input('network', 'ethereum');

            // Check if analysis exists in last 24h (cache)
            $existingAnalysis = TokenAnalysis::where('token_address', $address)
                ->where('network', $network)
                ->where('created_at', '>=', now()->subDay())
                ->first();

            if ($existingAnalysis) {
                return response()->json([
                    'success' => true,
                    'data' => $existingAnalysis,
                    'cached' => true,
                ]);
            }

            // Perform new analysis
            $riskAnalysisService = app(RiskAnalysisService::class);
            $analysisResult = $riskAnalysisService->analyzeToken($address, $network);

            // Save analysis without user_id (public)
            $analysis = TokenAnalysis::create([
                'user_id' => null, // Public analysis
                'token_address' => $address,
                'network' => $network,
                'name' => $analysisResult['name'],
                'symbol' => $analysisResult['symbol'],
                'risk_level' => $analysisResult['risk_level'],
                'risk_score' => $analysisResult['risk_score'],
                'summary' => $analysisResult['summary'],
                'verified' => $analysisResult['verified'],
                'liquidity_status' => $analysisResult['liquidity_status'],
                'top_holder_percentage' => $analysisResult['top_holder_percentage'],
                'is_audited' => $analysisResult['is_audited'],
                'audit_provider' => $analysisResult['audit_provider'],
                'ai_verdict' => $analysisResult['ai_verdict'],
                'holders_data' => $analysisResult['holders_data'],
                'liquidity_data' => $analysisResult['liquidity_data'],
                'contract_data' => $analysisResult['contract_data'],
                'evidence_links' => $analysisResult['evidence_links'],
                'flags' => $analysisResult['flags'],
            ]);

            return response()->json([
                'success' => true,
                'data' => $analysis,
                'cached' => false,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to analyze token: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get user's analysis history
     */
    public function history(Request $request)
    {
        $limit = $request->get('limit');
        
        $query = $request->user()
            ->tokenAnalyses()
            ->select([
                'id',
                'token_address',
                'name',
                'symbol',
                'risk_level',
                'risk_score',
                'network',
                'verified',
                'liquidity_status',
                'top_holder_percentage',
                'created_at'
            ])
            ->orderBy('created_at', 'desc');

        if ($limit) {
            $analyses = $query->limit((int)$limit)->get();
        } else {
            $analyses = $query->get();
        }

        return response()->json([
            'success' => true,
            'data' => $analyses,
            'count' => $analyses->count(),
        ]);
    }

    /**
     * Get specific analysis
     */
    public function show(Request $request, $id)
    {
        $analysis = TokenAnalysis::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        return response()->json([
            'success' => true,
            'data' => $analysis,
        ]);
    }

    /**
     * Get user's remaining analyses for today
     */
    public function limits(Request $request)
    {
        $user = $request->user();
        $plan = $user->currentPlan();

        return response()->json([
            'success' => true,
            'data' => [
                'analyses_today' => $user->analyses_today,
                'analyses_limit' => $plan->analyses_per_day,
                'analyses_remaining' => max(0, $plan->analyses_per_day - $user->analyses_today),
                'can_analyze' => $user->canAnalyze(),
            ],
        ]);
    }
}
