const { vehicleValidationSchema } = require('../../entities/Vehicle');
const { createVehicle } = require('../../../infrastructure/repositories/vehicleRepository');
const path = require('path');

// Updated createVehicleUseCase to handle file upload
const createVehicleUseCase = async (data, file) => {
  // Validate data
  const validatedData = vehicleValidationSchema.parse(data);

  if (file) {
    // Assuming the file is uploaded and saved in the "uploads" folder
    validatedData.avatarPath = `uploads/${file.filename}`; // Save relative file path
  }

  // Save to the repository
  return createVehicle(validatedData, file);
};

module.exports = createVehicleUseCase;
