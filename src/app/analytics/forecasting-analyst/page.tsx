
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
  TrendingUp,
  Users,
  Box,
  Container,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const forecastTemplates = [
  {
    title: "Sales Forecasting",
    icon: <TrendingUp className="h-6 w-6 mb-2 text-primary" />,
    description: "Predict future sales and revenue.",
    href: "/analytics/forecasting-analyst/sales-forecasting",
  },
  {
    title: "Customer Behaviour",
    icon: <Users className="h-6 w-6 mb-2 text-primary" />,
    description: "Analyze and predict customer actions.",
    href: "#",
  },
  {
    title: "Product Launch",
    icon: <Box className="h-6 w-6 mb-2 text-primary" />,
    description: "Forecast the potential success of a new product.",
    href: "#",
  },
  {
    title: "Inventory Management",
    icon: <Container className="h-6 w-6 mb-2 text-primary" />,
    description: "Optimize stock levels and reduce costs.",
    href: "#",
  },
  ...Array.from({ length: 7 }, (_, i) => ({
    title: `Forecast ${i + 5}`,
    icon: <TrendingUp className="h-6 w-6 mb-2 text-primary" />,
    description: `This is a description for Forecast ${i + 5}.`,
    href: "#",
  })),
];

export default function ForecastingAnalystPage() {
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
        <h1 className="text-3xl font-bold tracking-tight">
          Forecasting Analyst
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Choose a forecast model to get started.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {forecastTemplates.map((template) => (
          <Link href={template.href} key={template.title} className="flex group">
            <Card className="flex flex-col text-left p-4 w-full bg-card/60 backdrop-blur-sm hover:bg-card/80 border-2 border-input hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1">
              {template.icon}
              <CardHeader className="p-0">
                <CardTitle className="text-base font-semibold">
                  {template.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 mt-1 flex-1">
                <p className="text-xs text-muted-foreground">
                  {template.description}
                </p>
              </CardContent>
              <div className="mt-4 flex justify-end">
                <ArrowRight className="h-4 w-4 text-muted-foreground/50 transition-transform duration-300 group-hover:text-primary group-hover:translate-x-1" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
          <Button
            size="lg"
            className="w-full max-w-sm font-semibold h-12"
            onClick={() => router.push('/analytics/forecasting-analyst/periodic-forecasting')}
          >
            PERIODICALLY FORECASTING
          </Button>
      </div>
    </div>
  );
}
