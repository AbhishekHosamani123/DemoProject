
"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const timePeriods = [
  "DAILY",
  "WEEKLY",
  "MONTHLY",
  "QUARTERLY",
  "YEARLY",
];

export default function PeriodicForecastingPage() {
  const router = useRouter();

  return (
    <div className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <div className="mb-8">
          <Button
            onClick={() => router.back()}
            variant="outline"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight inline-block border rounded-lg px-6 py-3">
            PERIODICALLY FORECASTING
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 max-w-md mx-auto">
          {timePeriods.map((period) => (
            <Button
              key={period}
              variant="outline"
              size="lg"
              className="w-full h-14 text-lg rounded-lg"
            >
              {period}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
