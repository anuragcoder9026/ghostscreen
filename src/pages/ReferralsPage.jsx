import React, { useState } from 'react';
import { Copy, Mail, Send, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import axios from 'axios';
import { BACKEND_URL, FRONTEND_URL } from '../config/api';
const ReferralsPage = ({ embedded = false }) => {
    const { user } = useAuth();
    const [copied, setCopied] = useState(false);
    const [email, setEmail] = useState('');
    const [sending, setSending] = useState(false);

    const referralCode = user?.referralCode || 'USER123';
    const referralLink = `${window.location.origin}/signup?refer_code=${referralCode}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        toast.success('Referral link copied!');
        setTimeout(() => setCopied(false), 2000);
    };

    const handleInvite = async (e) => {
        e.preventDefault();
        if (!email) return;

        setSending(true);
        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/users/send-referral-invite`,
                { email },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            toast.success(response.data.message);
            setEmail('');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to send invitation');
        } finally {
            setSending(false);
        }
    };

    const content = (
        <div className={`w-full max-w-3xl text-center space-y-12 ${embedded ? '' : 'pt-32 pb-20 px-4'}`}>

            {/* Header */}
            <div className="space-y-4">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-600">
                    Earn More Coins on referring friends <br />
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                    Invite friends to GhostScreen and earn coins.
                </p>
                <p className="text-red-600 dark:text-red-400 text-sm bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 p-3 rounded-lg inline-block">
                    Both Referrer and Referred users must use a valid college email or you must have a paid plan to earn coins on referrals.
                </p>
            </div>

            {/* Input Section */}
            <div className="space-y-6 max-w-xl mx-auto bg-white dark:bg-gray-800/50 p-8 rounded-none border border-gray-200 dark:border-gray-700/50 shadow-xl dark:shadow-none backdrop-blur-sm">
                {/* Link Input */}
                <div className="flex flex-col sm:flex-row items-center gap-3">
                    <div className="relative flex-1 w-full">
                        <input
                            type="text"
                            readOnly
                            value={referralLink}
                            className="w-full bg-gray-50 dark:bg-gray-900/80 border border-gray-300 dark:border-gray-700 rounded-none py-3 px-4 text-gray-900 dark:text-gray-300 focus:outline-none focus:border-blue-500 transition-colors text-sm font-mono"
                        />
                    </div>
                    <button
                        onClick={handleCopy}
                        className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-none flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20"
                    >
                        {copied ? <Check size={18} /> : <Copy size={18} />}
                        {copied ? 'Copied' : 'Copy link'}
                    </button>
                </div>

                {/* Email Input */}
                <div className="space-y-2 text-left">
                    <label className="text-sm text-gray-700 dark:text-gray-400 ml-1 font-medium">Invite via email</label>
                    <form onSubmit={handleInvite} className="flex flex-col sm:flex-row items-center gap-3">
                        <div className="relative flex-1 w-full">
                            <input
                                type="email"
                                placeholder="friend@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-gray-50 dark:bg-gray-900/80 border border-gray-300 dark:border-gray-700 rounded-none py-3 px-4 text-gray-900 dark:text-gray-300 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={sending}
                            className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 border border-transparent dark:border-gray-600 text-white font-medium py-3 px-6 rounded-none flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send size={18} />
                            {sending ? 'Sending...' : 'Send'}
                        </button>
                    </form>
                </div>
            </div>

            {/* Steps Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-gray-200 dark:border-gray-800/50">
                <div className="space-y-4 p-4 rounded-none hover:bg-gray-100 dark:hover:bg-gray-800/30 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto font-bold text-xl border border-gray-200 dark:border-gray-700 shadow-lg dark:shadow-blue-900/20">
                        1
                    </div>
                    <h3 className="font-semibold text-xl text-gray-900 dark:text-white">Refer a friend</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                        Send your referral link to friends over text, socials, or email.
                    </p>
                </div>
                <div className="space-y-4 p-4 rounded-none hover:bg-gray-100 dark:hover:bg-gray-800/30 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto font-bold text-xl border border-gray-200 dark:border-gray-700 shadow-lg dark:shadow-blue-900/20">
                        2
                    </div>
                    <h3 className="font-semibold text-xl text-gray-900 dark:text-white">They sign up</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                        They earn a 20 bonus coins after signing up and verifying their student status.
                    </p>
                </div>
                <div className="space-y-4 p-4 rounded-none hover:bg-gray-100 dark:hover:bg-gray-800/30 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto font-bold text-xl border border-gray-200 dark:border-gray-700 shadow-lg dark:shadow-blue-900/20">
                        3
                    </div>
                    <h3 className="font-semibold text-xl text-gray-900 dark:text-white">Earn free Pro</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                        You'll automatically receive another 50 coins for each valid referral.
                    </p>
                </div>
            </div>

            {/* Stats Section */}
            <div className="text-left space-y-6 pt-8">
                <h3 className="font-semibold text-xl text-gray-900 dark:text-white pl-1">Your referrals</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700/50 rounded-none p-8 hover:border-blue-500/30 transition-colors shadow-sm dark:shadow-none">
                        <div className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">0</div>
                        <div className="text-xs text-blue-600 dark:text-blue-400 uppercase tracking-widest font-semibold">Referrals</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700/50 rounded-none p-8 hover:border-blue-500/30 transition-colors shadow-sm dark:shadow-none">
                        <div className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
                            0
                        </div>
                        <div className="text-xs text-blue-600 dark:text-blue-400 uppercase tracking-widest font-semibold">Coins earned</div>
                    </div>
                </div>
            </div>

        </div>
    );

    if (embedded) {
        return <div className="p-8 flex items-center justify-center">{content}</div>;
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-sans flex flex-col transition-colors duration-300">
            <Header />
            <main className="flex-grow flex flex-col items-center justify-center">
                {content}
            </main>
            <Footer />
        </div>
    );
};

export default ReferralsPage;
