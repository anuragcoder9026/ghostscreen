import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, HelpCircle } from 'lucide-react';

// Reusable FAQ Item Component
const FaqItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200/50 dark:border-gray-700/50 last:border-b-0">
            <button
                className="group w-full flex justify-between items-center text-left py-6 px-4 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 rounded-lg transition-all duration-300"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-8 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {question}
                </h3>
                <ChevronDown
                    className={`flex-shrink-0 text-blue-600 dark:text-blue-400 transform transition-all duration-300 ${isOpen ? 'rotate-180 scale-110' : ''
                        }`}
                    size={24}
                />
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <p className="text-gray-700 dark:text-gray-300 pb-6 px-4 leading-relaxed">
                    {answer}
                </p>
            </div>
        </div>
    );
};

// FAQ Section Component for Landing Page
const FAQ = () => {
    const navigate = useNavigate();

    const handleSupportClick = () => {
        navigate('/profile', { state: { section: 'support' } });
    };
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
        <section id="faq" className="py-20 bg-gray-50/50 dark:bg-gray-900/50">
            <div className="container mx-auto px-4 md:px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center p-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl mb-6">
                        <HelpCircle className="text-blue-600 dark:text-blue-400" size={32} />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                        Frequently Asked Questions
                    </h2>
                    <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-lg">
                        Find answers to common questions about GhostScreen
                    </p>
                </div>

                {/* FAQ Grid */}
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-xl overflow-hidden">
                        {faqs.map((faq, index) => (
                            <FaqItem key={index} question={faq.question} answer={faq.answer} />
                        ))}
                    </div>

                    {/* Additional Help CTA */}
                    <div className="mt-12 text-center">
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Still have questions?
                        </p>
                        <button
                            onClick={handleSupportClick}
                            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
                        >
                            Visit Support Center
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
