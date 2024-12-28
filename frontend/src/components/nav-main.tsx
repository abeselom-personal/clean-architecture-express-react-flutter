"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const router = useRouter(); // Access the current route

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu</SidebarGroupLabel>
      <SidebarMenu>
        {items.length === 0 ? (
          // If there are no items, render a clickable button
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => router.push("/")} // Button navigates to the root route
              className={
                router.pathname === "/" ? "bg-blue-500 text-white" : ""
              }
            >
              <span>Go Home</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ) : (
          items.map((item) => {
            // Check if the item has a nested items array and render accordingly
            const hasSubItems =
              Array.isArray(item.items) && item.items.length > 0;

            return (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.isActive} // This makes sure the item opens by default if it's active
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className={
                        router.pathname === item.url
                          ? "bg-blue-500 text-white"
                          : ""
                      }
                    >
                      {item.icon && <item.icon />}
                      <a
                        href={item.url}
                        className={
                          router.pathname === item.url ? "text-blue-500" : ""
                        }
                      >
                        <span>{item.title}</span>
                      </a>
                      {hasSubItems && (
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      )}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  {hasSubItems && (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <a
                                href={subItem.url}
                                className={
                                  router.pathname === subItem.url
                                    ? "text-blue-500"
                                    : ""
                                }
                              >
                                <span>{subItem.title}</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  )}
                </SidebarMenuItem>
              </Collapsible>
            );
          })
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
