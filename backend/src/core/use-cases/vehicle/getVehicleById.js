const { getVehicleById } = require('../../../infrastructure/repositories/vehicleRepository');

const getVehicleByIdUseCase = async (id) => {
  // Fetch the vehicle by ID
  const vehicle = await getVehicleById(id);

  if (!vehicle) {
    throw new Error('Vehicle not found');
  }

  return vehicle;
};

module.exports = getVehicleByIdUseCase;
