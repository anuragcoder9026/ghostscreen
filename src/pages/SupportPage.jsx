import React, { useState } from 'react';
import { Search, ChevronDown, Mail, MessageSquare, Users, Send, LifeBuoy, Phone, User as UserIcon } from 'lucide-react';

// Reusable FAQ Item Component
const FaqItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200 dark:border-gray-700/50">
            <button
                className="w-full flex justify-between items-center text-left py-5 px-2"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{question}</h3>
                <ChevronDown
                    className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    size={24}
                />
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}
            >
                <p className="text-gray-600 dark:text-gray-400 pb-5 px-2">
                    {answer}
                </p>
            </div>
        </div>
    );
};

// Support Page Component
const SupportPage = () => {

    const faqs = [
        {
            question: "How do I use my login token?",
            answer: "Simply copy the unique token from your account dashboard and paste it into the login field of the GhostScreen desktop application. No password required!"
        },
        {
            question: "What happens when my Time Coins run out?",
            answer: "When your Time Coin balance reaches zero, the stealth mode will be disabled. You can easily purchase more coins from your account dashboard at any time to continue using the service."
        },
        {
            question: "Is GhostScreen compatible with macOS or Linux?",
            answer: "Currently, GhostScreen is only available for Windows. We are actively working on developing versions for both macOS and Linux. Stay tuned for updates!"
        },
        {
            question: "Can I use one account on multiple computers?",
            answer: "Yes, you can use your single GhostScreen account and token on multiple Windows computers. Your Time Coin balance will be synced across all your devices."
        },
        {
            question: "How does the Time Coin system work?",
            answer: "The system is pay-as-you-go. 1 Time Coin equals 1 hour of active stealth mode. Coins are only consumed when you have GhostScreen enabled, giving you full control over your usage."
        },
        {
            question: "Can I get a refund for my unused Time Coins?",
            answer: "Due to the nature of the digital currency, we do not offer refunds on purchased Time Coins. However, your coins never expire, so you can use them whenever you need them in the future."
        }
    ];

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
                        Have a question? Find answers in our FAQ, join our community, or contact our support team directly.
                    </p>

                </section>

                {/* --- Support Channels & FAQ Grid --- */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
                    {/* Left Side: Contact Options */}
                    <div className="lg:col-span-1 space-y-6">
                        <h2 className="text-2xl font-bold border-b border-gray-200 dark:border-gray-700 pb-3 text-gray-900 dark:text-white">Contact Options</h2>
                        <div className="p-6 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700/50 shadow-sm dark:shadow-none">
                            <Send className="text-blue-500 dark:text-blue-400 mb-3" size={32} />
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Telegram</h3>
                            <p className="text-gray-600 dark:text-gray-400 mt-1 mb-4">Join our channel for instant support.</p>
                            <a href="#" className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors">Join Channel →</a>
                        </div>
                        <div className="p-6 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700/50 shadow-sm dark:shadow-none">
                            <Phone className="text-blue-500 dark:text-blue-400 mb-3" size={32} />
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Phone Support</h3>
                            <p className="text-gray-600 dark:text-gray-400 mt-1 mb-4">Call us at +91 9026843984 for urgent issues.</p>
                            <a href="tel:+15551234567" className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors">Call Now →</a>
                        </div>
                        <div className="p-6 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700/50 shadow-sm dark:shadow-none">
                            <Mail className="text-blue-500 dark:text-blue-400 mb-3" size={32} />
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Email Us</h3>
                            <p className="text-gray-600 dark:text-gray-400 mt-1 mb-4">
                                Ask questions and share tips with other users.
                            </p>
                            <a
                                href="mailto:iitpatelanurag2003@gmail.com?subject=Support%20Request"
                                className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
                            >
                                Send Email →
                            </a>
                        </div>

                    </div>

                    {/* Right Side: FAQ Accordion */}
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold border-b border-gray-200 dark:border-gray-700 pb-3 mb-2 text-gray-900 dark:text-white">Frequently Asked Questions</h2>
                        <div>
                            {faqs.map((faq, index) => (
                                <FaqItem key={index} question={faq.question} answer={faq.answer} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- Contact Form Section --- */}
                <section>
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Still have questions?</h2>
                        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">Can't find the answer you're looking for? Please fill out our contact form and a member of our support team will respond as soon as possible.</p>
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

