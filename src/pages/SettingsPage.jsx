import React, { useState, useRef } from 'react';
import { User, Shield, CreditCard, Bell, Save, Upload, Lock, LogOut, ExternalLink, Key, Palette } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import API_URL from '../config/api';

// Reusable component for TOP TAB navigation items
const TabNavItem = ({ icon, label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-t-lg border-b-2 transition-colors duration-200 ${isActive
            ? 'border-blue-500 text-blue-600 dark:text-white'
            : 'border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-500 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
    >
        {icon}
        <span>{label}</span>
    </button>
);


// Reusable component for section headers
const SectionHeader = ({ title, description }) => (
    <div className="pb-4">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">{description}</p>
    </div>
);

// Reusable input field component
const InputField = ({ label, type = 'text', defaultValue, disabled = false }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">{label}</label>
        <input
            type={type}
            defaultValue={defaultValue}
            disabled={disabled}
            className="w-full bg-white dark:bg-gray-900/50 border border-gray-300 dark:border-gray-700 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 dark:text-white"
        />
    </div>
);

const SettingsPage = ({ handleQuickAction }) => {
    const [activeTab, setActiveTab] = useState('profile');

    const renderContent = () => {
        switch (activeTab) {
            case 'profile': return <ProfileSettings />;
            case 'security': return <SecuritySettings />;
            case 'billing': return <BillingSettings handleQuickAction={handleQuickAction} />;
            case 'notifications': return <NotificationSettings />;
            default: return <ProfileSettings />;
        }
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen transition-colors duration-300">
            <div className="container mx-auto px-4 py-8 ">
                <header className="mb-8">
                    <h1 className="text-4xl font-bold tracking-tight">Settings</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your account settings, preferences, and more.</p>
                </header>

                {/* --- Tab Navigation --- */}
                <div className="border-b border-gray-200 dark:border-gray-700/50 mb-8">
                    <nav className="flex flex-wrap -mb-px space-x-2">
                        <TabNavItem icon={<User size={18} />} label="Profile" isActive={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
                        <TabNavItem icon={<Shield size={18} />} label="Security" isActive={activeTab === 'security'} onClick={() => setActiveTab('security')} />
                        <TabNavItem icon={<CreditCard size={18} />} label="Billing" isActive={activeTab === 'billing'} onClick={() => setActiveTab('billing')} />
                        <TabNavItem icon={<Bell size={18} />} label="Notifications" isActive={activeTab === 'notifications'} onClick={() => setActiveTab('notifications')} />
                    </nav>
                </div>

                {/* --- Main Content Area --- */}
                <main>
                    <div className="bg-white dark:bg-gray-800/30 backdrop-blur-sm border border-gray-200 dark:border-gray-700/50 rounded-2xl p-4 sm:p-8 shadow-sm dark:shadow-none">
                        {renderContent()}
                    </div>
                </main>
            </div>
        </div>
    );
};

// --- Sub-components for each settings section ---

const ProfileSettings = () => {
    const { user, updateUser } = useAuth();
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [name, setName] = useState(user?.name || "");
    const [username, setUsername] = useState(user?.username || "");
    const fileInputRef = useRef(null);

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file size (10MB)
            if (file.size > 10 * 1024 * 1024) {
                toast.error('File size must be less than 10MB');
                return;
            }

            // Validate file type
            if (!['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(file.type)) {
                toast.error('Only JPEG, JPG, PNG, and GIF images are allowed');
                return;
            }

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);

            // Upload immediately
            handleUpload(file);
        }
    };

    const handleUpload = async (file) => {
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('profilePicture', file);

            const response = await axios.post(
                `${API_URL}/api/users/upload-profile-picture`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            // Update user context with new profile picture
            updateUser({ profilePicture: response.data.profilePicture });
            setPreviewImage(null);
            toast.success('Profile picture updated successfully!');
        } catch (error) {
            console.error('Upload error:', error);
            toast.error(error.response?.data?.message || 'Failed to upload profile picture');
            setPreviewImage(null);
        } finally {
            setUploading(false);
        }
    };

    const handleSaveChanges = async () => {
        if (!name || name.trim() === "") {
            toast.error('Name cannot be empty');
            return;
        }

        if (!username || username.trim() === "") {
            toast.error('Username cannot be empty');
            return;
        }

        // Basic username validation
        if (!/^[a-z0-9_]+$/.test(username)) {
            toast.error('Username can only contain lowercase letters, numbers, and underscores');
            return;
        }

        setSaving(true);
        try {
            const response = await axios.put(
                `${API_URL}/api/users/update-profile`,
                { name: name.trim(), username: username.trim() },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            // Update user context with new name and username
            updateUser({ name: response.data.user.name, username: response.data.user.username });
            toast.success('Profile updated successfully!');
        } catch (error) {
            console.error('Update error:', error);
            toast.error(error.response?.data?.message || 'Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    return (
        <section className="space-y-8 animate-fade-in">
            <SectionHeader title="Profile" description="This information will be displayed publicly." />
            <div className="flex items-center gap-6">
                <img
                    src={previewImage || user?.profilePicture || "https://placehold.co/96x96/8B5CF6/FFFFFF?text=A"}
                    alt="User Avatar"
                    className="w-24 h-24 rounded-full ring-4 ring-gray-700 object-cover"
                />
                <div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/gif"
                        onChange={handleFileSelect}
                        className="hidden"
                    />
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="flex items-center gap-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg py-2 px-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {uploading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Uploading...
                            </>
                        ) : (
                            <>
                                <Upload size={16} /> Upload Picture
                            </>
                        )}
                    </button>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">PNG, JPG, GIF up to 10MB.</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">Full Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white dark:bg-gray-900/50 border border-gray-300 dark:border-gray-700 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 dark:text-white"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value.toLowerCase())}
                        className="w-full bg-white dark:bg-gray-900/50 border border-gray-300 dark:border-gray-700 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 dark:text-white"
                    />
                </div>
            </div>
            <InputField label="Email Address" type="email" defaultValue={user?.email || "user@example.com"} disabled />
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">Timezone</label>
                <div className="w-full bg-gray-100 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-700 rounded-lg py-2.5 px-4 text-gray-900 dark:text-white">
                    {(() => {
                        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                        const now = new Date();
                        const offset = -now.getTimezoneOffset() / 60;
                        const offsetStr = `GMT${offset >= 0 ? '+' : ''}${offset}:00`;
                        return `${timezone} (${offsetStr})`;
                    })()}
                </div>
            </div>
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700/50 flex justify-end">
                <button
                    onClick={handleSaveChanges}
                    disabled={saving}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-5 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {saving ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save size={18} /> Save Changes
                        </>
                    )}
                </button>
            </div>
            <style>{`@keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } } .animate-fade-in { animation: fade-in 0.5s ease-in-out; }`}</style>
        </section>
    );
};

const SecuritySettings = () => {
    const { user, updateUser } = useAuth();
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [passwordWasSet, setPasswordWasSet] = useState(false);
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: ''
    });

    // Check if user has password (from backend hasPassword field or if just set)
    const hasPassword = passwordWasSet || user?.hasPassword;

    const handlePasswordChange = async () => {
        // Validation
        if (!hasPassword && !passwords.newPassword) {
            toast.error('Please enter a new password');
            return;
        }

        if (hasPassword && !passwords.currentPassword) {
            toast.error('Please enter your current password');
            return;
        }

        if (!passwords.newPassword) {
            toast.error('Please enter a new password');
            return;
        }

        if (passwords.newPassword.length < 6) {
            toast.error('Password must be at least 6 characters long');
            return;
        }

        setUpdating(true);
        try {
            const response = await axios.put(
                `${API_URL}/api/users/change-password`,
                {
                    currentPassword: hasPassword ? passwords.currentPassword : null,
                    newPassword: passwords.newPassword
                },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            toast.success('Password updated successfully!');
            setIsChangingPassword(false);
            setPasswords({ currentPassword: '', newPassword: '' });

            // Mark that password has been set and update user context
            setPasswordWasSet(true);
            updateUser({ password: 'set' }); // Update context to indicate password exists
        } catch (error) {
            console.error('Change password error:', error);
            toast.error(error.response?.data?.message || 'Failed to update password');
        } finally {
            setUpdating(false);
        }
    };

    return (
        <section className="space-y-8 animate-fade-in">
            <SectionHeader title="Security" description="Manage your password, 2FA, and active sessions." />

            {/* --- Password Section --- */}
            <div className="bg-white dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700/50 shadow-sm dark:shadow-none">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Password</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {hasPassword ? 'Last changed on 15th Oct 2025' : 'Set a password for your account'}
                        </p>
                    </div>
                    {!isChangingPassword && (
                        <button
                            onClick={() => setIsChangingPassword(true)}
                            className="text-sm mt-4 sm:mt-0 font-semibold text-white bg-gray-700 hover:bg-gray-600 rounded-lg py-2 px-5 transition-colors"
                        >
                            {hasPassword ? 'Change Password' : 'Set Password'}
                        </button>
                    )}
                </div>

                {/* --- Change Password Form (Conditional) --- */}
                {isChangingPassword && (
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700/50 space-y-4 animate-fade-in-down">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">
                                    Current Password {!hasPassword && <span className="text-xs text-gray-500">(Not required - Google account)</span>}
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
                                    <input
                                        type="password"
                                        placeholder={hasPassword ? "••••••••" : "N/A"}
                                        value={passwords.currentPassword}
                                        onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                                        disabled={!hasPassword}
                                        className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-600 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">New Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        value={passwords.newPassword}
                                        onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                                        className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-600 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 pt-2">
                            <button
                                onClick={() => {
                                    setIsChangingPassword(false);
                                    setPasswords({ currentPassword: '', newPassword: '' });
                                }}
                                disabled={updating}
                                className="text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg py-2 px-5 transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handlePasswordChange}
                                disabled={updating}
                                className="text-sm font-semibold text-white bg-green-600 hover:bg-green-700 rounded-lg py-2 px-5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {updating ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Updating...
                                    </>
                                ) : (
                                    'Update'
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* --- Extra Security Section --- */}
            <div className="bg-white dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700/50 flex items-center justify-between shadow-sm dark:shadow-none">
                <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Extra Security</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {user?.extra_security ? 'Extra security is currently enabled' : 'Enable additional security measures for your account'}
                    </p>
                </div>
                <button
                    onClick={async () => {
                        try {
                            const response = await axios.put(
                                `${API_URL}/api/users/toggle-extra-security`,
                                {},
                                {
                                    withCredentials: true,
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                }
                            );
                            updateUser({ extra_security: response.data.user.extra_security });
                            toast.success(response.data.message);
                        } catch (error) {
                            console.error('Toggle extra security error:', error);
                            toast.error(error.response?.data?.message || 'Failed to toggle extra security');
                        }
                    }}
                    className={`text-sm font-semibold text-white rounded-lg py-2 px-5 transition-colors ${user?.extra_security
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                >
                    {user?.extra_security ? 'Disable' : 'Enable'}
                </button>
            </div>

            <style>{`
                @keyframes fade-in-down { 
                    0% { opacity: 0; transform: translateY(-10px); } 
                    100% { opacity: 1; transform: translateY(0); } 
                }
                .animate-fade-in-down { 
                    animation: fade-in-down 0.5s ease-in-out; 
                }
            `}</style>
        </section>
    );
};


const BillingSettings = ({ handleQuickAction }) => (
    <section className="space-y-8 animate-fade-in">
        <SectionHeader title="Billing" description="Manage your Time Coin balance and payment history." />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-r from-blue-500/30 to-purple-600/30 p-6 rounded-xl border border-blue-500/50 flex flex-col justify-between">
                <div>
                    <p className="text-sm text-blue-200">Current Balance</p>
                    <p className="text-5xl font-bold text-white mt-2">120 Coins</p>
                    <p className="text-sm text-gray-300 mt-1">1 Coin = 1 Hour of Stealth Time</p>
                </div>
                <button onClick={() => handleQuickAction('purchase')} className="mt-6 w-full text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg py-2.5 px-5 transition-colors">Purchase More Coins</button>
            </div>
            <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Payment History</h3>
                <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                    {/* Payment items */}
                    <div className="flex items-center justify-between text-sm p-3 bg-white dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-800">
                        <div>
                            <p className="text-gray-900 dark:text-gray-300">Purchase of 500 Coins</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">12th Sep 2025</p>
                        </div>
                        <div className="text-right">
                            <p className="font-semibold text-gray-900 dark:text-white">$20.00</p>
                            <a href="#" className="text-xs text-blue-600 dark:text-blue-400 hover:underline">Invoice</a>
                        </div>
                    </div>
                    <div className="flex items-center justify-between text-sm p-3 bg-white dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-800">
                        <div>
                            <p className="text-gray-900 dark:text-gray-300">Purchase of 100 Coins</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">1st Aug 2025</p>
                        </div>
                        <div className="text-right">
                            <p className="font-semibold text-gray-900 dark:text-white">$5.00</p>
                            <a href="#" className="text-xs text-blue-600 dark:text-blue-400 hover:underline">Invoice</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);



const NotificationSettings = () => {
    const { user, updateUser } = useAuth();
    const [notifications, setNotifications] = useState({
        productUpdates: user?.notifications?.productUpdates ?? true,
        accountActivity: user?.notifications?.accountActivity ?? true,
        lowCoinBalance: user?.notifications?.lowCoinBalance ?? false
    });

    const handleToggle = async (field) => {
        const newNotifications = {
            ...notifications,
            [field]: !notifications[field]
        };

        setNotifications(newNotifications);

        try {
            const response = await axios.put(
                `${API_URL}/api/users/update-notifications`,
                { notifications: newNotifications },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            updateUser({ notifications: response.data.user.notifications });
            toast.success('Notification preferences updated');
        } catch (error) {
            console.error('Update notifications error:', error);
            toast.error(error.response?.data?.message || 'Failed to update notifications');
            // Revert on error
            setNotifications({
                ...notifications,
                [field]: notifications[field]
            });
        }
    };

    return (
        <section className="space-y-6 animate-fade-in">
            <SectionHeader title="Notifications" description="Manage how you receive notifications." />
            <div className="divide-y divide-gray-200 dark:divide-gray-700/50">
                <div className="py-4 flex items-center justify-between">
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Product Updates</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Get notified about new features and updates.</p>
                    </div>
                    <ToggleSwitch
                        checked={notifications.productUpdates}
                        onChange={() => handleToggle('productUpdates')}
                    />
                </div>
                <div className="py-4 flex items-center justify-between">
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Account Activity</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Get notified about important account activities.</p>
                    </div>
                    <ToggleSwitch
                        checked={notifications.accountActivity}
                        onChange={() => handleToggle('accountActivity')}
                    />
                </div>
                <div className="py-4 flex items-center justify-between">
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Low Coin Balance</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Get a warning when your Time Coins are running low.</p>
                    </div>
                    <ToggleSwitch
                        checked={notifications.lowCoinBalance}
                        onChange={() => handleToggle('lowCoinBalance')}
                    />
                </div>
            </div>
        </section>
    );
};

const ToggleSwitch = ({ checked = false, onChange }) => (
    <label className="flex items-center cursor-pointer">
        <div className="relative">
            <input
                type="checkbox"
                className="sr-only"
                checked={checked}
                onChange={onChange}
            />
            <div className="block bg-gray-200 dark:bg-gray-600 w-14 h-8 rounded-full transition-colors"></div>
            <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform shadow-md"></div>
        </div>
        <style>{`
            input:checked ~ .dot { transform: translateX(100%); }
            input:checked ~ .block { background-color: #3b82f6; }
        `}</style>
    </label>
);

export default SettingsPage;

