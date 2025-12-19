import { useAuth } from '../contexts/AuthContext';
import { Coins, Copy, CheckCircle, ShieldCheck, Clock, BarChart2, Zap, Settings, Bell, FileText, HelpCircle, Users } from 'lucide-react';
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import axios from 'axios';
import { toast } from 'react-toastify';
// Reusable component for statistic cards
const StatCard = ({ icon, label, value, colorClass }) => (
    <div className="bg-white dark:bg-gray-800/50 p-5 rounded-none border border-gray-200 dark:border-gray-700/50 shadow-lg dark:shadow-none">
        <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg bg-${colorClass}-100 dark:bg-${colorClass}-500/10`}>
                {React.cloneElement(icon, { className: `text-${colorClass}-600 dark:text-${colorClass}-400` })}
            </div>
            <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{value}</p>
            </div>
        </div>
    </div>
);

// Mock data for the usage chart and activities
const usageData = [{ name: 'Mon', hours: 4 }, { name: 'Tue', hours: 3 }, { name: 'Wed', hours: 5 }, { name: 'Thu', hours: 2 }, { name: 'Fri', hours: 7 }, { name: 'Sat', hours: 1 }, { name: 'Sun', hours: 0 },];
const activityData = [
    { icon: <ShieldCheck size={20} className="text-green-400" />, text: "Successful login from a new device.", time: "2 hours ago" },
    { icon: <Coins size={20} className="text-yellow-400" />, text: "You purchased 500 Time Coins.", time: "1 day ago" },
    { icon: <FileText size={20} className="text-blue-400" />, text: "Your monthly invoice has been generated.", time: "3 days ago" },
];

const Dashboard = ({ handleQuickAction }) => {
    const [showTimeModal, setShowTimeModal] = useState(false);
    const [interviewTime, setInterviewTime] = useState('');
    const [coinUsageType, setCoinUsageType] = useState('fixed');
    const [timeLeft, setTimeLeft] = useState(null);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [showToken, setShowToken] = useState(false);
    const [generatedToken, setGeneratedToken] = useState(null);
    // Restore missing state and hooks
    const [copied, setCopied] = useState(false);
    const [referralCopied, setReferralCopied] = useState(false);
    const { timeCoins, user } = useAuth();

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleReferralCopy = (text) => {
        navigator.clipboard.writeText(text);
        setReferralCopied(true);
        setTimeout(() => setReferralCopied(false), 2000);
    };

    React.useEffect(() => {
        let interval = null;
        if (isTimerActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsTimerActive(false);
            setShowToken(false);
            setGeneratedToken(null);
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isTimerActive, timeLeft]);

    const handleStartClick = () => {
        setShowTimeModal(true);
    };

    const handleTimeSubmit = async (e) => {
        e.preventDefault();
        const minutes = parseInt(interviewTime, 10);
        if (!isNaN(minutes) && minutes > 0) {
            try {
                // Call backend to generate token
                const response = await axios.post(
                    "http://localhost:8000/api/desktop/generate-token",
                    {
                        type: coinUsageType,
                        duration: minutes * 60
                    },
                    {
                        withCredentials: true,
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                const token = response.data.token;
                setGeneratedToken(token);
                //await seeToken(token);
                setTimeLeft(5 * 60); // Fixed 5 minutes countdown
                setIsTimerActive(true);
                setShowToken(true);
                setShowTimeModal(false);
            } catch (error) {
                console.error("Error generating token:", error);
                toast.error(error.response.data.message || "Failed to generate token");
                // Handle error appropriately (e.g., show toast)
            }
        }
    };

    const verifyUser = async () => {
        try {
            const response = await axios.post(
                "http://localhost:8000/api/desktop/get-token-info",
                { token: generatedToken },
                {
                    withCredentials: true, // 👈 if you’re handling cookies in backend
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(response.data);
        } catch (error) {
            console.error("Error getting token info:", error);
            toast.error(error.response.data.message || "Failed to get token info");
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="p-4 sm:p-6 md:p-8 space-y-8 animate-fade-in relative">
            {/* --- Header --- */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Welcome Back, {user?.name}!</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Here's a summary of your GhostScreen account.</p>
            </div>

            {/* --- Main Grid --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Token Card */}
                    <div className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 p-6 rounded-none border border-blue-500/30 shadow-lg relative overflow-hidden">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Your Desktop App Token</h3>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 max-w-md">Use this One Time token to log in to the GhostScreen desktop application. Keep it safe!</p>

                        <div className="flex items-center gap-4">
                            <div className={`flex items-center gap-2 bg-white/60 dark:bg-black/30 p-3 rounded-lg flex-grow transition-all duration-300 overflow-hidden ${!showToken ? 'blur-sm select-none' : ''}`}>
                                <span className="text-blue-700 dark:text-blue-300 font-mono text-sm overflow-x-auto whitespace-nowrap scrollbar-hide pb-1">{showToken && generatedToken ? generatedToken : '*****************************************'}</span>
                                <button onClick={() => showToken && handleCopy(generatedToken)} disabled={!showToken} className="ml-auto p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors flex-shrink-0">
                                    {copied ? <CheckCircle size={18} className="text-green-500 dark:text-green-400" /> : <Copy size={18} />}
                                </button>
                            </div>

                            {!isTimerActive && (
                                <button
                                    onClick={handleStartClick}
                                    className="px-6 py-2.5 cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-0.5"
                                >
                                    Generate
                                </button>
                            )}
                        </div>

                        {isTimerActive && (
                            <div className="mt-4 p-3 bg-red-100 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-lg animate-pulse">
                                <p className="text-red-600 dark:text-red-300 text-sm font-semibold text-center">
                                    Use this One Time Token on desktop app before this token expires: <span className="text-gray-900 dark:text-white font-mono text-lg ml-2">{formatTime(timeLeft)}</span>
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Time Input Modal */}
                    {showTimeModal && (
                        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-md p-4 pt-20 animate-fade-in">
                            <div className="bg-white dark:bg-gray-900/90 border border-gray-200 dark:border-gray-700/50 p-8 rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Generate Token</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">Set a duration in minutes of your interview on Desktop App.</p>

                                <form onSubmit={handleTimeSubmit}>
                                    <div className="mb-6">
                                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">Coin Usage Type</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <button
                                                type="button"
                                                onClick={() => setCoinUsageType('fixed')}
                                                className={`p-3 cursor-pointer rounded-xl border text-center transition-all ${coinUsageType === 'fixed' ? 'bg-blue-600/20 border-blue-500 text-blue-600 dark:text-white' : 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                                            >
                                                <p className="font-semibold text-sm">Fixed</p>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setCoinUsageType('payg')}
                                                className={`p-3 cursor-pointer rounded-xl border text-center transition-all ${coinUsageType === 'payg' ? 'bg-blue-600/20 border-blue-500 text-blue-600 dark:text-white' : 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                                            >
                                                <p className="font-semibold text-sm">Pay As You Go</p>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">Duration (Minutes)</label>
                                        <div className="relative">
                                            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                            <input
                                                type="number"
                                                min="1"
                                                value={interviewTime}
                                                onChange={(e) => setInterviewTime(e.target.value)}
                                                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl py-3 pl-10 pr-4 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-500 dark:placeholder-gray-600"
                                                placeholder="e.g. 30"
                                                required
                                                autoFocus
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setShowTimeModal(false)}
                                            className="px-5 py-2.5 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors font-medium"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-6 py-2.5 cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                                        >
                                            Generate
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                    <div className="flex justify-end gap-3">
                        <button onClick={verifyUser} className="px-6 py-2.5 cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-blue-500/25">Verify</button>
                    </div>
                    {/* Referral Card */}
                    <div className="bg-gradient-to-br from-green-500/20 to-teal-600/20 p-6 rounded-none border border-green-500/30 shadow-lg">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2"><Users size={20} /> Refer & Earn</h3>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 max-w-md">Share your code with friends. If they sign up, you earn 50 coins! (Requires Premium or College Email)</p>
                        <div className="flex items-center gap-2 bg-white/60 dark:bg-black/30 p-3 rounded-lg">
                            <span className="text-green-700 dark:text-green-300 font-mono text-xl font-bold tracking-widest">{user?.referralCode || 'Generating...'}</span>
                            <button onClick={() => handleReferralCopy(user?.referralCode)} className="ml-auto p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors flex-shrink-0">
                                {referralCopied ? <CheckCircle size={18} className="text-green-500 dark:text-green-400" /> : <Copy size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Usage Chart */}
                    <div className="bg-white dark:bg-gray-800/50 p-6 rounded-none border border-gray-200 dark:border-gray-700/50 shadow-lg dark:shadow-none">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><BarChart2 size={20} /> Weekly Stealth Usage</h3>
                        <div style={{ width: '100%', height: 250 }}>
                            <ResponsiveContainer>
                                <BarChart data={usageData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                    <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} label={{ value: 'Hours', angle: -90, position: 'insideLeft', fill: '#9ca3af', fontSize: 12 }} />
                                    <Tooltip cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }} contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4b5563', borderRadius: '0.5rem' }} labelStyle={{ color: '#d1d5db' }} />
                                    <Bar dataKey="hours" radius={[4, 4, 0, 0]}>{usageData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.hours > 4 ? '#8b5cf6' : '#3b82f6'} />))}</Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* NEW: Recent Activity */}
                    <div className="bg-white dark:bg-gray-800/50 p-6 rounded-none border border-gray-200 dark:border-gray-700/50 shadow-lg dark:shadow-none">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
                        <div className="space-y-4">
                            {activityData.map((activity, index) => (
                                <div key={index} className="flex items-center gap-4">
                                    <div className="p-2 bg-gray-100 dark:bg-gray-700/50 rounded-full">{activity.icon}</div>
                                    <div className="flex-grow">
                                        <p className="text-sm text-gray-700 dark:text-gray-300">{activity.text}</p>
                                    </div>
                                    <p className="text-xs text-gray-500 flex-shrink-0">{activity.time}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                    <div className="space-y-6">
                        <StatCard icon={<Coins size={24} />} label="Time Coin Balance" value={`${user?.coin} Coins`} colorClass="yellow" />
                        <StatCard icon={<ShieldCheck size={24} />} label="Account Status" value="Active" colorClass="green" />
                        <StatCard
                            icon={<Clock size={24} />}
                            label="Time Zone"
                            value={(() => {
                                const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                                const now = new Date();
                                const offset = -now.getTimezoneOffset() / 60;
                                const offsetStr = `GMT${offset >= 0 ? '+' : ''}${offset}:00`;
                                return `${timezone.split('/')[1] || timezone} (${offsetStr})`;
                            })()}
                            colorClass="blue"
                        />
                    </div>

                    {/* NEW: Notifications */}
                    <div className="bg-white dark:bg-gray-800/50 p-6 rounded-none border border-gray-200 dark:border-gray-700/50 shadow-lg dark:shadow-none">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h3>
                            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3 text-sm p-3 rounded-lg bg-gray-50 dark:bg-gray-700/30">
                                <Bell size={18} className="text-yellow-500 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="font-semibold text-yellow-600 dark:text-yellow-400">Low Balance</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">Your Time Coins are running low. Top up now to avoid service interruption.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800/50 p-6 rounded-none border border-gray-200 dark:border-gray-700/50 shadow-lg dark:shadow-none">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <button onClick={() => handleQuickAction('purchase')} className="w-full flex items-center gap-3 text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"><Zap size={20} className="text-yellow-500 dark:text-yellow-400" /><div><p className="font-semibold text-gray-900 dark:text-white">Purchase Coins</p><p className="text-xs text-gray-500 dark:text-gray-400">Instantly top up your balance.</p></div></button>
                            <button onClick={() => handleQuickAction('settings')} className="w-full flex items-center gap-3 text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"><Settings size={20} className="text-gray-500 dark:text-gray-400" /><div><p className="font-semibold text-gray-900 dark:text-white">Account Settings</p><p className="text-xs text-gray-500 dark:text-gray-400">Manage your profile and security.</p></div></button>
                            <button onClick={() => handleQuickAction('support')} className="w-full flex items-center gap-3 text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"><HelpCircle size={20} className="text-blue-500 dark:text-blue-400" /><div><p className="font-semibold text-gray-900 dark:text-white">Visit Support</p><p className="text-xs text-gray-500 dark:text-gray-400">Get help and find answers.</p></div></button>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                @keyframes fade-in { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
                .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    )
}

export default Dashboard;

