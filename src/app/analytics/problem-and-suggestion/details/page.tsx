
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  CheckCircle2,
  ChevronDown,
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

const problemDetails = {
    "problem-1": [
      "Detects issues in real time.",
      "Prioritizes them based on severity.",
      "Explains underlying causes.",
      "Suggests 5-6 data-backed, actionable solutions for each problem.",
      "Provides a confidence score and impact forecast.",
      "No Manual Scanning required",
    ],
    "business-gaps": [
      "Identifies market opportunities.",
      "Highlights feature gaps in product.",
      "Analyzes competitor weaknesses.",
    ],
    "financial-irregularities": [
        "Flags unusual spending patterns.",
        "Detects potential compliance issues.",
        "Monitors budget deviations in real time.",
    ],
    "problem-4": [
        "Detail for problem 4.",
        "Another detail for problem 4.",
    ],
    "problem-n": [
        "Detail for problem N.",
    ]
};

export default function ProblemSuggestionDetailsPage() {
  const router = useRouter();
  const [selectedProblem, setSelectedProblem] = useState(problems[0].id);

  const details = problemDetails[selectedProblem as keyof typeof problemDetails] || [];

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
          {/* The main card has been removed as per the user's request */}
        </div>
      </div>
    </div>
  );
}
