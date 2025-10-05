
"use client";

import { Button } from "@/components/ui/button";
import { Wrench, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FinancePage() {
  const router = useRouter();

  return (
    <div className="relative flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
      <div className="absolute top-8 left-4 sm:left-8 z-10">
        <Button onClick={() => router.back()} variant="outline">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      <div className="space-y-6">
        <Wrench className="h-24 w-24 mx-auto text-primary animate-bounce" />
        <h1 className="text-5xl font-bold tracking-tight">
          Site Under Construction
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto text-xl">
          We're hard at work building this feature. Please check back soon!
        </p>
      </div>
    </div>
  );
}
