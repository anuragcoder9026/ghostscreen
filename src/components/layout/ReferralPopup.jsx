import React, { useState } from "react";
import { X, Mail, Heart, Copy, Check, Linkedin, } from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";
import { FaTelegramPlane } from "react-icons/fa";
import { toast } from "react-toastify";
import { FRONTEND_URL } from "../../config/api";
import { useAuth } from "../../contexts/AuthContext";

const ReferralPopup = () => {
  const [open, setOpen] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const { user } = useAuth();

  const invitationLink = user?.referralCode
    ? `${FRONTEND_URL}/signup?refer_code=${user.referralCode}`
    : `${FRONTEND_URL}/signup`;

  const handleCopy = (text, setStateFn) => {
    navigator.clipboard.writeText(text);
    setStateFn(true);
    setTimeout(() => setStateFn(false), 1500);
  };

  const shareText = "Join me on GhostScreen and get 50 coins! Use my link:";
  const encodedUrl = encodeURIComponent(invitationLink);
  const encodedText = encodeURIComponent(shareText);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join GhostScreen',
          text: shareText,
          url: invitationLink,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      handleCopy(invitationLink, setCopiedLink);
    }
  };

  const handleLinkedInShare = () => {
    const fullMessage = `${shareText} ${invitationLink}`;
    navigator.clipboard.writeText(fullMessage);
    toast.success("Link copied! Paste it in your message.");
    window.open("https://www.linkedin.com/messaging/compose", "_blank");
  };

  if (!open) return null;

  return (
    <>
      {/* Floating Popup */}
      <div className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-xl shadow-xl shadow-purple-600/20 backdrop-blur-md max-w-sm animate-slide-up z-[9999]">

        {/* Close button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 text-white/70 hover:text-white hover:bg-white/20 rounded-full p-1.5 transition-all"
        >
          <X size={18} />
        </button>

        {/* Icon and Header */}
        <div className="flex items-start gap-3 mb-3">
          <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-lg">
            <Heart className="w-6 h-6 text-white" fill="currentColor" />
          </div>
          <div>
            <p className="font-bold text-lg leading-tight">Refer & Earn Coins!</p>
            <p className="text-white/90 text-sm mt-1">Share the love, get rewarded</p>
          </div>
        </div>

        <p className="text-white/85 text-xs leading-relaxed mb-4 bg-white/10 backdrop-blur-sm p-3 rounded-lg">
          Both you and your friend must have a college email or a paid plan to earn coins.
        </p>

        <button
          onClick={() => setModalOpen(true)}
          className="w-full bg-white text-blue-600 font-bold text-sm py-3 rounded-lg hover:bg-white/95 transition-all duration-300 shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
        >
          🎁 Start Referring
        </button>
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[99999] px-4 py-4">
          <div className="relative bg-white  w-full max-w-sm mx-auto shadow-2xl p-6">

            {/* Close button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition cursor-pointer"
            >
              <X size={24} />
            </button>

            {/* Header text */}
            <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800">
              Refer and earn!
            </h1>
            <p className="text-center text-gray-500 mt-1 text-sm">
              Refer your friends and earn Coins!
            </p>
            <p className="mt-4 text-center text-[13px] text-red-500 font-medium bg-red-50 py-2 px-3 rounded-lg border border-red-200">
              Both Referrer and Referred users must use a valid college email or you must have a paid plan to earn coins on referrals.
            </p>

            {/* Icon */}
            <div className="flex justify-center mt-4 mb-4">
              <div className="relative">
                <div className="bg-purple-100 p-4 rounded-full">
                  <Mail className="text-purple-600 w-8 h-8" />
                </div>
                <div className="absolute -top-2 -right-2 bg-white p-1.5 rounded-full shadow-md">
                  <Heart className="text-red-500 w-5 h-5" fill="currentColor" />
                </div>
              </div>
            </div>

            {/* Section title */}
            <h2 className="text-xl font-semibold text-center text-gray-800">
              Refer Link and Earn Coins
            </h2>
            <p className="text-gray-500 text-center text-sm mt-2">
              Refer Your friends and receive 50 coins in
              credits each time a friend signs up!
            </p>

            {/* FORM */}
            <div className="mt-6 space-y-4">

              {/* Invitation Link */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Invitation Link
                </label>
                <div className="relative">
                  <input
                    readOnly
                    value={invitationLink}
                    className="w-full p-4 pr-12 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => handleCopy(invitationLink, setCopiedLink)}
                    className="absolute inset-y-0 right-0 flex items-center justify-center w-12 text-gray-400 hover:text-purple-600 cursor-pointer"
                  >
                    {copiedLink ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Share Button */}
              <button
                onClick={handleShare}
                className="w-full p-4 py-2 font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg shadow-md hover:opacity-90"
              >
                Share Referral Link
              </button>
            </div>

            {/* SOCIAL ICONS */}
            <div className="flex justify-center mt-4 space-x-6">
              <a
                href={`https://wa.me/?text=${encodedText}%20${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center bg-green-100 rounded-full text-green-600 hover:bg-green-200 transition"
              >
                <BsWhatsapp className="w-5 h-5" />
              </a>
              <button
                onClick={handleLinkedInShare}
                className="w-11 h-11 flex items-center justify-center bg-blue-100 rounded-full text-blue-700 hover:bg-blue-200 transition cursor-pointer"
              >
                <Linkedin className="w-5 h-5" />
              </button>
              <a
                href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center bg-blue-100 rounded-full text-blue-500 hover:bg-blue-200 transition"
              >
                <FaTelegramPlane className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

      )}
    </>
  );
};

export default ReferralPopup;
