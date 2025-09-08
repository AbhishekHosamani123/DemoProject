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
} from "lucide-react";

const analyticsFeatures = [
  {
    title: "Document",
    icon: <FileText className="h-10 w-10 mb-4 text-primary" />,
    description: "Generate and analyze documents.",
  },
  {
    title: "PPT",
    icon: <Presentation className="h-10 w-10 mb-4 text-primary" />,
    description: "Create presentations from your data.",
  },
  {
    title: "Forecasting Analyst",
    icon: <TrendingUp className="h-10 w-10 mb-4 text-primary" />,
    description: "Predict future trends and sales.",
  },
  {
    title: "Visuals & Dashboards",
    icon: <BarChart className="h-10 w-10 mb-4 text-primary" />,
    description: "Create interactive charts and dashboards.",
  },
  {
    title: "Problem & Suggestion",
    icon: <Lightbulb className="h-10 w-10 mb-4 text-primary" />,
    description: "Get AI-powered suggestions.",
  },
  {
    title: "Audit Zone",
    icon: <ShieldCheck className="h-10 w-10 mb-4 text-primary" />,
    description: "Review and audit your data.",
  },
  {
    title: "Collab & Share",
    icon: <Share2 className="h-10 w-10 mb-4 text-primary" />,
    description: "Collaborate with your team and share insights.",
  },
];

export default function AnalyticsPage() {
  return (
    <div className="relative flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col">
       <div
        className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"
      >
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/10 blur-[100px]"></div>
      </div>
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Unlock the power of your data with our suite of analytics tools.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {analyticsFeatures.map((feature) => (
          <Card
            key={feature.title}
            className="group relative flex flex-col text-left p-6 bg-card/60 backdrop-blur-sm hover:bg-card/80 border-2 border-transparent hover:border-primary/50 transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-1"
          >
            {feature.icon}
            <CardHeader className="p-0">
                <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
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
        ))}
      </div>
    </div>
  );
}
