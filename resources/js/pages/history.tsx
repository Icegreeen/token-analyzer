import { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Search,
  Clock,
  ExternalLink,
  Calendar,
  Activity
} from 'lucide-react';

interface Analysis {
    id: number;
    token_address: string;
    name: string | null;
    symbol: string | null;
    risk_level: string;
    risk_score: number;
    network: string;
    verified: boolean;
    liquidity_status: string;
    top_holder_percentage: number;
    created_at: string;
}

export default function History() {
    const [analyses, setAnalyses] = useState<Analysis[]>([]);
    const [filteredAnalyses, setFilteredAnalyses] = useState<Analysis[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [riskFilter, setRiskFilter] = useState('all');
    const [networkFilter, setNetworkFilter] = useState('all');

    useEffect(() => {
        const fetchAnalyses = async () => {
            try {
                const response = await fetch('/api/analyses/history');
                const data = await response.json();
                if (data.success) {
                    setAnalyses(data.data);
                    setFilteredAnalyses(data.data);
                }
            } catch (error) {
                console.error('Error fetching analyses:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalyses();
    }, []);

    useEffect(() => {
        let filtered = analyses;

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(a => 
                a.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                a.symbol?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                a.token_address.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Risk filter
        if (riskFilter !== 'all') {
            filtered = filtered.filter(a => a.risk_level === riskFilter);
        }

        // Network filter
        if (networkFilter !== 'all') {
            filtered = filtered.filter(a => a.network === networkFilter);
        }

        setFilteredAnalyses(filtered);
    }, [searchTerm, riskFilter, networkFilter, analyses]);

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

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    return (
        <AppLayout>
            <Head title="Analysis History" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="space-y-6">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-slate-100">Analysis History</h1>
                                <p className="text-slate-400 mt-1">View all your token safety analyses</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-sm">
                                    {filteredAnalyses.length} {filteredAnalyses.length === 1 ? 'Analysis' : 'Analyses'}
                                </Badge>
                            </div>
                        </div>

                        {/* Filters */}
                        <Card className="border-slate-700/50">
                            <CardContent className="pt-6">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div className="md:col-span-2">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                            <Input
                                                placeholder="Search by name, symbol, or address..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="pl-10 bg-slate-800/50 border-slate-700"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Select value={riskFilter} onValueChange={setRiskFilter}>
                                            <SelectTrigger className="bg-slate-800/50 border-slate-700">
                                                <SelectValue placeholder="Risk Level" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Risk Levels</SelectItem>
                                                <SelectItem value="low">Low Risk</SelectItem>
                                                <SelectItem value="medium">Medium Risk</SelectItem>
                                                <SelectItem value="high">High Risk</SelectItem>
                                                <SelectItem value="critical">Critical Risk</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Select value={networkFilter} onValueChange={setNetworkFilter}>
                                            <SelectTrigger className="bg-slate-800/50 border-slate-700">
                                                <SelectValue placeholder="Network" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Networks</SelectItem>
                                                <SelectItem value="ethereum">Ethereum</SelectItem>
                                                <SelectItem value="bsc">BSC</SelectItem>
                                                <SelectItem value="polygon">Polygon</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Results */}
                        <Card className="border-slate-700/50">
                            <CardHeader className="border-b border-slate-700/50">
                                <div className="flex items-center gap-3 mb-6" >
                                    <div className="h-10 w-10 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700/50">
                                        <Clock className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-base">All Analyses</CardTitle>
                                        <CardDescription className="text-xs">
                                            {filteredAnalyses.length} result{filteredAnalyses.length !== 1 ? 's' : ''} found
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6">
                                {loading ? (
                                    <div className="text-center py-12 text-slate-400">
                                        <Activity className="h-8 w-8 mx-auto mb-2 animate-spin" />
                                        <p className="text-sm">Loading analyses...</p>
                                    </div>
                                ) : filteredAnalyses.length === 0 ? (
                                    <div className="text-center py-12">
                                        <Search className="h-12 w-12 mx-auto mb-3 text-slate-600" />
                                        <p className="text-slate-400 mb-2">
                                            {searchTerm || riskFilter !== 'all' || networkFilter !== 'all' 
                                                ? 'No analyses match your filters' 
                                                : 'No analyses yet'}
                                        </p>
                                        <p className="text-sm text-slate-500 mb-4">
                                            {searchTerm || riskFilter !== 'all' || networkFilter !== 'all'
                                                ? 'Try adjusting your filters'
                                                : 'Start by analyzing your first token'}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {filteredAnalyses.map((analysis) => (
                                            <div 
                                                key={analysis.id}
                                                className="group relative p-4 rounded-lg border border-slate-700/50 bg-slate-800/20 hover:bg-slate-800/40 transition-all"
                                            >
                                                <div className="flex items-start gap-4">
                                                    {/* Risk Icon */}
                                                    <div className={`h-12 w-12 rounded-lg flex items-center justify-center shrink-0 ${
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

                                                    {/* Token Info */}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-start justify-between mb-2">
                                                            <div>
                                                                <div className="flex items-center gap-2 mb-1">
                                                                    <h3 className="font-semibold text-slate-100">
                                                                        {analysis.name || 'Unknown Token'} ({analysis.symbol || 'N/A'})
                                                                    </h3>
                                                                    <Badge variant={getRiskBadgeVariant(analysis.risk_level)} className="text-xs">
                                                                        {analysis.risk_level.toUpperCase()}
                                                                    </Badge>
                                                                </div>
                                                                <div className="flex items-center gap-3 text-xs text-slate-400">
                                                                    <span className="font-mono bg-slate-800 px-2 py-0.5 rounded">
                                                                        {analysis.token_address.slice(0, 10)}...{analysis.token_address.slice(-8)}
                                                                    </span>
                                                                    <span>•</span>
                                                                    <span className="capitalize flex items-center gap-1">
                                                                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                                                                        {analysis.network}
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            {/* Risk Score */}
                                                            <div className="text-right">
                                                                <div className={`text-3xl font-bold ${getRiskColor(analysis.risk_level)}`}>
                                                                    {analysis.risk_score}
                                                                </div>
                                                                <div className="text-xs text-slate-500">Risk Score</div>
                                                            </div>
                                                        </div>

                                                        {/* Additional Info */}
                                                        <div className="grid grid-cols-3 gap-4 pt-3 mt-3 border-t border-slate-700/50">
                                                            <div>
                                                                <div className="text-xs text-slate-400 mb-1">Verified</div>
                                                                <div className="flex items-center gap-1">
                                                                    {analysis.verified ? (
                                                                        <>
                                                                            <CheckCircle className="h-3 w-3 text-green-500" />
                                                                            <span className="text-xs text-slate-300">Yes</span>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <XCircle className="h-3 w-3 text-red-500" />
                                                                            <span className="text-xs text-slate-300">No</span>
                                                                        </>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <div>
                                                                <div className="text-xs text-slate-400 mb-1">Top Holder</div>
                                                                <div className="text-xs text-slate-300">{analysis.top_holder_percentage}%</div>
                                                            </div>

                                                            <div>
                                                                <div className="text-xs text-slate-400 mb-1">Liquidity</div>
                                                                <div className="text-xs text-slate-300">{analysis.liquidity_status}</div>
                                                            </div>
                                                        </div>

                                                        {/* Footer */}
                                                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-700/50">
                                                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                                                <Calendar className="h-3 w-3" />
                                                                {formatDate(analysis.created_at)}
                                                            </div>

                                                            <Button 
                                                                variant="ghost" 
                                                                size="sm"
                                                                className="opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                                                                asChild
                                                            >
                                                                <a 
                                                                    href={`https://${analysis.network === 'bsc' ? 'bscscan' : analysis.network === 'polygon' ? 'polygonscan' : 'etherscan'}.io/address/${analysis.token_address}`} 
                                                                    target="_blank" 
                                                                    rel="noopener noreferrer"
                                                                >
                                                                    View on Explorer <ExternalLink className="ml-1 h-3 w-3" />
                                                                </a>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}




