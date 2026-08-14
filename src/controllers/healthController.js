const getRoot = (req, res) => {
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
};

const getHealth = (req, res) => {
  res.json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date()
  });
};

module.exports = {
  getRoot,
  getHealth
};
