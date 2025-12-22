import React, { useEffect, useRef } from 'react';
import { FaWindows } from "react-icons/fa";
import { useTheme } from '../../contexts/ThemeContext';
import { GITHUB_URL } from '../../config/api';
const GhostHero = () => {
    const canvasRef = useRef(null);
    const { theme } = useTheme();

    useEffect(() => {
        // Ensure canvas element is mounted before proceeding
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        // Ensure context is available
        if (!ctx) return;

        const gridSize = 15;
        // Adjust colors based on theme if needed, or keep greenish accent
        // For light mode, maybe a slightly darker green for dots to be visible?
        // Actually, on light mode bg-white, faint green dots might be hard to see.
        // Let's make dots slightly darker in light mode or keep them as is if they work.
        // Current: rgba(52, 211, 153, 0.1) -> very faint green.
        // on white, 0.1 alpha might be invisible.

        const isDark = theme === 'dark' || document.documentElement.classList.contains('dark');

        const dotColor = isDark ? 'rgba(52, 211, 153, 0.1)' : 'rgba(5, 150, 105, 0.15)'; // darker green, slightly more opaque for light mode
        const highlightColor = 'rgba(52, 211, 153, 0.8)'; // Keep highlight bright green

        const isInsideShape = (x, y, width, height) => {
            const normX = x / width;
            const normY = y / height;
            // Adjusted shape to be more horizontal and centered
            return normX > 0.45 && normX < 0.9 && normY > 0.25 && normY < 0.75 && Math.random() > 0.2;
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const cols = Math.floor(canvas.width / gridSize);
            const rows = Math.floor(canvas.height / gridSize);

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const x = i * gridSize;
                    const y = j * gridSize;

                    if (isInsideShape(x, y, canvas.width, canvas.height)) {
                        if (Math.random() > 0.05) { // Denser shape
                            ctx.fillStyle = Math.random() > 0.97 ? highlightColor : (isDark ? 'rgba(52, 211, 153, 0.4)' : 'rgba(5, 150, 105, 0.4)');
                            ctx.fillRect(x, y, 2, 2);
                        }
                    } else {
                        if (Math.random() < 0.05) { // Sparser outside
                            ctx.fillStyle = dotColor;
                            ctx.fillRect(x, y, 1, 1);
                        }
                    }
                }
            }
        };

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            draw(); // Redraw on resize
        };

        // Initial setup
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Cleanup function to remove event listener
        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };

    }, [theme]); // Re-run when theme changes


    return (
        <section className="m-6 relative bg-gray-200 dark:bg-black text-gray-900 dark:text-white py-25 px-4 md:px-10 flex items-center justify-center overflow-hidden transition-colors duration-300">
            <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0 opacity-40 pointer-events-none"></canvas>

            <div className="relative z-10 container mx-auto px-4 md:px-6 w-full">
                {/* Main container for the horizontal layout on large screens */}
                <div className="flex flex-col lg:flex-row justify-between items-center gap-12">

                    {/* Left Side Content */}
                    <div className="lg:w-3/5 text-center lg:text-left">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            <span className="text-green-600 dark:text-green-400 font-bold">⚡</span>A completely invisible on which any website can run <a href="#" className="underline hover:text-green-500 dark:hover:text-green-300"></a>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tighter mb-2 text-gray-900 dark:text-white">
                            Stay Invisible
                        </h1>
                        <h2 className="text-5xl md:text-7xl font-bold leading-tight tracking-tighter text-gray-500 dark:text-gray-500">
                            Completely invisible during screen shares
                        </h2>
                    </div>

                    {/* Right Side Content */}
                    <div className="lg:w-2/5 flex flex-col items-center lg:items-start">
                        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-sm text-center lg:text-left">
                            Generate Token, Download, Invisible.
                            <br />
                            GhostScreen is your Invisible screen on which you can independently run any website like Chatgpt, gemini, which help you in interviewes.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs mx-auto lg:mx-0">
                            <a
                                href={GITHUB_URL}
                                download
                                className="cursor-pointer flex gap-2 justify-content items-center h-[60px] bg-green-500 hover:bg-green-600 dark:hover:bg-green-400 text-white dark:text-black font-bold rounded-md transition-colors px-10 shadow-lg dark:shadow-green-900/20"
                            >
                                <FaWindows size={25} />
                                Download
                            </a>

                        </div>
                        <a href="#" className="text-sm text-gray-500 dark:text-gray-400 mt-4 hover:text-gray-900 dark:hover:text-white hover:underline transition-colors">All Downloads ›</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GhostHero;

