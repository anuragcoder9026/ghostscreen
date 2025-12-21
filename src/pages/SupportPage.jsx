import React, { useState } from 'react';
import { Mail, Send, LifeBuoy, User as UserIcon } from 'lucide-react';

// Support Page Component
const SupportPage = () => {

    return (
        <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen transition-colors duration-300">
            <div className="container mx-auto px-4 py-12 md:py-20">
                {/* --- Hero Section --- */}
                <section className="text-center mb-16">
                    <div className="inline-block p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl mb-4">
                        <LifeBuoy className="text-blue-400" size={40} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">How can we help?</h1>
                    <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-600 dark:text-gray-400">
                        Have a question? Contact our support team directly and we'll get back to you as soon as possible.
                    </p>

                </section>

                {/* --- Contact Options Section --- */}
                <section className="max-w-3xl mx-auto mb-20">
                    <h2 className="text-2xl font-bold border-b border-gray-200 dark:border-gray-700 pb-3 mb-6 text-gray-900 dark:text-white">Contact Options</h2>
                    <div className="p-6 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700/50 shadow-sm dark:shadow-none">
                        <Mail className="text-blue-500 dark:text-blue-400 mb-3" size={32} />
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Email Us</h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-1 mb-4">
                            Send us an email and we'll respond within 24 hours.
                        </p>
                        <a
                            href="mailto:iitpatelanurag2003@gmail.com?subject=Support%20Request"
                            className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
                        >
                            Send Email →
                        </a>
                    </div>
                </section>

                {/* --- Contact Form Section --- */}
                <section>
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Send us a message</h2>
                        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">Fill out the form below and our support team will respond as soon as possible.</p>
                    </div>
                    <div className="mt-12 max-w-3xl mx-auto">
                        <form className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                            <div>
                                <label htmlFor="full-name" className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">Full name</label>
                                <div className="relative"><UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} /><input type="text" id="full-name" className="w-full bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white" /></div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">Email address</label>
                                <div className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} /><input type="email" id="email" className="w-full bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white" /></div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">Subject</label>
                                <input type="text" id="subject" className="w-full bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white" />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">Message</label>
                                <textarea id="message" rows="4" className="w-full bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"></textarea>
                            </div>
                            <div className="sm:col-span-2 flex justify-end">
                                <button type="submit" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                                    <Send className="mr-3" size={20} />
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default SupportPage;

