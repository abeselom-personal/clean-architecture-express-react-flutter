"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

import { statuses } from "@/types/vehicle"; // Replace with actual statuses for vehicles
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { useVehicleStore } from "@/stores/vehicleStore";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const { setFilter, resetFilters, queryParams } = useVehicleStore();
  const isFiltered = Object.keys(queryParams).some(
    (key) => key !== "page" && key !== "limit" && queryParams[key]
  );

  // Synchronize Zustand filters with the table
  const handleFilterChange = (key: string, value: string | undefined) => {
    setFilter(key, value);
    table.getColumn(key)?.setFilterValue(value); // Sync with Tanstack Table
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {/* Registration Number Filter */}
        <Input
          placeholder="Filter by registration number..."
          value={queryParams.registrationNumber || ""}
          onChange={(event) =>
            handleFilterChange("registrationNumber", event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {/* Status Filter */}
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses} // Populate with vehicle statuses
          />
        )}

        {/* Make Filter */}
        {table.getColumn("make") && (
          <Input
            placeholder="Filter by make..."
            value={queryParams.make || ""}
            onChange={(event) =>
              handleFilterChange("make", event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
        )}

        {/* Reset Filters Button */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              resetFilters();
              table.resetColumnFilters();
            }}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
