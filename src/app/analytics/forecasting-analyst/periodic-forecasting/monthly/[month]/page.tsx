
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
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

const initialSuggestions = [
  { id: "suggestion-1", text: "Suggestion 1", percentage: 98 },
  { id: "suggestion-2", text: "Suggestion 2", percentage: 96 },
  { id: "suggestion-3", text: "Suggestion 3", percentage: 94 },
  { id: "suggestion-4", text: "Suggestion 4", percentage: 91 },
  { id: "suggestion-5", text: "Suggestion 5", percentage: 90 },
  { id: "suggestion-6", text: "Suggestion 6", percentage: 88 },
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
          <h1 className="text-3xl font-bold tracking-tight inline-block border rounded-lg px-6 py-3 bg-card/60 backdrop-blur-sm">
            MONTHLY
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto mb-12">
          <Card className="bg-primary/10 border-primary/50">
            <CardContent className="p-0">
              <Input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full text-lg bg-transparent border-0 focus:ring-0 text-primary h-20"
                autoFocus
              />
            </CardContent>
          </Card>
          <div className="flex justify-center mt-6">
            <Button
              type="submit"
              size="lg"
            >
              Submit
            </Button>
          </div>
        </form>

        {showSuggestions && (
          <div className="w-full animate-in fade-in duration-500">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {initialSuggestions.map((suggestion) => (
                <Link href={`/analytics/forecasting-analyst/sales-forecasting/${suggestion.id}`} key={suggestion.id} className="group">
                  <Card className="text-center bg-card/60 backdrop-blur-sm hover:bg-card/80 border-2 border-input hover:border-primary/50 transition-all duration-300 cursor-pointer transform hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="text-lg font-bold text-primary bg-primary/10 px-4 py-2 rounded-md mb-4">
                        {suggestion.percentage}%
                      </div>
                      <p className="text-base font-semibold">{suggestion.text}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
