# 🔧 Troubleshooting - AI Token Analyzer

## Guia de Resolução de Problemas

Este documento lista problemas comuns e suas soluções.

---

## ❌ Erro 419: Unknown Status / Page Expired

### Sintomas
- Ao tentar analisar um token, recebe erro 419
- Console mostra "CSRF token mismatch"
- Request POST falha

### Causa
O Laravel está bloqueando a requisição por falta ou invalidade do CSRF token.

### Solução ✅

**Já está corrigido no código!** As rotas da API estão excluídas da verificação CSRF.

Se o problema persistir:

1. **Limpe o cache:**
   ```bash
   php artisan config:clear
   php artisan cache:clear
   php artisan route:clear
   ```

2. **Reinicie o servidor:**
   ```bash
   # Ctrl+C para parar
   composer dev
   ```

3. **Limpe o cache do navegador:**
   - Ctrl+Shift+Delete
   - Ou modo anônimo/incógnito

---

## ❌ Erro 404: Not Found nas rotas API

### Sintomas
- `/api/analyze-token` retorna 404
- Rotas da API não funcionam

### Causa
As rotas da API não estão sendo carregadas pelo Laravel.

### Solução ✅

**Já está corrigido!** Verifique se `bootstrap/app.php` tem:

```php
->withRouting(
    web: __DIR__.'/../routes/web.php',
    api: __DIR__.'/../routes/api.php',  // ← Esta linha
    commands: __DIR__.'/../routes/console.php',
    health: '/up',
)
```

Se faltar, adicione e rode:
```bash
php artisan route:clear
```

---

## ❌ Erro: Unable to fetch token information

### Sintomas
- Análise retorna erro
- Mensagem: "Unable to fetch token information"

### Causas Possíveis

#### 1. API Keys não configuradas
**Solução:**
```bash
# Edite o .env
ETHERSCAN_API_KEY=sua_chave_aqui
BSCSCAN_API_KEY=sua_chave_aqui

# Limpe o cache
php artisan config:clear
```

#### 2. Endereço de token inválido
**Solução:**
- Use endereços válidos (42 caracteres, começando com 0x)
- Teste com LINK: `0x514910771AF9Ca656af840dff83E8264EcF986CA`

#### 3. Rate limit da API atingido
**Solução:**
- Aguarde 1 minuto
- APIs gratuitas: 5 req/segundo
- Considere upgrade para API paga

#### 4. Token não existe na rede selecionada
**Solução:**
- Verifique a rede correta
- LINK está no Ethereum, não BSC
- Use block explorer para confirmar

---

## ❌ Erro: Daily limit reached

### Sintomas
- Mensagem: "Daily analysis limit reached"
- Status 429 (Too Many Requests)

### Causa
Atingiu o limite de análises do plano atual.

### Solução ✅

**Opção 1: Aguardar reset (meia-noite)**
```bash
# Ver quando reseta
php artisan tinker
>>> $user = User::find(1);
>>> $user->analyses_reset_date;
```

**Opção 2: Comando artisan (dev)** ✅ Recomendado
```bash
# Resetar usuário específico
php artisan user:reset-analyses 2

# Resetar todos
php artisan user:reset-analyses
```

**Opção 3: Upgrade de plano (produção)**
- Free: 3/dia
- Starter: 50/dia ($9.99)
- Pro: 200/dia ($29.99)
- Enterprise: Ilimitado ($99.99)

---

## ❌ Tela fica em branco / Dashboard desaparece

### Sintomas
- Após análise, a tela fica em branco
- Dashboard some completamente
- Só aparece o background
- Console mostra erro: "toFixed is not a function"

### Causa
Erro de tipo de dado no React - tentando usar `.toFixed()` em string.

### Solução ✅

**Já está corrigido no código!**

Se o problema persistir:

1. **Limpe análises antigas:**
   ```bash
   php artisan tinker --execute="App\Models\TokenAnalysis::truncate();"
   ```

2. **Reinicie tudo:**
   ```bash
   # Ctrl+C nos terminais
   composer dev
   ```

3. **Limpe cache do navegador:**
   - Ctrl+Shift+Delete
   - Ou Ctrl+F5 (hard reload)

---

## ❌ Frontend não atualiza / Tela branca

### Sintomas
- Mudanças no código não aparecem
- Tela branca no navegador
- Erros de JavaScript

### Solução ✅

**Passo 1: Rebuild do frontend**
```bash
# Pare o Vite (Ctrl+C)
npm run build
npm run dev
```

**Passo 2: Limpe cache Laravel**
```bash
php artisan optimize:clear
php artisan view:clear
```

**Passo 3: Limpe cache do navegador**
- Hard refresh: Ctrl+Shift+R
- Ou modo anônimo

**Passo 4: Verifique console**
- F12 → Console
- Procure erros em vermelho

---

## ❌ Erro: Port 8000 already in use

### Sintomas
- Não consegue iniciar servidor
- "Address already in use"

### Solução ✅

**Windows:**
```powershell
# Encontrar processo
netstat -ano | findstr :8000

# Matar processo (substitua <PID>)
taskkill /PID <PID> /F
```

**Linux/Mac:**
```bash
# Encontrar e matar
lsof -ti:8000 | xargs kill
```

**Alternativa: Use outra porta**
```bash
php artisan serve --port=8001
```

---

## ❌ Erro 500: Call to undefined method middleware()

### Sintomas
- Status 500 Internal Server Error
- "Call to undefined method ...Controller::middleware()"

### Causa
Laravel 12+ não suporta `$this->middleware()` no construtor dos controllers.

### Solução ✅

**Já está corrigido no código!** O middleware está aplicado nas rotas.

Se você criou novos controllers:

```php
// ❌ NÃO FAÇA ISSO (Laravel 11-)
public function __construct()
{
    $this->middleware('auth');
}

// ✅ FAÇA ISSO (Laravel 12+)
// Aplique middleware nas rotas (routes/api.php):
Route::middleware(['web', 'auth'])->group(function () {
    Route::post('/endpoint', [Controller::class, 'method']);
});
```

---

## ❌ Erro: Class not found

### Sintomas
- "Class 'App\Models\Plan' not found"
- "Class 'App\Services\...' not found"

### Solução ✅

```bash
# Rebuild autoload
composer dump-autoload

# Limpar cache
php artisan optimize:clear
```

---

## ❌ Erro: SQLSTATE[HY000]: General error

### Sintomas
- Erro de banco de dados
- Tabelas não existem

### Solução ✅

**Opção 1: Rodar migrations**
```bash
php artisan migrate
```

**Opção 2: Resetar banco (CUIDADO: apaga tudo)**
```bash
php artisan migrate:fresh --seed
```

---

## ❌ Vite manifest not found

### Sintomas
- Erro ao carregar assets
- "Vite manifest not found at..."

### Solução ✅

```bash
# Build dos assets
npm run build

# Ou rode em dev
npm run dev
```

---

## ❌ Análise retorna dados vazios/null

### Sintomas
- Análise completa mas sem dados
- Campos null ou vazios

### Causas e Soluções

#### 1. Token muito novo
- Pode não ter dados suficientes
- Aguarde algumas horas

#### 2. API retornou erro
**Solução:**
```bash
# Ver logs
tail -f storage/logs/laravel.log

# Ou em tempo real
php artisan pail
```

#### 3. Network incorreta
- Verifique se o token está na rede certa
- LINK = Ethereum
- CAKE = BSC

---

## ❌ Alertas não aparecem

### Sintomas
- Sistema de alertas vazio
- Notificações não funcionam

### Causa
Sistema de monitoramento ainda não implementado (Fase 2).

### Workaround ✅

**Criar alerta manualmente (dev):**
```bash
php artisan tinker
>>> Alert::create([
...   'user_id' => 1,
...   'type' => 'risk_change',
...   'severity' => 'warning',
...   'message' => 'Token risk changed from low to medium',
... ]);
```

---

## ❌ Composer install falha

### Sintomas
- Erro ao instalar dependências
- Problemas com extensões PHP

### Solução ✅

**Verificar requisitos:**
```bash
php -v  # Deve ser 8.2+
php -m  # Ver extensões
```

**Extensões necessárias:**
- OpenSSL
- PDO
- Mbstring
- Tokenizer
- XML
- Ctype
- JSON

**Instalar extensões faltantes:**
```bash
# Ubuntu/Debian
sudo apt-get install php8.2-{mbstring,xml,curl,zip}

# macOS (Homebrew)
brew install php@8.2
```

---

## ❌ NPM install falha

### Sintomas
- Erro ao instalar pacotes Node
- Dependências não resolvem

### Solução ✅

**Limpar cache e reinstalar:**
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

**Usar versão correta do Node:**
```bash
node -v  # Deve ser 18+

# Se for menor, instale:
# NVM: nvm install 18
# Windows: baixe do nodejs.org
```

---

## 🔍 Como Debugar

### Ver Logs em Tempo Real

```bash
php artisan pail
```

### Ver Últimos Erros

```bash
tail -f storage/logs/laravel.log
```

### Debug no Navegador

1. Abra DevTools (F12)
2. Vá em "Network"
3. Faça a requisição
4. Veja Request/Response

### Tinker (REPL do Laravel)

```bash
php artisan tinker

# Testar análise
>>> $service = new \App\Services\RiskAnalysisService(new \App\Services\BlockchainService());
>>> $service->analyzeToken('0x514910771AF9Ca656af840dff83E8264EcF986CA');
```

---

## 📞 Ainda com Problemas?

### Checklist Final

- [ ] PHP 8.2+ instalado
- [ ] Composer install rodado
- [ ] NPM install rodado
- [ ] .env configurado
- [ ] API keys adicionadas
- [ ] Migrations executadas
- [ ] Seeders executados
- [ ] Cache limpo
- [ ] Servidor rodando
- [ ] Vite rodando

### Reportar Bug

Se o problema persistir:

1. **Coletar informações:**
   ```bash
   php artisan about
   php artisan route:list
   tail -n 50 storage/logs/laravel.log
   ```

2. **Abrir issue no GitHub** com:
   - Descrição do problema
   - Steps to reproduce
   - Logs relevantes
   - Versões (PHP, Laravel, Node)

---

## 🆘 Comandos Úteis de Emergência

### Reset Total (CUIDADO!)

```bash
# Limpar tudo
php artisan optimize:clear
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# Rebuild
composer dump-autoload
php artisan migrate:fresh --seed
npm run build
```

### Verificar Status

```bash
# Verificar rotas
php artisan route:list

# Verificar configs
php artisan about

# Testar conexão DB
php artisan db:show
```

---

## 📚 Recursos Adicionais

- [Laravel Docs](https://laravel.com/docs)
- [Inertia Docs](https://inertiajs.com)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/laravel)
- [Laravel Discord](https://discord.gg/laravel)

---

**Última atualização:** Outubro 2025

*Este documento é atualizado conforme novos problemas são encontrados e resolvidos.*

