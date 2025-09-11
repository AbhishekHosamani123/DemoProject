
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
import { Badge } from "@/components/ui/badge";
import { TooltipProvider } from "@/components/ui/tooltip";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="flex">
        <Sidebar>
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/">
                  <SidebarMenuButton
                    tooltip="INERA"
                    className="bg-transparent hover:bg-transparent"
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
                <Link href="/finance">
                  <SidebarMenuButton tooltip={{
                    children: (
                      <div className="flex items-center gap-2">
                        Finance <Badge variant="secondary" className="text-xs">Beta</Badge>
                      </div>
                    ),
                  }}
                  isActive={pathname.startsWith("/finance")}
                  >
                    <DollarSign />
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/integration-hub">
                  <SidebarMenuButton
                    tooltip="Integration Hub"
                    isActive={pathname === "/integration-hub"}
                  >
                    <AppWindow className="text-primary" />
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/database-backup">
                  <SidebarMenuButton tooltip="Database Backup" isActive={pathname === "/database-backup"}>
                    <Database />
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/">
                  <SidebarMenuButton tooltip="Login">
                    <User />
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
