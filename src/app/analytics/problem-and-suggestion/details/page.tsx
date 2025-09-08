
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
  { id: "high-customer-churn", title: "High Customer Churn" },
  { id: "inefficient-marketing-spend", title: "Inefficient Marketing Spend" },
  { id: "supply-chain-bottlenecks", title: "Supply Chain Bottlenecks" },
  { id: "low-user-engagement", title: "Low User Engagement" },
  { id: "product-feature-gaps", title: "Product Feature Gaps" },
  { id: "financial-irregularities", title: "Financial Irregularities" },
];

export default function ProblemSuggestionDetailsPage() {
  const router = useRouter();

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
                    onSelect={() => router.push(`/analytics/problem-and-suggestion/problem/${problem.id}`)}
                  >
                    {problem.title}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
