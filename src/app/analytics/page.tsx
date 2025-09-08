
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FileText,
  Presentation,
  TrendingUp,
  BarChart,
  Lightbulb,
  ShieldCheck,
  ArrowRight,
  ChevronLeft,
  Share2,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const analyticsFeatures = [
  {
    title: "Document",
    icon: <FileText className="h-6 w-6 mb-2 text-primary" />,
    description: "Generate and analyze documents.",
    href: "/documents",
  },
  {
    title: "PPT",
    icon: <Presentation className="h-6 w-6 mb-2 text-primary" />,
    description: "Create presentations from your data.",
    href: "/analytics/ppt",
  },
  {
    title: "Forecasting Analyst",
    icon: <TrendingUp className="h-6 w-6 mb-2 text-primary" />,
    description: "Predict future trends and sales.",
    href: "/analytics/forecasting-analyst",
  },
  {
    title: "Visuals & Dashboards",
    icon: <BarChart className="h-6 w-6 mb-2 text-primary" />,
    description: "Create interactive charts and dashboards.",
    href: "/analytics/visuals-and-dashboards",
  },
  {
    title: "Problem & Suggestion",
    icon: <Lightbulb className="h-6 w-6 mb-2 text-primary" />,
    description: "Get AI-powered suggestions.",
    href: "#",
  },
  {
    title: "Audit Zone",
    icon: <ShieldCheck className="h-6 w-6 mb-2 text-primary" />,
    description: "Review and audit your data.",
    href: "#",
  },
  {
    title: "Collab & Share",
    icon: <Share2 className="h-6 w-6 mb-2 text-primary" />,
    description: "Collaborate and share your findings.",
    href: "#",
  }
];

export default function AnalyticsPage() {
  const router = useRouter();

  return (
    <div className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col">
      <div className="mb-8">
        <Button
          onClick={() => router.back()}
          variant="outline"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Unlock the power of your data with our suite of analytics tools.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {analyticsFeatures.map((feature) => (
          <Link href={feature.href} key={feature.title} className="flex group">
            <Card className="flex flex-col text-left p-4 w-full bg-card/60 backdrop-blur-sm hover:bg-card/80 border-2 border-input hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1">
              {feature.icon}
              <CardHeader className="p-0">
                <CardTitle className="text-base font-semibold">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 mt-1 flex-1">
                <p className="text-xs text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
              <div className="mt-4 flex justify-end">
                <ArrowRight className="h-4 w-4 text-muted-foreground/50 transition-transform duration-300 group-hover:text-primary group-hover:translate-x-1" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
