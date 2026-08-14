const express = require('express');
const cors = require('cors');
require('dotenv').config();

const toursData = require('./data/tours');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Root Route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to RoseTravel API',
    status: 'Running',
    endpoints: {
      health: '/api/health',
      tours: '/api/tours',
      contact: 'POST /api/contact'
    }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date()
  });
});

// Get all tours (with optional search)
app.get('/api/tours', (req, res) => {
  const { search } = req.query;

  if (search) {
    const filtered = toursData.filter(tour =>
      tour.title.toLowerCase().includes(search.toLowerCase()) ||
      tour.location.toLowerCase().includes(search.toLowerCase())
    );
    return res.json({
      success: true,
      count: filtered.length,
      data: filtered
    });
  }

  res.json({
    success: true,
    count: toursData.length,
    data: toursData
  });
});

// Get single tour by ID
app.get('/api/tours/:id', (req, res) => {
  const { id } = req.params;
  const tour = toursData.find(t => t.id === id);

  if (!tour) {
    return res.status(404).json({
      success: false,
      message: `Tour with ID '${id}' not found.`
    });
  }

  res.json({
    success: true,
    data: tour
  });
});

// Handle contact form submissions
app.post('/api/contact', (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, and message are required fields.'
    });
  }

  console.log('New Contact Form Submission:', { name, email, phone, message });

  res.status(201).json({
    success: true,
    message: 'Thank you for reaching out! We will contact you soon.',
    receivedData: { name, email, phone, message }
  });
});

// Handle 404 routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API Route Not Found'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 RoseTravel Backend running on http://localhost:${PORT}`);
});
