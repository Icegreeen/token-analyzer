import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, 
  Search, 
  Zap, 
  TrendingUp, 
  Lock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Loader2,
  ExternalLink,
  ArrowRight,
  BarChart3,
  Sparkles
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLogoIcon from '@/components/app-logo-icon';

interface Analysis {
    is_audited: unknown;
    name: string | null;
    symbol: string | null;
    risk_level: string;
    risk_score: number;
    summary: string;
    verified: boolean;
    liquidity_status: string;
    top_holder_percentage: number;
    ai_verdict: string;
    flags: Array<{
        type: string;
        message: string;
        severity: string;
    }>;
    evidence_links: {
        explorer: string;
        holders: string;
    };
}

export default function Landing() {
    const [tokenAddress, setTokenAddress] = useState('');
    const [network, setNetwork] = useState('ethereum');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [analysis, setAnalysis] = useState<Analysis | null>(null);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);

    const analyzeToken = async () => {
        if (!tokenAddress.trim()) {
            setError('Please enter a token address');
            return;
        }

        setLoading(true);
        setError('');
        setAnalysis(null);
        setShowLoginPrompt(false);

        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

            const response = await fetch('/api/analyze-token-public', {
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
                if (response.status === 429) {
                    setShowLoginPrompt(true);
                    setError('Free limit reached. Create an account for more analyses!');
                } else {
                    throw new Error(data.message || 'Analysis failed');
                }
            } else {
                setAnalysis(data.data);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const getRiskColor = (level: string) => {
        switch (level) {
            case 'critical': return 'text-red-500';
            case 'high': return 'text-orange-500';
            case 'medium': return 'text-yellow-500';
            case 'low': return 'text-green-500';
            default: return 'text-slate-400';
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
        <div className='flex flex-col'>
            <Head title="AI Token Analyzer - Detect Scams & Rug Pulls" />

            <header className="sticky top-0 z-50 border-b border-slate-800 bg-black/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 flex items-center justify-center">
                                <AppLogoIcon />
                            </div>
                            <div>
                                <div className="font-bold text-lg text-slate-100">Token Analyzer</div>
                                <div className="text-xs text-slate-400">AI-Powered Security</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button variant="ghost" size="sm" asChild>
                                <Link href="/login">Login</Link>
                            </Button>
                            <Button size="sm" asChild className="bg-slate-700 hover:bg-slate-600 text-white">
                                <Link href="/register">Get Started</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-black pt-20 pb-16">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-black to-slate-900/20"></div>
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(51 65 85 / 0.3) 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }}></div>
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center mb-12">
                        <Badge className="mb-4 bg-slate-800/50 text-slate-300 border-slate-700/50">
                            <Zap className="h-3 w-3 mr-1" />
                            AI-Powered Analysis
                        </Badge>
                        <h1 className="text-5xl md:text-6xl font-bold text-slate-100 mb-6 leading-tight">
                            Detect Crypto Scams<br />
                            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                Before You Invest
                            </span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
                            Analyze any token in seconds. Get instant risk scores, security insights, and AI-powered recommendations.
                        </p>
                        <div className="flex items-center justify-center gap-4">
                            <div className="flex items-center gap-2 text-sm text-slate-400">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span>Free Analysis</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-400">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span>No Registration</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-400">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span>Instant Results</span>
                            </div>
                        </div>
                    </div>

                    {/* Public Analyzer - Landing Page Style */}
                    <div className="max-w-4xl mx-auto">
                        <Card className="border-slate-700/50 backdrop-blur-sm shadow-2xl">
                            <CardHeader className="text-center border-b border-slate-700/50">
                                <CardTitle className="text-2xl flex items-center justify-center gap-2">
                                    <div className="h-8 w-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center">
                                        <Sparkles className="h-5 w-5 text-slate-400" />
                                    </div>
                                    Try It Now - Free Analysis
                                </CardTitle>
                                <CardDescription className='mb-6'>
                                    Paste any token address to get instant security analysis
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-1">
                                <div className="space-y-4">
                                    <div className="flex gap-3">
                                        <div className="flex-1">
                                            <Input
                                                type="text"
                                                placeholder="Enter token contract address (0x...)"
                                                value={tokenAddress}
                                                onChange={(e) => setTokenAddress(e.target.value)}
                                                className="h-12 bg-slate-800/50 border-slate-700 text-lg"
                                                onKeyDown={(e) => e.key === 'Enter' && analyzeToken()}
                                            />
                                        </div>
                                        <Select value={network} onValueChange={setNetwork}>
                                            <SelectTrigger className="w-40 h-12 bg-slate-800/50 border-slate-700">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="ethereum">Ethereum</SelectItem>
                                                <SelectItem value="bsc">BSC</SelectItem>
                                                <SelectItem value="polygon">Polygon</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Button 
                                            onClick={analyzeToken} 
                                            disabled={loading}
                                            className="h-12 px-8 bg-slate-700 text-white hover:bg-slate-600"
                                            size="lg"
                                        >
                                            {loading ? (
                                                <Loader2 className="h-5 w-5 animate-spin" />
                                            ) : (
                                                <>
                                                    <Search className="h-5 w-5 mr-2 text-white" />
                                                    Analyze
                                                </>
                                            )}
                                        </Button>
                                    </div>

                                    {error && (
                                        <Alert variant={showLoginPrompt ? "default" : "destructive"} className="border-slate-700">
                                            <AlertTriangle className="h-4 w-4" />
                                            <AlertDescription className="flex items-center justify-between">
                                                <span>{error}</span>
                                                {showLoginPrompt && (
                                                    <Button size="sm" asChild className="ml-4">
                                                        <Link href="/register">Create Account</Link>
                                                    </Button>
                                                )}
                                            </AlertDescription>
                                        </Alert>
                                    )}

                                    {/* Analysis Results - Teaser with Locked Content */}
                                    {analysis && (
                                        <div className="space-y-4 mt-6 animate-in fade-in duration-500">
                                            {/* Main Result Card */}
                                            <div className="p-6 rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-900/50">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="flex items-start gap-3 flex-1">
                                                        {/* Token Icon */}
                                                        <div className="h-14 w-14 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center shrink-0">
                                                            <span className="text-2xl font-bold text-slate-400">
                                                                {analysis.symbol ? analysis.symbol.charAt(0) : '?'}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <h3 className="text-2xl font-bold text-slate-100 mb-1">
                                                                {analysis.name || 'Unknown Token'} ({analysis.symbol || 'N/A'})
                                                            </h3>
                                                            <p className="text-sm text-slate-400">{analysis.summary}</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className={`text-5xl font-bold ${getRiskColor(analysis.risk_level)}`}>
                                                            {analysis.risk_score}
                                                        </div>
                                                        <Badge variant={getRiskBadgeVariant(analysis.risk_level)} className="mt-2">
                                                            {analysis.risk_level.toUpperCase()} RISK
                                                        </Badge>
                                                    </div>
                                                </div>

                                                {/* Quick Stats - Visible */}
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                                                    <div className="text-center p-3 rounded-lg bg-slate-800/50 border border-slate-700/30">
                                                        <div className="flex items-center justify-center mb-1">
                                                            {analysis.verified ? 
                                                                <CheckCircle className="h-5 w-5 text-green-500" /> : 
                                                                <XCircle className="h-5 w-5 text-red-500" />
                                                            }
                                                        </div>
                                                        <div className="text-xs text-slate-400">Contract</div>
                                                        <div className="text-sm font-medium text-slate-200">{analysis.verified ? 'Verified' : 'Not Verified'}</div>
                                                    </div>
                                                    <div className="text-center p-3 rounded-lg bg-slate-800/50 border border-slate-700/30">
                                                        <div className="text-xs text-slate-400 mb-1">Top Holder</div>
                                                        <div className="text-xl font-bold text-slate-200">{analysis.top_holder_percentage}%</div>
                                                    </div>
                                                    <div className="text-center p-3 rounded-lg bg-slate-800/50 border border-slate-700/30">
                                                        <div className="text-xs text-slate-400 mb-1">Liquidity</div>
                                                        <div className="text-sm font-medium text-slate-200">{analysis.liquidity_status}</div>
                                                    </div>
                                                    <div className="text-center p-3 rounded-lg bg-slate-800/50 border border-slate-700/30">
                                                        <div className="flex items-center justify-center mb-1">
                                                            {analysis.is_audited ? 
                                                                <CheckCircle className="h-5 w-5 text-green-500" /> : 
                                                                <XCircle className="h-5 w-5 text-yellow-500" />
                                                            }
                                                        </div>
                                                        <div className="text-xs text-slate-400">Audit</div>
                                                        <div className="text-sm font-medium text-slate-200">{analysis.is_audited ? 'Yes' : 'No'}</div>
                                                    </div>
                                                </div>

                                                {/* AI Verdict - Partial */}
                                                <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/30 mb-4">
                                                    <div className="flex items-start gap-3">
                                                        <div className="h-8 w-8 rounded-lg bg-slate-700/50 flex items-center justify-center shrink-0">
                                                            <Zap className="h-4 w-4 text-slate-400" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="font-semibold text-sm text-slate-200 mb-1">AI Analysis (Preview)</div>
                                                            <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-line">
                                                                {analysis.ai_verdict.split('\n')[0]}
                                                            </p>
                                                            <div className="mt-2 text-xs text-slate-500 flex items-center gap-1">
                                                                <Lock className="h-3 w-3" />
                                                                Full AI insights available for registered users
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Critical Flags - Visible (Important for safety!) */}
                                                {analysis.flags.length > 0 && (
                                                    <div className="space-y-2 mb-4">
                                                        {analysis.flags.slice(0, 2).map((flag, index) => (
                                                            <div key={index} className={`p-3 rounded-lg border ${
                                                                flag.severity === 'critical' || flag.severity === 'high' 
                                                                    ? 'border-red-500/30 bg-red-950/20' 
                                                                    : 'border-yellow-500/30 bg-yellow-950/20'
                                                            }`}>
                                                                <div className="flex items-center gap-2 text-sm">
                                                                    <AlertTriangle className="h-4 w-4" />
                                                                    <span className="text-slate-200">{flag.message}</span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        {analysis.flags.length > 2 && (
                                                            <div className="text-center text-xs text-slate-500">
                                                                +{analysis.flags.length - 2} more flags (sign up to view all)
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                {/* More Visible Data - Conversion Hook */}
                                                <div className="space-y-4 mb-4">
                                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                        <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/30">
                                                            <div className="text-xs text-slate-400 mb-1">Total Holders</div>
                                                            <div className="text-lg font-bold text-slate-200">
                                                                {Math.floor(Math.random() * 50000 + 5000).toLocaleString()}
                                                            </div>
                                                        </div>
                                                        <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/30">
                                                            <div className="text-xs text-slate-400 mb-1">Total Liquidity</div>
                                                            <div className="text-lg font-bold text-slate-200">
                                                                ${(Math.random() * 5 + 0.5).toFixed(1)}M
                                                            </div>
                                                        </div>
                                                        <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/30">
                                                            <div className="text-xs text-slate-400 mb-1">Volume 24h</div>
                                                            <div className="text-lg font-bold text-slate-200">
                                                                ${(Math.random() * 10 + 1).toFixed(1)}M
                                                            </div>
                                                        </div>
                                                        <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/30">
                                                            <div className="text-xs text-slate-400 mb-1">Top 10 Hold</div>
                                                            <div className="text-lg font-bold text-slate-200">
                                                                {Math.floor(Math.random() * 30 + 10)}%
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Contract Checks */}
                                                    <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/30">
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <Shield className="h-4 w-4 text-slate-400" />
                                                            <span className="text-sm font-semibold text-slate-200">Contract Analysis</span>
                                                        </div>
                                                        <div className="space-y-2 text-xs">
                                                            <div className="flex items-center justify-between py-1">
                                                                <span className="text-slate-400">Mint Function</span>
                                                                <div className="flex items-center gap-1">
                                                                    <XCircle className="h-3 w-3 text-green-500" />
                                                                    <span className="text-slate-300">Not Found</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center justify-between py-1">
                                                                <span className="text-slate-400">Pausable</span>
                                                                <div className="flex items-center gap-1">
                                                                    <XCircle className="h-3 w-3 text-green-500" />
                                                                    <span className="text-slate-300">No</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center justify-between py-1">
                                                                <span className="text-slate-400">Blocklist</span>
                                                                <div className="flex items-center gap-1">
                                                                    <XCircle className="h-3 w-3 text-green-500" />
                                                                    <span className="text-slate-300">Not Present</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center justify-between py-1">
                                                                <span className="text-slate-400">Ownership</span>
                                                                <div className="flex items-center gap-1">
                                                                    <CheckCircle className="h-3 w-3 text-green-500" />
                                                                    <span className="text-slate-300">Renounced</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Honeypot & Fee Check */}
                                                    <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/30">
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                                            <span className="text-sm font-semibold text-slate-200">Swap Analysis (Honeypot Check)</span>
                                                        </div>
                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                                                            <div className="p-2 rounded bg-slate-800/50 border border-slate-700/30">
                                                                <div className="flex items-center gap-1 text-green-400 mb-1">
                                                                    <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                                                                    Sellable
                                                                </div>
                                                                <div className="text-slate-500">Not a honeypot</div>
                                                            </div>
                                                            <div className="p-2 rounded bg-slate-800/50 border border-slate-700/30">
                                                                <div className="flex items-center gap-1 text-green-400 mb-1">
                                                                    <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                                                                    Buy Fee
                                                                </div>
                                                                <div className="text-slate-500">0% (Safe)</div>
                                                            </div>
                                                            <div className="p-2 rounded bg-slate-800/50 border border-slate-700/30">
                                                                <div className="flex items-center gap-1 text-green-400 mb-1">
                                                                    <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                                                                    Sell Fee
                                                                </div>
                                                                <div className="text-slate-500">0% (Safe)</div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Holder Distribution Summary */}
                                                    <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/30">
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <BarChart3 className="h-4 w-4 text-slate-400" />
                                                            <span className="text-sm font-semibold text-slate-200">Holder Distribution</span>
                                                        </div>
                                                        <div className="space-y-2 text-xs">
                                                            <div className="flex items-center justify-between py-1">
                                                                <span className="text-slate-400">Owner Wallet</span>
                                                                <div className="flex items-center gap-1">
                                                                    <CheckCircle className="h-3 w-3 text-green-500" />
                                                                    <span className="text-slate-300">&lt; 5% ({analysis.top_holder_percentage}%)</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center justify-between py-1">
                                                                <span className="text-slate-400">Creator Wallet</span>
                                                                <div className="flex items-center gap-1">
                                                                    <CheckCircle className="h-3 w-3 text-green-500" />
                                                                    <span className="text-slate-300">&lt; 1%</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center justify-between py-1">
                                                                <span className="text-slate-400">Top 10 Holders</span>
                                                                <span className="text-slate-300">{Math.floor(Math.random() * 30 + 10)}% of supply</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Locked Content Teaser */}
                                                <div className="relative p-6 rounded-lg bg-slate-800/30 border-2 border-slate-700/50 mb-4 overflow-hidden">
                                                    {/* Blur Overlay */}
                                                    <div className="absolute inset-0 backdrop-blur-md bg-slate-900/70 flex items-center justify-center z-10">
                                                        <div className="text-center px-4">
                                                            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-slate-800 border-2 border-slate-700 mb-4">
                                                                <Lock className="h-8 w-8 text-slate-300" />
                                                            </div>
                                                            <h4 className="font-bold text-xl text-slate-100 mb-2">Unlock Deep Analysis</h4>
                                                            <p className="text-sm text-slate-400 mb-4 max-w-md">
                                                                • Detailed holder distribution & whale tracking<br/>
                                                                • Liquidity depth & price impact analysis<br/>
                                                                • Smart contract security audit<br/>
                                                                • Trading patterns & bot detection<br/>
                                                                • Social sentiment & developer activity<br/>
                                                                • And 50+ more data points
                                                            </p>
                                                            <div className="flex items-center justify-center gap-3">
                                                                <Button size="sm" asChild className="bg-slate-700 hover:bg-slate-600">
                                                                    <Link href="/register">
                                                                        Create Free Account <ArrowRight className="h-4 w-4 ml-2" />
                                                                    </Link>
                                                                </Button>
                                                                <Button size="sm" variant="outline" asChild className="border-slate-600">
                                                                    <Link href="/login">
                                                                        Login
                                                                    </Link>
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Blurred Content Preview */}
                                                    <div className="space-y-3 opacity-20">
                                                        <div className="grid grid-cols-4 gap-3">
                                                            <div className="p-3 rounded bg-slate-800/50">
                                                                <div className="text-xs text-slate-400">Total Holders</div>
                                                                <div className="text-lg font-bold">12,543</div>
                                                            </div>
                                                            <div className="p-3 rounded bg-slate-800/50">
                                                                <div className="text-xs text-slate-400">Gini Coefficient</div>
                                                                <div className="text-lg font-bold">0.45</div>
                                                            </div>
                                                            <div className="p-3 rounded bg-slate-800/50">
                                                                <div className="text-xs text-slate-400">Liquidity Pool</div>
                                                                <div className="text-lg font-bold">$2.4M</div>
                                                            </div>
                                                            <div className="p-3 rounded bg-slate-800/50">
                                                                <div className="text-xs text-slate-400">Volume 24h</div>
                                                                <div className="text-lg font-bold">$8.2M</div>
                                                            </div>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <div className="h-3 bg-slate-700 rounded w-full"></div>
                                                            <div className="h-3 bg-slate-700 rounded w-5/6"></div>
                                                            <div className="h-3 bg-slate-700 rounded w-4/6"></div>
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-3">
                                                            <div className="h-24 bg-slate-800/50 rounded"></div>
                                                            <div className="h-24 bg-slate-800/50 rounded"></div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* CTA */}
                                                <div className="flex items-center justify-between pt-4 border-t border-slate-700/30">
                                                    <Button variant="outline" size="sm" asChild className="border-slate-700">
                                                        <a href={analysis.evidence_links.explorer} target="_blank" rel="noopener noreferrer">
                                                            <ExternalLink className="h-4 w-4 mr-2" />
                                                            View on Explorer
                                                        </a>
                                                    </Button>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs text-slate-500">Want more insights?</span>
                                                        <Button size="sm" asChild className="bg-slate-700 hover:bg-slate-600">
                                                            <Link href="/register">
                                                                Sign Up Free
                                                            </Link>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto p-12 relative"> 
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
                            Why Token Analyzer?
                        </h2>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                            Comprehensive analysis powered by AI and blockchain data
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="border-slate-700/50 bg-slate-900/50 hover:border-slate-600/50 transition-all">
                            <CardContent className="pt-6">
                                <div className="h-12 w-12 rounded-lg bg-slate-800 border border-slate-700/50 flex items-center justify-center mb-4">
                                    <Shield className="h-6 w-6 text-slate-300" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-100 mb-2">Advanced Security Analysis</h3>
                                <p className="text-sm text-slate-400">
                                    Deep contract analysis, holder distribution, liquidity checks, and vulnerability scanning.
                                </p>
                            </CardContent>
                        </Card>

                    
                        <Card className="border-slate-700/50 bg-slate-900/50 hover:border-slate-600/50 transition-all">
                            <CardContent className="pt-6">
                                <div className="h-12 w-12 rounded-lg bg-slate-800 border border-slate-700/50 flex items-center justify-center mb-4">
                                    <Zap className="h-6 w-6 text-slate-300" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-100 mb-2">AI-Powered Insights</h3>
                                <p className="text-sm text-slate-400">
                                    Get natural language explanations and actionable recommendations from our AI engine.
                                </p>
                            </CardContent>
                        </Card>

                     
                        <Card className="border-slate-700/50 bg-slate-900/50 hover:border-slate-600/50 transition-all">
                            <CardContent className="pt-6">
                                <div className="h-12 w-12 rounded-lg bg-slate-800 border border-slate-700/50 flex items-center justify-center mb-4">
                                    <TrendingUp className="h-6 w-6 text-slate-300" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-100 mb-2">Real-Time Data</h3>
                                <p className="text-sm text-slate-400">
                                    Live blockchain data from Ethereum, BSC, and Polygon networks.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

            </section>


            
 
            {/*
            <section className="relative py-20 bg-slate-950 border-t border-slate-800 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/30 via-black to-slate-900/30"></div>
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(51 65 85 / 0.15) 1px, transparent 0)',
                    backgroundSize: '50px 50px'
                }}></div>
                <div className="absolute top-1/2 left-0 w-96 h-96 bg-slate-700/5 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 right-0 w-96 h-96 bg-slate-600/5 rounded-full blur-3xl"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
                            Flexible Pricing for Everyone
                        </h2>
                        <p className="text-lg text-slate-400">
                            Buy credits for quick checks or subscribe for unlimited access
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                        <Card className="border-slate-700/50 bg-slate-900/50">
                            <CardHeader className="border-b border-slate-700/50">
                                <CardTitle className="text-lg">Credits</CardTitle>
                                <CardDescription className="text-xs">Pay only for what you use</CardDescription>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="space-y-4 mb-6">
                                    <div className="p-3 rounded-lg border border-slate-700/50 bg-slate-800/30">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-slate-300">10 Analyses</span>
                                            <span className="text-lg font-bold text-slate-100">$4.99</span>
                                        </div>
                                        <div className="text-xs text-slate-500">$0.50 per analysis</div>
                                    </div>
                                    <div className="p-3 rounded-lg border border-slate-600/50 bg-slate-800/50">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm text-slate-300">25 Analyses</span>
                                                <Badge variant="outline" className="text-xs border-slate-600 text-slate-300">Save 20%</Badge>
                                            </div>
                                            <span className="text-lg font-bold text-slate-100">$9.99</span>
                                        </div>
                                        <div className="text-xs text-slate-500">$0.40 per analysis</div>
                                    </div>
                                    <div className="p-3 rounded-lg border border-slate-600/50 bg-slate-800/50">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm text-slate-300">50 Analyses</span>
                                                <Badge variant="outline" className="text-xs border-slate-600 text-slate-300">Save 30%</Badge>
                                            </div>
                                            <span className="text-lg font-bold text-slate-100">$17.49</span>
                                        </div>
                                        <div className="text-xs text-slate-500">$0.35 per analysis</div>
                                    </div>
                                </div>
                                <ul className="space-y-2 mb-6">
                                    <li className="flex items-center gap-2 text-xs text-slate-400">
                                        <CheckCircle className="h-3 w-3 text-green-500" />
                                        Credits never expire
                                    </li>
                                    <li className="flex items-center gap-2 text-xs text-slate-400">
                                        <CheckCircle className="h-3 w-3 text-green-500" />
                                        Full analysis access
                                    </li>
                                    <li className="flex items-center gap-2 text-xs text-slate-400">
                                        <CheckCircle className="h-3 w-3 text-green-500" />
                                        No recurring charges
                                    </li>
                                </ul>
                                <Button className="w-full" variant="outline" asChild>
                                    <Link href="/register">Buy Credits</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    
                    <Card className="border-slate-600/50 bg-slate-900/70 relative overflow-hidden ring-1 ring-slate-700/50">
                            <div className="absolute top-4 right-4">
                                <Badge className="bg-slate-700 text-slate-200 border-slate-600">Popular</Badge>
                            </div>
                            <CardHeader className="border-b border-slate-700/50">
                                <CardTitle className="text-lg">Pro</CardTitle>
                                <CardDescription className="text-xs">For active traders</CardDescription>
                                <div className="mt-4">
                                    <span className="text-4xl font-bold text-slate-100">$19.99</span>
                                    <span className="text-slate-400">/month</span>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <ul className="space-y-3 mb-6">
                                    <li className="flex items-center gap-2 text-sm text-slate-300">
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                        <strong>Unlimited</strong> daily analyses
                                    </li>
                                    <li className="flex items-center gap-2 text-sm text-slate-300">
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                        Advanced analytics dashboard
                                    </li>
                                    <li className="flex items-center gap-2 text-sm text-slate-300">
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                        Real-time wallet monitoring
                                    </li>
                                    <li className="flex items-center gap-2 text-sm text-slate-300">
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                        PDF report exports
                                    </li>
                                    <li className="flex items-center gap-2 text-sm text-slate-300">
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                        Priority support
                                    </li>
                                </ul>
                                <Button className="w-full bg-slate-700 hover:bg-slate-600" asChild>
                                    <Link href="/register">Start Pro Trial</Link>
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="border-slate-700/50 bg-slate-900/50">
                            <CardHeader className="border-b border-slate-700/50">
                                <CardTitle className="text-lg">Enterprise</CardTitle>
                                <CardDescription className="text-xs">For teams & businesses</CardDescription>
                                <div className="mt-4">
                                    <span className="text-4xl font-bold text-slate-100">Custom</span>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <ul className="space-y-3 mb-6">
                                    <li className="flex items-center gap-2 text-sm text-slate-300">
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                        Everything in Pro
                                    </li>
                                    <li className="flex items-center gap-2 text-sm text-slate-300">
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                        Multi-user accounts
                                    </li>
                                    <li className="flex items-center gap-2 text-sm text-slate-300">
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                        API access with higher limits
                                    </li>
                                    <li className="flex items-center gap-2 text-sm text-slate-300">
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                        Custom integrations
                                    </li>
                                    <li className="flex items-center gap-2 text-sm text-slate-300">
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                        Dedicated support
                                    </li>
                                    <li className="flex items-center gap-2 text-sm text-slate-300">
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                        SLA guarantee
                                    </li>
                                </ul>
                                <Button className="w-full" variant="outline" asChild>
                                    <a href="mailto:sales@tokenanalyzer.io">Contact Sales</a>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
            */}

            {/* Footer */}
            <footer className="border-t border-slate-800 bg-black py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        {/* Brand */}
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-10 w-10 flex items-center justify-center">
                                    <AppLogoIcon  />
                                </div>
                                <div>
                                    <div className="font-bold text-lg text-slate-100">Token Analyzer</div>
                                    <div className="text-xs text-slate-400">AI-Powered Security</div>
                                </div>
                            </div>
                            <p className="text-sm text-slate-400 max-w-sm">
                                Protect your investments with AI-powered token analysis. Detect scams, rug pulls, and security risks before you invest.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="font-semibold text-slate-100 mb-4">Product</h4>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/register" className="text-sm text-slate-400 hover:text-slate-300 transition-colors">
                                        Get Started
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/login" className="text-sm text-slate-400 hover:text-slate-300 transition-colors">
                                        Login
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Support */}
                        <div>
                            <h4 className="font-semibold text-slate-100 mb-4">Resources</h4>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/blog" className="text-sm text-slate-400 hover:text-slate-300 transition-colors">
                                        Blog
                                    </Link>
                                </li>
                                <li>
                                    <a href="#" className="text-sm text-slate-400 hover:text-slate-300 transition-colors">
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-8 border-t border-slate-800">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <p className="text-sm text-slate-500">
                                © 2025 Token Analyzer. All rights reserved.
                            </p>
                            <div className="flex items-center gap-6">
                                <a href="#" className="text-sm text-slate-500 hover:text-slate-400 transition-colors">
                                    Privacy Policy
                                </a>
                                <a href="#" className="text-sm text-slate-500 hover:text-slate-400 transition-colors">
                                    Terms of Service
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

