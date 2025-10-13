# 🔍 AI Token Analyzer

## 📋 Sobre o Projeto

**AI Token Analyzer** é um software para análise de riscos de tokens de criptomoedas:

- 💬 **Análises em Linguagem Natural** - Explicações claras e acionáveis
- 📊 **Dashboard Intuitivo** - Interface moderna e fácil de usar
- 👁️ **Monitoramento de Carteiras** - Acompanhe seus tokens favoritos
- 📄 **Relatórios PDF** - Documentação profissional para auditoria
- 🚨 **Alertas em Tempo Real** - Seja notificado sobre mudanças de risco

---

## 🚀 Tecnologias

### Backend
- **PHP** 8.2+
- **Laravel** 12.x
- **Laravel Fortify** - Autenticação completa
- **Inertia.js Laravel** - Bridge Laravel + React
- **MySQL/SQLite** - Banco de dados

### Frontend
- **React** 19
- **TypeScript**
- **Tailwind CSS** 4.x
- **Vite** - Build tool ultrarrápido

### Integrações Blockchain
- **Etherscan API** - Dados Ethereum
- **BscScan API** - Binance Smart Chain
- **PolygonScan API** - Polygon Network

> 📖 **Saiba mais:** [Guia Completo de Blockchains](docs/BLOCKCHAINS.md) - Entenda Ethereum, BSC e Polygon
---

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **PHP** >= 8.2
- **Composer**
- **Node.js** >= 18.x
- **NPM** ou **Yarn**
- **MySQL**, **PostgreSQL** ou **SQLite**

---

## ⚙️ Instalação

### 1. Clonar o Repositório

```bash
git clone <url-do-repositorio>
cd react-starter-kit
```

### 2. Instalar Dependências PHP

```bash
composer install
```

### 3. Instalar Dependências JavaScript

```bash
npm install
```

### 4. Configurar Variáveis de Ambiente

Crie o arquivo `.env`:

```bash
cp .env.example .env
```

Configure as variáveis necessárias:

```env
APP_NAME="AI Token Analyzer"
APP_URL=http://localhost:8000

# Banco de Dados
DB_CONNECTION=sqlite

# APIs de Blockchain (obtenha suas chaves gratuitamente)
ETHERSCAN_API_KEY=your_etherscan_api_key
BSCSCAN_API_KEY=your_bscscan_api_key
POLYGONSCAN_API_KEY=your_polygonscan_api_key

# Cache e Queue
CACHE_STORE=database
QUEUE_CONNECTION=database
```

### 5. Gerar Chave da Aplicação

```bash
php artisan key:generate
```

### 6. Executar Migrations

```bash
php artisan migrate
```

### 7. Executar Seeders

Popula o banco com planos e usuário de teste:

```bash
php artisan db:seed
```

**Credenciais de teste:**
- Email: `test@example.com`
- Senha: `password`

### 8. Tokens para Testar

Use estes endereços de tokens REAIS para testar o analyzer:

**Ethereum (seguros):**
- **ChainLink (LINK):** `0x514910771AF9Ca656af840dff83E8264EcF986CA`
- **Uniswap (UNI):** `0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984`

> 📖 **Mais tokens e guia completo:** [docs/BLOCKCHAINS.md](docs/BLOCKCHAINS.md)

---

## 🏃 Executando o Projeto

### Modo de Desenvolvimento (Recomendado)

Execute todos os serviços simultaneamente:

```bash
composer dev
```

Este comando inicia:
- ✅ Servidor Laravel (`http://localhost:8000`)
- ✅ Queue worker (processamento assíncrono)
- ✅ Logs em tempo real (Pail)
- ✅ Vite dev server (Hot reload React)

### Comandos Individuais

Se preferir executar separadamente:

**Terminal 1 - Backend:**
```bash
php artisan serve
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

**Terminal 3 - Queue (opcional):**
```bash
php artisan queue:listen
```

### Acesse a Aplicação

🌐 **http://localhost:8000**

---

## 💡 Funcionalidades Principais

### 1. 🔍 Análise de Tokens

**Endpoint:** `POST /api/analyze-token`

**Payload:**
```json
{
  "address": "0x514910771AF9Ca656af840dff83E8264EcF986CA",
  "network": "ethereum"
}
```

**Resposta:**
```json
{
  "success": true,
  "data": {
    "name": "ChainLink Token",
    "symbol": "LINK",
    "risk_level": "low",
    "risk_score": 15,
    "summary": "Token appears legitimate with good distribution",
    "verified": true,
    "top_holder_percentage": 8.5,
    "ai_verdict": "✅ LOW RISK: This token appears relatively safe...",
    "flags": [],
    "evidence_links": {
      "explorer": "https://etherscan.io/address/0x...",
      "holders": "https://etherscan.io/address/0x...#balances"
    }
  }
}
```

### 2. 👁️ Monitoramento de Carteiras

**Adicionar Carteira:** `POST /api/wallets`
```json
{
  "address": "0x...",
  "network": "ethereum",
  "label": "My Main Wallet"
}
```

**Listar Carteiras:** `GET /api/wallets`

### 3. 🚨 Sistema de Alertas

**Alertas Não Lidos:** `GET /api/alerts/unread/count`

**Marcar como Lido:** `POST /api/alerts/{id}/read`

---

## 🏗️ Estrutura do Projeto

```
react-starter-kit/
├── app/
│   ├── Http/
│   │   └── Controllers/
│   │       ├── Api/
│   │       │   ├── TokenAnalysisController.php
│   │       │   ├── WalletController.php
│   │       │   └── AlertController.php
│   │       └── AnalyzerController.php
│   ├── Models/
│   │   ├── Plan.php
│   │   ├── Subscription.php
│   │   ├── TokenAnalysis.php
│   │   ├── Wallet.php
│   │   ├── Alert.php
│   │   └── User.php
│   └── Services/
│       ├── BlockchainService.php       # Integração com APIs blockchain
│       └── RiskAnalysisService.php     # Heurísticas de análise de risco
├── database/
│   ├── migrations/
│   │   ├── create_plans_table.php
│   │   ├── create_subscriptions_table.php
│   │   ├── create_token_analyses_table.php
│   │   ├── create_wallets_table.php
│   │   └── create_alerts_table.php
│   └── seeders/
│       ├── PlanSeeder.php              # Seed dos planos
│       └── DatabaseSeeder.php
├── resources/
│   └── js/
│       ├── components/                  # Componentes React
│       ├── pages/
│       │   └── analyzer.tsx            # Página principal de análise
│       └── layouts/
├── routes/
│   ├── api.php                         # Rotas da API
│   └── web.php                         # Rotas web (Inertia)
└── config/
    └── blockchain.php                  # Config das APIs blockchain
```

---

## 🔧 Arquitetura Técnica

### Sistema de Heurísticas

O `RiskAnalysisService` aplica múltiplas heurísticas para identificar riscos:

1. **Concentração de Supply**
   - Crítico: >50% em uma wallet
   - Alto: >30% em uma wallet
   - Moderado: >10% em uma wallet

2. **Verificação de Contrato**
   - Contrato não verificado = +20 pontos de risco

3. **Liquidez**
   - Liquidez não travada = Alto risco
   - Liquidez parcialmente travada = Risco moderado

4. **Auditoria**
   - Verifica se o contrato foi auditado

### Cálculo de Risk Score

- **0-24**: Risco Baixo (Low) ✅
- **25-49**: Risco Médio (Medium) ⚠️
- **50-74**: Risco Alto (High) 🔴
- **75-100**: Risco Crítico (Critical) 🚨

---

## 🧪 Testes

Execute os testes automatizados:

```bash
composer test
```

ou

```bash
php artisan test
```

---

## 📝 Scripts Disponíveis

### NPM Scripts

```bash
npm run dev          # Desenvolvimento com Vite
npm run build        # Build para produção
npm run build:ssr    # Build com SSR
npm run lint         # Executar ESLint
npm run format       # Formatar código com Prettier
npm run types        # Verificar tipos TypeScript
```

### Composer Scripts

```bash
composer dev         # Modo desenvolvimento completo
composer dev:ssr     # Modo desenvolvimento com SSR
composer test        # Executar testes
composer setup       # Setup inicial do projeto
```

---

## 🔑 Obtendo API Keys

### Etherscan API
1. Acesse: https://etherscan.io/apis
2. Crie uma conta gratuita
3. Gere uma API key
4. Adicione no `.env` como `ETHERSCAN_API_KEY`

### BscScan API
1. Acesse: https://bscscan.com/apis
2. Mesmo processo do Etherscan
3. Adicione no `.env` como `BSCSCAN_API_KEY`

### PolygonScan API
1. Acesse: https://polygonscan.com/apis
2. Mesmo processo
3. Adicione no `.env` como `POLYGONSCAN_API_KEY`

---

## 🎯 Roadmap

### MVP (Atual) ✅
- [x] Sistema de análise de tokens
- [x] Planos freemium
- [x] Interface React moderna
- [x] API RESTful completa

### Fase 2 🚧
- [ ] Relatórios PDF
- [ ] Sistema de monitoramento ativo
- [ ] Alertas em tempo real via WebSocket
- [ ] Integração com mais redes

### Fase 3 🔮
- [ ] Mobile app (React Native)
- [ ] API pública para desenvolvedores
- [ ] Machine Learning para detecção avançada
- [ ] Integração com carteiras (MetaMask, etc)

---

## 📄 Licença

Este projeto é open-source e está licenciado sob a [MIT license](LICENSE).

---

## 🆘 Suporte

### Problemas Comuns

**Erro: "Daily limit reached"**
- Verifique se o seeder foi executado corretamente
- O plano Free tem limite de 3 análises/dia
- Faça upgrade para planos pagos

**Erro: "Unable to fetch token information"**
- Verifique suas API keys no `.env`
- Confirme que o endereço do token está correto
- Teste com um token conhecido (ex: LINK)

**Frontend não atualiza**
- Certifique-se de que `npm run dev` está rodando
- Limpe o cache: `php artisan optimize:clear`

### Contato

- 📧 Email: suporte@tokenanalyzer.com
- 💬 Discord: [Link do Discord]
- 📚 Docs: https://docs.tokenanalyzer.com

---

**Desenvolvido com ❤️ usando Laravel + React + Blockchain APIs**

*Nunca invista mais do que você pode perder. Esta ferramenta é para análise educacional e não constitui aconselhamento financeiro.*
