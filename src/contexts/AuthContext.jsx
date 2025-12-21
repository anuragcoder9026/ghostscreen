import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import { BACKEND_URL, FRONTEND_URL } from '../config/api';
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [timeCoins, setTimeCoins] = useState(0);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const isLoggedIn = !!user;
  const navigate = useNavigate(); // Get the navigate function

  useEffect(() => {
    // Fetch profile from backend
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BACKEND_URL}/api/users/profile`, {
          withCredentials: true, // ✅ send cookies automatically
        });
        setUser(res.data.user);
      } catch (error) {
        setUser(null);
      }
      finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);
  const login = (profile) => {
    //console.log(profile);
    setUser(profile);
    setTimeCoins(10);
    navigate('/profile');
  };

  const logout = async () => {
    await fetch(`${BACKEND_URL}/api/users/logout`, {
      method: "POST",
      credentials: "include", // required for cookies
    });
    setUser(null);
    setTimeCoins(0);
    navigate('/'); // Navigate to home page on logout
  };

  const updateUser = (updatedUserData) => {
    setUser(prevUser => ({ ...prevUser, ...updatedUserData }));
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!user, loading, timeCoins, login, logout, user, setUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};