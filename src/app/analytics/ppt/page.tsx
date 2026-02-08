
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  File,
  Settings,
  ArrowRight,
  Grid3X3,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const presentationTypes = [
  {
    title: "Single Topic Presentation",
    icon: <File className="h-5 w-5 mb-2 text-primary" />,
    description:
      "Generate a presentation focusing on a single topic from your data.",
    href: "/analytics/ppt/single-topic",
  },
  {
    title: "Multiple Topics Presentation",
    icon: <Grid3X3 className="h-5 w-5 mb-2 text-primary" />,
    description: "Create a presentation that covers multiple topics at once.",
    href: "/analytics/ppt/multiple-topics",
  },
  {
    title: "Customized Topics Presentation",
    icon: <Settings className="h-5 w-5 mb-2 text-primary" />,
    description:
      "Tailor a presentation with specific topics and custom insights.",
    href: "/analytics/ppt/custom-topic",
  },
];

export default function PptPage() {
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
        <h1 className="text-4xl font-bold tracking-tight">Presentations</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Choose a presentation type to get started.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {presentationTypes.map((type) => (
          <Link href={type.href} key={type.title} className="flex group">
            <Card className="flex flex-col text-left p-3 w-full bg-card/60 backdrop-blur-sm hover:bg-card/80 border-2 border-input hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1">
              {type.icon}
              <CardHeader className="p-0">
                <CardTitle className="text-lg font-semibold">
                  {type.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 mt-1 flex-1">
                <p className="text-sm text-muted-foreground">
                  {type.description}
                </p>
              </CardContent>
              <div className="mt-4 flex justify-end">
                <ArrowRight className="h-4 w-4 text-muted-foreground/50 transition-transform duration-300 group-hover:text-primary group-hover:translate-x-1" />
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold tracking-tight mb-6 text-center">Available Presentations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card className="bg-card/60 backdrop-blur-sm border-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <File className="h-5 w-5 text-primary" />
                Sales Overview (PPT 1)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Comprehensive sales data overview and analysis.
              </p>
              <a href="/api/ppt/ppt1.pptx" download>
                <Button className="w-full">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Download PPT 1
                </Button>
              </a>
            </CardContent>
          </Card>

          <Card className="bg-card/60 backdrop-blur-sm border-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <File className="h-5 w-5 text-primary" />
                Market Analysis (PPT 2)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                In-depth market trends and future projections.
              </p>
              <a href="/api/ppt/ppt2.pptx" download>
                <Button className="w-full">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Download PPT 2
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
