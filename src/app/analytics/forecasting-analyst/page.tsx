
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const forecastTemplates = [
  {
    title: "SALES FORECASTING",
    href: "#",
  },
  {
    title: "CUSTOMER BEHAVIOUR PREDICTION",
    href: "#",
  },
  {
    title: "PRODUCT LAUNCH PRESENTATION",
    href: "#",
  },
  {
    title: "FORECAST 4",
    href: "#",
  },
  {
    title: "FORECAST 5",
    href: "#",
  },
  {
    title: "FORECAST 6",
    href: "#",
  },
  {
    title: "FORECAST 7",
    href: "#",
  },
  {
    title: "FORECAST 8",
    href: "#",
  },
  {
    title: "FORECAST 9",
    href: "#",
  },
  {
    title: "FORECAST 10",
    href: "#",
  },
  {
    title: "FORECAST 11",
    href: "#",
  },
  {
    title: "FORECAST 12",
    href: "#",
  },
];

export default function ForecastingAnalystPage() {
  const router = useRouter();

  return (
    <div className="relative flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/10 blur-[100px]"></div>
      </div>
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
          className="bg-yellow-400 text-black hover:bg-yellow-500"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {forecastTemplates.map((template) => (
          <Link href={template.href} key={template.title} className="flex">
            <Card className="group relative flex flex-col justify-center text-center p-6 bg-card/60 backdrop-blur-sm hover:bg-card/80 border-2 border-input hover:border-primary/50 transition-all duration-300 cursor-pointer transform hover:-translate-y-1 w-full h-24">
              <CardHeader className="p-0">
                <CardTitle className="text-base font-semibold">
                  {template.title}
                </CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Link href="#" className="w-full max-w-sm">
          <Button
            size="lg"
            className="w-full bg-yellow-400 text-black hover:bg-yellow-500 text-lg font-bold h-16"
          >
            PERIODICALLY FORECASTING
          </Button>
        </Link>
      </div>
    </div>
  );
}
