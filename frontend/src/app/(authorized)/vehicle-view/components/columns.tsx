"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
// import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Vehicle } from "@/types/vehicle"; // Adjust the import path to your Vehicle type
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const columns: ColumnDef<Vehicle>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },

  {
    accessorKey: "avatarPath",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" />
    ),
    cell: ({ row }) => (
      <Avatar>
      <AvatarImage src={row.getValue("avatarPath")} />
      <AvatarFallback>CAR</AvatarFallback>
    </Avatar>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "registrationNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Registration No." />
    ),
    cell: ({ row }) => (
      <div className="w-[150px]">{row.getValue("registrationNumber")}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "model",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Model" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate">{row.getValue("model")}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "make",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Make" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[150px] truncate">{row.getValue("make")}</div>
    ),
  },
  {
    accessorKey: "year",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Year" />
    ),
    cell: ({ row }) => <div>{row.getValue("year")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const statusColor =
        status === "Available"
          ? "bg-green-200"
          : status === "In Service"
          ? "bg-yellow-200"
          : "bg-red-200";

      return (
        <Badge className={`${statusColor} capitalize`}>
          {row.getValue("status")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "mileage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mileage (km)" />
    ),
    cell: ({ row }) => <div>{row.getValue("mileage")}</div>,
  },
  {
    accessorKey: "fuelType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fuel Type" />
    ),
    cell: ({ row }) => <div>{row.getValue("fuelType")}</div>,
  },
  {
    accessorKey: "currentLocation",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[150px] truncate">
        {row.getValue("currentLocation")}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
