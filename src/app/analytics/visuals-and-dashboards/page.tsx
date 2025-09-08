
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChevronLeft,
  LayoutDashboard,
  Users,
  TrendingUp,
  Settings,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const dashboardItems = [
  {
    id: "kpi",
    label: "KPI & Metric Dashboard",
    description: "Track key performance indicators.",
    icon: <LayoutDashboard className="h-10 w-10 mb-4 text-primary" />,
    href: "/analytics/visuals-and-dashboards/kpi-metric",
  },
  {
    id: "customer",
    label: "Customer Segmentation",
    description: "Visualize customer segments.",
    icon: <Users className="h-10 w-10 mb-4 text-primary" />,
    href: "#",
  },
  {
    id: "market",
    label: "Market Trend Charts",
    description: "Analyze market trends.",
    icon: <TrendingUp className="h-10 w-10 mb-4 text-primary" />,
    href: "#",
  },
  ...Array.from({ length: 9 }, (_, i) => ({
    id: `dashboard-${i + 4}`,
    label: `Visuals and Dashboards - ${i + 4}`,
    description: `This is a description for Visuals and Dashboards - ${i + 4}.`,
    icon: <LayoutDashboard className="h-10 w-10 mb-4 text-primary" />,
    href: "#",
  })),
];

export default function VisualsAndDashboardsPage() {
  const router = useRouter();

  return (
    <div className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Visuals & Dashboards
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Choose a dashboard type to get started.
        </p>
      </div>
      <div className="mb-8">
        <Button
          onClick={() => router.back()}
          variant="outline"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {dashboardItems.map((item) => (
          <Link href={item.href} key={item.id} className="flex group">
            <Card className="flex flex-col text-left p-6 w-full">
              {item.icon}
              <CardHeader className="p-0">
                <CardTitle className="text-xl font-semibold">{item.label}</CardTitle>
              </CardHeader>
              <CardContent className="p-0 mt-2 flex-1">
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
              <div className="mt-4 flex justify-end">
                <ArrowRight className="h-5 w-5 text-muted-foreground/50 transition-transform duration-300 group-hover:text-primary group-hover:translate-x-1" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
          <Button
            size="lg"
            className="w-full max-w-md text-lg font-bold h-16"
            onClick={() => router.push('/analytics/visuals-and-dashboards/custom')}
          >
            CUSTOM VISUALS & DASHBOARD
          </Button>
      </div>
    </div>
  );
}
