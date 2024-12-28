export interface Vehicle {
  _id: string;
  registrationNumber: string;
  model: string;
  make?: string;
  year?: number;
  status: 'Available' | 'In Service' | 'Out of Service'; // You can expand this enum to more status options if needed
  mileage?: number;
  fuelType?: 'Petrol' | 'Diesel' | 'Electric'; // You can expand this to include more fuel types
  currentLocation?: string;
  group: string; // This is an ObjectId of VehicleGroup, so it's just a string here
  createdAt: string;
  updatedAt: string;
}

export interface CreateVehicleInput {
  registrationNumber: string;
  model: string;
  make?: string;
  year?: number;
  status?: 'Available' | 'In Service' | 'Out of Service';
  mileage?: number;
  fuelType?: 'Petrol' | 'Diesel' | 'Electric';
  currentLocation?: string;
  group: string; // This should be the ObjectId of a VehicleGroup
}

export interface UpdateVehicleInput {
  status?: 'Available' | 'In Service' | 'Out of Service';
  mileage?: number;
  fuelType?: 'Petrol' | 'Diesel' | 'Electric';
  currentLocation?: string;
}

export const statuses = [
  {
    value: "Available",
    label: "Available",
    icon: null, // Add an icon if needed, e.g., a checkmark or vehicle icon
  },
  {
    value: "In Maintenance",
    label: "In Maintenance",
    icon: null, // Add an icon if needed
  },
  {
    value: "Unavailable",
    label: "Unavailable",
    icon: null, // Add an icon if needed
  },

];
