import React from 'react';
import { ChevronRight } from 'lucide-react';

const HowItWorks = () => {
    const steps = [
        { number: 1, title: 'Create Your Account', description: 'Sign up on our website to generate your personal, unique login token.' },
        { number: 2, title: 'Download The App', description: 'Get the Oview desktop client for Windows. A lightweight and quick installation.' },
        { number: 3, title: 'Login with Token', description: 'Launch the app and paste your token to log in. Your privacy shield is now ready!' },
    ];
    return (
        <section id="how-it-works" className="py-10 bg-gray-50 dark:bg-gray-900/50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Get Started in 3 Easy Steps</h2>
                </div>

                {/* Updated layout for large devices only */}
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-4">
                    {steps.map((step, index) => (
                        <React.Fragment key={step.number}>
                            {/* Step Card */}
                            <div className="flex flex-col items-center text-center p-8 rounded-xl border border-blue-500/20 bg-white dark:bg-gray-800/20 w-full max-w-sm lg:w-1/3 shadow-lg dark:shadow-none">
                                <div className="flex items-center justify-center w-16 h-16 bg-blue-600/20 text-blue-300 font-bold text-2xl rounded-full border-2 border-blue-500/50 mb-6">{step.number}</div>
                                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{step.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                            </div>

                            {/* Arrow Separator (visible on large screens and up) */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block mx-4">
                                    <ChevronRight className="text-blue-500/30" size={48} strokeWidth={1.5} />
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;

