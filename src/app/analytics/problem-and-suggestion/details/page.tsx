
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, Video, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

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
          {problems.map((problem) => (
            <Card
              key={problem.id}
              onClick={() => setSelectedProblem(problem.id)}
              className={cn(
                "cursor-pointer transition-all duration-300 border-2",
                selectedProblem === problem.id
                  ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                  : "border-input bg-card/60 hover:border-primary/50 hover:bg-card/90"
              )}
            >
              <CardContent className="p-4 text-center">
                <h3 className="font-semibold text-base">{problem.title}</h3>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-3">
          <Card className="bg-card/60 backdrop-blur-sm p-6 min-h-[400px]">
            <CardContent className="space-y-6">
                <h2 className="text-xl font-semibold text-primary uppercase tracking-wider">AUTO-DETECTED PROBLEMS LIKE :</h2>
                <ul className="space-y-4">
                    {details.map((item, index) => (
                         <li key={index} className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-green-400 mr-3 mt-1 shrink-0" />
                            <span className="text-lg text-muted-foreground">{item}</span>
                        </li>
                    ))}
                </ul>

                <div className="flex justify-center pt-8">
                    <Button size="lg" variant="secondary" className="h-12 text-lg">
                        <Video className="mr-2 h-5 w-5" />
                        VIDEO
                    </Button>
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
