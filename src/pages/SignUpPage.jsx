import React, { useRef, useState, useEffect } from 'react';
import { Mail, Lock, User, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import { BACKEND_URL, FRONTEND_URL } from '../config/api';
const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12
        c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,
        20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,
        6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.619-3.317-11.283-7.946
        l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.99,36.566,44,30.857,
        44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
    </svg>
);

const SignUpPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        referralCode: "",
    });

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const errorMsg = params.get("error");
        const referCode = params.get("refer_code");

        if (errorMsg) {
            toast.error(errorMsg);
        }
        if (referCode) {
            setFormData(prev => ({ ...prev, referralCode: referCode }));
        }
    }, [location]);

    const [showOtp, setShowOtp] = useState(false);
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);

    // OTP input refs
    const inputRefs = Array.from({ length: 6 }, () => useRef());

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const signUpWithUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(
                `${BACKEND_URL}/api/users/sign-up-user`,
                formData,
                {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" },
                }
            );
            setShowOtp(true);
            toast.success("OTP sent to your email. Verify to complete signup.");
        } catch (err) {
            toast.error(err.response?.data?.message || "Error signing up");
        }
        finally {
            setLoading(false);
        }
    };

    // -------- OTP HANDLERS (Perfect Logic) ----------
    const handleOtpChange = (e, index) => {
        const value = e.target.value;

        if (value && !/^[0-9]$/.test(value)) return;

        let otpArray = otp.split("");
        otpArray[index] = value;
        setOtp(otpArray.join(""));

        // Move to next input
        if (value && index < 5) {
            inputRefs[index + 1].current.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            let otpArray = otp.split("");

            // If current box has value, clear it
            if (otpArray[index]) {
                otpArray[index] = "";
                setOtp(otpArray.join(""));
                return;
            }

            // If empty → go to previous
            if (index > 0) {
                inputRefs[index - 1].current.focus();
            }
        }
    };
    // ------------------------------------------------
    const verifyOTP = async () => {
        setLoading(true);
        try {
            //console.log(otp);
            if (!otp || otp.length < 6) {
                return toast.error("OTP must be 6 digits");
            }
            const response = await axios.post(
                `${BACKEND_URL}/api/users/verify-otp`,
                {
                    email: formData?.email,
                    otp: otp,
                },
                {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" },
                }
            );
            toast.success("Email verified successfully!");
            login(response.data.user);
        } catch (err) {
            toast.error(err.response?.data?.msg || "Error verifying OTP");
        }
        finally {
            setLoading(false);
        }
    }

    const resendOTP = async () => {
        try {
            await axios.post(
                `${BACKEND_URL}/api/users/resend-otp`,
                { email: formData?.email },
                {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" },
                }
            );
            toast.success("OTP resent to your email.");
        } catch (err) {
            toast.error(err.response?.data?.msg || "Error resending OTP");
        }
    }

    const handleGoogleSignUp = () => {
        const referralCode = formData.referralCode;
        window.location.href = `${BACKEND_URL}/api/auth/google/signup?referralCode=${referralCode}`;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 transition-colors duration-300">

            {/* beautiful glowing background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-500/20 rounded-full blur-3xl opacity-40 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-600/20 rounded-full blur-3xl opacity-40 animate-pulse delay-2000"></div>
            </div>

            {/* ------------------ SIGNUP FORM ------------------ */}
            {!showOtp ? (
                <div className="relative z-10 w-full max-w-md">
                    <div className="bg-white/90 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700/50 rounded-2xl p-8 shadow-2xl shadow-blue-500/10 transition-colors duration-300">

                        <div className="text-center mb-8">
                            <button onClick={() => navigate('/')} className="text-3xl font-bold tracking-wider flex items-center justify-center gap-2 mx-auto text-gray-900 dark:text-white transition-colors">
                                <EyeOff className="text-blue-600 dark:text-blue-400" size={32} />
                                <span>GhostScreen</span>
                            </button>
                            <p className="text-gray-600 dark:text-gray-400 mt-2 transition-colors">Create an account to get your unique token.</p>
                        </div>

                        <form className="space-y-6">
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" size={20} />
                                <input type="text" name="name" value={formData.name} onChange={handleChange}
                                    placeholder="Full Name"
                                    className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-700 rounded-lg py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all" />
                            </div>

                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" size={20} />
                                <input type="email" name="email" value={formData.email} onChange={handleChange}
                                    placeholder="Email"
                                    className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-700 rounded-lg py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all" />
                            </div>

                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" size={20} />
                                <input type="password" name="password" value={formData.password} onChange={handleChange}
                                    placeholder="Password"
                                    className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-700 rounded-lg py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all" />
                            </div>

                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" size={20} />
                                <input type="text" name="referralCode" value={formData.referralCode} onChange={handleChange}
                                    placeholder="Referral Code (Optional)"
                                    className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-700 rounded-lg py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all" />
                            </div>

                            <button type="button" onClick={signUpWithUser}
                                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 rounded-lg text-lg shadow-lg shadow-purple-600/20">
                                {loading ? <div className="flex justify-center items-center">
                                    <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                                </div>
                                    : <>Sign Up</>}
                            </button>
                        </form>

                        <div className="mt-6">
                            <div className="relative flex justify-center text-sm mb-4">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300 dark:border-gray-600 transition-colors" />
                                </div>
                                <span className="relative bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400 transition-colors">OR</span>
                            </div>

                            <button onClick={handleGoogleSignUp}
                                className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 dark:border-gray-500 rounded-lg bg-white dark:bg-gray-200 text-gray-700 dark:text-gray-800 hover:bg-gray-50 dark:hover:bg-gray-300 transition-colors">
                                <GoogleIcon />
                                <span className="ml-3">Sign Up with Google</span>
                            </button>
                        </div>

                        <p className="text-center text-gray-600 dark:text-gray-400 mt-8 transition-colors">
                            Already have an account?
                            <button onClick={() => navigate('/signin')} className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"> Sign In</button>
                        </p>

                    </div>
                </div>
            ) :

                /* ------------------ OTP SCREEN ------------------ */
                (
                    <div className="mt-8 bg-white/90 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl p-6 animate-slide-up z-10 relative transition-colors duration-300">

                        <h2 className="text-center text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4 transition-colors">Verify Your Email</h2>

                        <p className="text-center text-gray-600 dark:text-gray-400 mb-6 transition-colors">
                            Enter the 6-digit OTP sent to <span className="text-blue-600 dark:text-blue-300">{formData.email}</span>
                        </p>

                        <div className="flex justify-between gap-2">
                            {[0, 1, 2, 3, 4, 5].map((i) => (
                                <input
                                    key={i}
                                    ref={inputRefs[i]}
                                    maxLength="1"
                                    type="text"
                                    value={otp[i] || ""}
                                    onChange={(e) => handleOtpChange(e, i)}
                                    onKeyDown={(e) => handleKeyDown(e, i)}
                                    className="w-12 h-12 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-center text-xl text-gray-900 dark:text-white rounded-lg transition-all"
                                />
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={verifyOTP}
                            className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 rounded-lg text-lg shadow-lg shadow-purple-600/20">
                            {loading ? <div className="flex justify-center items-center">
                                <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                            </div> : <>Verify OTP</>}
                        </button>

                        <p className="text-center text-gray-600 dark:text-gray-400 mt-4 transition-colors">
                            Didn’t receive the OTP?
                            <button onClick={resendOTP} className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"> Resend</button>
                        </p>
                    </div>
                )}

        </div>
    );
};

export default SignUpPage;
