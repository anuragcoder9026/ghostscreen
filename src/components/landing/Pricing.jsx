import React from 'react';
import { useNavigate } from 'react-router-dom';

const PricingCard = ({ coins, price, bonus, isPopular }) => {
    const navigate = useNavigate();
    return (
        <div className={`bg-white dark:bg-gray-800/50 p-8 rounded-none border border-gray-200 dark:border-gray-700/50 flex flex-col relative shadow-lg dark:shadow-none ${isPopular ? 'border-purple-500 scale-105' : ''}`}>
            {isPopular && (<div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">Best Value</div>)}
            <div className="text-center">
                <h3 className="text-2xl font-semibold mb-2 mt-4 text-gray-900 dark:text-white">{coins} Time Coins</h3>
                {bonus && <p className="text-green-500 dark:text-green-400 font-semibold">{bonus}</p>}
            </div>
            <p className="text-center text-5xl font-bold my-4 text-gray-900 dark:text-white">₹{price}</p>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-6">1 Coin = 1 minute of Stealth Time</p>
            <button onClick={() => navigate('/purchase')} className={`w-full mt-auto py-3 rounded-lg font-semibold transition-all duration-300 ${isPopular ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white'}`}>Purchase Now</button>
        </div>
    );
};

const Pricing = ({ embedded = false }) => {
    const pricingData = [
        { coins: 100, price: "100" },
        { coins: 1000, price: "1000", bonus: "+300 Bonus Coins!", isPopular: true },
        { coins: 500, price: "500", bonus: "+100 Bonus Coins!", },
    ];

    if (embedded) {
        return (
            <div className="p-8">
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold">Purchase Time Coins</h2>
                    <p className="text-gray-400 mt-2">Your coins never expire. Use them whenever you need privacy.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {pricingData.map((plan, i) => <PricingCard key={i} {...plan} />)}
                </div>
            </div>
        )
    }

    return (
        <section id="pricing" className="py-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Flexible Pricing for Your Needs</h2>
                    <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">Purchase Time Coins and use them whenever you need. No subscriptions, no hidden fees.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8 max-w-5xl mx-auto">
                    {pricingData.map((plan, i) => <PricingCard key={i} {...plan} />)}
                </div>
            </div>
        </section>
    );
};

export default Pricing;