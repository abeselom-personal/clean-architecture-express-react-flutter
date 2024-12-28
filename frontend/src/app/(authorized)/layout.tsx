"use client";

import "@/styles/globals.css";
import AuthGuard from "@/utils/authGuard";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Split pathname by "/" and map to capitalize each segment
  const pathSegments = pathname
    .split("/")
    .filter(Boolean) // Remove empty segments
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .filter((segment) => segment.toLowerCase() !== "dashboard"); // Exclude "dashboard"

  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  {/* Dynamically display the route segments */}
                  {pathSegments.map((segment, index) => (
                    <BreadcrumbItem key={index}>
                      <BreadcrumbPage>{segment}</BreadcrumbPage>
                    </BreadcrumbItem>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <AuthGuard>{children}</AuthGuard>
        </SidebarInset>
      </SidebarProvider>
    </QueryClientProvider>
  );
}
