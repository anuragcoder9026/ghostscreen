import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BarChart, Coins, Settings, HelpCircle, EyeOff, AppWindow, ToggleRight, Clock, Copy, CheckCircle, Menu, LogOut, Gift } from 'lucide-react';
import Header from '../components/layout/Header';
import Pricing from '../components/landing/Pricing';
import SettingsPage from './SettingsPage';
import Dashboard from './Dashboard';
import SupportPage from './SupportPage';
import ReferralsPage from './ReferralsPage';

const ProfilePage = () => {
    const { userToken, timeCoins, logout, user } = useAuth();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [activeContentId, setActiveContentId] = useState('dashboard');

    const handleCopy = () => {
        navigator.clipboard.writeText(userToken);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const accountItems = [
        { id: 'dashboard', icon: <BarChart size={20} />, label: "Dashboard" },
        { id: 'purchase', icon: <Coins size={20} />, label: "Purchase Coins" },
        { id: 'referrals', icon: <Gift size={20} />, label: "Refer & Earn" },
        { id: 'settings', icon: <Settings size={20} />, label: "Settings" },
        { id: 'support', icon: <HelpCircle size={20} />, label: "Support" },
    ];

    const featureItems = [
        { icon: <EyeOff size={20} />, label: "Universal Invisibility" },
        { icon: <AppWindow size={20} />, label: "Selective Hiding" },
        { icon: <ToggleRight size={20} />, label: "Instant Toggle" },
        { icon: <Clock size={20} />, label: "Time Coin System" },
    ];

    const renderActiveContent = () => {

        const handleQuickAction = (item) => {
            setActiveContentId(item);
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
        switch (activeContentId) {
            case 'dashboard': return <Dashboard handleQuickAction={handleQuickAction} />
            case 'purchase': return <Pricing embedded={true} />;
            case 'referrals': return <ReferralsPage embedded={true} />;
            case 'settings': return <SettingsPage handleQuickAction={handleQuickAction} />;
            case 'support': return <SupportPage />
            default: return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors duration-300">
            <Header /> {/* Header is self-sufficient with context */}
            <div className="flex flex-1 pt-16">
                {isSidebarOpen && <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/60 z-30 md:hidden"></div>}
                <aside className={`fixed md:relative inset-y-0 left-0 z-40 bg-white dark:bg-gray-800/90 backdrop-blur-lg border-r border-gray-200 dark:border-gray-700/50 w-64 pt-2 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                    <div className="p-4 h-full flex flex-col">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-300 px-4 mb-4">My Account</h2>
                            <nav className="flex flex-col gap-1">
                                {accountItems.map((item) => (
                                    <button key={item.id} onClick={() => {
                                        if (item.path) {
                                            navigate(item.path);
                                        } else {
                                            setActiveContentId(item.id);
                                        }
                                        setIsSidebarOpen(false);
                                    }} className={`flex items-center gap-4 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-blue-500/20 hover:text-blue-600 dark:hover:text-white transition-colors text-left w-full ${activeContentId === item.id ? 'bg-blue-500/20 text-blue-600 dark:text-white' : ''}`}>{item.icon}<span>{item.label}</span></button>
                                ))}
                            </nav>
                        </div>
                        <div className="mt-8">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-300 px-4 mb-4">App Features</h2>
                            <div className="flex flex-col gap-1">
                                {featureItems.map((item) => (
                                    <div key={item.label} className="flex items-center gap-4 px-4 py-3 rounded-lg text-gray-600 dark:text-gray-400">
                                        {item.icon}<span>{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button onClick={logout} className="mt-auto w-full flex items-center gap-3 justify-center bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-red-600/80 hover:text-white font-semibold px-5 py-3 rounded-lg transition-all duration-300"><LogOut size={18} /> Log Out</button>
                    </div>
                </aside>
                <main className="flex-1 overflow-y-auto">
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden p-2 mb-4 rounded-lg bg-white dark:bg-gray-800/80 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"><Menu size={24} /></button>
                    <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700/50 shadow-lg dark:shadow-blue-500/10 rounded-none">
                        {renderActiveContent()}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ProfilePage;