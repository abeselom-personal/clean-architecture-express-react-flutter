const createVehicleUseCase = require('../../core/use-cases/vehicle/createVehicle');
const getVehiclesUseCase = require('../../core/use-cases/vehicle/getVehicles');
const getVehicleByIdUseCase = require('../../core/use-cases/vehicle/getVehicleById');
const updateVehicleUseCase = require('../../core/use-cases/vehicle/updateVehicle');
const deleteVehicleUseCase = require('../../core/use-cases/vehicle/deleteVehicle');

// Create Vehicle
const createVehicle = async (req, res) => {
  try {
    const vehicle = await createVehicleUseCase(req.body,req.file);
    res.status(201).json({ success: true, data: vehicle });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get Vehicles with Pagination
const getVehicles = async (req, res) => {
  try {
    const { page, limit, ...filter } = req.query;

    const result = await getVehiclesUseCase(filter, page, limit);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.log("🚀 ~ getVehicles ~ error:", error)
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get Vehicle by ID
const getVehicleById = async (req, res) => {
  try {
    const vehicle = await getVehicleByIdUseCase(req.params.id);
    res.status(200).json({ success: true, data: vehicle });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

// Update Vehicle
const updateVehicle = async (req, res) => {
  try {
    const vehicle = await updateVehicleUseCase(req.params.id, req.body);
    res.status(200).json({ success: true, data: vehicle });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete Vehicle
const deleteVehicle = async (req, res) => {
  try {
    await deleteVehicleUseCase(req.params.id);
    res.status(200).json({ success: true, message: 'Vehicle deleted successfully' });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

module.exports = {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
};
