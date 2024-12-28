// stores/vehicleStore.ts
import { create } from "zustand";

interface VehicleStore {
  queryParams: Record<string, any>;
  setFilter: (key: string, value: any) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  resetFilters: () => void;
}

export const useVehicleStore = create<VehicleStore>((set) => ({
  queryParams: { page: 1, limit: 10 }, // Initial state
  setFilter: (key, value) =>
    set((state) => ({
      queryParams: { ...state.queryParams, [key]: value, page: 1 }, // Reset page when filters change
    })),
  setPage: (page) =>
    set((state) => ({ queryParams: { ...state.queryParams, page } })),
  setLimit: (limit) =>
    set((state) => ({ queryParams: { ...state.queryParams, limit } })),
  resetFilters: () =>
    set(() => ({
      queryParams: { page: 1, limit: 10 }, // Reset to default
    })),
}));
