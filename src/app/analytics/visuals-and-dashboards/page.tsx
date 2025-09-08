
"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const dashboardItems = [
  { id: "kpi", label: "KPI & METRIC DASHBOARD", href: "#" },
  { id: "customer", label: "CUSTOMER SEGMENTATION VISUALS", href: "#" },
  { id: "market", label: "MARKET TREND CHARTS", href: "#" },
  { id: "vd4", label: "V&D 4", href: "#" },
  { id: "vd5", label: "V&D 5", href: "#" },
  { id: "vd6", label: "V&D 6", href: "#" },
  { id: "vd7", label: "V&D 7", href: "#" },
  { id: "vd8", label: "V&D 8", href: "#" },
  { id: "vd9", label: "V&D 9", href: "#" },
  { id: "vd10", label: "V&D 10", href: "#" },
  { id: "vd11", label: "V&D 11", href: "#" },
  { id: "vd12", label: "V&D 12", href: "#" },
];

export default function VisualsAndDashboardsPage() {
  const router = useRouter();

  return (
    <div className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-6xl">
        <div className="mb-8 self-start">
          <Button onClick={() => router.back()} variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight inline-block border rounded-lg px-6 py-3 bg-card/60 backdrop-blur-sm">
            VISUALS & DASHBOARDS
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {dashboardItems.map((item) => (
            <Link href={item.href} key={item.id}>
              <Button
                variant="outline"
                className="w-full h-24 text-base rounded-lg bg-card/60 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground border-2 border-input hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center text-center p-2"
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </div>
        <div className="mt-6">
            <Link href="#" >
                 <Button
                    variant="outline"
                    className="w-full max-w-xs h-24 text-base rounded-lg bg-card/60 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground border-2 border-input hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1"
                >
                    CUSTOM V&D
                </Button>
            </Link>
        </div>
      </div>
    </div>
  );
}
