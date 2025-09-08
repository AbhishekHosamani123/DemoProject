
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { useRouter, useParams } from "next/navigation";

const suggestionData: Record<string, { title: string; hypotheses: string[] }> = {
    "suggestion-1": {
        title: "Suggestion 1",
        hypotheses: [
            "Hypothesis A: Focusing on the top 20% of customers from last quarter will yield a higher conversion rate for new product bundles.",
            "Hypothesis B: A targeted email campaign to inactive users with a special offer will reactivate at least 15% of them.",
            "Hypothesis C: Increasing ad spend on social media platforms will lead to a 10% increase in lead generation but with a higher customer acquisition cost."
        ]
    },
    "suggestion-2": {
        title: "Suggestion 2",
        hypotheses: [
            "Hypothesis D: Offering a discount for annual subscriptions will increase customer lifetime value by 25%.",
            "Hypothesis E: Partnering with influencers in the tech niche will drive a 30% increase in brand awareness and organic traffic.",
            "Hypothesis F: Improving the onboarding process will reduce churn by 20% in the first 90 days."
        ]
    },
    "suggestion-3": {
        title: "Suggestion 3",
        hypotheses: [
            "Hypothesis G: Customers who have purchased 'InsightEngine' are 50% more likely to buy 'DataScribe' within 6 months.",
            "Hypothesis H: Expanding into the European market will require localized content to achieve similar conversion rates as North America.",
        ]
    },
    "suggestion-4": {
        title: "Suggestion 4",
        hypotheses: [
            "Hypothesis I: A referral program could generate 10% of new leads from the existing customer base.",
            "Hypothesis J: Simplifying the pricing model will shorten the sales cycle by 10-15 days.",
        ]
    },
    "suggestion-5": {
        title: "Suggestion 5",
        hypotheses: [
            "Hypothesis K: Providing a dedicated account manager for enterprise clients will increase retention by 30%.",
            "Hypothesis L: A/B testing landing pages for the new marketing campaign will improve conversion rates by up to 5%.",
        ]
    },
    "suggestion-6": {
        title: "Suggestion 6",
        hypotheses: [
            "Hypothesis M: Automating follow-up emails can increase sales team productivity by 15%.",
            "Hypothesis N: Hosting a webinar on industry trends will position the company as a thought leader and attract high-quality leads.",
        ]
    },
}


export default function SuggestionDetailPage() {
  const router = useRouter();
  const params = useParams();
  const suggestionId = params.suggestionId as string;
  const data = suggestionData[suggestionId] || { title: "Suggestion not found", hypotheses: [] };

  return (
    <div className="relative flex-1 bg-background">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/10 blur-[100px]"></div>
      </div>
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col">
        <div className="w-full max-w-4xl mx-auto mb-8">
          <Button
            onClick={() => router.back()}
            className="bg-yellow-400 text-black hover:bg-yellow-500"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>

        <div className="w-full max-w-4xl mx-auto space-y-8">
            <Card className="bg-card/60 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-3xl">{data.title}</CardTitle>
                    <CardDescription>Generated hypotheses based on the selected suggestion.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {data.hypotheses.map((hypothesis, index) => (
                        <div key={index} className="p-4 rounded-lg bg-background/80 border">
                            <p className="text-base">{hypothesis}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
