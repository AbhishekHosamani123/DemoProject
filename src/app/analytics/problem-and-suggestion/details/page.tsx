
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChevronLeft,
  ArrowRight,
  TrendingDown,
  Filter,
  PackageX,
  Users,
  Lightbulb,
  AlertTriangle,
  Video,
  BarChartHorizontal,
  TrendingUp,
  Wrench,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const problems = [
  {
    id: "high-customer-churn",
    title: "High Customer Churn",
    description: "Identify and address the root causes of customer attrition.",
    icon: <TrendingDown className="h-5 w-5 mb-2 text-primary" />,
    confidence: 92,
  },
  {
    id: "inefficient-marketing-spend",
    title: "Inefficient Marketing Spend",
    description: "Optimize your marketing budget for better ROI.",
    icon: <Filter className="h-5 w-5 mb-2 text-primary" />,
    confidence: 88,
  },
  {
    id: "supply-chain-bottlenecks",
    title: "Supply Chain Bottlenecks",
    description: "Find and resolve delays in your supply chain.",
    icon: <PackageX className="h-5 w-5 mb-2 text-primary" />,
    confidence: 75,
  },
  {
    id: "low-user-engagement",
    title: "Low User Engagement",
    description: "Discover why users aren't interacting with your product.",
    icon: <Users className="h-5 w-5 mb-2 text-primary" />,
    confidence: 81,
  },
  {
    id: "product-feature-gaps",
    title: "Product Feature Gaps",
    description: "Identify missing features that customers need.",
    icon: <Lightbulb className="h-5 w-5 mb-2 text-primary" />,
    confidence: 65,
  },
  {
    id: "financial-irregularities",
    title: "Financial Irregularities",
    description: "Detect and investigate financial anomalies.",
    icon: <AlertTriangle className="h-5 w-5 mb-2 text-primary" />,
    confidence: 95,
  },
   {
    id: "sales-forecasting-accuracy",
    title: "Poor Sales Forecasting",
    description: "Improve the accuracy of your sales predictions.",
    icon: <BarChartHorizontal className="h-5 w-5 mb-2 text-primary" />,
    confidence: 55,
  },
  {
    id: "high-operational-costs",
    title: "High Operational Costs",
    description: "Identify areas to reduce operational expenses.",
    icon: <TrendingDown className="h-5 w-5 mb-2 text-primary" />,
    confidence: 78,
  },
   {
    id: "revenue-growth-stagnation",
    title: "Revenue Growth Stagnation",
    description: "Uncover new opportunities for revenue growth.",
    icon: <TrendingUp className="h-5 w-5 mb-2 text-primary" />,
    confidence: 45,
  },
];

const getConfidenceColor = (score: number) => {
  if (score >= 85) return "text-red-400"; // High confidence -> light red
  if (score >= 60) return "text-yellow-400"; // Medium confidence -> yellow
  return "text-green-400"; // Low confidence -> green
};

export default function ProblemSuggestionDetailsPage() {
  const router = useRouter();

  return (
    <div className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col">
      <div className="w-full max-w-6xl mx-auto mb-8">
        <Button onClick={() => router.back()} variant="outline">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="w-full mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight inline-block border rounded-lg px-6 py-3 bg-card/60 backdrop-blur-sm">
          PROBLEM & SUGGESTION
        </h1>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
          Select a problem to see AI-powered analysis and actionable suggestions.
        </p>
      </div>

      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {problems.map((problem) => (
          <Link
            href={`/analytics/problem-and-suggestion/problem/${problem.id}`}
            key={problem.id}
            className="flex group"
          >
            <Card className="relative flex flex-col text-left p-4 w-full bg-card/60 backdrop-blur-sm hover:bg-card/80 border-2 border-input hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute top-2 right-2 px-2 py-1 bg-background/50 rounded-md text-xs font-bold">
                  <span className={getConfidenceColor(problem.confidence)}>
                      {problem.confidence}%
                  </span>
              </div>
              {problem.icon}
              <CardHeader className="p-0">
                <CardTitle className="text-lg font-semibold text-primary">
                  {problem.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 mt-2 flex-1">
                <p className="text-sm text-muted-foreground">
                  {problem.description}
                </p>
              </CardContent>
              <div className="mt-4 flex justify-end">
                <ArrowRight className="h-4 w-4 text-muted-foreground/50 transition-transform duration-300 group-hover:text-primary group-hover:translate-x-1" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
      <div className="w-full max-w-6xl mx-auto mt-12 flex justify-center gap-4">
        <Button size="lg" className="h-12 text-lg font-semibold">
            <Video className="mr-2 h-5 w-5"/>
            VIDEO
        </Button>
        <Button size="lg" variant="secondary" className="h-12 text-lg font-semibold">
            <Wrench className="mr-2 h-5 w-5" />
            Customize
        </Button>
      </div>
    </div>
  );
}
