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
    icon: <FileText className="h-8 w-8 text-primary" />,
    description: "Generate and analyze documents.",
  },
  {
    title: "PPT",
    icon: <Presentation className="h-8 w-8 text-primary" />,
    description: "Create presentations from your data.",
  },
  {
    title: "Forecasting Analyst",
    icon: <TrendingUp className="h-8 w-8 text-primary" />,
    description: "Predict future trends and sales.",
  },
  {
    title: "Visuals & Dashboards",
    icon: <BarChart className="h-8 w-8 text-primary" />,
    description: "Create interactive charts and dashboards.",
  },
  {
    title: "Problem & Suggestion",
    icon: <Lightbulb className="h-8 w-8 text-primary" />,
    description: "Get AI-powered suggestions.",
  },
  {
    title: "Audit Zone",
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    description: "Review and audit your data.",
  },
  {
    title: "Collab & Share",
    icon: <Share2 className="h-8 w-8 text-primary" />,
    description: "Collaborate with your team and share insights.",
  },
];

export default function AnalyticsPage() {
  return (
    <div className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col">
      <h1 className="text-3xl tracking-tight mb-8">Analytics Hub</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {analyticsFeatures.map((feature) => (
          <Card
            key={feature.title}
            className="hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer"
          >
            <CardHeader>
              <div className="flex items-center gap-4">
                {feature.icon}
                <CardTitle>{feature.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
