const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ==========================================
// MIDDLEWARE (ORDER MATTERS CRITICALLY HERE)
// ==========================================

// 1. Enable CORS so your Vite frontend (port 5174) can talk to your backend (port 5000)
app.use(cors());

// 2. Parse incoming JSON payloads. WITHOUT THIS, req.body is undefined, 
// causing the "Could not save item" validation error!
app.use(express.json());

// ==========================================
// ROUTES
// ==========================================
const groceryRoutes = require('./routes/groceryRoutes');
app.use('/api/groceries', groceryRoutes);

// ==========================================
// DATABASE CONNECTION
// ==========================================
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));

// ==========================================
// SERVER STARTUP
// ==========================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server on port ${PORT}`);
});