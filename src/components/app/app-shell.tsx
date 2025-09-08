
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
      <TooltipProvider delayDuration={200}>
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
                      src="/logo.png"
                      alt="Company Logo"
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
                    <Home />
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/analytics">
                  <SidebarMenuButton
                    tooltip="Analytics"
                    isActive={pathname.startsWith("/analytics")}
                  >
                    <BarChart2 />
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="#">
                  <SidebarMenuButton tooltip="Finance">
                    <DollarSign />
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="#">
                  <SidebarMenuButton
                    tooltip="Integration Hub"
                  >
                    <AppWindow className="text-primary" />
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="#">
                  <SidebarMenuButton tooltip="Database Backup">
                    <Database />
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="#">
                  <SidebarMenuButton tooltip="Login">
                    <User />
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
