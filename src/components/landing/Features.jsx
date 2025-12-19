import React, { useState } from 'react';
import { EyeOff, AppWindow, ToggleRight, KeyRound, Clock, Feather, PlayCircle } from 'lucide-react';
import FeatureCard from './FeatureCard';

const Features = () => {
    const [isVideoVisible, setIsVideoVisible] = useState(false);

    const featuresData = [
        { icon: <EyeOff size={28} />, title: "Universal Invisibility", description: "Works seamlessly with Zoom, Microsoft Teams, Google Meet, Discord, and most other screen sharing platforms." },
        { icon: <AppWindow size={28} />, title: "Selective Hiding", description: "You're in control. Choose exactly which applications or windows you want to make invisible to others." },
        { icon: <ToggleRight size={28} />, title: "Instant Toggle", description: "Effortlessly hide and reveal your chosen apps with a single, customizable hotkey. Privacy at your fingertips." },
        { icon: <KeyRound size={28} />, title: "Secure Token Login", description: "No need to remember another password. Use your single, unique token for secure access to the desktop app." },
        { icon: <Clock size={28} />, title: "Time Coin System", description: "Enjoy a flexible, pay-as-you-go model. Your Time Coins are only consumed when the stealth mode is active." },
        { icon: <Feather size={28} />, title: "Low Resource Usage", description: "GhostScreen runs silently and efficiently in the background, ensuring no impact on your system's performance." },
    ];

    const handlePlayClick = () => {
        setIsVideoVisible(true);
    };

    // Replace with your actual YouTube Video ID
    const youtubeVideoId = 'HCHlBuFvvmE';

    return (
        <section id="features" className="py-10">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Privacy Features You'll Actually Use</h2>
                    <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">GhostScreen is designed with powerful, intuitive tools to give you full control over your on-screen privacy.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuresData.map((feature, index) => (<FeatureCard key={index} {...feature} />))}
                </div>
            </div>

            {/* --- Video Tutorial Section --- */}
            <div className="mt-14 p-2 md:p-5">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">See GhostScreen in Action</h2>
                    <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">Watch this short tutorial to see how easy it is to protect your privacy during screen shares.</p>
                </div>
                <div className="relative w-full max-w-5xl mx-auto">
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-lg opacity-60"></div>
                    <div className="relative z-10 bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
                        <div className="h-8 bg-gray-800/90 backdrop-blur border-b border-gray-700/50 flex items-center px-4 space-x-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="p-2 md:p-8 aspect-video relative">
                            {isVideoVisible ? (
                                // YouTube Iframe
                                <iframe
                                    className="w-full h-full"
                                    src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                // Thumbnail and Play Button
                                <div className="relative group cursor-pointer w-full h-full" onClick={handlePlayClick}>
                                    <img
                                        src={`https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`}
                                        alt="GhostScreen Video Tutorial"
                                        className="w-full h-full object-cover"
                                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/1280x720/0A0A1A/E0E0E0?text=Video+Thumbnail'; }}
                                    />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 group-hover:bg-black/20">
                                        <PlayCircle className="text-white/80 group-hover:text-white group-hover:scale-110 transition-all duration-300" size={96} strokeWidth={1.5} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;

