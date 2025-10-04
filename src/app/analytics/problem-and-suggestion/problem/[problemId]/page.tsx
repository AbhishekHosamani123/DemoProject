
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft, Video } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { SuggestionList } from "@/components/app/suggestion-list";

const problemDetails: Record<string, { title: string; explanation: string }> = {
  "high-customer-churn": { 
    title: "High Customer Churn",
    explanation: "Analysis of customer data indicates a churn rate of 18% over the last quarter, which is 5% above the industry average. The primary drivers appear to be a lack of engagement with new product features and a perceived gap in customer support responsiveness for non-enterprise clients. This churn is concentrated in the mid-market segment, specifically among customers who have been with us for 6-12 months. The financial impact is a direct loss of approximately ₹1.2Cr in recurring revenue and an estimated opportunity cost of ₹3Cr in potential upsells."
  },
  "inefficient-marketing-spend": { title: "Inefficient Marketing Spend", explanation: "Explanation for Inefficient Marketing Spend..." },
  "supply-chain-bottlenecks": { title: "Supply Chain Bottlenecks", explanation: "Explanation for Supply Chain Bottlenecks..." },
  "low-user-engagement": { title: "Low User Engagement", explanation: "Explanation for Low User Engagement..." },
  "product-feature-gaps": { title: "Product Feature Gaps", explanation: "Explanation for Product Feature Gaps..." },
  "financial-irregularities": { title: "Financial Irregularities", explanation: "Explanation for Financial Irregularities..." },
};

const suggestions = [
  { id: "suggestion-1", text: "Suggestion 1", percentage: 98 },
  { id: "suggestion-2", text: "Suggestion 2", percentage: 95 },
  { id: "suggestion-3", text: "Suggestion 3", percentage: 92 },
  { id: "suggestion-4", text: "Suggestion 4", percentage: 88 },
  { id: "suggestion-5", text: "Suggestion 5", percentage: 85 },
  { id: "suggestion-6", text: "Suggestion 6", percentage: 80 },
];

export default function ProblemDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const problemId = params.problemId as string;

  const details = problemDetails[problemId] || { title: "Problem not found", explanation: "No details available."};

  return (
    <div className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col">
       <div className="w-full max-w-6xl mx-auto mb-8">
        <Button
          onClick={() => router.back()}
          variant="outline"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      
      <div className="w-full mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight inline-block border rounded-lg px-6 py-3 bg-card/60 backdrop-blur-sm">
            {details.title.toUpperCase()}
          </h1>
      </div>

      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
            <Card className="shadow-lg border-border/60 bg-card/60 backdrop-blur-sm h-full">
                <CardHeader>
                    <CardTitle>REASON AND EXPLANATION OF PROBLEM</CardTitle>
                </CardHeader>
                <CardContent>
                    <Textarea
                        className="w-full h-[300px] resize-none border-0 focus:ring-0 text-base bg-transparent p-0 text-muted-foreground"
                        readOnly
                        value={details.explanation}
                    />
                </CardContent>
            </Card>
        </div>
        <div className="space-y-4">
            <SuggestionList
                suggestions={suggestions}
                basePath={`/analytics/problem-and-suggestion/problem/${problemId}`}
            />
        </div>
      </div>
        <div className="w-full max-w-6xl mx-auto mt-8 flex justify-center">
            <Button size="lg" className="h-12 text-lg font-semibold">
                <Video className="mr-2 h-5 w-5"/>
                Generate Video
            </Button>
        </div>
    </div>
  );
}
