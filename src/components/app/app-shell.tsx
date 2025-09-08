"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  BarChart2,
  DollarSign,
  Home,
  LayoutGrid,
  LogIn,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
      <div className="flex">
        <Sidebar collapsible="icon" className="md:w-16">
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/">
                  <SidebarMenuButton tooltip="INERA">
                    <Image
                      src="/inera-logo.svg"
                      alt="INERA Logo"
                      width={32}
                      height={32}
                      className="group-hover/menu-button:text-black"
                    />
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/">
                  <SidebarMenuButton tooltip="Home" isActive={pathname === "/"}>
                    <Home className="group-hover/menu-button:text-black" />
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/analytics">
                  <SidebarMenuButton
                    tooltip="Analytics"
                    isActive={pathname === "/analytics"}
                  >
                    <BarChart2 className="group-hover/menu-button:text-black" />
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="#">
                  <SidebarMenuButton tooltip="Transactions">
                    <DollarSign className="group-hover/menu-button:text-black" />
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="#">
                  <SidebarMenuButton tooltip="Dashboard">
                    <LayoutGrid className="group-hover/menu-button:text-black" />
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="#">
                  <SidebarMenuButton tooltip="Login">
                    <User className="group-hover/menu-button:text-black" />
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1">{children}</main>
      </div>
  );
}
