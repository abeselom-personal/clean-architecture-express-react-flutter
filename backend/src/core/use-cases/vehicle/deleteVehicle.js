const { deleteVehicle } = require('../../../infrastructure/repositories/vehicleRepository');

const deleteVehicleUseCase = async (id) => {
  // Delete the vehicle in the repository
  const deletedVehicle = await deleteVehicle(id);

  if (!deletedVehicle) {
    throw new Error('Vehicle not found');
  }

  return deletedVehicle;
};

module.exports = deleteVehicleUseCase;
