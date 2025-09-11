
"use client"

import {
    TooltipProvider,
} from "@/components/ui/tooltip";
import { AppShell } from "./app-shell";

export function AppShellContent({ children }: { children: React.ReactNode }) {
    return (
        <TooltipProvider>
            <AppShell>
                {children}
            </AppShell>
        </TooltipProvider>
    )
}
    