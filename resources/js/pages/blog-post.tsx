import { Head, Link } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import AppLogoIcon from '@/components/app-logo-icon';

interface Props {
    post: {
        title: string;
        slug: string;
        excerpt: string;
        date: string;
        author: string;
        content: string;
    };
}

export default function BlogPost({ post }: Props) {
    return (
        <div className="min-h-screen bg-black flex flex-col">
            <Head title={`${post.title} - Token Analyzer Blog`} />
            
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
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    {/* Back Button */}
                    <Button variant="ghost" size="sm" asChild className="mb-8">
                        <Link href="/blog">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Blog
                        </Link>
                    </Button>

                    {/* Featured Image */}
                    <div className="mb-8 rounded-xl overflow-hidden">
                        <img 
                            src="/assets/token.png" 
                            alt={post.title}
                            className="w-full h-80 object-cover"
                        />
                    </div>

                    {/* Article Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Badge variant="outline" className="text-xs">
                                <Calendar className="h-3 w-3 mr-1" />
                                {new Date(post.date).toLocaleDateString('en-US', { 
                                    month: 'long', 
                                    day: 'numeric', 
                                    year: 'numeric' 
                                })}
                            </Badge>
                            <span className="text-sm text-slate-500">by {post.author}</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4 leading-tight">
                            {post.title}
                        </h1>

                        <p className="text-xl text-slate-400 leading-relaxed">
                            {post.excerpt}
                        </p>
                    </div>

                    {/* Article Content */}
                    <div className="prose prose-slate prose-invert max-w-none">
                        <ReactMarkdown 
                            remarkPlugins={[remarkGfm]}
                            components={{
                                h1: ({node, ...props}) => <h1 className="text-3xl font-bold text-slate-100 mt-8 mb-4" {...props} />,
                                h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-slate-100 mt-8 mb-4 border-b border-slate-800 pb-2" {...props} />,
                                h3: ({node, ...props}) => <h3 className="text-xl font-bold text-slate-200 mt-6 mb-3" {...props} />,
                                p: ({node, ...props}) => <p className="text-slate-400 leading-relaxed mb-4" {...props} />,
                                a: ({node, ...props}) => <a className="text-blue-400 hover:text-blue-300 underline" {...props} />,
                                ul: ({node, ...props}) => <ul className="list-disc list-inside text-slate-400 space-y-2 mb-4" {...props} />,
                                ol: ({node, ...props}) => <ol className="list-decimal list-inside text-slate-400 space-y-2 mb-4" {...props} />,
                                li: ({node, ...props}) => <li className="text-slate-400" {...props} />,
                                code: ({node, inline, ...props}: any) => 
                                    inline ? 
                                        <code className="bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded text-sm" {...props} /> :
                                        <code className="block bg-slate-900 text-slate-300 p-4 rounded-lg overflow-x-auto text-sm" {...props} />,
                                pre: ({node, ...props}) => <pre className="bg-slate-900 rounded-lg p-4 overflow-x-auto mb-4" {...props} />,
                                blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-slate-700 pl-4 italic text-slate-400 my-4" {...props} />,
                                table: ({node, ...props}) => <table className="w-full border-collapse border border-slate-700 mb-4" {...props} />,
                                thead: ({node, ...props}) => <thead className="bg-slate-800" {...props} />,
                                tbody: ({node, ...props}) => <tbody {...props} />,
                                tr: ({node, ...props}) => <tr className="border-b border-slate-700" {...props} />,
                                th: ({node, ...props}) => <th className="border border-slate-700 px-4 py-2 text-left text-slate-200 font-semibold" {...props} />,
                                td: ({node, ...props}) => <td className="border border-slate-700 px-4 py-2 text-slate-400" {...props} />,
                                hr: ({node, ...props}) => <hr className="border-slate-800 my-8" {...props} />,
                                strong: ({node, ...props}) => <strong className="text-slate-200 font-bold" {...props} />,
                                em: ({node, ...props}) => <em className="text-slate-300 italic" {...props} />,
                            }}
                        >
                            {post.content}
                        </ReactMarkdown>
                    </div>

                    {/* Footer CTA */}
                    <div className="mt-12 p-6 rounded-lg bg-slate-800/30 border border-slate-700/50 text-center">
                        <h3 className="text-xl font-bold text-slate-100 mb-2">Ready to Analyze Tokens?</h3>
                        <p className="text-slate-400 mb-4">Try Token Analyzer for free and protect your investments</p>
                        <Button asChild className="bg-slate-700 hover:bg-slate-600 text-white">
                            <Link href="/">Start Free Analysis</Link>
                        </Button>
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
                                Protect your investments with AI-powered token analysis.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="font-semibold text-slate-100 mb-4">Product</h4>
                            <ul className="space-y-2">
                                <li><Link href="/register" className="text-sm text-slate-400 hover:text-slate-300">Get Started</Link></li>
                                <li><Link href="/login" className="text-sm text-slate-400 hover:text-slate-300">Login</Link></li>
                            </ul>
                        </div>

                        {/* Resources */}
                        <div>
                            <h4 className="font-semibold text-slate-100 mb-4">Resources</h4>
                            <ul className="space-y-2">
                                <li><Link href="/blog" className="text-sm text-slate-400 hover:text-slate-300">Blog</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-8 border-t border-slate-800">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <p className="text-sm text-slate-500">© 2025 Token Analyzer. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

