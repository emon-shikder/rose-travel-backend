const notFoundMiddleware = (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API Route Not Found'
  });
};

module.exports = notFoundMiddleware;
