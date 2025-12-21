// API Configuration
// In production (Vercel), use VITE_API_URL from environment variables
// In development, default to localhost
const API_URL = import.meta.env.VITE_API_URL ||
    (import.meta.env.MODE === 'production'
        ? 'https://ghostscreen-backend.onrender.com'
        : 'http://localhost:8000');

export default API_URL;
