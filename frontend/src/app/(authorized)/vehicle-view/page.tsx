"use client";

import Loader from "@/components/app-loader";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { useVehicles } from "@/services/vehicleService";

export default function VehiclePage() {
  const { data, isLoading,} = useVehicles();

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of registerd vehicles !
          </p>
        </div>
      </div>
      <DataTable data={data?.data?.vehicles ?? []} count={data?.data?.total} page={data?.data?.page} limit={data?.data?.limit} columns={columns} isLoading={isLoading} />
    </div>
  );
}
