const tours = require('../data/tours');

class TourModel {
  static getAll(search) {
    if (!search) {
      return tours;
    }
    const query = search.toLowerCase();
    return tours.filter(tour =>
      tour.title.toLowerCase().includes(query) ||
      tour.location.toLowerCase().includes(query)
    );
  }

  static getById(id) {
    return tours.find(tour => tour.id === id);
  }
}

module.exports = TourModel;
