import { useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Loader2, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  ExternalLink,
  BarChart3,
  Lock,
  Unlock,
  MessageSquare,
  TrendingUp,
  Cpu,
  Users,
  Shield,
  DollarSign
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Analysis {
    id: number;
    name: string;
    symbol: string;
    risk_level: string;
    risk_score: number;
    summary: string;
    verified: boolean;
    liquidity_status: string;
    top_holder_percentage: number;
    is_audited: boolean;
    audit_provider: string | null;
    ai_verdict: string;
    evidence_links: {
        explorer: string;
        holders: string;
    };
    flags: Array<{
        type: string;
        message: string;
        severity: string;
        category?: string;
    }>;
    detailed_analysis?: {
        holders_analysis: {
            total_holders: number;
            top_10_holders: Array<{
                address: string;
                percentage: number;
                balance: number;
            }>;
            top_holder_percentage: number;
            gini_coefficient: number;
            holder_retention_rate: number;
            new_holders_24h: number;
            whale_movements: {
                large_transactions_24h: number;
                whale_activity_score: number;
                suspicious_movements: number;
            };
            holder_distribution: {
                very_small_holders: number;
                small_holders: number;
                medium_holders: number;
                large_holders: number;
                whale_holders: number;
            };
            insider_holdings: {
                insider_percentage: number;
                team_wallets_detected: number;
                vesting_schedule: boolean;
            };
        };
        liquidity_analysis: {
            total_liquidity: number;
            locked: boolean;
            lock_duration: number | null;
            liquidity_depth: {
                depth_score: number;
                price_impact_1m: number;
                price_impact_10m: number;
                price_impact_100m: number;
            };
            price_impact_analysis: {
                low_impact: number;
                medium_impact: number;
                high_impact: number;
                extreme_impact: number;
            };
            slippage_analysis: {
                average_slippage: number;
                max_slippage_24h: number;
                slippage_trend: string;
            };
            lp_distribution: {
                top_lp_percentage: number;
                lp_concentration_score: number;
                lp_diversity: number;
            };
            impermanent_loss_risk: {
                risk_level: string;
                risk_score: number;
                mitigation_factors: number;
            };
            liquidity_health_score: number;
        };
        contract_analysis: {
            verified: boolean;
            is_proxy: boolean;
            upgradeable: boolean;
            bytecode_analysis: {
                complexity_score: number;
                suspicious_patterns: number;
                gas_optimization: number;
                security_patterns: number;
            };
            function_analysis: {
                total_functions: number;
                public_functions: number;
                external_functions: number;
                suspicious_functions: number;
            };
            security_patterns: {
                reentrancy_guards: number;
                access_controls: number;
                pausable_functions: number;
                upgrade_safeguards: number;
            };
            suspicious_patterns: {
                hidden_functions: number;
                backdoors: number;
                unusual_patterns: number;
                gas_griefing: number;
            };
            contract_complexity: number;
            gas_optimization: {
                optimization_score: number;
                gas_efficiency: number;
                optimization_opportunities: number;
            };
        };
        trading_analysis: {
            volume_24h: number;
            volume_7d: number;
            volume_30d: number;
            volume_patterns: {
                volume_trend: string;
                volume_volatility: number;
                unusual_spikes: number;
                volume_consistency: number;
            };
            price_volatility: {
                volatility_score: number;
                price_swings_24h: number;
                volatility_trend: string;
            };
            trading_bot_detection: {
                bot_activity_score: number;
                automated_trades_percentage: number;
                bot_sophistication: number;
            };
            wash_trading_detection: {
                detected: boolean;
                confidence: number;
                volume_affected: number;
            };
            market_manipulation: {
                manipulation_score: number;
                pump_dump_patterns: number;
                price_manipulation: boolean;
            };
            trading_health_score: number;
        };
        social_analysis: {
            twitter_mentions: number;
            reddit_mentions: number;
            telegram_members: number;
            sentiment_score: number;
            influencer_mentions: {
                influencer_count: number;
                mentions_24h: number;
                sentiment_breakdown: {
                    positive: number;
                    neutral: number;
                    negative: number;
                };
            };
            fud_fomo_detection: {
                fud_score: number;
                fomo_score: number;
                emotional_volatility: number;
            };
            community_engagement: {
                engagement_rate: number;
                active_members: number;
                content_quality: number;
                moderation_quality: number;
            };
            developer_activity: {
                github_commits: number;
                developer_count: number;
                activity_score: number;
                code_quality: number;
            };
            social_health_score: number;
        };
        governance_analysis: {
            has_governance: boolean;
            proposal_count: number;
            voting_power_distribution: {
                total_voting_power: number;
                top_voter_percentage: number;
                voting_participation: number;
                governance_tokens: number;
            };
            treasury_analysis: {
                treasury_balance: number;
                treasury_health: number;
                funding_sources: number;
                expenditure_patterns: number;
            };
            governance_participation: {
                participation_rate: number;
                proposal_success_rate: number;
                voter_turnout: number;
                governance_quality: number;
            };
            governance_health_score: number;
        };
        security_analysis: {
            audit_status: {
                audited: boolean;
                audit_firms: number;
                audit_date: string | null;
                audit_score: number;
            };
            vulnerability_scan: {
                high_risk_count: number;
                medium_risk_count: number;
                low_risk_count: number;
                total_vulnerabilities: number;
            };
            access_control_analysis: {
                access_control_score: number;
                admin_functions: number;
                role_based_access: boolean;
                multi_sig_required: boolean;
            };
            reentrancy_check: {
                reentrancy_guards: number;
                vulnerable_functions: number;
                protection_score: number;
            };
            integer_overflow_check: {
                overflow_checks: number;
                vulnerable_operations: number;
                protection_score: number;
            };
            security_score: number;
        };
        market_analysis: {
            market_cap: number;
            fully_diluted_valuation: number;
            circulating_supply: number;
            total_supply: number;
            price_analysis: {
                current_price: number;
                price_change_24h: number;
                price_change_7d: number;
                price_change_30d: number;
                all_time_high: number;
                all_time_low: number;
            };
            market_dominance: number;
            correlation_analysis: {
                bitcoin_correlation: number;
                ethereum_correlation: number;
                market_correlation: number;
            };
        };
    };
}

interface Props {
    auth: {
        user: {
            name: string;
            email: string;
        };
    };
    limits: {
        analyses_today: number;
        analyses_limit: number;
        analyses_remaining: number;
        can_analyze: boolean;
    };
}

export default function Analyzer({ limits: initialLimits }: Props) {
    const [tokenAddress, setTokenAddress] = useState('');
    const [network, setNetwork] = useState('ethereum');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [analysis, setAnalysis] = useState<Analysis | null>(null);
    
    // Add safety checks for limits
    const safeInitialLimits = initialLimits || {
        analyses_today: 0,
        analyses_limit: 3,
        analyses_remaining: 3,
        can_analyze: true
    };
    const [limits, setLimits] = useState(safeInitialLimits);

    const analyzeToken = async () => {
        if (!tokenAddress.trim()) {
            setError('Please enter a token address');
            return;
        }

        if (!limits.can_analyze) {
            setError('Daily limit reached. Upgrade your plan for more analyses.');
            return;
        }

        setLoading(true);
        setError('');
        setAnalysis(null);

        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
                || document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN='))?.split('=')[1];

            const response = await fetch('/api/analyze-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken || '',
                    'Accept': 'application/json',
                },
                credentials: 'same-origin',
                body: JSON.stringify({ address: tokenAddress, network }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Analysis failed');
            }

            setAnalysis(data.data);
            
            // Update limits
            const limitsResponse = await fetch('/api/analyses/limits/check');
            const limitsData = await limitsResponse.json();
            if (limitsData.success) {
                setLimits(limitsData.data);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const getRiskColor = (level: string) => {
        switch (level) {
            case 'critical': return 'text-red-600';
            case 'high': return 'text-orange-600';
            case 'medium': return 'text-yellow-600';
            case 'low': return 'text-green-600';
            default: return 'text-gray-600';
        }
    };

    const getRiskBadgeVariant = (level: string) => {
        switch (level) {
            case 'critical': return 'destructive';
            case 'high': return 'destructive';
            case 'medium': return 'default';
            case 'low': return 'secondary';
            default: return 'outline';
        }
    };

    return (
        <AppLayout>
            <Head title="Token Analyzer" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className=" overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {/* Header */}
                            <div className="mb-8">
                                <h1 className="text-3xl font-bold mb-2">AI Token Analyzer</h1>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Analyze any token to identify potential risks and security concerns
                                </p>
                            </div>

                            {/* Usage Stats */}
                            <div className="mb-6">
                                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                    <span>Daily Analyses: {limits.analyses_today} / {limits.analyses_limit}</span>
                                    <span>Remaining: {limits.analyses_remaining}</span>
                                </div>
                            </div>

                            {/* Analysis Form */}
                            <Card className="mb-6">
                                <CardHeader>
                                    <CardTitle>Analyze Token</CardTitle>
                                    <CardDescription>
                                        Enter a token contract address to get a detailed risk analysis
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="md:col-span-2">
                                                <Label htmlFor="token-address">Token Contract Address</Label>
                                                <Input
                                                    id="token-address"
                                                    type="text"
                                                    placeholder="0x..."
                                                    value={tokenAddress}
                                                    onChange={(e) => setTokenAddress(e.target.value)}
                                                    className="mt-1"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="network">Network</Label>
                                                <Select value={network} onValueChange={setNetwork}>
                                                    <SelectTrigger className="mt-1">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="ethereum">Ethereum</SelectItem>
                                                        <SelectItem value="bsc">BSC</SelectItem>
                                                        <SelectItem value="polygon">Polygon</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                        
                                        {error && (
                                            <Alert variant="destructive">
                                                <AlertTriangle className="h-4 w-4" />
                                                <AlertDescription>{error}</AlertDescription>
                                            </Alert>
                                        )}

                                        <Button 
                                            onClick={analyzeToken} 
                                            disabled={loading || !limits.can_analyze}
                                            className="w-full"
                                        >
                                            {loading ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Analyzing...
                                                </>
                                            ) : (
                                                'Analyze Token'
                                            )}
                                        </Button>

                                        {!limits.can_analyze && (
                                            <Alert>
                                                <AlertTriangle className="h-4 w-4" />
                                                <AlertDescription>
                                                    Daily limit reached. Upgrade your plan for more analyses.
                                                </AlertDescription>
                                            </Alert>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Analysis Results */}
                            {analysis && (
                                <div className="space-y-6">
                                    {/* Warning if incomplete data */}
                                    {(!analysis.name || !analysis.symbol) && (
                                        <Alert>
                                            <AlertTriangle className="h-4 w-4" />
                                            <AlertDescription>
                                                <strong>Limited Data Available:</strong> Etherscan API v1 is deprecated. Some token info may be missing.
                                                The risk analysis is still based on available on-chain data.
                                            </AlertDescription>
                                        </Alert>
                                    )}

                                    {/* Summary Card */}
                                    <Card>
                                        <CardHeader>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <CardTitle className="text-2xl">{analysis.name} ({analysis.symbol})</CardTitle>
                                                    <CardDescription>{analysis.summary}</CardDescription>
                                                </div>
                                                <div className="text-right">
                                                    <div className={`text-4xl font-bold ${getRiskColor(analysis.risk_level)}`}>{analysis.risk_score}</div>
                                                    <div className="text-sm text-muted-foreground">Risk Score</div>
                                                    <Badge variant={getRiskBadgeVariant(analysis.risk_level)}>
                                                        {analysis.risk_level.toUpperCase()}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                <div className="text-center">
                                                    <div className="flex items-center justify-center mb-2">
                                                        {analysis.verified ? <CheckCircle className="h-5 w-5 text-green-500" /> : <XCircle className="h-5 w-5 text-red-500" />}
                                                    </div>
                                                    <div className="text-sm font-medium">Verified</div>
                                                    <div className="text-xs text-muted-foreground">{analysis.verified ? 'Yes' : 'No'}</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="flex items-center justify-center mb-2">
                                                        {analysis.is_audited ? <CheckCircle className="h-5 w-5 text-green-500" /> : <XCircle className="h-5 w-5 text-yellow-500" />}
                                                    </div>
                                                    <div className="text-sm font-medium">Audited</div>
                                                    <div className="text-xs text-muted-foreground">{analysis.is_audited ? 'Yes' : 'No'}</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="text-sm font-medium">Top Holder</div>
                                                    <div className="text-xs text-muted-foreground">{parseFloat(analysis.top_holder_percentage.toString()).toFixed(2)}%</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="text-sm font-medium">Liquidity</div>
                                                    <div className="text-xs text-muted-foreground">{analysis.liquidity_status}</div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Comprehensive Analysis Tabs */}
                                    <Tabs defaultValue="overview" className="w-full">
                                        <TabsList className="grid w-full grid-cols-8">
                                            <TabsTrigger value="overview">Overview</TabsTrigger>
                                            <TabsTrigger value="holders">Holders</TabsTrigger>
                                            <TabsTrigger value="liquidity">Liquidity</TabsTrigger>
                                            <TabsTrigger value="contract">Contract</TabsTrigger>
                                            <TabsTrigger value="trading">Trading</TabsTrigger>
                                            <TabsTrigger value="social">Social</TabsTrigger>
                                            <TabsTrigger value="security">Security</TabsTrigger>
                                            <TabsTrigger value="market">Market</TabsTrigger>
                                        </TabsList>

                                        {/* Overview Tab */}
                                        <TabsContent value="overview" className="space-y-4">
                                            {/* AI Analysis */}
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle className="flex items-center gap-2">
                                                        <AlertTriangle className="h-5 w-5" />
                                                        AI Analysis
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <p className="text-sm leading-relaxed whitespace-pre-line">{analysis.ai_verdict}</p>
                                                </CardContent>
                                            </Card>

                                            {/* Risk Flags */}
                                            {analysis.flags.length > 0 && (
                                                <Card>
                                                    <CardHeader>
                                                        <CardTitle className="flex items-center gap-2">
                                                            <AlertTriangle className="h-5 w-5" />
                                                            Risk Flags
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <div className="space-y-2">
                                                            {analysis.flags.map((flag, index) => (
                                                                <div key={index} className={`p-3 rounded-lg border-l-4 ${
                                                                    flag.severity === 'critical' ? 'border-red-500 bg-red-50 dark:bg-red-950' :
                                                                    flag.severity === 'high' ? 'border-orange-500 bg-orange-50 dark:bg-orange-950' :
                                                                    'border-yellow-500 bg-yellow-50 dark:bg-yellow-950'
                                                                }`}>
                                                                    <div className="flex items-center gap-2">
                                                                        <AlertTriangle className="h-4 w-4" />
                                                                        <span className="font-medium">{flag.message}</span>
                                                                        <Badge variant={flag.severity === 'critical' ? 'destructive' : 'default'}>
                                                                            {flag.severity}
                                                                        </Badge>
                                                                        {flag.category && (
                                                                            <Badge variant="outline">{flag.category}</Badge>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            )}

                                            {/* Evidence & Resources */}
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle className="flex items-center gap-2">
                                                        <ExternalLink className="h-5 w-5" />
                                                        Evidence & Resources
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="flex gap-4">
                                                        <Button variant="outline" asChild>
                                                            <a href={analysis.evidence_links.explorer} target="_blank" rel="noopener noreferrer">
                                                                <ExternalLink className="h-4 w-4 mr-2" />
                                                                View on Block Explorer
                                                            </a>
                                                        </Button>
                                                        <Button variant="outline" asChild>
                                                            <a href={analysis.evidence_links.holders} target="_blank" rel="noopener noreferrer">
                                                                <Users className="h-4 w-4 mr-2" />
                                                                View Token Holders
                                                            </a>
                                                        </Button>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </TabsContent>

                                        {/* Holders Analysis Tab */}
                                        <TabsContent value="holders" className="space-y-4">
                                            {analysis.detailed_analysis?.holders_analysis && (
                                                <>
                                                    {/* Key Metrics Cards - Dark Modern Style */}
                                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                                        <Card className="border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50 transition-all">
                                                            <CardContent className="pt-6">
                                                                <div className="flex items-center justify-between">
                                                                    <div>
                                                                        <div className="flex items-center gap-2 mb-2">
                                                                            <Users className="h-4 w-4 text-slate-400" />
                                                                            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Holders</p>
                                                                        </div>
                                                                        <h3 className="text-2xl font-bold text-slate-100">
                                                                            {analysis.detailed_analysis.holders_analysis.total_holders.toLocaleString()}
                                                                        </h3>
                                                                    </div>
                                                                    <div className="h-10 w-10 rounded-lg bg-slate-700/50 flex items-center justify-center">
                                                                        <Users className="h-5 w-5 text-slate-400" />
                                                                    </div>
                                                                </div>
                                                            </CardContent>
                                                        </Card>

                                                        <Card className="border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50 transition-all">
                                                            <CardContent className="pt-6">
                                                                <div className="flex items-center justify-between">
                                                                    <div className="flex-1">
                                                                        <div className="flex items-center gap-2 mb-2">
                                                                            <BarChart3 className="h-4 w-4 text-slate-400" />
                                                                            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Gini Coefficient</p>
                                                                        </div>
                                                                        <h3 className="text-2xl font-bold text-slate-100">
                                                                            {analysis.detailed_analysis.holders_analysis.gini_coefficient.toFixed(2)}
                                                                        </h3>
                                                                        <div className="flex items-center gap-1 mt-1">
                                                                            <div className={`h-2 w-2 rounded-full ${analysis.detailed_analysis.holders_analysis.gini_coefficient < 0.5 ? 'bg-green-500' : 'bg-red-500'}`} />
                                                                            <p className="text-xs text-slate-400">
                                                                                {analysis.detailed_analysis.holders_analysis.gini_coefficient < 0.5 ? 'Well Distributed' : 'Concentrated'}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </CardContent>
                                                        </Card>

                                                        <Card className="border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50 transition-all">
                                                            <CardContent className="pt-6">
                                                                <div className="flex items-center justify-between">
                                                                    <div className="flex-1">
                                                                        <div className="flex items-center gap-2 mb-2">
                                                                            <TrendingUp className="h-4 w-4 text-slate-400" />
                                                                            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Retention Rate</p>
                                                                        </div>
                                                                        <h3 className="text-2xl font-bold text-slate-100">
                                                                            {analysis.detailed_analysis.holders_analysis.holder_retention_rate}%
                                                                        </h3>
                                                                        <div className="mt-2 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                                                            <div 
                                                                                className="h-full bg-gradient-to-r from-slate-500 to-slate-400 transition-all duration-500" 
                                                                                style={{ width: `${analysis.detailed_analysis.holders_analysis.holder_retention_rate}%` }}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </CardContent>
                                                        </Card>

                                                        <Card className="border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50 transition-all">
                                                            <CardContent className="pt-6">
                                                                <div className="flex items-center justify-between">
                                                                    <div>
                                                                        <div className="flex items-center gap-2 mb-2">
                                                                            <Users className="h-4 w-4 text-slate-400" />
                                                                            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">New (24h)</p>
                                                                        </div>
                                                                        <h3 className="text-2xl font-bold text-slate-100">
                                                                            +{analysis.detailed_analysis.holders_analysis.new_holders_24h}
                                                                        </h3>
                                                                        <p className="text-xs text-slate-500 mt-1">↗ Growing</p>
                                                                    </div>
                                                                    <div className="h-10 w-10 rounded-lg bg-slate-700/50 flex items-center justify-center">
                                                                        <TrendingUp className="h-5 w-5 text-slate-400" />
                                                                    </div>
                                                                </div>
                                                            </CardContent>
                                                        </Card>
                                                    </div>

                                                    {/* Whale Activity - Subtle Alert */}
                                                    <Card className="border-amber-900/30 bg-amber-950/20">
                                                        <CardHeader className="border-b border-amber-900/30">
                                                            <CardTitle className="flex items-center gap-2 text-sm font-medium">
                                                                <div className="h-8 w-8 rounded-lg bg-amber-900/30 flex items-center justify-center">
                                                                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                                                                </div>
                                                                <span>Whale Activity Monitoring</span>
                                                            </CardTitle>
                                                        </CardHeader>
                                                        <CardContent className="pt-6">
                                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                                <div className="p-4 rounded-lg border border-slate-700/50 bg-slate-800/30">
                                                                    <div className="text-xs text-slate-400 mb-1">Large Transactions (24h)</div>
                                                                    <div className="text-2xl font-bold text-slate-100">{analysis.detailed_analysis.holders_analysis.whale_movements.large_transactions_24h}</div>
                                                                </div>
                                                                <div className="p-4 rounded-lg border border-slate-700/50 bg-slate-800/30">
                                                                    <div className="text-xs text-slate-400 mb-1">Whale Activity Score</div>
                                                                    <div className="text-2xl font-bold text-slate-100">{analysis.detailed_analysis.holders_analysis.whale_movements.whale_activity_score}</div>
                                                                </div>
                                                                <div className="p-4 rounded-lg border border-red-900/30 bg-red-950/20">
                                                                    <div className="text-xs text-red-400 mb-1">Suspicious Movements</div>
                                                                    <div className="text-2xl font-bold text-red-400">{analysis.detailed_analysis.holders_analysis.whale_movements.suspicious_movements}</div>
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>

                                                    {/* Top 10 Holders - Clean Design */}
                                                    <Card className="border-slate-700/50">
                                                        <CardHeader className="border-b border-slate-700/50">
                                                            <div className="flex items-center gap-3">
                                                                <div className="h-10 w-10 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700/50">
                                                                    <Users className="h-5 w-5 text-slate-400" />
                                                                </div>
                                                                <div>
                                                                    <CardTitle className="text-base">Top 10 Holders Distribution</CardTitle>
                                                                    <CardDescription className="text-xs">Addresses holding the largest token amounts</CardDescription>
                                                                </div>
                                                            </div>
                                                        </CardHeader>
                                                        <CardContent className="pt-6">
                                                            <div className="space-y-3">
                                                                {analysis.detailed_analysis.holders_analysis.top_10_holders.map((holder, index) => (
                                                                    <div key={index} className="group">
                                                                        <div className="flex items-center justify-between mb-2">
                                                                            <div className="flex items-center gap-3">
                                                                                <div className="flex items-center justify-center w-6 h-6 rounded-md bg-slate-800 border border-slate-700/50 text-slate-400 text-xs font-mono">
                                                                                    {index + 1}
                                                                                </div>
                                                                                <span className="font-mono text-xs bg-slate-800/50 px-2.5 py-1 rounded border border-slate-700/50 text-slate-300 group-hover:border-slate-600 transition-colors">
                                                                                    {holder.address.slice(0, 8)}...{holder.address.slice(-6)}
                                                                                </span>
                                                                            </div>
                                                                            <div className="text-right">
                                                                                <div className="font-semibold text-sm text-slate-100">{holder.percentage.toFixed(2)}%</div>
                                                                                <div className="text-xs text-slate-500">{holder.balance.toLocaleString()}</div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                                                            <div 
                                                                                className="h-full bg-gradient-to-r from-slate-600 to-slate-500 transition-all duration-500" 
                                                                                style={{ width: `${holder.percentage}%` }}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </CardContent>
                                                    </Card>

                                                    {/* Holder Distribution - Minimalist Chart */}
                                                    <Card className="border-slate-700/50">
                                                        <CardHeader className="border-b border-slate-700/50">
                                                            <CardTitle className="text-base">Holder Size Distribution</CardTitle>
                                                            <CardDescription className="text-xs">Distribution of holders by wallet size</CardDescription>
                                                        </CardHeader>
                                                        <CardContent className="pt-6">
                                                            <div className="space-y-4">
                                                                {Object.entries(analysis.detailed_analysis.holders_analysis.holder_distribution).map(([key, value]) => {
                                                                    const labels = {
                                                                        'very_small_holders': 'Very Small',
                                                                        'small_holders': 'Small',
                                                                        'medium_holders': 'Medium',
                                                                        'large_holders': 'Large',
                                                                        'whale_holders': 'Whale'
                                                                    };
                                                                    const gradients = {
                                                                        'very_small_holders': 'from-slate-600 to-slate-500',
                                                                        'small_holders': 'from-slate-500 to-slate-400',
                                                                        'medium_holders': 'from-slate-400 to-slate-300',
                                                                        'large_holders': 'from-slate-500 to-amber-800',
                                                                        'whale_holders': 'from-amber-800 to-amber-700'
                                                                    };
                                                                    return (
                                                                        <div key={key} className="space-y-2">
                                                                            <div className="flex items-center justify-between text-sm">
                                                                                <span className="text-slate-400">{labels[key as keyof typeof labels]}</span>
                                                                                <span className="font-semibold text-slate-200">{value}%</span>
                                                                            </div>
                                                                            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                                                                                <div 
                                                                                    className={`h-full bg-gradient-to-r ${gradients[key as keyof typeof gradients]} transition-all duration-500`}
                                                                                    style={{ width: `${value}%` }}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </CardContent>
                                                    </Card>

                                                    {/* Insider Holdings - Dark Card */}
                                                    <Card className="border-slate-700/50 bg-slate-800/20">
                                                        <CardHeader className="border-b border-slate-700/50">
                                                            <div className="flex items-center gap-3">
                                                                <div className="h-10 w-10 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700/50">
                                                                    <Shield className="h-5 w-5 text-slate-400" />
                                                                </div>
                                                                <CardTitle className="text-base">Insider Holdings Analysis</CardTitle>
                                                            </div>
                                                        </CardHeader>
                                                        <CardContent className="pt-6">
                                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                                <div className="p-4 rounded-lg border border-slate-700/50 bg-slate-800/30">
                                                                    <div className="text-xs text-slate-400 mb-2">Insider Percentage</div>
                                                                    <div className="text-2xl font-bold text-slate-100 mb-2">
                                                                        {analysis.detailed_analysis.holders_analysis.insider_holdings.insider_percentage}%
                                                                    </div>
                                                                    <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                                                        <div 
                                                                            className="h-full bg-gradient-to-r from-slate-500 to-slate-400 transition-all duration-500" 
                                                                            style={{ width: `${analysis.detailed_analysis.holders_analysis.insider_holdings.insider_percentage}%` }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="p-4 rounded-lg border border-slate-700/50 bg-slate-800/30">
                                                                    <div className="text-xs text-slate-400 mb-2">Team Wallets Detected</div>
                                                                    <div className="text-2xl font-bold text-slate-100">
                                                                        {analysis.detailed_analysis.holders_analysis.insider_holdings.team_wallets_detected}
                                                                    </div>
                                                                </div>
                                                                <div className="p-4 rounded-lg border border-slate-700/50 bg-slate-800/30">
                                                                    <div className="text-xs text-slate-400 mb-2">Vesting Schedule</div>
                                                                    <div className="flex items-center gap-2 mt-3">
                                                                        {analysis.detailed_analysis.holders_analysis.insider_holdings.vesting_schedule ? (
                                                                            <>
                                                                                <div className="h-2 w-2 rounded-full bg-green-500" />
                                                                                <span className="text-sm text-slate-300">Active</span>
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <div className="h-2 w-2 rounded-full bg-red-500" />
                                                                                <span className="text-sm text-slate-300">None</span>
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </>
                                            )}
                                        </TabsContent>

                                        {/* Liquidity Analysis Tab */}
                                        <TabsContent value="liquidity" className="space-y-4">
                                            {analysis.detailed_analysis?.liquidity_analysis && (
                                                <>
                                                    <Card>
                                                        <CardHeader>
                                                            <CardTitle className="flex items-center gap-2">
                                                                <DollarSign className="h-5 w-5" />
                                                                Liquidity Overview
                                                            </CardTitle>
                                                        </CardHeader>
                                                        <CardContent>
                                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                                <div className="text-center">
                                                                    <div className="text-2xl font-bold">${analysis.detailed_analysis.liquidity_analysis.total_liquidity.toLocaleString()}</div>
                                                                    <div className="text-sm text-muted-foreground">Total Liquidity</div>
                                                                </div>
                                                                <div className="text-center">
                                                                    <div className="flex items-center justify-center mb-2">
                                                                        {analysis.detailed_analysis.liquidity_analysis.locked ? 
                                                                            <Lock className="h-5 w-5 text-green-500" /> : 
                                                                            <Unlock className="h-5 w-5 text-red-500" />
                                                                        }
                                                                    </div>
                                                                    <div className="text-sm font-medium">Status</div>
                                                                    <div className="text-xs text-muted-foreground">
                                                                        {analysis.detailed_analysis.liquidity_analysis.locked ? 'Locked' : 'Not Locked'}
                                                                    </div>
                                                                </div>
                                                                <div className="text-center">
                                                                    <div className="text-2xl font-bold">{analysis.detailed_analysis.liquidity_analysis.liquidity_health_score}</div>
                                                                    <div className="text-sm text-muted-foreground">Health Score</div>
                                                                </div>
                                                                <div className="text-center">
                                                                    <div className="text-2xl font-bold">{analysis.detailed_analysis.liquidity_analysis.lp_distribution.lp_diversity}</div>
                                                                    <div className="text-sm text-muted-foreground">LP Diversity</div>
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>

                                                    <Card>
                                                        <CardHeader>
                                                            <CardTitle>Price Impact Analysis</CardTitle>
                                                        </CardHeader>
                                                        <CardContent>
                                                            <div className="space-y-4">
                                                                <div className="flex items-center justify-between">
                                                                    <span>Low Impact (0-5%)</span>
                                                                    <div className="flex items-center gap-2">
                                                                        <Progress value={analysis.detailed_analysis.liquidity_analysis.price_impact_analysis.low_impact} className="w-32" />
                                                                        <span className="text-sm font-medium">{analysis.detailed_analysis.liquidity_analysis.price_impact_analysis.low_impact}%</span>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center justify-between">
                                                                    <span>Medium Impact (5-15%)</span>
                                                                    <div className="flex items-center gap-2">
                                                                        <Progress value={analysis.detailed_analysis.liquidity_analysis.price_impact_analysis.medium_impact} className="w-32" />
                                                                        <span className="text-sm font-medium">{analysis.detailed_analysis.liquidity_analysis.price_impact_analysis.medium_impact}%</span>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center justify-between">
                                                                    <span>High Impact (15-30%)</span>
                                                                    <div className="flex items-center gap-2">
                                                                        <Progress value={analysis.detailed_analysis.liquidity_analysis.price_impact_analysis.high_impact} className="w-32" />
                                                                        <span className="text-sm font-medium">{analysis.detailed_analysis.liquidity_analysis.price_impact_analysis.high_impact}%</span>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center justify-between">
                                                                    <span>Extreme Impact (30%+)</span>
                                                                    <div className="flex items-center gap-2">
                                                                        <Progress value={analysis.detailed_analysis.liquidity_analysis.price_impact_analysis.extreme_impact} className="w-32" />
                                                                        <span className="text-sm font-medium">{analysis.detailed_analysis.liquidity_analysis.price_impact_analysis.extreme_impact}%</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </>
                                            )}
                                        </TabsContent>

                                        {/* Contract Analysis Tab */}
                                        <TabsContent value="contract" className="space-y-4">
                                            {analysis.detailed_analysis?.contract_analysis && (
                                                <>
                                                    <Card>
                                                        <CardHeader>
                                                            <CardTitle className="flex items-center gap-2">
                                                                <Cpu className="h-5 w-5" />
                                                                Contract Overview
                                                            </CardTitle>
                                                        </CardHeader>
                                                        <CardContent>
                                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                                <div className="text-center">
                                                                    <div className="flex items-center justify-center mb-2">
                                                                        {analysis.detailed_analysis.contract_analysis.verified ? 
                                                                            <CheckCircle className="h-5 w-5 text-green-500" /> : 
                                                                            <XCircle className="h-5 w-5 text-red-500" />
                                                                        }
                                                                    </div>
                                                                    <div className="text-sm font-medium">Verified</div>
                                                                    <div className="text-xs text-muted-foreground">{analysis.detailed_analysis.contract_analysis.verified ? 'Yes' : 'No'}</div>
                                                                </div>
                                                                <div className="text-center">
                                                                    <div className="flex items-center justify-center mb-2">
                                                                        {analysis.detailed_analysis.contract_analysis.is_proxy ? 
                                                                            <AlertTriangle className="h-5 w-5 text-yellow-500" /> : 
                                                                            <CheckCircle className="h-5 w-5 text-green-500" />
                                                                        }
                                                                    </div>
                                                                    <div className="text-sm font-medium">Proxy</div>
                                                                    <div className="text-xs text-muted-foreground">{analysis.detailed_analysis.contract_analysis.is_proxy ? 'Yes' : 'No'}</div>
                                                                </div>
                                                                <div className="text-center">
                                                                    <div className="text-2xl font-bold">{analysis.detailed_analysis.contract_analysis.contract_complexity}</div>
                                                                    <div className="text-sm text-muted-foreground">Complexity</div>
                                                                </div>
                                                                <div className="text-center">
                                                                    <div className="text-2xl font-bold">{analysis.detailed_analysis.contract_analysis.function_analysis.total_functions}</div>
                                                                    <div className="text-sm text-muted-foreground">Functions</div>
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>

                                                    <Card>
                                                        <CardHeader>
                                                            <CardTitle>Security Patterns</CardTitle>
                                                        </CardHeader>
                                                        <CardContent>
                                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                                <div className="text-center">
                                                                    <div className="text-2xl font-bold">{analysis.detailed_analysis.contract_analysis.security_patterns.reentrancy_guards}</div>
                                                                    <div className="text-sm text-muted-foreground">Reentrancy Guards</div>
                                                                </div>
                                                                <div className="text-center">
                                                                    <div className="text-2xl font-bold">{analysis.detailed_analysis.contract_analysis.security_patterns.access_controls}</div>
                                                                    <div className="text-sm text-muted-foreground">Access Controls</div>
                                                                </div>
                                                                <div className="text-center">
                                                                    <div className="text-2xl font-bold">{analysis.detailed_analysis.contract_analysis.security_patterns.pausable_functions}</div>
                                                                    <div className="text-sm text-muted-foreground">Pausable Functions</div>
                                                                </div>
                                                                <div className="text-center">
                                                                    <div className="text-2xl font-bold">{analysis.detailed_analysis.contract_analysis.security_patterns.upgrade_safeguards}</div>
                                                                    <div className="text-sm text-muted-foreground">Upgrade Safeguards</div>
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </>
                                            )}
                                        </TabsContent>

                                        {/* Trading Analysis Tab */}
                                        <TabsContent value="trading" className="space-y-4">
                                            {analysis.detailed_analysis?.trading_analysis && (
                                                <>
                                                    <Card>
                                                        <CardHeader>
                                                            <CardTitle className="flex items-center gap-2">
                                                                <TrendingUp className="h-5 w-5" />
                                                                Trading Overview
                                                            </CardTitle>
                                                        </CardHeader>
                                                        <CardContent>
                                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                                <div className="text-center">
                                                                    <div className="text-2xl font-bold">${analysis.detailed_analysis.trading_analysis.volume_24h.toLocaleString()}</div>
                                                                    <div className="text-sm text-muted-foreground">Volume 24h</div>
                                                                </div>
                                                                <div className="text-center">
                                                                    <div className="text-2xl font-bold">${analysis.detailed_analysis.trading_analysis.volume_7d.toLocaleString()}</div>
                                                                    <div className="text-sm text-muted-foreground">Volume 7d</div>
                                                                </div>
                                                                <div className="text-center">
                                                                    <div className="text-2xl font-bold">{analysis.detailed_analysis.trading_analysis.trading_health_score}</div>
                                                                    <div className="text-sm text-muted-foreground">Health Score</div>
                                                                </div>
                                                                <div className="text-center">
                                                                    <div className="text-2xl font-bold">{analysis.detailed_analysis.trading_analysis.price_volatility.volatility_score}</div>
                                                                    <div className="text-sm text-muted-foreground">Volatility</div>
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>

                                                    <Card>
                                                        <CardHeader>
                                                            <CardTitle>Bot Detection</CardTitle>
                                                        </CardHeader>
                                                        <CardContent>
                                                            <div className="space-y-4">
                                                                <div className="flex items-center justify-between">
                                                                    <span>Bot Activity Score</span>
                                                                    <div className="flex items-center gap-2">
                                                                        <Progress value={analysis.detailed_analysis.trading_analysis.trading_bot_detection.bot_activity_score} className="w-32" />
                                                                        <span className="text-sm font-medium">{analysis.detailed_analysis.trading_analysis.trading_bot_detection.bot_activity_score}</span>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center justify-between">
                                                                    <span>Automated Trades</span>
                                                                    <div className="flex items-center gap-2">
                                                                        <Progress value={analysis.detailed_analysis.trading_analysis.trading_bot_detection.automated_trades_percentage} className="w-32" />
                                                                        <span className="text-sm font-medium">{analysis.detailed_analysis.trading_analysis.trading_bot_detection.automated_trades_percentage}%</span>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center justify-between">
                                                                    <span>Wash Trading</span>
                                                                    <div className="flex items-center gap-2">
                                                                        {analysis.detailed_analysis.trading_analysis.wash_trading_detection.detected ? 
                                                                            <Badge variant="destructive">Detected</Badge> : 
                                                                            <Badge variant="secondary">Not Detected</Badge>
                                                                        }
                                                                        <span className="text-sm text-muted-foreground">
                                                                            ({analysis.detailed_analysis.trading_analysis.wash_trading_detection.confidence}% confidence)
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </>
                                            )}
                                        </TabsContent>

                                        {/* Social Analysis Tab */}
                                        <TabsContent value="social" className="space-y-4">
                                            {analysis.detailed_analysis?.social_analysis && (
                                                <>
                                                    <Card>
                                                        <CardHeader>
                                                            <CardTitle className="flex items-center gap-2">
                                                                <MessageSquare className="h-5 w-5" />
                                                                Social Overview
                                                            </CardTitle>
                                                        </CardHeader>
                                                        <CardContent>
                                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                                <div className="text-center">
                                                                    <div className="text-2xl font-bold">{analysis.detailed_analysis.social_analysis.twitter_mentions.toLocaleString()}</div>
                                                                    <div className="text-sm text-muted-foreground">Twitter Mentions</div>
                                                                </div>
                                                                <div className="text-center">
                                                                    <div className="text-2xl font-bold">{analysis.detailed_analysis.social_analysis.reddit_mentions.toLocaleString()}</div>
                                                                    <div className="text-sm text-muted-foreground">Reddit Mentions</div>
                                                                </div>
                                                                <div className="text-center">
                                                                    <div className="text-2xl font-bold">{analysis.detailed_analysis.social_analysis.telegram_members.toLocaleString()}</div>
                                                                    <div className="text-sm text-muted-foreground">Telegram Members</div>
                                                                </div>
                                                                <div className="text-center">
                                                                    <div className="text-2xl font-bold">{analysis.detailed_analysis.social_analysis.sentiment_score}</div>
                                                                    <div className="text-sm text-muted-foreground">Sentiment Score</div>
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>

                                                    <Card>
                                                        <CardHeader>
                                                            <CardTitle>Community Engagement</CardTitle>
                                                        </CardHeader>
                                                        <CardContent>
                                                            <div className="space-y-4">
                                                                <div className="flex items-center justify-between">
                                                                    <span>Engagement Rate</span>
                                                                    <div className="flex items-center gap-2">
                                                                        <Progress value={analysis.detailed_analysis.social_analysis.community_engagement.engagement_rate} className="w-32" />
                                                                        <span className="text-sm font-medium">{analysis.detailed_analysis.social_analysis.community_engagement.engagement_rate}%</span>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center justify-between">
                                                                    <span>Content Quality</span>
                                                                    <div className="flex items-center gap-2">
                                                                        <Progress value={analysis.detailed_analysis.social_analysis.community_engagement.content_quality} className="w-32" />
                                                                        <span className="text-sm font-medium">{analysis.detailed_analysis.social_analysis.community_engagement.content_quality}%</span>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center justify-between">
                                                                    <span>Moderation Quality</span>
                                                                    <div className="flex items-center gap-2">
                                                                        <Progress value={analysis.detailed_analysis.social_analysis.community_engagement.moderation_quality} className="w-32" />
                                                                        <span className="text-sm font-medium">{analysis.detailed_analysis.social_analysis.community_engagement.moderation_quality}%</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </>
                                            )}
                                        </TabsContent>

                                        {/* Security Analysis Tab */}
                                        <TabsContent value="security" className="space-y-4">
                                            {analysis.detailed_analysis?.security_analysis && (
                                                <>
                                                    <Card>
                                                        <CardHeader>
                                                            <CardTitle className="flex items-center gap-2">
                                                                <Shield className="h-5 w-5" />
                                                                Security Overview
                                                            </CardTitle>
                                                        </CardHeader>
                                                        <CardContent>
                                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                                <div className="text-center">
                                                                    <div className="flex items-center justify-center mb-2">
                                                                        {analysis.detailed_analysis.security_analysis.audit_status.audited ? 
                                                                            <CheckCircle className="h-5 w-5 text-green-500" /> : 
                                                                            <XCircle className="h-5 w-5 text-red-500" />
                                                                        }
                                                                    </div>
                                                                    <div className="text-sm font-medium">Audited</div>
                                                                    <div className="text-xs text-muted-foreground">{analysis.detailed_analysis.security_analysis.audit_status.audited ? 'Yes' : 'No'}</div>
                                                                </div>
                                                                <div className="text-center">
                                                                    <div className="text-2xl font-bold">{analysis.detailed_analysis.security_analysis.security_score}</div>
                                                                    <div className="text-sm text-muted-foreground">Security Score</div>
                                                                </div>
                                                                <div className="text-center">
                                                                    <div className="text-2xl font-bold text-red-500">{analysis.detailed_analysis.security_analysis.vulnerability_scan.high_risk_count}</div>
                                                                    <div className="text-sm text-muted-foreground">High Risk Issues</div>
                                                                </div>
                                                                <div className="text-center">
                                                                    <div className="text-2xl font-bold">{analysis.detailed_analysis.security_analysis.vulnerability_scan.total_vulnerabilities}</div>
                                                                    <div className="text-sm text-muted-foreground">Total Issues</div>
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>

                                                    <Card>
                                                        <CardHeader>
                                                            <CardTitle>Vulnerability Breakdown</CardTitle>
                                                        </CardHeader>
                                                        <CardContent>
                                                            <div className="space-y-4">
                                                                <div className="flex items-center justify-between">
                                                                    <span className="text-red-500">High Risk</span>
                                                                    <div className="flex items-center gap-2">
                                                                        <Progress value={analysis.detailed_analysis.security_analysis.vulnerability_scan.high_risk_count * 33} className="w-32" />
                                                                        <span className="text-sm font-medium">{analysis.detailed_analysis.security_analysis.vulnerability_scan.high_risk_count}</span>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center justify-between">
                                                                    <span className="text-yellow-500">Medium Risk</span>
                                                                    <div className="flex items-center gap-2">
                                                                        <Progress value={analysis.detailed_analysis.security_analysis.vulnerability_scan.medium_risk_count * 10} className="w-32" />
                                                                        <span className="text-sm font-medium">{analysis.detailed_analysis.security_analysis.vulnerability_scan.medium_risk_count}</span>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center justify-between">
                                                                    <span className="text-blue-500">Low Risk</span>
                                                                    <div className="flex items-center gap-2">
                                                                        <Progress value={analysis.detailed_analysis.security_analysis.vulnerability_scan.low_risk_count * 5} className="w-32" />
                                                                        <span className="text-sm font-medium">{analysis.detailed_analysis.security_analysis.vulnerability_scan.low_risk_count}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </>
                                            )}
                                        </TabsContent>

                                        {/* Market Analysis Tab */}
                                        <TabsContent value="market" className="space-y-4">
                                            {analysis.detailed_analysis?.market_analysis && (
                                                <>
                                                    <Card>
                                                        <CardHeader>
                                                            <CardTitle className="flex items-center gap-2">
                                                                <BarChart3 className="h-5 w-5" />
                                                                Market Overview
                                                            </CardTitle>
                                                        </CardHeader>
                                                        <CardContent>
                                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                                <div className="text-center">
                                                                    <div className="text-2xl font-bold">${analysis.detailed_analysis.market_analysis.market_cap.toLocaleString()}</div>
                                                                    <div className="text-sm text-muted-foreground">Market Cap</div>
                                                                </div>
                                                                <div className="text-center">
                                                                    <div className="text-2xl font-bold">${analysis.detailed_analysis.market_analysis.fully_diluted_valuation.toLocaleString()}</div>
                                                                    <div className="text-sm text-muted-foreground">FDV</div>
                                                                </div>
                                                                <div className="text-center">
                                                                    <div className="text-2xl font-bold">{analysis.detailed_analysis.market_analysis.circulating_supply.toLocaleString()}</div>
                                                                    <div className="text-sm text-muted-foreground">Circulating Supply</div>
                                                                </div>
                                                                <div className="text-center">
                                                                    <div className="text-2xl font-bold">{analysis.detailed_analysis.market_analysis.total_supply.toLocaleString()}</div>
                                                                    <div className="text-sm text-muted-foreground">Total Supply</div>
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>

                                                    <Card>
                                                        <CardHeader>
                                                            <CardTitle>Price Analysis</CardTitle>
                                                        </CardHeader>
                                                        <CardContent>
                                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                                <div className="text-center">
                                                                    <div className="text-2xl font-bold">${analysis.detailed_analysis.market_analysis.price_analysis.current_price}</div>
                                                                    <div className="text-sm text-muted-foreground">Current Price</div>
                                                                </div>
                                                                <div className="text-center">
                                                                    <div className={`text-2xl font-bold ${analysis.detailed_analysis.market_analysis.price_analysis.price_change_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                                                        {analysis.detailed_analysis.market_analysis.price_analysis.price_change_24h >= 0 ? '+' : ''}{analysis.detailed_analysis.market_analysis.price_analysis.price_change_24h}%
                                                                    </div>
                                                                    <div className="text-sm text-muted-foreground">24h Change</div>
                                                                </div>
                                                                <div className="text-center">
                                                                    <div className={`text-2xl font-bold ${analysis.detailed_analysis.market_analysis.price_analysis.price_change_7d >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                                                        {analysis.detailed_analysis.market_analysis.price_analysis.price_change_7d >= 0 ? '+' : ''}{analysis.detailed_analysis.market_analysis.price_analysis.price_change_7d}%
                                                                    </div>
                                                                    <div className="text-sm text-muted-foreground">7d Change</div>
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>

                                                    <Card>
                                                        <CardHeader>
                                                            <CardTitle>Correlation Analysis</CardTitle>
                                                        </CardHeader>
                                                        <CardContent>
                                                            <div className="space-y-4">
                                                                <div className="flex items-center justify-between">
                                                                    <span>Bitcoin Correlation</span>
                                                                    <div className="flex items-center gap-2">
                                                                        <Progress value={Math.abs(analysis.detailed_analysis.market_analysis.correlation_analysis.bitcoin_correlation) * 100} className="w-32" />
                                                                        <span className="text-sm font-medium">{(analysis.detailed_analysis.market_analysis.correlation_analysis.bitcoin_correlation * 100).toFixed(1)}%</span>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center justify-between">
                                                                    <span>Ethereum Correlation</span>
                                                                    <div className="flex items-center gap-2">
                                                                        <Progress value={Math.abs(analysis.detailed_analysis.market_analysis.correlation_analysis.ethereum_correlation) * 100} className="w-32" />
                                                                        <span className="text-sm font-medium">{(analysis.detailed_analysis.market_analysis.correlation_analysis.ethereum_correlation * 100).toFixed(1)}%</span>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center justify-between">
                                                                    <span>Market Correlation</span>
                                                                    <div className="flex items-center gap-2">
                                                                        <Progress value={Math.abs(analysis.detailed_analysis.market_analysis.correlation_analysis.market_correlation) * 100} className="w-32" />
                                                                        <span className="text-sm font-medium">{(analysis.detailed_analysis.market_analysis.correlation_analysis.market_correlation * 100).toFixed(1)}%</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </>
                                            )}
                                        </TabsContent>
                                    </Tabs>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}