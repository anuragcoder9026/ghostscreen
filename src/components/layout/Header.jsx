import React, { useState } from 'react';
import { Menu, X, EyeOff, Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { FaWindows } from "react-icons/fa";
import logo from "../../assets/logo.png";
import { GITHUB_URL } from '../../config/api';
const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { isLoggedIn, logout, user } = useAuth();
    const { theme, toggleTheme } = useTheme();

    const navLinks = [
        { name: 'Features', id: 'features' },
        { name: 'How It Works', id: 'how-it-works' },
        { name: 'Pricing', id: 'pricing' },
        { name: 'Blog', path: '/blog' },
    ];

    const handleNavLinkClick = (link) => {
        setIsMobileMenuOpen(false);
        if (link.path) {
            navigate(link.path);
        } else if (link.id) {
            navigate(`/#${link.id}`);
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-blue-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-transparent transition-colors duration-300">
            <div className="mx-auto px-6 py-3 flex justify-between items-center">
                <button onClick={() => navigate('/')} className="text-xl lg:text-2xl font-bold tracking-wider flex items-center gap-2 text-gray-900 dark:text-white transition-colors duration-300">
                    {/* <EyeOff className="text-blue-600 dark:text-blue-400" size={28} /> */}
                    <img src={logo} alt="Logo" className="w-20 h-10" />
                    <span className='hidden lg:flex'>GhostScreen</span>
                </button>
                <nav className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <button key={link.name} onClick={() => handleNavLinkClick(link)} className="cursor-pointer text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 font-medium text-sm lg:text-base">
                            {link.name}
                        </button>
                    ))}
                </nav>
                <div className="hidden md:flex items-center space-x-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    {isLoggedIn ? (
                        <>
                            <a
                                href={GITHUB_URL}
                                download
                                className="cursor-pointer flex gap-2 justify-content items-center h-[36px] lg:h-[40px] bg-green-500 text-black font-bold hover:bg-green-400 transition-colors px-4 lg:px-5 text-sm lg:text-base"
                            >
                                <FaWindows size={18} className="lg:w-5 lg:h-5" />
                                Download
                            </a>
                            <button onClick={logout} className="p-2 px-3 bg-blue-600 text-gray-100 hover:text-white rounded-none text-sm lg:text-base">Log Out</button>
                            <button onClick={() => navigate('/profile')} className="rounded-full w-10 h-10 bg-gray-200 dark:bg-gray-700 flex items-center justify-center ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 ring-transparent hover:ring-blue-500 transition-all">
                                <img
                                    src={user?.profilePicture || "https://placehold.co/40x40/8B5CF6/FFFFFF?text=A"}
                                    alt="User Avatar"
                                    className="w-full h-full rounded-full object-cover"
                                />
                            </button>
                        </>
                    ) : (
                        <>
                            <a
                                href={GITHUB_URL}
                                download
                                className="cursor-pointer flex gap-2 justify-content items-center h-[36px] lg:h-[40px] bg-green-500 text-black font-bold hover:bg-green-400 transition-colors px-4 lg:px-5 text-sm lg:text-base"
                            >
                                <FaWindows size={18} className="lg:w-5 lg:h-5" />
                                Download
                            </a>
                            <button onClick={() => navigate('/signin')} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 lg:px-5 py-2 cursor-pointer transition-all duration-300 shadow-lg shadow-blue-600/20 rounded-none text-sm lg:text-base">Sign In</button>
                        </>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden flex items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-900 dark:text-white">
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white/95 dark:bg-gray-700/95 backdrop-blur-md absolute top-full left-0 w-full shadow-lg border-t border-gray-200 dark:border-gray-600 transition-colors duration-300">
                    <nav className="flex flex-col items-center space-y-4 py-6">
                        {navLinks.map((link) => (
                            <button key={link.name} onClick={() => handleNavLinkClick(link)} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 text-lg font-medium">{link.name}</button>
                        ))}
                        <div className="flex flex-col items-center space-y-4 pt-4 w-full px-8">
                            {isLoggedIn ? (
                                <>
                                    <button onClick={() => { setIsMobileMenuOpen(false); navigate('/profile') }} className="w-full flex items-center justify-center gap-3 text-center py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md">
                                        <img src={user?.profilePicture || "https://placehold.co/24x24/FFFFFF/8B5CF6?text=A"} alt="Avatar" className="w-6 h-6 rounded-full object-cover" />
                                        <span>My Account</span>
                                    </button>
                                    <button onClick={() => { setIsMobileMenuOpen(false); logout() }} className="w-full text-center py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded-none transition-colors">Log Out</button>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => { setIsMobileMenuOpen(false); navigate('/signin') }} className="w-full text-center py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded-none transition-colors">Sign In</button>
                                    <button onClick={() => { setIsMobileMenuOpen(false); navigate('/signup') }} className="w-full text-center py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md">Sign Up</button>
                                </>
                            )}
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;