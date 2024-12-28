// services/vehicleService.ts

import axios from "@/utils/axiosInstance";
import {
  Vehicle,
  CreateVehicleInput,
} from "@/types/vehicle";
import { useMutation, useQuery, useQueryClient,keepPreviousData } from "@tanstack/react-query";
import { useVehicleStore } from "@/stores/vehicleStore";


// Get a vehicle by ID
export const getVehicleById = async (id: string) => {
  const response = await axios.get(`/vehicles/${id}`);
  return response.data;
};

// Create a vehicle
export const createVehicle = async (vehicleData: FormData) => {
  console.log("🚀 ~ createVehicle ~ vehicleData:", vehicleData);
  vehicleData.forEach((value, key) => {
    console.log(`${key}: ${value}`);
  });
  const headers = {
    'Content-Type': 'multipart/form-data', 
  };

  const response = await axios.post("/vehicles", vehicleData, { headers });
  return response.data;
};


// Update a vehicle
export const updateVehicle = async (
data: Vehicle) => {
  const response = await axios.put(`/vehicles/${data._id}`, data.vehicleData);
  return response.data;
};

// Delete a vehicle
export const deleteVehicle = async (id: string) => {
  const response = await axios.delete(`/vehicles/${id}`);
  return response.data;
};

// React Query hooks to manage server state

const fetchVehicles = async (queryParams: Record<string, any>) => {
  const response = await axios.get("/vehicles", { params: queryParams });
  return response.data;
};

// Hook to fetch vehicles using queryParams from the store
export const useVehicles = () => {
  const queryParams = useVehicleStore((state) => state.queryParams);

  return useQuery({
    queryKey: ["vehicles", queryParams],
    queryFn: () => fetchVehicles(queryParams),
    placeholderData:keepPreviousData, 
  });
};
// Hook to get a specific vehicle by ID
export const useVehicle = (id: string) => {
  return useQuery<Vehicle>({
    queryKey: ["vehicle", id],
    queryFn: () => getVehicleById(id),
  });
};

// Hook to create a new vehicle
export const useCreateVehicle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createVehicle,
    onSuccess: () => {
      // Invalidate the vehicles query to refetch and keep the cache updated
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    },
  });
};

// Hook to update an existing vehicle
export const useUpdateVehicle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateVehicle,
    onSuccess: () => {
      // Invalidate the specific vehicle query
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    },
  });
};

// Hook to delete a vehicle
export const useDeleteVehicle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteVehicle,
    onSuccess: () => {
      // Invalidate the vehicles query to refetch and keep the cache updated
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    },
  });
};
