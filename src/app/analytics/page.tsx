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
} from "lucide-react";

const analyticsFeatures = [
  {
    title: "Document",
    icon: <FileText className="h-10 w-10 text-primary" />,
    description: "Generate and analyze documents.",
  },
  {
    title: "PPT",
    icon: <Presentation className="h-10 w-10 text-primary" />,
    description: "Create presentations from your data.",
  },
  {
    title: "Forecasting Analyst",
    icon: <TrendingUp className="h-10 w-10 text-primary" />,
    description: "Predict future trends and sales.",
  },
  {
    title: "Visuals & Dashboards",
    icon: <BarChart className="h-10 w-10 text-primary" />,
    description: "Create interactive charts and dashboards.",
  },
  {
    title: "Problem & Suggestion",
    icon: <Lightbulb className="h-10 w-10 text-primary" />,
    description: "Get AI-powered suggestions.",
  },
  {
    title: "Audit Zone",
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    description: "Review and audit your data.",
  },
  {
    title: "Collab & Share",
    icon: <Share2 className="h-10 w-10 text-primary" />,
    description: "Collaborate with your team and share insights.",
  },
];

export default function AnalyticsPage() {
  return (
    <div className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Analytics Hub</h1>
        <p className="text-muted-foreground mt-2">
          Unlock the power of your data with our suite of analytics tools.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {analyticsFeatures.map((feature) => (
          <Card
            key={feature.title}
            className="group relative flex flex-col items-center justify-center text-center p-6 bg-card/50 hover:bg-card/90 border-2 border-transparent hover:border-primary/50 transition-all duration-300 cursor-pointer overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="mb-4 transition-transform duration-300 group-hover:scale-110">
              {feature.icon}
            </div>
            <CardTitle className="text-lg font-semibold">{feature.title}</CardTitle>
            <CardContent className="p-0 mt-2">
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
