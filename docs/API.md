# 📡 API Documentation - AI Token Analyzer

## Base URL

```
http://localhost:8000/api
```

## Autenticação

Todas as rotas da API requerem autenticação via Sanctum (session-based).

---

## 🔍 Token Analysis

### Analisar Token

Analisa um token e retorna score de risco, flags e recomendações.

**Endpoint:** `POST /api/analyze-token`

**Headers:**
```
Content-Type: application/json
X-CSRF-TOKEN: {csrf_token}
```

**Request Body:**
```json
{
  "address": "0x514910771AF9Ca656af840dff83E8264EcF986CA",
  "network": "ethereum"
}
```

**Parâmetros:**
| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| address | string | Sim | Endereço do contrato do token (formato 0x...) |
| network | string | Não | Rede blockchain (ethereum, bsc, polygon). Default: ethereum |

**Response Success (200):**
```json
{
  "success": true,
  "cached": false,
  "data": {
    "id": 1,
    "name": "ChainLink Token",
    "symbol": "LINK",
    "risk_level": "low",
    "risk_score": 15,
    "summary": "Token ChainLink Token (LINK) contract is verified with good distribution...",
    "verified": true,
    "liquidity_status": "Not locked",
    "top_holder_percentage": 8.5,
    "is_audited": false,
    "audit_provider": null,
    "ai_verdict": "✅ LOW RISK: This token appears relatively safe based on on-chain metrics...",
    "holders_data": {
      "top_10": [...],
      "top_holder_percentage": 8.5
    },
    "liquidity_data": {
      "has_liquidity": true,
      "locked": false,
      "lock_duration": null
    },
    "contract_data": {
      "verified": true,
      "address": "0x514910771AF9Ca656af840dff83E8264EcF986CA",
      "network": "ethereum"
    },
    "evidence_links": {
      "explorer": "https://etherscan.io/address/0x514910771AF9Ca656af840dff83E8264EcF986CA",
      "holders": "https://etherscan.io/address/0x514910771AF9Ca656af840dff83E8264EcF986CA#balances"
    },
    "flags": []
  }
}
```

**Response Error - Invalid Address (422):**
```json
{
  "success": false,
  "message": "Invalid token address format",
  "errors": {
    "address": ["The address must match the format: 0x..."]
  }
}
```

**Response Error - Limit Reached (429):**
```json
{
  "success": false,
  "message": "Daily analysis limit reached. Upgrade your plan for more analyses.",
  "limit_reached": true
}
```

---

### Histórico de Análises

Retorna o histórico de análises do usuário.

**Endpoint:** `GET /api/analyses`

**Query Parameters:**
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| page | integer | Número da página (paginação) |

**Response (200):**
```json
{
  "success": true,
  "data": {
    "current_page": 1,
    "data": [
      {
        "id": 1,
        "token_address": "0x514910771AF9Ca656af840dff83E8264EcF986CA",
        "name": "ChainLink Token",
        "symbol": "LINK",
        "risk_level": "low",
        "risk_score": 15,
        "created_at": "2025-10-13T08:30:00.000000Z"
      }
    ],
    "per_page": 20,
    "total": 1
  }
}
```

---

### Detalhes de uma Análise

Retorna os detalhes completos de uma análise específica.

**Endpoint:** `GET /api/analyses/{id}`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "ChainLink Token",
    "symbol": "LINK",
    "risk_level": "low",
    // ... todos os campos da análise
  }
}
```

**Response Error (404):**
```json
{
  "message": "No query results for model [App\\Models\\TokenAnalysis]."
}
```

---

### Verificar Limites

Retorna informações sobre o uso e limites do plano atual.

**Endpoint:** `GET /api/analyses/limits/check`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "analyses_today": 2,
    "analyses_limit": 3,
    "analyses_remaining": 1,
    "can_analyze": true
  }
}
```

---

## 👛 Wallets

### Listar Carteiras

Retorna todas as carteiras monitoradas pelo usuário.

**Endpoint:** `GET /api/wallets`

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0",
      "network": "ethereum",
      "label": "My Main Wallet",
      "alerts_enabled": true,
      "last_checked_at": null,
      "tokens": null,
      "created_at": "2025-10-13T08:00:00.000000Z",
      "alerts": []
    }
  ]
}
```

---

### Adicionar Carteira

Adiciona uma nova carteira para monitoramento.

**Endpoint:** `POST /api/wallets`

**Request Body:**
```json
{
  "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0",
  "network": "ethereum",
  "label": "My Trading Wallet"
}
```

**Parâmetros:**
| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| address | string | Sim | Endereço da carteira |
| network | string | Sim | Rede (ethereum, bsc, polygon) |
| label | string | Não | Nome/etiqueta da carteira |

**Response Success (201):**
```json
{
  "success": true,
  "message": "Wallet added successfully",
  "data": {
    "id": 2,
    "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0",
    "network": "ethereum",
    "label": "My Trading Wallet",
    "alerts_enabled": true
  }
}
```

**Response Error - Limit Reached (403):**
```json
{
  "success": false,
  "message": "Wallet limit reached. Upgrade your plan to monitor more wallets."
}
```

**Response Error - Already Exists (409):**
```json
{
  "success": false,
  "message": "This wallet is already being monitored"
}
```

---

### Detalhes de uma Carteira

Retorna detalhes de uma carteira específica com alertas recentes.

**Endpoint:** `GET /api/wallets/{id}`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0",
    "network": "ethereum",
    "label": "My Main Wallet",
    "alerts_enabled": true,
    "alerts": [
      {
        "id": 1,
        "type": "risk_change",
        "severity": "warning",
        "message": "Token risk level changed from low to medium",
        "read": false,
        "created_at": "2025-10-13T09:00:00.000000Z"
      }
    ]
  }
}
```

---

### Atualizar Carteira

Atualiza informações de uma carteira.

**Endpoint:** `PUT /api/wallets/{id}`

**Request Body:**
```json
{
  "label": "Updated Wallet Name",
  "alerts_enabled": false
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Wallet updated successfully",
  "data": {
    "id": 1,
    "label": "Updated Wallet Name",
    "alerts_enabled": false
  }
}
```

---

### Remover Carteira

Remove uma carteira do monitoramento.

**Endpoint:** `DELETE /api/wallets/{id}`

**Response (200):**
```json
{
  "success": true,
  "message": "Wallet removed successfully"
}
```

---

## 🚨 Alerts

### Listar Alertas

Retorna os alertas do usuário com opções de filtro.

**Endpoint:** `GET /api/alerts`

**Query Parameters:**
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| page | integer | Número da página |
| unread | boolean | Filtrar apenas não lidos |
| severity | string | Filtrar por severidade (info, warning, critical) |

**Response (200):**
```json
{
  "success": true,
  "data": {
    "current_page": 1,
    "data": [
      {
        "id": 1,
        "wallet_id": 1,
        "token_address": "0x...",
        "type": "risk_change",
        "severity": "warning",
        "message": "Token risk level changed",
        "metadata": {
          "old_risk": "low",
          "new_risk": "medium"
        },
        "read": false,
        "read_at": null,
        "created_at": "2025-10-13T09:00:00.000000Z",
        "wallet": {
          "id": 1,
          "label": "My Wallet"
        }
      }
    ],
    "per_page": 20,
    "total": 1
  }
}
```

---

### Contador de Não Lidos

Retorna a contagem de alertas não lidos.

**Endpoint:** `GET /api/alerts/unread/count`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "unread_count": 3
  }
}
```

---

### Marcar Alerta como Lido

Marca um alerta específico como lido.

**Endpoint:** `POST /api/alerts/{id}/read`

**Response (200):**
```json
{
  "success": true,
  "message": "Alert marked as read",
  "data": {
    "id": 1,
    "read": true,
    "read_at": "2025-10-13T10:00:00.000000Z"
  }
}
```

---

### Marcar Todos como Lidos

Marca todos os alertas do usuário como lidos.

**Endpoint:** `POST /api/alerts/read-all`

**Response (200):**
```json
{
  "success": true,
  "message": "5 alerts marked as read"
}
```

---

### Deletar Alerta

Remove um alerta específico.

**Endpoint:** `DELETE /api/alerts/{id}`

**Response (200):**
```json
{
  "success": true,
  "message": "Alert deleted successfully"
}
```

---

## 📊 Risk Levels

### Níveis de Risco

| Nível | Score | Cor | Descrição |
|-------|-------|-----|-----------|
| low | 0-24 | Verde | Baixo risco, token aparenta ser seguro |
| medium | 25-49 | Amarelo | Risco moderado, investigar melhor |
| high | 50-74 | Laranja | Alto risco, cuidado ao investir |
| critical | 75-100 | Vermelho | Risco crítico, evitar investimento |

### Flag Severities

| Severidade | Descrição |
|------------|-----------|
| info | Informativo, sem risco imediato |
| medium | Requer atenção |
| high | Risco significativo |
| critical | Risco crítico, ação necessária |

---

## 🔐 Autenticação

### CSRF Token

Para fazer requisições à API via JavaScript, você precisa do CSRF token:

```javascript
const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

fetch('/api/analyze-token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRF-TOKEN': csrfToken,
  },
  body: JSON.stringify({
    address: '0x...',
    network: 'ethereum'
  })
});
```

---

## ⚠️ Rate Limiting

### Limites por Plano

| Plano | Análises/Dia | Carteiras | Alertas em Tempo Real |
|-------|--------------|-----------|----------------------|
| Free | 3 | 1 | Não |
| Starter | 50 | 5 | Sim |
| Pro | 200 | 20 | Sim |
| Enterprise | Ilimitado | 100 | Sim |

### Headers de Rate Limit

Algumas rotas retornam headers de rate limit:

```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 59
```

---

## 🧪 Exemplos de Uso

### cURL

```bash
# Analisar token
curl -X POST http://localhost:8000/api/analyze-token \
  -H "Content-Type: application/json" \
  -H "X-CSRF-TOKEN: your-token" \
  -d '{
    "address": "0x514910771AF9Ca656af840dff83E8264EcF986CA",
    "network": "ethereum"
  }'
```

### JavaScript (Fetch)

```javascript
async function analyzeToken(address, network = 'ethereum') {
  const response = await fetch('/api/analyze-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
    },
    body: JSON.stringify({ address, network })
  });
  
  const data = await response.json();
  return data;
}

// Uso
const result = await analyzeToken('0x514910771AF9Ca656af840dff83E8264EcF986CA');
console.log(result);
```

### Axios

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
  }
});

// Analisar token
const { data } = await api.post('/analyze-token', {
  address: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
  network: 'ethereum'
});
```

---

## 📝 Códigos de Erro

| Código | Descrição |
|--------|-----------|
| 200 | Sucesso |
| 201 | Recurso criado com sucesso |
| 400 | Requisição inválida |
| 401 | Não autenticado |
| 403 | Sem permissão (limite atingido) |
| 404 | Recurso não encontrado |
| 409 | Conflito (recurso já existe) |
| 422 | Validação falhou |
| 429 | Rate limit excedido |
| 500 | Erro interno do servidor |

---

## 🚀 Webhooks (Futuro)

Em breve, você poderá receber notificações via webhook quando:

- Um token monitorado mudar de nível de risco
- Uma carteira receber novos tokens
- Alertas críticos forem detectados

---

**Para mais informações, consulte o [README.md](README.md) ou [SETUP.md](SETUP.md)**

