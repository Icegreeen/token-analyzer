# 🔄 Migração de API - Etherscan V1 → V2

## ⚠️ Situação Atual

A API V1 do Etherscan foi **deprecada** e alguns endpoints não funcionam mais.

### Mensagem da API
```json
{
  "status": "0",
  "message": "NOTOK",
  "result": "You are using a deprecated V1 endpoint, switch to Etherscan API V2"
}
```

---

## 🛠️ Solução Temporária Implementada

### O Que Funciona ✅

1. **Contract Source** - `module=contract&action=getsourcecode`
   - Retorna nome do contrato
   - Status de verificação
   - Funciona perfeitamente

2. **Token Supply** - `module=stats&action=tokensupply`
   - Total supply do token
   - Funciona

3. **Token Holders** - `module=token&action=tokenholderlist`
   - Top holders
   - Funciona parcialmente

### O Que NÃO Funciona ❌

1. **Token Info** - `module=token&action=tokeninfo`
   - Symbol, decimals, name
   - **Deprecado**

### Workaround Aplicado

**BlockchainService.php:**

```php
// 1. Tokens conhecidos (hardcoded)
$knownTokens = [
    '0x514910771af9ca656af840dff83e8264ecf986ca' => [
        'symbol' => 'LINK', 
        'name' => 'ChainLink Token'
    ],
    '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984' => [
        'symbol' => 'UNI', 
        'name' => 'Uniswap'
    ],
    // ... mais tokens
];

// 2. Extração do symbol do nome do contrato
protected function extractSymbolFromName(?string $name): ?string
{
    if (preg_match('/\b([A-Z]{2,10})\b/', $name, $matches)) {
        return $matches[1];
    }
    return null;
}
```

**analyzer.tsx:**

```tsx
// Aviso quando dados incompletos
{(!analysis.name || !analysis.symbol) && (
    <Alert>
        <AlertDescription>
            Limited Data Available: Etherscan API v1 is deprecated. 
            Some token info may be missing.
        </AlertDescription>
    </Alert>
)}
```

---

## 🚀 Migração para API V2 (TODO)

### Documentação Oficial

- **Docs:** https://docs.etherscan.io/v2-migration
- **Endpoint V2:** https://api-v2.etherscan.io/v2/api
- **Breaking Changes:** https://docs.etherscan.io/v2-migration/breaking-changes

### Novos Endpoints V2

#### Token Info (Substitui tokeninfo)
```
GET https://api-v2.etherscan.io/v2/api
?module=token
&action=info
&contractaddress=0x...
&apikey=...
```

**Response:**
```json
{
  "status": "1",
  "result": {
    "name": "ChainLink Token",
    "symbol": "LINK",
    "decimals": "18",
    "totalSupply": "1000000000000000000000000000"
  }
}
```

#### Token Holders (Melhorado)
```
GET https://api-v2.etherscan.io/v2/api
?module=token
&action=holders
&contractaddress=0x...
&page=1
&offset=10
&apikey=...
```

---

## 📝 Tarefas de Migração

### Fase 1: Preparação
- [x] Identificar endpoints deprecados
- [x] Implementar workaround temporário
- [x] Adicionar aviso na UI
- [ ] Obter API key V2 (se diferente)

### Fase 2: Atualização
- [ ] Criar `BlockchainServiceV2.php`
- [ ] Implementar novos endpoints
- [ ] Manter compatibilidade com V1 (fallback)
- [ ] Testes unitários

### Fase 3: Migração
- [ ] Switch gradual para V2
- [ ] Monitorar erros
- [ ] Remover código V1
- [ ] Atualizar docs

---

## 🔧 Como Implementar V2

### 1. Atualizar Config

```php
// config/blockchain.php
'ethereum' => [
    'api_url_v1' => env('ETHERSCAN_API_URL', 'https://api.etherscan.io/api'),
    'api_url_v2' => env('ETHERSCAN_API_V2_URL', 'https://api-v2.etherscan.io/v2/api'),
    'api_key' => env('ETHERSCAN_API_KEY', ''),
],
```

### 2. Criar Service V2

```php
// app/Services/BlockchainServiceV2.php
class BlockchainServiceV2
{
    public function getTokenInfo(string $address): array
    {
        $response = Http::get($this->apiUrlV2, [
            'module' => 'token',
            'action' => 'info',
            'contractaddress' => $address,
            'apikey' => $this->apiKey,
        ]);

        if ($response->successful() && $response->json('status') === '1') {
            $result = $response->json('result');
            return [
                'name' => $result['name'],
                'symbol' => $result['symbol'],
                'decimals' => $result['decimals'],
                'total_supply' => $result['totalSupply'],
            ];
        }

        // Fallback to V1
        return $this->fallbackV1($address);
    }
}
```

### 3. Uso Híbrido

```php
// app/Services/BlockchainService.php
public function getTokenInfo(string $address): array
{
    try {
        // Try V2 first
        $v2Service = new BlockchainServiceV2($this->network);
        return $v2Service->getTokenInfo($address);
    } catch (\Exception $e) {
        // Fallback to current workaround
        return $this->getTokenInfoV1Workaround($address);
    }
}
```

---

## 🧪 Testes

### Testar API V2 Manualmente

```bash
# Token Info V2
curl "https://api-v2.etherscan.io/v2/api?module=token&action=info&contractaddress=0x514910771AF9Ca656af840dff83E8264EcF986CA&apikey=YOUR_KEY"

# Token Holders V2
curl "https://api-v2.etherscan.io/v2/api?module=token&action=holders&contractaddress=0x514910771AF9Ca656af840dff83E8264EcF986CA&page=1&offset=10&apikey=YOUR_KEY"
```

### Verificar Compatibilidade

```php
// tests/Unit/BlockchainServiceV2Test.php
public function test_token_info_v2()
{
    $service = new BlockchainServiceV2('ethereum');
    $info = $service->getTokenInfo('0x514910771AF9Ca656af840dff83E8264EcF986CA');
    
    $this->assertNotNull($info['name']);
    $this->assertEquals('LINK', $info['symbol']);
}
```

---

## 📊 Comparação V1 vs V2

| Feature | V1 | V2 | Status |
|---------|----|----|--------|
| Token Info | ❌ Deprecado | ✅ Funciona | Migrar |
| Contract Source | ✅ Funciona | ✅ Melhorado | OK |
| Token Holders | ⚠️ Limitado | ✅ Completo | Migrar |
| Transaction History | ✅ Funciona | ✅ Melhorado | OK |
| Balance | ✅ Funciona | ✅ Igual | OK |

---

## ⏰ Timeline Sugerido

### Imediato (Feito ✅)
- Workaround implementado
- Tokens conhecidos hardcoded
- Aviso na UI

### Curto Prazo (1-2 semanas)
- Implementar BlockchainServiceV2
- Testes completos
- Deploy em staging

### Médio Prazo (1 mês)
- Migração completa para V2
- Remover código V1
- Atualizar documentação

---

## 🔗 Recursos

### Documentação Oficial
- [Etherscan API V2 Docs](https://docs.etherscan.io/v2-migration)
- [Breaking Changes](https://docs.etherscan.io/v2-migration/breaking-changes)
- [Migration Guide](https://docs.etherscan.io/v2-migration/migration-guide)

### Alternativas
- **The Graph** - GraphQL API
- **Alchemy** - Enhanced APIs
- **Moralis** - Web3 API Suite
- **Covalent** - Multi-chain API

---

## 💡 Recomendações

### Para Produção

1. **Implementar V2 ASAP**
   - V1 pode parar completamente a qualquer momento

2. **Cache Agressivo**
   - Cachear responses por 24h
   - Reduzir dependência de APIs externas

3. **Fallback Strategy**
   - V2 → V1 Workaround → Cache → Hardcoded
   - Nunca deixar usuário sem resposta

4. **Alternativas**
   - Considerar The Graph para dados mais ricos
   - Alchemy para melhor performance

### Para Desenvolvimento

1. **Feature Flag**
   ```php
   if (config('blockchain.use_v2')) {
       return $this->getTokenInfoV2($address);
   }
   ```

2. **Monitoramento**
   - Log todas as chamadas V1 que falham
   - Alert quando V1 não funcionar

3. **Testes**
   - Cobertura 100% em BlockchainService
   - Testes de integração com API real

---

## 🆘 Suporte

### Se V1 Parar Completamente

**Opção 1: API V2 (Recomendado)**
```bash
# Trocar URL no .env
ETHERSCAN_API_URL=https://api-v2.etherscan.io/v2/api
```

**Opção 2: The Graph (Alternativa)**
```bash
# Instalar
composer require graphql-php/graphql

# Usar
$client = new TheGraphClient();
$data = $client->query('uniswap', $tokenAddress);
```

**Opção 3: Hardcoded (Temporário)**
- Adicionar mais tokens em `$knownTokens`
- Usar CoinGecko API para preços

---

## ✅ Checklist

Antes de considerar migração completa:

- [ ] API key V2 obtida e testada
- [ ] BlockchainServiceV2 implementado
- [ ] Testes passando 100%
- [ ] Cache implementado
- [ ] Fallback strategy testada
- [ ] Docs atualizadas
- [ ] Time de dev treinado
- [ ] Monitoramento configurado

---

**Última atualização:** Outubro 2025  
**Status:** Workaround implementado, migração V2 planejada

**Documentação mantida por:** Dev Team

