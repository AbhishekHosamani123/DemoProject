"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const presentationTemplates = [
  "SALES STRATEGY DECKS",
  "FINANCIAL REVIEW PRESENTATION",
  "PRODUCT LAUNCH PRESENTATION",
  "PPT 4",
  "PPT 5",
  "PPT 6",
  "PPT 7",
  "PPT 8",
  "PPT 9",
  "PPT 10",
  "PPT 11",
  "PPT 12",
  "PPT 13",
  "PPT 16",
  "CUSTOM PPT",
];

export default function SingleTopicPage() {
  const router = useRouter();

  return (
    <div className="relative flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/10 blur-[100px]"></div>
      </div>
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Single Topic Presentation
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Choose a template to generate your presentation.
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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {presentationTemplates.map((template) => (
          <Link href="#" key={template}>
            <Card className="group h-32 flex items-center justify-center p-4 text-center bg-card/60 backdrop-blur-sm hover:bg-card/80 border-2 border-input hover:border-primary/50 transition-all duration-300 cursor-pointer transform hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="text-sm font-semibold">
                  {template}
                </CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
