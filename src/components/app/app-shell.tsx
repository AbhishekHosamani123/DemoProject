
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
import { Badge } from "@/components/ui/badge";

const FinanceBetaIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="2" x2="12" y2="22" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    <text
      x="12"
      y="18"
      fontSize="10"
      fill="hsl(var(--primary-foreground))"
      stroke="hsl(var(--primary-foreground))"
      strokeWidth="0.5"
      textAnchor="middle"
      alignmentBaseline="middle"
      fontWeight="bold"
    >
      B
    </text>
  </svg>
);


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
                    <FinanceBetaIcon />
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/analytics">
                  <SidebarMenuButton
                    tooltip="Integration Hub"
                    className="hover:bg-secondary"
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
      </TooltipProvider>
      <main className="flex-1">{children}</main>
    </div>
  );
}
