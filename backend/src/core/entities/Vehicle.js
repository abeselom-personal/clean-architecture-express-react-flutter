const { z } = require('zod');

// Define the most common fuel types
const commonFuelTypes = [
  'Gasoline',
  'Diesel',
  'Electricity',
  'Hybrid',
  'CNG',   // Compressed Natural Gas
  'LPG',   // Liquefied Petroleum Gas
  'Ethanol', // E85
];

// Create the vehicle validation schema
const vehicleValidationSchema = z.object({
  registrationNumber: z.string().nonempty({ message: 'Registration number is required' }),
  model: z.string().nonempty({ message: 'Model is required' }),
  make: z.string().optional(),
  year: z.string().optional(),
  status: z.enum(['Available', 'Unavailable', 'In Maintenance']).optional(),
  mileage: z.string().optional(),
  fuelType: z.enum(commonFuelTypes).optional(), // Validates only the common fuel types
  currentLocation: z.string().optional(),
  group: z.string().optional(),
});

module.exports = { vehicleValidationSchema };
