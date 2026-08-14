const express = require('express');
const cors = require('cors');
require('dotenv').config();

const loggerMiddleware = require('./src/middlewares/loggerMiddleware');
const notFoundMiddleware = require('./src/middlewares/notFoundMiddleware');
const { getRoot } = require('./src/controllers/healthController');
const apiRoutes = require('./src/routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

// Root route
app.get('/', getRoot);

// API Routes (/api/health, /api/tours, /api/contact)
app.use('/api', apiRoutes);

// 404 Handler
app.use(notFoundMiddleware);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 RoseTravel Backend running on http://localhost:${PORT}`);
});
