import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import GhostHero from './GhostHero';

import WorkingImg from "../../assets/Working.png"
const Hero = () => {
    const navigate = useNavigate(); // Use the navigate hook
    return (
        <section id="home" className="pt-32 pb-20 text-center overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 mb-12">
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 tracking-tighter text-gray-900 dark:text-white">Stay Private and Invisible with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">GhostScreen</span></h1>
                <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8">Make your desktop screen completely invisible on Zoom, Teams, Meet and more. Perfect for private work, confidential data, or avoiding distractions.</p>
                <div className="flex justify-center items-center">
                    <div className="relative">
                        <button onClick={() => navigate('/signup')}
                            className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 text-white font-bold px-8 py-3 rounded-lg text-lg transition-all duration-300 shadow-xl shadow-purple-600/20 flex items-center gap-2"
                        >
                            Get Your Login Token <ArrowRight size={20} />
                        </button>
                        <div className="absolute -top-4 -right-4 transform transition-transform hover:scale-105">
                            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-blue-400/30 rounded-full px-3 py-1">
                                <p className="text-xs text-gray-600 dark:text-gray-300 whitespace-nowrap">
                                    Start with <span className="font-bold text-red-500 dark:text-yellow-400">30 free coins</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full">
                <GhostHero />
            </div>

            <div className="container mx-auto px-4 sm:px-6">
                <div className="relative max-w-4xl mx-auto mt-16 px-2 md:px-0">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-lg opacity-60"></div>
                    <div className="relative z-10 bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
                        <div className="h-8 bg-gray-800/90 backdrop-blur border-b border-gray-700/50 flex items-center px-4 space-x-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="p-2 md:p-8">
                            <img src={WorkingImg} alt="Software Preview" className="w-full h-auto block rounded-xl" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;