const TourModel = require('../models/tourModel');

const getAllTours = (req, res) => {
  const { search } = req.query;
  const tours = TourModel.getAll(search);

  res.json({
    success: true,
    count: tours.length,
    data: tours
  });
};

const getTourById = (req, res) => {
  const { id } = req.params;
  const tour = TourModel.getById(id);

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
};

module.exports = {
  getAllTours,
  getTourById
};
