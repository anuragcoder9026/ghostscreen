import React from 'react';
import { useNavigate } from 'react-router-dom';

const DownloadCTA = () => {
    const navigate = useNavigate();

    // Updated: Style object for the background grid pattern with white lines
    const gridPatternStyle = {
        backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255, 255, 255, 0.5) 40px), /* Vertical white lines */
            repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255, 255, 255, 0.5) 40px)  /* Horizontal white lines */
        `,
        backgroundSize: '40px 40px', // Size of each square in the grid
    };

    return (
        <section id="download" className="py-10">
            <div className="container mx-auto px-6">
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-700 rounded-md p-10 md:p-16 text-center overflow-hidden">

                    {/* Grid pattern overlay */}
                    <div
                        className="absolute inset-0"
                        style={gridPatternStyle}
                    ></div>

                    {/* Original Darkening Overlay */}
                    <div className="absolute inset-0 bg-black/30 mix-blend-multiply"></div>

                    {/* Content */}
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Go Invisible?</h2>
                        <p className="max-w-2xl mx-auto text-gray-200 mb-8">Create your free account now to generate your unique login token and download the Oview desktop app.</p>

                        <button
                            onClick={() => navigate('/signup')}
                            className="bg-white text-gray-900 font-bold px-8 py-3 rounded-lg text-lg hover:bg-gray-200 transition-all duration-300"
                        >
                            Generate Token & Download
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DownloadCTA;