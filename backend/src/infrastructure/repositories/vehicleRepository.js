const Vehicle = require("../database/models/VehicleModel");

const createVehicle = async (data) => new Vehicle(data).save();

const updateVehicle = async (id, data) =>
  Vehicle.findByIdAndUpdate(id, data, { new: true });

const getVehicles = async (filter = {}, page = 1, limit = 10) => {
  // If filter has search text, use $text for case-insensitive, word order-insensitive search
  const textSearch = filter.registrationNumber ? {
    $text: { $search: filter.registrationNumber }
  } : {};

  // Combine the text search filter with any other filters
  const combinedFilter = { ...filter, ...textSearch };

  console.log("🚀 ~ getVehicles ~ combinedFilter:", combinedFilter);

  return Vehicle.find(combinedFilter)
    .skip((page - 1) * limit)
    .limit(limit)
    .exec();
};


const getTotalVehicles = async (filter = {}) =>
  Vehicle.countDocuments(filter);

const deleteVehicle = async (id) => Vehicle.findByIdAndDelete(id);

const getVehicleById = async (id) => Vehicle.findById(id);

module.exports = {
  createVehicle,
  updateVehicle,
  getTotalVehicles,
  getVehicles,
  deleteVehicle,
  getVehicleById,
};
