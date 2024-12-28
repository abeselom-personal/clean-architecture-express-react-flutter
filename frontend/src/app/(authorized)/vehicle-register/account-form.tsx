"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateVehicle } from "@/services/vehicleService";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const vehicleValidationSchema = z.object({
  registrationNumber: z
    .string()
    .nonempty({ message: "Registration number is required" }),
  model: z.string().nonempty({ message: "Model is required" }),
  make: z.string().optional(),
  year: z.string().optional(),
  status: z.enum(["Available", "Unavailable", "In Maintenance"]).optional(),
  mileage: z.string().optional(),
  fuelType: z.string().optional(),
  currentLocation: z.string().optional(),
  avatar: z.any().optional(),
});

type VehicleFormValues = z.infer<typeof vehicleValidationSchema>;
const commonFuelTypes = [
  "Gasoline",
  "Diesel",
  "Electricity",
  "Hybrid",
  "CNG",
  "LPG",
  "Ethanol",
];
const status = ["Available", "Unavailable", "In Maintenance"];

const defaultValues: Partial<VehicleFormValues> = {
  registrationNumber: "",
  model: "",
  make: "",
  year: "0",
  status: "Available",
  mileage: "0",
  fuelType: "",
  currentLocation: "",
};

export function VehicleForm() {
  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleValidationSchema),
    defaultValues,
  });
  const { toast } = useToast();
  const [avatar, setAvatar] = useState<File | null>(null);
  const {mutateAsync, isPending, isError} = useCreateVehicle();


  function onAvatarDrop(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setAvatar(file);
      form.setValue("avatar", file);
    }
  }

  async function onSubmit(data: VehicleFormValues) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "avatar" && avatar) {
        formData.append(key, avatar);
      } else if (value !== undefined) {
        formData.append(key, String(value));
      }
    });

    try {
     await mutateAsync(formData);
      toast({
        title: "Success",
        description: "Vehicle has been successfully registered.",
      });
    } catch (error) {
      
      toast({
        title: "Error",
        description: "There was an error registering the vehicle.",
        variant: "destructive",
      });
    }
  }

  return (
    <Card className="w-90% m-8">
      <CardHeader>
        <CardTitle>Register Vehicle</CardTitle>
        <CardDescription>Sample Form to register a vehicle.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid gap-4 grid-cols-1 md:grid-cols-4">
            {/* Avatar Field */}
            <div className="col-span-1 md:col-span-4 flex flex-col items-center">
              <label htmlFor="avatar-upload" className="cursor-pointer">
                <Avatar className="h-60 w-60">
                  <AvatarImage
                    src={avatar ? URL.createObjectURL(avatar) : ""}
                    alt="Avatar"
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={onAvatarDrop}
                className="hidden"
              />
            </div>

            {/* Registration Number */}
            <FormField
              control={form.control}
              name="registrationNumber"
              render={({ field }) => (
                <FormItem className="col-span-1 md:col-span-2">
                  <FormLabel>Registration Number</FormLabel>
                  <FormControl>
                    <Input placeholder="AB123CD" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Model */}
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem className="col-span-1 md:col-span-2">
                  <FormLabel>Model</FormLabel>
                  <FormControl>
                    <Input placeholder="Toyota Corolla" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Make */}
            <FormField
              control={form.control}
              name="make"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Make</FormLabel>
                  <FormControl>
                    <Input placeholder="Toyota" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Year */}
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Year</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="2020" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {status.map((state, index) => (
                        <SelectItem key={index} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Mileage */}
            <FormField
              control={form.control}
              name="mileage"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Mileage</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="15000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Fuel Type */}
            <FormField
              control={form.control}
              name="fuelType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fuel Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a fuel type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {commonFuelTypes.map((fuel, index) => (
                        <SelectItem key={index} value={fuel}>
                          {fuel}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Current Location */}
            <FormField
              control={form.control}
              name="currentLocation"
              render={({ field }) => (
                <FormItem className="col-span-1 md:col-span-2">
                  <FormLabel>Current Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Addis Ababa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => form.reset()}>
              Clear
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Submitting..." : "Submit"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
