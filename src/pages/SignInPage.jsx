import React, { useState, useEffect } from 'react';
import { Mail, Lock, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import { BACKEND_URL, FRONTEND_URL } from '../config/api';
// A simple component for the Google Icon SVG
const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.99,36.566,44,30.857,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
    </svg>
);

const SignInPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate(); // Use the navigate hook
    const location = useLocation();

    // Forgot Password States
    const [showForgotModal, setShowForgotModal] = useState(false);
    const [forgotStep, setForgotStep] = useState(1); // 1: email, 2: OTP, 3: new password
    const [forgotEmail, setForgotEmail] = useState("");
    const [forgotOTP, setForgotOTP] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [forgotLoading, setForgotLoading] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const errorMsg = params.get("error");

        if (errorMsg) {
            toast.error(errorMsg);
        }
    }, [location]);

    const [formData, setFormData] = useState({ email: "", password: "", });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    const [loading, setLoading] = useState(false);
    const signInWithUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/users/sign-in-user`,
                formData,
                {
                    withCredentials: true, // 👈 if you’re handling cookies in backend
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            toast.success("Signed in successfully!");
            login(response.data.user);
            //console.log("SignIn successful:", response.data);
        } catch (error) {
            toast.error(error.response?.data?.message || "Sign in failed");
            //console.error("Error signing in:", error.response?.data || error.message);
        }
        finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = () => {
        window.location.href = `${BACKEND_URL}/api/auth/google/signin`;
    };

    const handleSendOTP = async (e) => {
        e.preventDefault();
        setForgotLoading(true);
        try {
            await axios.post(
                `${BACKEND_URL}/api/users/forgot-password`,
                { email: forgotEmail },
                {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" }
                }
            );
            toast.success("OTP sent to your email!");
            setForgotStep(2);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send OTP");
        } finally {
            setForgotLoading(false);
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        if (forgotOTP.length !== 6) {
            toast.error("Please enter a 6-digit OTP");
            return;
        }
        setForgotStep(3);
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (newPassword.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }
        setForgotLoading(true);
        try {
            await axios.post(
                `${BACKEND_URL}/api/users/reset-password`,
                { email: forgotEmail, otp: forgotOTP, newPassword },
                {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" }
                }
            );
            toast.success("Password reset successful! Please sign in.");
            setShowForgotModal(false);
            setForgotStep(1);
            setForgotEmail("");
            setForgotOTP("");
            setNewPassword("");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to reset password");
        } finally {
            setForgotLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 transition-colors duration-300">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-blue-500/20 rounded-full filter blur-3xl opacity-40 animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-purple-600/20 rounded-full filter blur-3xl opacity-40 animate-pulse delay-2000"></div>
            </div>
            <div className="relative z-10 w-full max-w-md">
                <div className="bg-white/90 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700/50 rounded-2xl p-8 shadow-2xl shadow-purple-500/10 transition-colors duration-300">
                    <div className="text-center mb-8">
                        <button onClick={() => navigate('/')} className="text-3xl font-bold tracking-wider flex items-center justify-center gap-2 mx-auto text-gray-900 dark:text-white transition-colors">
                            <EyeOff className="text-blue-600 dark:text-blue-400" size={32} />
                            <span>Oview</span>
                        </button>
                        <p className="text-gray-600 dark:text-gray-400 mt-2 transition-colors">Sign in to manage your account.</p>
                    </div>
                    <form className="space-y-6">
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" size={20} />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-700 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all"
                            />
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" size={20} />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-700 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all"
                            />
                        </div>
                        <div className="text-right"><button type="button" onClick={() => setShowForgotModal(true)} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Forgot Password?</button></div>
                        <button type="button" onClick={signInWithUser} className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 text-white font-bold py-3 rounded-lg text-lg transition-all duration-300 shadow-lg shadow-purple-600/20">
                            {loading ? <div className="flex justify-center items-center">
                                <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                            </div> : <>Sign In</>}</button>
                    </form>

                    {/* --- Divider and Google Button --- */}
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300 dark:border-gray-600 transition-colors" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400 transition-colors">OR</span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <button
                                type="button"
                                onClick={handleGoogleSignIn}
                                className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 dark:border-gray-500 rounded-lg shadow-sm bg-white dark:bg-gray-200 text-sm font-medium text-gray-700 dark:text-gray-800 hover:bg-gray-50 dark:hover:bg-gray-300 transition-colors"
                            >
                                <GoogleIcon />
                                <span className="ml-3">Sign In with Google</span>
                            </button>
                        </div>
                    </div>
                    {/* --- End Divider and Google Button --- */}

                    <p className="text-center text-gray-600 dark:text-gray-400 mt-8 transition-colors">No account? <button onClick={() => navigate('/signup')} className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">Sign Up</button></p>
                </div>
            </div>

            {/* Forgot Password Modal */}
            {showForgotModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
                    <div className="bg-white dark:bg-gray-900/90 border border-gray-200 dark:border-gray-700/50 p-8 rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-2xl"></div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Reset Password</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                            {forgotStep === 1 && "Enter your email to receive a reset code"}
                            {forgotStep === 2 && "Enter the 6-digit code sent to your email"}
                            {forgotStep === 3 && "Enter your new password"}
                        </p>

                        {/* Step 1: Email */}
                        {forgotStep === 1 && (
                            <form onSubmit={handleSendOTP} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        value={forgotEmail}
                                        onChange={(e) => setForgotEmail(e.target.value)}
                                        className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="yourname@example.com"
                                        required
                                    />
                                </div>
                                <div className="flex gap-3 justify-end pt-2">
                                    <button type="button" onClick={() => { setShowForgotModal(false); setForgotStep(1); }} className="px-5 py-2.5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors font-medium">Cancel</button>
                                    <button type="submit" disabled={forgotLoading} className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg font-bold transition-all disabled:opacity-50">
                                        {forgotLoading ? "Sending..." : "Send OTP"}
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* Step 2: OTP */}
                        {forgotStep === 2 && (
                            <form onSubmit={handleVerifyOTP} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Enter OTP</label>
                                    <input
                                        type="text"
                                        maxLength="6"
                                        value={forgotOTP}
                                        onChange={(e) => setForgotOTP(e.target.value.replace(/\D/g, ''))}
                                        className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-2xl tracking-widest"
                                        placeholder="000000"
                                        required
                                    />
                                </div>
                                <div className="flex gap-3 justify-end pt-2">
                                    <button type="button" onClick={() => setForgotStep(1)} className="px-5 py-2.5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors font-medium">Back</button>
                                    <button type="submit" className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg font-bold transition-all">Verify</button>
                                </div>
                            </form>
                        )}

                        {/* Step 3: New Password */}
                        {forgotStep === 3 && (
                            <form onSubmit={handleResetPassword} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New Password</label>
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter new password"
                                        required
                                    />
                                </div>
                                <div className="flex gap-3 justify-end pt-2">
                                    <button type="button" onClick={() => setForgotStep(2)} className="px-5 py-2.5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors font-medium">Back</button>
                                    <button type="submit" disabled={forgotLoading} className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg font-bold transition-all disabled:opacity-50">
                                        {forgotLoading ? "Resetting..." : "Reset Password"}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SignInPage;