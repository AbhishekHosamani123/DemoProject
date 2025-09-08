
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ChevronLeft,
  ArrowRight,
  TrendingUp,
  Users,
  Box,
  Container,
  PieChart,
  AreaChart,
  LineChart,
  BarChart,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const forecastTemplates = [
  {
    title: "Sales Forecasting",
    icon: <TrendingUp className="h-10 w-10 mb-4 text-primary" />,
    description: "Predict future sales and revenue.",
    href: "/analytics/forecasting-analyst/sales-forecasting",
  },
  {
    title: "Customer Behaviour",
    icon: <Users className="h-10 w-10 mb-4 text-primary" />,
    description: "Analyze and predict customer actions.",
    href: "#",
  },
  {
    title: "Product Launch",
    icon: <Box className="h-10 w-10 mb-4 text-primary" />,
    description: "Forecast the potential success of a new product.",
    href: "#",
  },
  {
    title: "Inventory Management",
    icon: <Container className="h-10 w-10 mb-4 text-primary" />,
    description: "Optimize stock levels and reduce costs.",
    href: "#",
  },
  {
    title: "Forecast 5",
    icon: <PieChart className="h-10 w-10 mb-4 text-primary" />,
    description: "A forecast template for various use cases.",
    href: "#",
  },
  {
    title: "Forecast 6",
    icon: <AreaChart className="h-10 w-10 mb-4 text-primary" />,
    description: "A forecast template for various use cases.",
    href: "#",
  },
  {
    title: "Forecast 7",
    icon: <LineChart className="h-10 w-10 mb-4 text-primary" />,
    description: "A forecast template for various use cases.",
    href: "#",
  },
  {
    title: "Forecast 8",
    icon: <BarChart className="h-10 w-10 mb-4 text-primary" />,
    description: "A forecast template for various use cases.",
    href: "#",
  },
  {
    title: "Forecast 9",
    icon: <HelpCircle className="h-10 w-10 mb-4 text-primary" />,
    description: "A forecast template for various use cases.",
    href: "#",
  },
  {
    title: "Forecast 10",
    icon: <HelpCircle className="h-10 w-10 mb-4 text-primary" />,
    description: "A forecast template for various use cases.",
    href: "#",
  },
  {
    title: "Forecast 11",
    icon: <HelpCircle className="h-10 w-10 mb-4 text-primary" />,
    description: "A forecast template for various use cases.",
    href: "#",
  },
];

export default function ForecastingAnalystPage() {
  const router = useRouter();

  return (
    <div className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Forecasting Analyst
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Choose a forecast model to get started.
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {forecastTemplates.map((template) => (
          <Link href={template.href} key={template.title} className="flex">
            <Card className="group relative flex flex-col text-left p-6 bg-card/60 backdrop-blur-sm hover:bg-card/80 border-2 border-transparent hover:border-primary/50 transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-1 w-full">
              {template.icon}
              <CardHeader className="p-0">
                <CardTitle className="text-xl font-semibold">
                  {template.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 mt-2 flex-1">
                <p className="text-sm text-muted-foreground">
                  {template.description}
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
        <Link href="#" className="w-full max-w-sm">
          <Button
            size="lg"
            className="w-full text-lg font-bold h-16"
          >
            PERIODICALLY FORECASTING
          </Button>
        </Link>
      </div>
    </div>
  );
}
