import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  AlertTriangle, 
  CheckCircle, 
  Activity, 
  Search,
  Clock,
  ArrowRight,
  TrendingUp,
  Shield,
  BarChart3,
  XCircle,
  ExternalLink
} from 'lucide-react';
import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

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

interface Analysis {
    id: number;
    token_address: string;
    name: string | null;
    symbol: string | null;
    risk_level: string;
    risk_score: number;
    network: string;
    created_at: string;
}

export default function DashboardEnhanced({ auth, limits }: Props) {
    const [recentAnalyses, setRecentAnalyses] = useState<Analysis[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch recent analyses
    useEffect(() => {
        const fetchRecentAnalyses = async () => {
            try {
                const response = await fetch('/api/analyses/history?limit=5');
                const data = await response.json();
                if (data.success) {
                    setRecentAnalyses(data.data);
                }
            } catch (error) {
                console.error('Error fetching analyses:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecentAnalyses();
    }, []);

    // Add safety checks for auth and limits
    const safeAuth = auth || {
        user: {
            name: 'User',
            email: 'user@example.com'
        }
    };
    const safeLimits = limits || {
        analyses_today: 0,
        analyses_limit: 3,
        analyses_remaining: 3,
        can_analyze: true
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

    const formatTimeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInMs = now.getTime() - date.getTime();
        const diffInMins = Math.floor(diffInMs / 60000);
        const diffInHours = Math.floor(diffInMins / 60);
        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInMins < 60) return `${diffInMins}m ago`;
        if (diffInHours < 24) return `${diffInHours}h ago`;
        return `${diffInDays}d ago`;
    };

    const highRiskCount = recentAnalyses.filter(a => a.risk_level === 'high' || a.risk_level === 'critical').length;
    const averageRisk = recentAnalyses.length > 0 
        ? Math.round(recentAnalyses.reduce((sum, a) => sum + a.risk_score, 0) / recentAnalyses.length)
        : 0;

    return (
        <AppLayout>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="space-y-6">
                        {/* Welcome Header */}
                        <div>
                            <h1 className="text-3xl font-bold text-slate-100">Welcome back, {safeAuth.user.name}!</h1>
                            <p className="text-slate-400 mt-1">Track your token analyses and manage your account</p>
                        </div>

                        {/* Quick Stats & Actions */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Daily Usage */}
                            <Card className="border-slate-700/50 bg-slate-800/30">
                                <CardContent className="pt-3">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                            <Activity className="h-5 w-5 text-blue-400" />
                                        </div>
                                        <Badge variant="outline" className="text-xs">
                                            {safeLimits.analyses_remaining} Left
                                        </Badge>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs text-slate-400 uppercase tracking-wider">Daily Analyses</p>
                                        <p className="text-2xl font-bold text-slate-100">
                                            {safeLimits.analyses_today} / {safeLimits.analyses_limit}
                                        </p>
                                    </div>
                                    <Progress 
                                        value={(safeLimits.analyses_today / safeLimits.analyses_limit) * 100} 
                                        className="mt-3 h-1.5" 
                                    />
                                </CardContent>
                            </Card>

                            {/* Total Analyses */}
                            <Card className="border-slate-700/50 bg-slate-800/30">
                                <CardContent className="pt-3">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                            <BarChart3 className="h-5 w-5 text-purple-400" />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs text-slate-400 uppercase tracking-wider">Total Analyzed</p>
                                        <p className="text-2xl font-bold text-slate-100">{recentAnalyses.length}</p>
                                        <p className="text-xs text-slate-500">Last 30 days</p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* High Risk Alerts */}
                            <Card className="border-slate-700/50 bg-slate-800/30">
                                <CardContent className="pt-6">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="h-10 w-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                                            <AlertTriangle className="h-5 w-5 text-red-400" />
                                        </div>
                                        {highRiskCount > 0 && (
                                            <Badge variant="destructive" className="text-xs">
                                                {highRiskCount} alerts
                                            </Badge>
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs text-slate-400 uppercase tracking-wider">High Risk Tokens</p>
                                        <p className="text-2xl font-bold text-slate-100">{highRiskCount}</p>
                                        <p className="text-xs text-slate-500">Requires attention</p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Average Risk Score */}
                            <Card className="border-slate-700/50 bg-slate-800/30">
                                <CardContent className="pt-6">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                                            <Shield className="h-5 w-5 text-green-400" />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs text-slate-400 uppercase tracking-wider">Avg. Risk Score</p>
                                        <p className="text-2xl font-bold text-slate-100">{averageRisk}</p>
                                        <p className="text-xs text-slate-500">Lower is better</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                       

                        {/* Recent Analyses */}
                        <Card className="border-slate-700/50">
                            <CardHeader className="border-b border-slate-700/50">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="h-10 w-10 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700/50">
                                            <Clock className="h-5 w-5 text-slate-400" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-base">Recent Analyses</CardTitle>
                                            <CardDescription className="text-xs">Your latest token safety checks</CardDescription>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link href="/history" className="text-xs">
                                            View All <ArrowRight className="ml-1 h-3 w-3" />
                                        </Link>
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6">
                                {loading ? (
                                    <div className="text-center py-8 text-slate-400">
                                        <Activity className="h-8 w-8 mx-auto mb-2 animate-spin" />
                                        <p className="text-sm">Loading analyses...</p>
                                    </div>
                                ) : recentAnalyses.length === 0 ? (
                                    <div className="text-center py-12">
                                        <Search className="h-12 w-12 mx-auto mb-3 text-slate-600" />
                                        <p className="text-slate-400 mb-2">No analyses yet</p>
                                        <p className="text-sm text-slate-500 mb-4">Start by analyzing your first token</p>
                                        <Button asChild size="sm">
                                            <Link href="/analyzer">
                                                Analyze Token <ArrowRight className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="space-y-3 -mt-6">
                                        {recentAnalyses.map((analysis) => (
                                            <div 
                                                key={analysis.id}
                                                className="flex items-center justify-between p-4 rounded-lg border border-slate-700/50 bg-slate-800/20 hover:bg-slate-800/40 transition-colors group"
                                            >
                                                <div className="flex items-center gap-4 flex-1">
                                                    <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                                                        analysis.risk_level === 'critical' || analysis.risk_level === 'high' 
                                                            ? 'bg-red-500/10' 
                                                            : analysis.risk_level === 'medium'
                                                            ? 'bg-yellow-500/10'
                                                            : 'bg-green-500/10'
                                                    }`}>
                                                        {analysis.risk_level === 'critical' || analysis.risk_level === 'high' ? (
                                                            <XCircle className="h-6 w-6 text-red-400" />
                                                        ) : analysis.risk_level === 'medium' ? (
                                                            <AlertTriangle className="h-6 w-6 text-yellow-400" />
                                                        ) : (
                                                            <CheckCircle className="h-6 w-6 text-green-400" />
                                                        )}
                                                    </div>

                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <p className="font-semibold text-sm text-slate-100">
                                                                {analysis.name || 'Unknown Token'} ({analysis.symbol || 'N/A'})
                                                            </p>
                                                            <Badge variant={getRiskBadgeVariant(analysis.risk_level)} className="text-xs">
                                                                {analysis.risk_level.toUpperCase()}
                                                            </Badge>
                                                        </div>
                                                        <div className="flex items-center gap-3 text-xs text-slate-400">
                                                            <span className="font-mono">{analysis.token_address.slice(0, 8)}...{analysis.token_address.slice(-6)}</span>
                                                            <span>•</span>
                                                            <span className="capitalize">{analysis.network}</span>
                                                            <span>•</span>
                                                            <span>{formatTimeAgo(analysis.created_at)}</span>
                                                        </div>
                                                    </div>

                                                    <div className="text-right">
                                                        <div className={`text-2xl font-bold ${getRiskColor(analysis.risk_level)}`}>
                                                            {analysis.risk_score}
                                                        </div>
                                                        <div className="text-xs text-slate-500">Risk Score</div>
                                                    </div>
                                                </div>

                                                <Button 
                                                    variant="ghost" 
                                                    size="sm"
                                                    className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    asChild
                                                >
                                                    <a href={`https://etherscan.io/address/${analysis.token_address}`} target="_blank" rel="noopener noreferrer">
                                                        <ExternalLink className="h-4 w-4" />
                                                    </a>
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                         {/* Quick Actions */}
                         <Card className="border-slate-700/50">
                            <CardHeader className="border-b border-slate-700/50">
                                <CardTitle className="text-base flex items-center gap-2 mb-6">
                                    <div className="h-8 w-8 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700/50">
                                        <TrendingUp className="h-4 w-4 text-slate-400" />
                                    </div>
                                    Quick Actions
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <Button 
                                        asChild
                                        className="justify-start h-auto py-4 hover:bg-slate-900 border border-slate-700/50"
                                        variant="outline"
                                    >
                                        <Link href="/analyzer">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                                    <Search className="h-5 w-5 text-blue-400" />
                                                </div>
                                                <div className="text-left">
                                                    <div className="font-semibold text-sm">Analyze New Token</div>
                                                    <div className="text-xs text-slate-400">Check token safety</div>
                                                </div>
                                            </div>
                                        </Link>
                                    </Button>

                                    <Button 
                                        asChild
                                        className="justify-start h-auto py-4 hover:bg-slate-900 border border-slate-700/50"
                                        variant="outline"
                                    >
                                        <Link href="/history">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                                    <Clock className="h-5 w-5 text-purple-400" />
                                                </div>
                                                <div className="text-left">
                                                    <div className="font-semibold text-sm">View History</div>
                                                    <div className="text-xs text-slate-400">Past analyses</div>
                                                </div>
                                            </div>
                                        </Link>
                                    </Button>

                                    <Button 
                                        asChild
                                        className="justify-start h-auto py-4 hover:bg-slate-900 border border-slate-700/50"
                                        variant="outline"
                                    >
                                        <Link href="/settings">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                                                    <Shield className="h-5 w-5 text-green-400" />
                                                </div>
                                                <div className="text-left">
                                                    <div className="font-semibold text-sm">Upgrade Plan</div>
                                                    <div className="text-xs text-slate-400">Get more features</div>
                                                </div>
                                            </div>
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Upgrade CTA - Only for free users */}
                        {safeLimits.analyses_limit <= 3 && (
                            <Card className="border-amber-900/30 bg-gradient-to-br from-amber-950/20 to-amber-900/10">
                                <CardContent className="pt-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Shield className="h-5 w-5 text-amber-500" />
                                                <h3 className="font-semibold text-lg text-slate-100">Unlock More Analyses</h3>
                                            </div>
                                            <p className="text-sm text-slate-400 mb-4">
                                                Upgrade to Pro for unlimited daily analyses, real-time alerts, PDF reports, and advanced analytics.
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                                                    Upgrade to Pro
                                                </Button>
                                                <Button size="sm" variant="ghost">
                                                    Learn More
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="text-right ml-6">
                                            <div className="text-3xl font-bold text-amber-500">$9.99</div>
                                            <div className="text-xs text-slate-400">per month</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
