
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft, CheckCircle2, Star, Cog } from "lucide-react";
import { useRouter } from "next/navigation";

const automatedWorkingStyle = [
  "UI lists all available topics (e.g., Sales, Finance, Projects, Investor Pitch). (Can choose multi topics)",
  "User selects topics → AI pulls relevant data and assembles a logical, branded deck.",
  "Generates a BI file in ~2 minutes.",
  "Preview/reorder/exclude modes before download.",
];

const customizations = [
  "AI suggests complementary topics.",
  "Past custom decks stored for quick reuse.",
  "Collaboration/sharing integration.",
  "Branding, tone, and audience adjustments.",
];

export default function CustomDashboardPage() {
  const router = useRouter();

  return (
    <div className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <div className="mb-8">
          <Button onClick={() => router.back()} variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight inline-block border-b-4 border-primary pb-2">
            Custom Visuals & Dashboards
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-card/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Cog className="mr-3 h-7 w-7 text-primary" />
                Automated Working Style
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 text-muted-foreground">
                {automatedWorkingStyle.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 mr-3 mt-1 text-green-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="bg-card/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Star className="mr-3 h-7 w-7 text-primary" />
                Customizations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 text-muted-foreground">
                {customizations.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 mr-3 mt-1 text-green-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 flex justify-center">
          <Button
            size="lg"
            className="h-14 text-lg font-bold"
          >
            Create Custom Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
