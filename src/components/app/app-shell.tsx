"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider
} from "@/components/ui/sidebar";
import {
  BarChart2,
  DollarSign,
  Home,
  LayoutGrid,
  LogIn,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/">
                <SidebarMenuButton tooltip="INERA">
                  <Image
                    src="/inera-logo.svg"
                    alt="INERA Logo"
                    width={32}
                    height={32}
                    className="text-sidebar-foreground group-hover/menu-button:text-black"
                  />
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/">
                <SidebarMenuButton tooltip="Home" isActive={pathname === "/"}>
                  <Home className="text-sidebar-foreground/80 group-hover/menu-button:text-black" />
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/analytics">
                <SidebarMenuButton
                  tooltip="Analytics"
                  isActive={pathname === "/analytics"}
                >
                  <BarChart2 className="text-sidebar-foreground/80 group-hover/menu-button:text-black" />
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="#">
                <SidebarMenuButton tooltip="Dashboard">
                  <LayoutGrid className="text-sidebar-foreground/80 group-hover/menu-button:text-black" />
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="#">
                <SidebarMenuButton tooltip="Transactions">
                  <DollarSign className="text-sidebar-foreground/80 group-hover/menu-button:text-black" />
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="#">
                <SidebarMenuButton tooltip="Login">
                  <LogIn className="text-sidebar-foreground/80 group-hover/menu-button:text-black" />
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
    