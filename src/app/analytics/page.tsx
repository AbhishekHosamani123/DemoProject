
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
  Share2,
  ArrowRight,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const analyticsFeatures = [
  {
    title: "Document",
    icon: <FileText className="h-10 w-10 mb-4 text-primary" />,
    description: "Generate and analyze documents.",
    href: "/documents",
  },
  {
    title: "PPT",
    icon: <Presentation className="h-10 w-10 mb-4 text-primary" />,
    description: "Create presentations from your data.",
    href: "/analytics/ppt",
  },
  {
    title: "Forecasting Analyst",
    icon: <TrendingUp className="h-10 w-10 mb-4 text-primary" />,
    description: "Predict future trends and sales.",
    href: "/analytics/forecasting-analyst",
  },
  {
    title: "Visuals & Dashboards",
    icon: <BarChart className="h-10 w-10 mb-4 text-primary" />,
    description: "Create interactive charts and dashboards.",
    href: "/analytics/visuals-and-dashboards",
  },
  {
    title: "Problem & Suggestion",
    icon: <Lightbulb className="h-10 w-10 mb-4 text-primary" />,
    description: "Get AI-powered suggestions.",
    href: "#",
  },
  {
    title: "Audit Zone",
    icon: <ShieldCheck className="h-10 w-10 mb-4 text-primary" />,
    description: "Review and audit your data.",
    href: "#",
  },
  {
    title: "Collab & Share",
    icon: <Share2 className="h-10 w-10 mb-4 text-primary" />,
    description: "Collaborate with your team and share insights.",
    href: "#",
  },
];

export default function AnalyticsPage() {
  const router = useRouter();

  return (
    <div className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Unlock the power of your data with our suite of analytics tools.
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
        {analyticsFeatures.map((feature) => (
          <Link href={feature.href} key={feature.title} className="flex">
            <Card className="group relative flex flex-col text-left p-6 bg-card/60 backdrop-blur-sm hover:bg-card/80 border-2 border-transparent hover:border-primary/50 transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-1 w-full">
              {feature.icon}
              <CardHeader className="p-0">
                <CardTitle className="text-xl font-semibold">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 mt-2 flex-1">
                <p className="text-sm text-muted-foreground">
                  {feature.description}
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
