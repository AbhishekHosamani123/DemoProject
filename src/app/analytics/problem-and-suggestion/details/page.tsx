
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChevronLeft,
  CheckCircle2,
  ChevronDown,
  Video,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const problems = [
  { id: "problem-1", title: "Problem 1" },
  { id: "business-gaps", title: "Business Problem Gaps" },
  { id: "financial-irregularities", title: "Financial Irregularities" },
  { id: "problem-4", title: "Problem 4" },
  { id: "problem-n", title: "Problem N" },
];

const problemDetails: Record<string, { title: string, details: string[] }> = {
    "problem-1": {
      title: "Problem 1",
      details: [
        "Detects issues in real time.",
        "Prioritizes them based on severity.",
        "Explains underlying causes.",
        "Suggests 5-6 data-backed, actionable solutions for each problem.",
        "Provides a confidence score and impact forecast.",
        "No Manual Scanning required",
      ]
    },
    "business-gaps": {
      title: "Business Problem Gaps",
      details: [
        "Identifies market opportunities.",
        "Highlights feature gaps in product.",
        "Analyzes competitor weaknesses.",
      ]
    },
    "financial-irregularities": {
      title: "Financial Irregularities",
      details: [
        "Flags unusual spending patterns.",
        "Detects potential compliance issues.",
        "Monitors budget deviations in real time.",
      ]
    },
    "problem-4": {
        title: "Problem 4",
        details: [
            "Detail for problem 4.",
            "Another detail for problem 4.",
        ]
    },
    "problem-n": {
        title: "Problem N",
        details: [
            "Detail for problem N.",
        ]
    }
};

export default function ProblemSuggestionDetailsPage() {
  const router = useRouter();
  const [selectedProblem, setSelectedProblem] = useState(problems[0].id);

  const details = problemDetails[selectedProblem as keyof typeof problemDetails];

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
      </div>

      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                Problems
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Business related</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {problems.map((problem) => (
                  <DropdownMenuItem
                    key={problem.id}
                    onSelect={() => setSelectedProblem(problem.id)}
                  >
                    {problem.title}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="lg:col-span-3">
          {details && (
            <Card className="bg-card/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl">{details.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {details.details.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-1 mr-3 shrink-0" />
                      <p className="text-muted-foreground">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="pt-4">
                  <Button size="lg" variant="secondary">
                    <Video className="mr-2 h-4 w-4" />
                    VIDEO
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
