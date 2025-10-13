import { Head, Link } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';
import AppLogoIcon from '@/components/app-logo-icon';

interface BlogPost {
    title: string;
    slug: string;
    excerpt: string;
    date: string;
    author: string;
}

interface Props {
    posts?: BlogPost[];
}

export default function Blog({ posts }: Props) {
    console.log('Blog posts received:', posts);
    
    return (
        <div className="min-h-screen bg-black flex flex-col">
            <Head title="Blog - Token Analyzer" />
            
            {/* Header */}
            <header className="sticky top-0 z-50 border-b border-slate-800 bg-black/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="h-10 w-10 flex items-center justify-center">
                                <AppLogoIcon />
                            </div>
                            <div>
                                <div className="font-bold text-lg text-slate-100">Token Analyzer</div>
                                <div className="text-xs text-slate-400">AI-Powered Security</div>
                            </div>
                        </Link>

                        <div className="flex items-center gap-3">
                            <Button variant="ghost" size="sm" asChild>
                                <Link href="/login">Login</Link>
                            </Button>
                            <Button size="sm" asChild className="bg-slate-700 text-white hover:bg-slate-600">
                                <Link href="/register">Get Started</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex-1 py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="space-y-8">
                        {/* Header */}
                        <div className="text-center mb-12">
                            <h1 className="text-4xl font-bold text-slate-100 mb-4">Blog</h1>
                            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                                Learn about crypto security, token analysis, and blockchain technology
                            </p>
                        </div>

                        {/* Blog Posts */}
                        <div className="grid grid-cols-1 gap-6">
                            {posts && posts.length > 0 ? posts.map((post) => (
                                <Card key={post.slug} className="border-slate-700/50 bg-slate-900/30 hover:bg-slate-900/50 transition-all overflow-hidden">
                                    <CardContent className="p-0">
                                        <div className="flex flex-col md:flex-row">
                                            {/* Image */}
                                            <div className="md:w-1/3 h-64 md:h-auto relative overflow-hidden">
                                                <img 
                                                    src="/assets/token.png" 
                                                    alt={post.title}
                                                    className="absolute inset-0 w-full h-full object-cover"
                                                />
                                            </div>
                                            
                                            {/* Content */}
                                            <div className="flex-1 p-6">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <Badge variant="outline" className="text-xs">
                                                        <Calendar className="h-3 w-3 mr-1" />
                                                        {new Date(post.date).toLocaleDateString('en-US', { 
                                                            month: 'short', 
                                                            day: 'numeric', 
                                                            year: 'numeric' 
                                                        })}
                                                    </Badge>
                                                    <span className="text-xs text-slate-500">by {post.author}</span>
                                                </div>

                                                <h2 className="text-2xl font-bold text-slate-100 mb-3 hover:text-slate-300 transition-colors">
                                                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                                                </h2>

                                                <p className="text-slate-400 mb-4 leading-relaxed">
                                                    {post.excerpt}
                                                </p>

                                                <Button variant="ghost" size="sm" asChild className="text-slate-400 hover:text-slate-300">
                                                    <Link href={`/blog/${post.slug}`}>
                                                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )) : (
                                <div className="text-center py-12">
                                    <p className="text-slate-400">No blog posts yet</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-slate-800 bg-black py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        {/* Brand */}
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-10 w-10 flex items-center justify-center">
                                    <AppLogoIcon />
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
                            <ul className="space-y-2 ">
                                <li>
                                    <Link href="/register" className="text-sm text-white hover:text-slate-300 transition-colors">
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

                        {/* Resources */}
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

