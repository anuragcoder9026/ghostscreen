import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart } from 'lucide-react';

const PurchasePage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
            <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700/50 max-w-md w-full text-center space-y-6 backdrop-blur-sm">
                <div className="bg-purple-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingCart size={40} className="text-purple-400" />
                </div>

                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Coming Soon
                </h1>

                <p className="text-gray-400 text-lg">
                    The purchase feature is currently under development. We're working hard to bring you a seamless payment experience.
                </p>

                <div className="pt-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center justify-center gap-2 w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PurchasePage;
