
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
    href: "#",
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
  {
    id: "vd4",
    label: "Visuals & Dashboard 4",
    description: "A dashboard for various use cases.",
    icon: <Settings className="h-10 w-10 mb-4 text-primary" />,
    href: "#",
  },
  {
    id: "vd5",
    label: "Visuals & Dashboard 5",
    description: "A dashboard for various use cases.",
    icon: <Settings className="h-10 w-10 mb-4 text-primary" />,
    href: "#",
  },
  {
    id: "vd6",
    label: "Visuals & Dashboard 6",
    description: "A dashboard for various use cases.",
    icon: <Settings className="h-10 w-10 mb-4 text-primary" />,
    href: "#",
  },
  {
    id: "vd7",
    label: "Visuals & Dashboard 7",
    description: "A dashboard for various use cases.",
    icon: <Settings className="h-10 w-10 mb-4 text-primary" />,
    href: "#",
  },
  {
    id: "vd8",
    label: "Visuals & Dashboard 8",
    description: "A dashboard for various use cases.",
    icon: <Settings className="h-10 w-10 mb-4 text-primary" />,
    href: "#",
  },
  {
    id: "vd9",
    label: "Visuals & Dashboard 9",
    description: "A dashboard for various use cases.",
    icon: <Settings className="h-10 w-10 mb-4 text-primary" />,
    href: "#",
  },
  {
    id: "vd10",
    label: "Visuals & Dashboard 10",
    description: "A dashboard for various use cases.",
    icon: <Settings className="h-10 w-10 mb-4 text-primary" />,
    href: "#",
  },
  {
    id: "vd11",
    label: "Visuals & Dashboard 11",
    description: "A dashboard for various use cases.",
    icon: <Settings className="h-10 w-10 mb-4 text-primary" />,
    href: "#",
  },
  {
    id: "vd12",
    label: "Visuals & Dashboard 12",
    description: "A dashboard for various use cases.",
    icon: <Settings className="h-10 w-10 mb-4 text-primary" />,
    href: "#",
  },
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {dashboardItems.map((item) => (
          <Link href={item.href} key={item.id} className="flex">
            <Card className="group relative flex flex-col text-left p-6 bg-card/60 backdrop-blur-sm hover:bg-card/80 border-2 border-transparent hover:border-primary/50 transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-1 w-full">
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
    </div>
  );
}
