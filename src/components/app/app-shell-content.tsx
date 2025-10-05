
"use client"

import { AppShell } from "./app-shell";

export function AppShellContent({ children }: { children: React.ReactNode }) {
    return (
        <AppShell>
            {children}
        </AppShell>
    )
}
    