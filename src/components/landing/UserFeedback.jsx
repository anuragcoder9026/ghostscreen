import React from 'react';

const UserFeedback = () => {
    const feedbackData = [
        { quote: "This is a game-changer for working from home. I can keep my personal chats open without worrying about them showing up on a shared screen. Genius!", name: "Daniel K.", title: "Remote Developer", avatar: "https://placehold.co/64x64/8B5CF6/FFFFFF?text=DK" },
        { quote: "Finally, a way to handle sensitive client data during presentations without having to close everything. Oview works flawlessly and is super easy to use.", name: "Maria S.", title: "Financial Advisor", avatar: "https://placehold.co/64x64/10B981/FFFFFF?text=MS" },
        { quote: "As a student, this helps me keep my research notes visible only to me during online classes. The Time Coin system is perfect, I just buy what I need.", name: "Chen L.", title: "University Student", avatar: "https://placehold.co/64x64/F59E0B/FFFFFF?text=CL" },
        { quote: "I was skeptical at first, but it works exactly as advertised. It's lightweight and doesn't slow down my PC at all. Highly recommend for privacy-conscious professionals.", name: "Alex P.", title: "Project Manager", avatar: "https://placehold.co/64x64/3B82F6/FFFFFF?text=AP" },
        { quote: "The token login is so much better than another password. I got set up in less than a minute. The app is simple, focused, and does its one job perfectly.", name: "Sophie B.", title: "UX Designer", avatar: "https://placehold.co/64x64/EC4899/FFFFFF?text=SB" },
    ];
    const duplicatedFeedback = [...feedbackData, ...feedbackData];

    return (
        <section id="user-feedback" className="pt-10 pb-20 bg-gray-50 dark:bg-gray-900/50">
            <div className="container mx-auto">
                <div className="text-center mb-12 px-6">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">What Our Users Are Saying</h2>
                    <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">Real feedback from professionals and students who value their on-screen privacy.</p>
                </div>
                <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
                    <div className="flex animate-scroll">
                        {duplicatedFeedback.map((item, index) => (
                            <div key={index} className="flex-shrink-0 w-80 mx-4">
                                <div className="bg-white dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700/50 h-full flex flex-col shadow-lg dark:shadow-none">
                                    <p className="text-gray-700 dark:text-gray-300 italic flex-grow">"{item.quote}"</p>
                                    <div className="flex items-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                        <img src={item.avatar} alt={item.name} className="w-12 h-12 rounded-full mr-4" />
                                        <div>
                                            <p className="font-bold text-gray-900 dark:text-white">{item.name}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{item.title}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserFeedback;