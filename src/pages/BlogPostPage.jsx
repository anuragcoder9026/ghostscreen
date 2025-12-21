import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock, Tag } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import blogPosts from '../data/blogData';
import BlogCard from '../components/blog/BlogCard';

const BlogPostPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    // Find the post by slug
    const post = blogPosts.find(p => p.slug === slug);

    // Get related posts (same category, excluding current post)
    const relatedPosts = blogPosts
        .filter(p => p.category === post?.category && p.id !== post?.id)
        .slice(0, 3);

    if (!post) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Post not found</h2>
                    <button
                        onClick={() => navigate('/blog')}
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        Back to Blog
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <Header />

            {/* Article Header */}
            <article className="pt-24 pb-16">
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                    {/* Back button */}
                    <button
                        onClick={() => navigate('/blog')}
                        className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:gap-3 transition-all mb-8 group"
                    >
                        <ArrowLeft size={20} className="transform group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Blog</span>
                    </button>

                    {/* Category badge */}
                    <div className="mb-4">
                        <span className="inline-block bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                            {post.category}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        {post.title}
                    </h1>

                    {/* Meta info */}
                    <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2">
                            <User size={18} />
                            <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar size={18} />
                            <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={18} />
                            <span>{post.readTime}</span>
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="mb-12 rounded-xl overflow-hidden shadow-2xl">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-auto object-cover"
                        />
                    </div>

                    {/* Content */}
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {post.content.split('\n\n').map((paragraph, index) => {
                                // Check if it's a heading
                                if (paragraph.startsWith('## ')) {
                                    return (
                                        <h2 key={index} className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6 pb-3 border-b-2 border-blue-500">
                                            {paragraph.replace('## ', '')}
                                        </h2>
                                    );
                                }

                                // Check if it's a numbered list item
                                if (paragraph.match(/^\d+\.\s/)) {
                                    const text = paragraph.replace(/^\d+\.\s/, '');
                                    // Check for bold text in the item
                                    const parts = text.split(/(\*\*.*?\*\*)/g);
                                    return (
                                        <div key={index} className="flex items-start gap-3 mb-4 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
                                            <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                                                {paragraph.match(/^\d+/)[0]}
                                            </div>
                                            <p className="flex-1 text-lg">
                                                {parts.map((part, i) => {
                                                    if (part.startsWith('**') && part.endsWith('**')) {
                                                        return <strong key={i} className="font-bold text-gray-900 dark:text-white">{part.slice(2, -2)}</strong>;
                                                    }
                                                    return part;
                                                })}
                                            </p>
                                        </div>
                                    );
                                }

                                // Check if it's a bullet point (starts with -)
                                if (paragraph.startsWith('- ')) {
                                    const text = paragraph.replace(/^- /, '');
                                    const parts = text.split(/(\*\*.*?\*\*)/g);
                                    return (
                                        <div key={index} className="flex items-start gap-3 mb-4 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                                            <svg className="flex-shrink-0 w-6 h-6 text-purple-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <p className="flex-1 text-lg">
                                                {parts.map((part, i) => {
                                                    if (part.startsWith('**') && part.endsWith('**')) {
                                                        return <strong key={i} className="font-bold text-gray-900 dark:text-white">{part.slice(2, -2)}</strong>;
                                                    }
                                                    return part;
                                                })}
                                            </p>
                                        </div>
                                    );
                                }

                                // Regular paragraph with bold text support
                                const parts = paragraph.split(/(\*\*.*?\*\*)/g);
                                return (
                                    <p key={index} className="mb-6 text-lg leading-8">
                                        {parts.map((part, i) => {
                                            if (part.startsWith('**') && part.endsWith('**')) {
                                                return <strong key={i} className="font-bold text-gray-900 dark:text-white">{part.slice(2, -2)}</strong>;
                                            }
                                            return part;
                                        })}
                                    </p>
                                );
                            })}
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3 flex-wrap">
                            <Tag size={20} className="text-gray-400" />
                            {post.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </article>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <section className="py-16 bg-white dark:bg-gray-800">
                    <div className="container mx-auto px-4 md:px-6">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
                            Related Articles
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {relatedPosts.map((relatedPost) => (
                                <BlogCard key={relatedPost.id} post={relatedPost} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <Footer />
        </div>
    );
};

export default BlogPostPage;
