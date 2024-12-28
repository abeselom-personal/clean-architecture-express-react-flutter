const { vehicleValidationSchema } = require('../../entities/Vehicle');
const { updateVehicle } = require('../../../infrastructure/repositories/vehicleRepository');

const updateVehicleUseCase = async (id, data) => {
  // Validate partial data
  const validatedData = vehicleValidationSchema.partial().parse(data);

  // Update the vehicle in the repository
  return updateVehicle(id, validatedData);
};

module.exports = updateVehicleUseCase;
