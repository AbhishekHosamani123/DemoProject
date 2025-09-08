
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  Presentation,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const presentationTemplates = [
  {
    title: "Sales Strategy Presentation",
    icon: <Presentation className="h-8 w-8 mb-4 text-primary" />,
    description: "Decks for outlining sales strategies and targets.",
    href: "/analytics/ppt/single-topic/sales-strategy",
  },
  {
    title: "Financial Review Presentation",
    icon: <Presentation className="h-8 w-8 mb-4 text-primary" />,
    description: "Presentations for financial performance reviews.",
    href: "/analytics/ppt/single-topic/sales-strategy",
  },
  {
    title: "Product Launch Presentation",
    icon: <Presentation className="h-8 w-8 mb-4 text-primary" />,
    description: "Everything you need to launch a new product.",
    href: "/analytics/ppt/single-topic/sales-strategy",
  },
  {
    title: "Marketing Campaign Presentation",
    icon: <Presentation className="h-8 w-8 mb-4 text-primary" />,
    description: "Present your next big marketing campaign.",
    href: "/analytics/ppt/single-topic/sales-strategy",
  },
  {
    title: "Business Proposal Presentation",
    icon: <Presentation className="h-8 w-8 mb-4 text-primary" />,
    description: "Propose a new business idea or project.",
    href: "/analytics/ppt/single-topic/sales-strategy",
  },
  ...Array.from({ length: 11 }, (_, i) => ({
    title: `PPT-${i + 6}`,
    icon: <Presentation className="h-8 w-8 mb-4 text-primary" />,
    description: `This is a description for PPT-${i + 6}.`,
    href: "/analytics/ppt/single-topic/sales-strategy",
  })),
];

export default function SingleTopicPage() {
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
          Single Topic Presentation
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Choose a template to generate your presentation.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {presentationTemplates.map((template) => (
          <Link href={template.href} key={template.title} className="flex">
            <Card className="group relative flex flex-col text-left p-6 bg-card/60 backdrop-blur-sm hover:bg-card/80 border-2 border-input hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 w-full">
              {template.icon}
              <CardHeader className="p-0">
                <CardTitle className="text-lg font-semibold">
                  {template.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 mt-2 flex-1">
                <CardDescription>{template.description}</CardDescription>
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
