require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { testConnection } = require('./config/db');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const authRoutes = require('./routes/auth');
const subjectRoutes = require('./routes/subjects');
const videoRoutes = require('./routes/videos');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check - Updated for clarity
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    success: true,
    message: 'LMS Backend Service is operational', 
    timestamp: new Date().toISOString() 
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/videos', videoRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    // Ensuring DB connection is verified before starting the server
    await testConnection();
    console.log('✅ Database connection established successfully.');

    app.listen(PORT, () => {
      console.log(`--- LMS Service Startup ---`);
      console.log(`Status: Running`);
      console.log(`Port:   ${PORT}`);
      console.log(`Mode:   ${process.env.NODE_ENV || 'development'}`);
      console.log(`URL:    http://localhost:${PORT}`);
      console.log(`---------------------------`);
    });
  } catch (error) {
    console.error('❌ Failed to start the server due to database connection error:', error.message);
    process.exit(1); // Exit process with failure
  }
};

start();
