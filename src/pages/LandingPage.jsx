import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// ... import other components
import Header from '../components/layout/Header';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import HowItWorks from '../components/landing/HowItWorks';
import Pricing from '../components/landing/Pricing';
import UserFeedback from '../components/landing/UserFeedback';
import DownloadCTA from '../components/landing/DownloadCTA';
import Footer from '../components/layout/Footer';
import ReferralPopup from '../components/layout/ReferralPopup';
import ProtectedRoute from '../components/ProtectedRoute';
import { useAuth } from "../contexts/AuthContext";

const LandingPage = () => {
    const location = useLocation();
    const { isLoggedIn, loading } = useAuth();
    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            window.scrollTo(0, 0);
        }
    }, [location]);

    return (
        <div className="relative overflow-hidden">

            {isLoggedIn && !loading && <ReferralPopup />}

            {/* ... background glows ... */}
            <Header />
            <main className="relative z-10">
                <Hero />
                <Features />
                <HowItWorks />
                <Pricing />
                <UserFeedback />
                <DownloadCTA />
            </main>
            <Footer />
        </div>
    );
};

export default LandingPage;