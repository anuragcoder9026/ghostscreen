import React, { useState } from 'react';
import { EyeOff, AppWindow, ToggleRight, KeyRound, Clock, Feather, PlayCircle } from 'lucide-react';
import FeatureCard from './FeatureCard';

const Features = () => {
    const [isVideoVisible, setIsVideoVisible] = useState(false);

    const featuresData = [
        { icon: <EyeOff size={28} />, title: "Universal Invisibility", description: "Works seamlessly with Hacker Rank,Discord, Microsoft Teams,Google Meet, Zoom, and most other screen sharing platforms.", highlight: ["Hacker Rank", "Microsoft Teams", "Zoom",] },
        { icon: <AppWindow size={28} />, title: "Performance & Speed", description: "Engineered for speed with an ultra-low latency response time averaging just 200ms.", highlight: ["200ms"] },
        { icon: <ToggleRight size={28} />, title: "Multi-Model Intelligence", description: "Powered by Gemini 3,Gpt-OSS-120b and LLama-3.3 capable of understanding complex code, logic puzzles, and long-context documents.", highlight: ["Gemini 3", "Gpt-OSS-120b", "LLama-3.3"] },
        { icon: <KeyRound size={28} />, title: "Ghost Mode", description: "A fully transparent, click-through overlay that lets you read AI answers while continuing to type in your code editor underneath.", highlight: ["transparent", "overlay"] },
        { icon: <Clock size={28} />, title: "Vision Auto-Fix", description: "Advanced OCR technology that reads code directly from your screen, even if it's an image or video, with high accuracy.", highlight: ["OCR", "high accuracy"] },
        { icon: <Feather size={28} />, title: "Low Resource Usage", description: "Oview runs silently and efficiently in the background, ensuring no impact on your system's performance.", highlight: ["silently", "efficiently"] },
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
                    <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">Oview is designed with powerful, intuitive tools to give you full control over your on-screen privacy.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuresData.map((feature, index) => (<FeatureCard key={index} {...feature} />))}
                </div>
            </div>

            {/* --- Video Tutorial Section --- */}
            <div className="mt-14 p-2 md:p-5">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">See Oview in Action</h2>
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
                                        alt="Oview Video Tutorial"
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

