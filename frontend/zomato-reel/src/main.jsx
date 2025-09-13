// filepath: c:\Users\anish\Desktop\Project-Zomato Reels\frontend\zomato-reel\src\index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from 'axios';

// Configure axios to use a deployable backend URL.
// Prefer a Vite env variable (VITE_API_URL) during build, else fallback to your Render URL.
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'https://zomato-reels-backend.onrender.com';
// Keep credentials enabled so cookie-based auth continues to work
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);