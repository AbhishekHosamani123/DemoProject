
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
  AppWindow,
  BarChart2,
  Database,
  DollarSign,
  Home,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TooltipProvider } from "@/components/ui/tooltip";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="flex">
      <TooltipProvider>
        <Sidebar>
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/">
                  <SidebarMenuButton
                    tooltip="INERA"
                    className="bg-transparent"
                  >
                    <Image
                      src="/inera-logo.svg"
                      alt="INERA Logo"
                      width={32}
                      height={32}
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
                    isActive={pathname.startsWith("/analytics")}
                  >
                    <BarChart2 className="group-hover/menu-button:text-black" />
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="#">
                  <SidebarMenuButton tooltip="Finance">
                    <DollarSign className="group-hover/menu-button:text-black" />
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <Link href="#">
                  <SidebarMenuButton
                    tooltip="Integration Hub"
                  >
                    <AppWindow className="group-hover/menu-button:text-black"/>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="#">
                  <SidebarMenuButton tooltip="Database Backup">
                    <Database className="group-hover/menu-button:text-black" />
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
      </TooltipProvider>
      <main className="flex-1">{children}</main>
    </div>
  );
}
