
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, Video } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { suggestionData } from "@/lib/content/suggestion-data";

export default function SuggestionDetailPage() {
  const router = useRouter();
  const params = useParams();
  const suggestionId = params.suggestionId as string;
  const data = suggestionData[suggestionId] || {
    title: "Suggestion not found",
    percentage: 0,
    suggestion: "No suggestion available.",
    hypotheses: "No hypotheses available.",
  };

  return (
    <div className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col">
      <div className="w-full max-w-6xl mx-auto mb-8">
        <Button
          onClick={() => router.back()}
          variant="outline"
          className="mb-4"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight inline-block border rounded-lg px-4 py-2 bg-card/60">
            {data.title.toUpperCase()} - <span className="text-primary">{data.percentage}%</span>
          </h1>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">SUGGESTION:</h2>
            <p className="text-muted-foreground text-lg leading-relaxed border-l-4 border-primary pl-4">
              {data.suggestion}
            </p>
          </div>
          
          <div className="space-y-4">
            <Card className="bg-card/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>HYPOTHESIS REPORT</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  className="w-full h-64 resize-none border-0 focus:ring-0 text-base bg-transparent p-0"
                  readOnly
                  value={data.hypotheses.split('\n\n').map(h => h.trim()).join('\n\n')}
                />
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" className="h-12 text-lg font-semibold">
                <Video className="mr-2 h-5 w-5"/>
                Generate Video
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
