
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { SuggestionList } from "@/components/app/suggestion-list";

const initialSuggestions = [
  { id: "suggestion-1", text: "Suggestion 1", percentage: 98 },
  { id: "suggestion-2", text: "Suggestion 2", percentage: 95 },
  { id: "suggestion-3", text: "Suggestion 3", percentage: 92 },
  { id: "suggestion-4", text: "Suggestion 4", percentage: 88 },
  { id: "suggestion-5", text: "Suggestion 5", percentage: 85 },
  { id: "suggestion-6", text: "Suggestion 6", percentage: 80 },
];

export default function MonthlySuggestionPage() {
  const router = useRouter();
  const params = useParams();
  const month = params.month as string;
  const [goal, setGoal] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goal.trim()) {
      toast({
        variant: "destructive",
        title: "Goal is empty",
        description: "Please enter your profit goal.",
      });
      return;
    }

    const numericGoal = parseFloat(goal.replace(/,/g, ''));
    if (isNaN(numericGoal)) {
        toast({
            variant: "destructive",
            title: "Invalid number",
            description: "Please enter a valid profit goal.",
        });
        return;
    }

    if (numericGoal > 15000) {
        toast({
            title: "Let's start smaller!",
            description: "That's an ambitious goal! For now, let's focus on a more immediate target. Please enter a value of 15,000 or less to see suggestions.",
            duration: 5000,
        });
        return;
    }

    setShowSuggestions(true);
    toast({
      title: "Generating Suggestions",
      description: "AI is analyzing your goal...",
    });
  };

  return (
    <div className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <div className="mb-8">
          <Button
            onClick={() => router.back()}
            variant="outline"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight inline-block border rounded-lg px-6 py-3 bg-card/60 backdrop-blur-sm uppercase">
            {month}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto mb-12">
          <Card className="bg-cyan-900/30 border-cyan-500/50">
            <CardContent className="p-0">
              <Input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="What is your profit goal for this month? (e.g., 500000)"
                className="w-full text-lg bg-transparent border-0 focus:ring-0 text-cyan-100 h-20 placeholder:text-cyan-200/70"
                autoFocus
              />
            </CardContent>
          </Card>
          <div className="flex justify-center mt-6">
            <Button
              type="submit"
              size="lg"
            >
              Generate Suggestions
            </Button>
          </div>
        </form>

        {showSuggestions && (
            <div className="animate-in fade-in duration-500">
                <SuggestionList 
                    suggestions={initialSuggestions}
                    basePath={`/analytics/forecasting-analyst/periodic-forecasting/monthly/${month}`}
                />
            </div>
        )}
      </div>
    </div>
  );
}
