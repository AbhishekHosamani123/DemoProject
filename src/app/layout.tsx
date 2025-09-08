import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar";
import {
  BarChart2,
  Database,
  DollarSign,
  Home,
  LayoutGrid,
  LogIn,
} from "lucide-react";
import Image from "next/image";
import { Chatbot } from "@/components/app/chatbot";

export const metadata: Metadata = {
  title: "INERA Navigator",
  description: "Generate insights from your business data.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <SidebarProvider defaultOpen={true}>
          <Sidebar collapsible="icon">
            <SidebarHeader>
              
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="INERA">
                    <Image
                      src="/inera-logo.svg"
                      alt="INERA Logo"
                      width={32}
                      height={32}
                      className="text-sidebar-foreground group-hover/menu-button:text-black"
                    />
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive tooltip="Home">
                    <Home className="text-sidebar-foreground/80 group-hover/menu-button:text-black" />
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Analytics">
                    <BarChart2 className="text-sidebar-foreground/80 group-hover/menu-button:text-black" />
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Finance">
                    <DollarSign className="text-sidebar-foreground/80 group-hover/menu-button:text-black" />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Database">
                    <Database className="text-sidebar-foreground/80 group-hover/menu-button:text-black" />
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Integration Hub">
                    <LayoutGrid className="text-yellow-400"/>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Sign In">
                    <LogIn className="text-sidebar-foreground/80 group-hover/menu-button:text-black" />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset>
            <main>
              {children}
              <Toaster />
              <Chatbot />
            </main>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
