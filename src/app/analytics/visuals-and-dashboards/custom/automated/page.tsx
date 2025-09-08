
"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AutomatedDashboardPage() {
  const router = useRouter();

  return (
    <div className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-2xl mx-auto">
        <div className="mb-8">
          <Button onClick={() => router.back()} variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            Automated Dashboard
          </h1>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            This feature is coming soon. The AI will analyze your data and automatically generate relevant dashboards.
          </p>
        </div>
      </div>
    </div>
  );
}
