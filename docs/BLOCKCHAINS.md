# 🌐 Guia de Blockchains Suportadas

## Introdução

O **AI Token Analyzer** suporta análise de tokens em múltiplas blockchains. Este guia explica cada rede, suas características e quando usá-las.

---

## 🔷 Ethereum (ETH)

### O Que É?

**Ethereum** é a blockchain original para smart contracts e tokens, criada por Vitalik Buterin em 2015. É a segunda maior criptomoeda por capitalização de mercado, perdendo apenas para o Bitcoin.

### Características

- ✅ **Mais segura e descentralizada** de todas as redes
- ✅ **Padrão da indústria** para tokens (ERC-20, ERC-721)
- ✅ Maior ecossistema de desenvolvedores
- ❌ **Taxas mais altas** (gas fees podem chegar a $50+ em picos)
- ❌ Mais lenta (15-30 transações por segundo)

### Tokens Famosos

| Token | Símbolo | Tipo | Market Cap |
|-------|---------|------|------------|
| ChainLink | LINK | Oracle | Top 20 |
| Uniswap | UNI | DEX | Top 30 |
| Tether | USDT | Stablecoin | Top 3 |
| Shiba Inu | SHIB | Meme | Top 15 |
| Wrapped Bitcoin | WBTC | Wrapped | Top 20 |
| Dai | DAI | Stablecoin | Top 30 |

### Quando Usar Ethereum?

✅ **Use para:**
- Tokens grandes e consolidados
- Projetos DeFi estabelecidos
- NFTs de alto valor
- Investimentos de longo prazo

❌ **Evite para:**
- Tokens muito novos (altos custos de criação filtram alguns scams)
- Transações pequenas (taxas podem ser maiores que o valor)

### API

- **Explorer:** https://etherscan.io
- **API Docs:** https://docs.etherscan.io
- **Rate Limit:** 5 req/seg (grátis)

---

## 🟡 Binance Smart Chain (BSC)

### O Que É?

**Binance Smart Chain** (também chamada de BNB Chain) foi criada pela exchange Binance em 2020. É essencialmente um "clone" do Ethereum, mas otimizado para velocidade e baixo custo.

### Características

- ✅ **Muito mais barata** (taxas de centavos)
- ✅ **Rápida** (3 segundos por bloco)
- ✅ Compatível com ferramentas Ethereum (MetaMask, etc)
- ⚠️ **Menos descentralizada** (controlada pela Binance)
- 🚨 **Muito mais tokens fraudulentos** (baixo custo atrai scammers)

### Tokens Famosos

| Token | Símbolo | Tipo | Popularidade |
|-------|---------|------|--------------|
| PancakeSwap | CAKE | DEX | Mais popular da BSC |
| Binance USD | BUSD | Stablecoin | Stablecoin nativa |
| SafeMoon | SAFEMOON | Reflexão | Controverso |
| BabyDoge | BABYDOGE | Meme | Comunidade grande |

### Quando Usar BSC?

✅ **Use para:**
- Tokens novos e emergentes
- DeFi com taxas baixas
- Day trading (custos baixos)
- Projetos experimentais

🚨 **CUIDADO:**
- **Muitos rug pulls!** (desenvolvedores somem com o dinheiro)
- **Tokens meme** sem valor real
- **Contratos honeypot** (você compra mas não consegue vender)

### Por Que Analisar Tokens BSC é CRUCIAL?

Devido ao baixo custo de criação de tokens (~$1), qualquer pessoa pode criar um token na BSC. Isso atrai:

1. **Projetos legítimos** buscando baixas taxas ✅
2. **Scammers** criando tokens fraudulentos 🚨

**É aqui que seu analyzer brilha!** 🎯

### API

- **Explorer:** https://bscscan.com
- **API Docs:** https://docs.bscscan.com
- **Rate Limit:** 5 req/seg (grátis)

---

## 💜 Polygon (MATIC)

### O Que É?

**Polygon** é uma solução Layer 2 para Ethereum. Imagine como uma "rodovia expressa" construída em cima do Ethereum - mais rápida e barata, mas ainda conectada à rede principal.

### Características

- ✅ **Rápida E barata** (taxas < $0.01)
- ✅ **Conectada ao Ethereum** (pode mover assets facilmente)
- ✅ **Crescimento explosivo** em NFTs e games
- ✅ Mais descentralizada que BSC
- ⚠️ Ainda depende do Ethereum para segurança

### Tokens Famosos

| Token | Símbolo | Tipo | Uso |
|-------|---------|------|-----|
| Polygon | MATIC | Nativo | Gas fees |
| Aave (Polygon) | AAVE | DeFi | Empréstimos |
| The Sandbox | SAND | Gaming | Metaverso |
| Decentraland | MANA | Gaming | Mundo virtual |
| QuickSwap | QUICK | DEX | Exchange |

### Quando Usar Polygon?

✅ **Use para:**
- **NFTs** (OpenSea tem integração)
- **Games blockchain** (baixo custo de transação)
- **DeFi** com taxas baixas
- Pontes entre Ethereum e outras redes

### Por Que Polygon Está Crescendo?

1. **NFTs baratos** - criar/transferir NFT custa centavos
2. **Gaming** - jogos precisam de transações rápidas
3. **Adoção corporativa** - Starbucks, Instagram usam Polygon
4. **Ecossistema Ethereum** - desenvolvedores migram do Ethereum

### API

- **Explorer:** https://polygonscan.com
- **API Docs:** https://docs.polygonscan.com
- **Rate Limit:** 5 req/seg (grátis)

---

## 🎯 Comparação Rápida

| Característica | Ethereum | BSC | Polygon |
|----------------|----------|-----|---------|
| **Ano de Criação** | 2015 | 2020 | 2017 |
| **Taxa Média** | $5-50 | $0.05-0.20 | $0.01-0.05 |
| **Velocidade** | 15 TPS | 160 TPS | 7,000 TPS |
| **Descentralização** | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ |
| **Segurança** | Máxima | Média | Alta |
| **Tokens Fraudulentos** | Poucos | MUITOS 🚨 | Moderado |
| **Casos de Uso** | DeFi, NFTs premium | Tokens novos, memes | NFTs, games |

---

## 🧪 Tokens para Testar o Analyzer

### ✅ Tokens SEGUROS (Risco Baixo)

Use estes para ver como o analyzer identifica tokens legítimos:

#### Ethereum

```
ChainLink (LINK)
Endereço: 0x514910771AF9Ca656af840dff83E8264EcF986CA
Risk Score Esperado: 10-20 (Baixo)
Características: ✅ Verificado, ✅ Boa distribuição, ✅ Auditado
```

```
Uniswap (UNI)
Endereço: 0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984
Risk Score Esperado: 10-20 (Baixo)
Características: ✅ DEX famosa, ✅ Top 30, ✅ Verificado
```

```
Tether (USDT)
Endereço: 0xdAC17F958D2ee523a2206206994597C13D831ec7
Risk Score Esperado: 15-25 (Baixo-Médio)
Características: ✅ Stablecoin, ⚠️ Controverso mas consolidado
```

```
Dai (DAI)
Endereço: 0x6B175474E89094C44Da98b954EedeAC495271d0F
Risk Score Esperado: 10-20 (Baixo)
Características: ✅ Stablecoin descentralizada, ✅ MakerDAO
```

```
Wrapped Ethereum (WETH)
Endereço: 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
Risk Score Esperado: 5-15 (Muito Baixo)
Características: ✅ ETH empacotado, ✅ Padrão ERC-20
```

#### Binance Smart Chain

```
PancakeSwap (CAKE)
Endereço: 0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82
Risk Score Esperado: 20-30 (Baixo-Médio)
Características: ✅ DEX principal da BSC, ✅ Verificado
```

```
Binance USD (BUSD)
Endereço: 0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56
Risk Score Esperado: 15-25 (Baixo-Médio)
Características: ✅ Stablecoin da Binance, ✅ Auditado
```

---

## 🚨 Como Encontrar Tokens SUSPEITOS

### Para Testar o Sistema de Detecção de Risco

1. **CoinMarketCap Novos Tokens**
   - Vá em: https://coinmarketcap.com/new/
   - Procure tokens com market cap < $1M
   - Copie o endereço do contrato

2. **CoinGecko Recentes**
   - Vá em: https://www.coingecko.com/en/coins/recently_added
   - Tokens com poucas horas/dias
   - Muitos são scams!

3. **Reddit r/CryptoMoonShots**
   - Vá em: https://reddit.com/r/CryptoMoonShots
   - Sub dedicado a tokens "pump and dump"
   - ⚠️ **90%+ são scams**
   - Perfeito para testar o analyzer!

4. **BSCScan Novos Contratos**
   - Vá em: https://bscscan.com/contractsVerified
   - Tokens criados nas últimas horas
   - Alto risco de rug pull

### Red Flags que o Analyzer Detecta

Quando você testar um token suspeito, o sistema deve mostrar:

🚨 **Risk Score 75-100 (Crítico)**
- 🚩 Top holder com 50%+ do supply
- 🚩 Contrato não verificado
- 🚩 Liquidez não travada
- 🚩 Menos de 100 holders
- 🚩 Criado há menos de 24h

**AI Verdict:** "⚠️ HIGH RISK: Evite investir..."

---

## 📊 Estatísticas das Redes

### Ethereum

- **Total de Tokens ERC-20:** ~500,000+
- **Novos por Dia:** ~100-200
- **% Scams:** ~5-10%
- **Custo Médio de Criação:** $500-2,000

### Binance Smart Chain

- **Total de Tokens BEP-20:** ~1,000,000+
- **Novos por Dia:** ~1,000-2,000
- **% Scams:** ~60-80% 🚨
- **Custo Médio de Criação:** $1-5

### Polygon

- **Total de Tokens:** ~100,000+
- **Novos por Dia:** ~200-500
- **% Scams:** ~20-30%
- **Custo Médio de Criação:** $0.01-1

---

## 🎯 Por Que Seu SaaS Suporta as 3 Redes?

### 1. Ethereum - Credibilidade
- Tokens grandes = usuários com dinheiro
- Baixa taxa de scam = foco em análise de qualidade
- **Target:** Investidores sérios

### 2. BSC - Volume
- Milhares de tokens novos por dia
- Alto risco = alta demanda por análise
- **Target:** Day traders, caçadores de gems

### 3. Polygon - Crescimento
- Crescendo rapidamente (NFTs, games)
- Nicho sub-explorado
- **Target:** Early adopters, gamers

### Estratégia de Mercado

```
Ethereum  → Premium pricing (análise profunda)
BSC       → Volume pricing (muitas análises)
Polygon   → Future-proof (crescimento futuro)
```

---

## 🔑 Resumo Executivo

| Rede | Use Quando | Evite Quando | Risco Médio |
|------|------------|--------------|-------------|
| **Ethereum** | Tokens consolidados, DeFi | Taxas altas, tokens novos | Baixo |
| **BSC** | Tokens novos, low-cap | Projetos não verificados | ALTO 🚨 |
| **Polygon** | NFTs, games, baixo custo | Máxima segurança | Médio |

---

## 📚 Recursos Adicionais

### Explorers

- **Ethereum:** https://etherscan.io
- **BSC:** https://bscscan.com
- **Polygon:** https://polygonscan.com

### Ferramentas de Análise

- **DexTools:** https://dextools.io - Charts e trading
- **PooCoin:** https://poocoin.app - BSC específico
- **DexScreener:** https://dexscreener.com - Multi-chain

### Educação

- **Ethereum.org:** https://ethereum.org/learn
- **Binance Academy:** https://academy.binance.com
- **Polygon Wiki:** https://wiki.polygon.technology

### Comunidades

- **r/ethereum** - Discussões Ethereum
- **r/binance** - BSC e Binance
- **r/0xPolygon** - Polygon community

---

## ⚠️ Disclaimer

**Este guia é apenas educacional.** 

- ❌ Não constitui aconselhamento financeiro
- ❌ Sempre faça sua própria pesquisa (DYOR)
- ❌ Nunca invista mais do que pode perder
- ✅ Use o analyzer como ferramenta, não verdade absoluta

**O AI Token Analyzer ajuda a identificar riscos, mas não garante lucros.**

---

## 🔄 Atualizações

Este documento é atualizado conforme:
- Novas redes são adicionadas
- APIs mudam
- Mercado evolui

**Última atualização:** Outubro 2025

---

**Desenvolvido com ❤️ para ajudar traders a evitar scams e tomar decisões informadas**

