
"use client";

import { useEffect, useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";

export function ClientTooltipProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <TooltipProvider>{children}</TooltipProvider>;
}
