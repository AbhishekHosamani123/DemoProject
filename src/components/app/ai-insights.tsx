
"use client";

import { useState } from "react";
import { Wand2 } from "lucide-react";
import { getAIInsights } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

interface AiInsightsProps {
  data: string;
}

export function AiInsights({ data }: AiInsightsProps) {
  const [insights, setInsights] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateInsights = async () => {
    setIsLoading(true);
    setInsights("");
    const result = await getAIInsights(data);

    if ("error" in result) {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error,
      });
    } else {
      setInsights(result.insights);
    }
    setIsLoading(false);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          AI-Powered Insights
          <Wand2 className="h-6 w-6 text-primary" />
        </CardTitle>
        <CardDescription>
          Click to analyze your data and reveal key trends.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button
            onClick={handleGenerateInsights}
            disabled={isLoading}
            className="w-full"
            variant="primary"
          >
            {isLoading ? "Analyzing..." : "Generate Insights"}
          </Button>
          {isLoading && (
            <div className="space-y-2 pt-2">
              <Skeleton className="h-4 w-full bg-muted-foreground/20" />
              <Skeleton className="h-4 w-full bg-muted-foreground/20" />
              <Skeleton className="h-4 w-3/4 bg-muted-foreground/20" />
            </div>
          )}
          {insights && (
            <div className="p-4 bg-accent/10 rounded-lg border border-accent animate-in fade-in duration-300">
              <p className="text-sm whitespace-pre-wrap text-white">{insights}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
