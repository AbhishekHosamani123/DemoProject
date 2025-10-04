
"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

interface Suggestion {
  id: string;
  text: string;
  percentage: number;
}

interface SuggestionListProps {
  suggestions: Suggestion[];
  basePath: string;
}

export function SuggestionList({ suggestions, basePath }: SuggestionListProps) {
  return (
    <Card className="bg-card/60 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="space-y-3">
          {suggestions.map((suggestion) => (
            <Link href={`${basePath}/${suggestion.id}`} key={suggestion.id} className="block group">
              <div className="flex items-center justify-between p-3 rounded-lg bg-background/80 border hover:bg-accent transition-colors">
                <span className="font-medium group-hover:text-accent-foreground">{suggestion.text}</span>
                <span className="text-sm font-bold bg-primary/10 text-primary px-2 py-1 rounded-md group-hover:text-primary-foreground group-hover:bg-primary">{suggestion.percentage}%</span>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
