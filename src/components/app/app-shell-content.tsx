"use client"

import {
    SidebarProvider,
} from "@/components/ui/sidebar";

export function AppShellContent({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            {children}
        </SidebarProvider>
    )
}