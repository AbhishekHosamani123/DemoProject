
"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const timePeriods = [
  { id: "daily", label: "DAILY", href: "/analytics/forecasting-analyst/periodic-forecasting/monthly" },
  { id: "weekly", label: "WEEKLY", href: "/analytics/forecasting-analyst/periodic-forecasting/monthly" },
  {
    id: "monthly",
    label: "MONTHLY",
    href: "/analytics/forecasting-analyst/periodic-forecasting/monthly",
  },
  { id: "quarterly", label: "QUARTERLY", href: "/analytics/forecasting-analyst/periodic-forecasting/monthly" },
  { id: "yearly", label: "YEARLY", href: "/analytics/forecasting-analyst/periodic-forecasting/monthly" },
];

export default function PeriodicForecastingPage() {
  const router = useRouter();

  return (
    <div className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <div className="mb-8">
          <Button onClick={() => router.back()} variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight inline-block border rounded-lg px-6 py-3 bg-card/60 backdrop-blur-sm">
            Periodic Forecasting
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {timePeriods.map((period) => (
            <Link href={period.href} key={period.id}>
              <Button
                variant="outline"
                size="lg"
                className="w-full h-24 text-lg rounded-lg bg-card/60 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground border-2 border-input hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1"
              >
                {period.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
