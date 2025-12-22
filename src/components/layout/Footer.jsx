import React, { useState, useEffect } from 'react';
import { EyeOff, Twitter, Linkedin, Github, Send, ArrowUpCircle } from 'lucide-react';

const Footer = () => {
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <footer className="relative bg-gray-100 dark:bg-gray-900/50 border-t rounded-lg border-gray-200 dark:border-gray-800/50 pt-16 pb-8 overflow-hidden transition-colors duration-300">
            {/* Animated Gradient Border */}
            <div className="animated-gradient-border absolute top-0 left-0 w-full h-1"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-10">
                    {/* Column 1: Brand & Newsletter */}
                    <div className="md:col-span-2 lg:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <EyeOff className="text-blue-600 dark:text-blue-400" size={28} />
                            <span className="text-2xl font-bold tracking-wider text-gray-900 dark:text-white">Oview</span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 max-w-sm mb-6">
                            Stay private in plain sight. Get the latest updates and feature releases straight to your inbox.
                        </p>
                        <form className="flex items-center gap-2 max-w-sm">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-grow bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 dark:text-white placehoder:text-gray-400"
                            />
                            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors">
                                <Send size={20} />
                            </button>
                        </form>
                    </div>

                    {/* Column 2: Product Links */}
                    <div className="text-sm">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4 tracking-wider uppercase">Product</h3>
                        <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                            <li><a href="#features" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Features</a></li>
                            <li><a href="#pricing" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Pricing</a></li>
                            <li><a href="#how-it-works" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">How it Works</a></li>
                            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Download</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Company Links */}
                    <div className="text-sm">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4 tracking-wider uppercase">Company</h3>
                        <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</a></li>
                            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Blog</a></li>
                        </ul>
                    </div>

                    {/* Column 4: Legal Links */}
                    <div className="text-sm">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4 tracking-wider uppercase">Legal</h3>
                        <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section: Copyright & Socials */}
                <div className="mt-16 pt-8 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-6">
                    <div className="flex items-center gap-4">
                        <p>&copy; {new Date().getFullYear()} Oview.</p>
                        {/* Live Clock */}
                        <div className="hidden sm:flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            <span>{currentTime}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors"><Linkedin size={20} /></a>
                            <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors"><Github size={20} /></a>
                        </div>
                        {/* Back to Top Button */}
                        <button onClick={scrollToTop} className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-white transition-colors">
                            <ArrowUpCircle size={20} />
                            <span>Back to Top</span>
                        </button>
                    </div>
                </div>
            </div>
            <style>{`
                @keyframes gradient-animation {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animated-gradient-border {
                    background: linear-gradient(90deg, #3b82f6, #8b5cf6, #3b82f6);
                    background-size: 200% 200%;
                    animation: gradient-animation 5s ease infinite;
                }
            `}</style>
        </footer>
    );
};

export default Footer;

