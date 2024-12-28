import { z } from "zod";

export const vehicleSchema = z.object({
  _id: z.string(), // Vehicle's unique ID
  registrationNumber: z.string(), // Unique registration number
  model: z.string(), // Vehicle model
  make: z.string().optional(), // Vehicle make (optional)
  year: z.number().optional(), // Year of manufacture (optional)
  status: z.string(), // Status of the vehicle (e.g., Available, In Service)
  mileage: z.number().optional(), // Mileage (optional)
  fuelType: z.string().optional(), // Fuel type (e.g., Diesel, Petrol) (optional)
  currentL1ocation: z.string().optional(), // Current location of the vehicle (optional)
  group: z.string().optional(), // Vehicle group ID (optional)
});

export type Vehicle = z.infer<typeof vehicleSchema>;
