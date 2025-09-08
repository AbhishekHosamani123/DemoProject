
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, MessageSquare } from "lucide-react";
import { useRouter, useParams } from "next/navigation";

const suggestionData: Record<
  string,
  {
    title: string;
    percentage: number;
    suggestion: string;
    hypotheses: string;
  }
> = {
  "suggestion-1": {
    title: "Suggestion 1",
    percentage: 98,
    suggestion:
      "Focus on upselling 'InsightEngine' to existing customers who have purchased 'DataScribe' in the last 12 months. This segment has shown a 40% higher likelihood of conversion.",
    hypotheses: `Hypothesis A: Focusing on the top 20% of customers from last quarter will yield a higher conversion rate for new product bundles.
Hypothesis B: A targeted email campaign to inactive users with a special offer will reactivate at least 15% of them.
Hypothesis C: Increasing ad spend on social media platforms will lead to a 10% increase in lead generation but with a higher customer acquisition cost.`,
  },
  "suggestion-2": {
    title: "Suggestion 2",
    percentage: 95,
    suggestion:
      "Launch a targeted marketing campaign for the APAC region, focusing on the retail sector. Our analysis indicates a significant untapped market potential in this area.",
    hypotheses: `Hypothesis D: Offering a discount for annual subscriptions will increase customer lifetime value by 25%.
Hypothesis E: Partnering with influencers in the tech niche will drive a 30% increase in brand awareness and organic traffic.
Hypothesis F: Improving the onboarding process will reduce churn by 20% in the first 90 days.`,
  },
  "suggestion-3": {
    title: "Suggestion 3",
    percentage: 92,
    suggestion:
      "Offer bundled discounts for 'InsightEngine' and 'DataScribe' to new enterprise clients. This could increase the average deal size by 25%.",
    hypotheses: `Hypothesis G: Customers who have purchased 'InsightEngine' are 50% more likely to buy 'DataScribe' within 6 months.
Hypothesis H: Expanding into the European market will require localized content to achieve similar conversion rates as North America.`,
  },
  "suggestion-4": {
    title: "Suggestion 4",
    percentage: 88,
    suggestion:
      "Develop a referral program for existing customers. This could generate a new stream of high-quality leads with a lower acquisition cost.",
    hypotheses: `Hypothesis I: A referral program could generate 10% of new leads from the existing customer base.
Hypothesis J: Simplifying the pricing model will shorten the sales cycle by 10-15 days.`,
  },
  "suggestion-5": {
    title: "Suggestion 5",
    percentage: 85,
    suggestion:
      "Create more in-depth content marketing materials, such as whitepapers and case studies, to better educate potential leads about the value of our products.",
    hypotheses: `Hypothesis K: Providing a dedicated account manager for enterprise clients will increase retention by 30%.
Hypothesis L: A/B testing landing pages for the new marketing campaign will improve conversion rates by up to 5%.`,
  },
  "suggestion-6": {
    title: "Suggestion 6",
    percentage: 80,
    suggestion:
      "Run a win-back campaign targeting customers who have churned in the past year. A special offer could reactivate a portion of this valuable segment.",
    hypotheses: `Hypothesis M: Automating follow-up emails can increase sales team productivity by 15%.
Hypothesis N: Hosting a webinar on industry trends will position the company as a thought leader and attract high-quality leads.`,
  },
};

export default function SuggestionDetailPage() {
  const router = useRouter();
  const params = useParams();
  const suggestionId = params.suggestionId as string;
  const data = suggestionData[suggestionId] || {
    title: "Suggestion not found",
    percentage: 0,
    suggestion: "",
    hypotheses: "No hypotheses available.",
  };

  return (
    <div className="relative flex-1 bg-background">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/10 blur-[100px]"></div>
      </div>
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col">
        <div className="w-full max-w-6xl mx-auto mb-8">
          <Button
            onClick={() => router.back()}
            className="bg-yellow-400 text-black hover:bg-yellow-500 mb-4"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight inline-block border rounded-lg px-4 py-2">
              {data.title.toUpperCase()} - {data.percentage}%
            </h1>
          </div>

          <div className="space-y-8">
            {/* Hypothesis Report */}
            <div className="space-y-4">
              <Card className="bg-card/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>HYPOTHESIS REPORT</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    className="w-full h-64 resize-none border-0 focus:ring-0 text-base bg-transparent p-0"
                    readOnly
                    value={data.hypotheses}
                  />
                </CardContent>
              </Card>
               <div className="flex justify-end">
                <Button variant="outline" className="rounded-full h-14 w-14 p-0 border-2">
                  <MessageSquare className="h-6 w-6"/>
                  <span className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 text-xs bg-card px-1 rounded">BOT</span>
                </Button>
              </div>
            </div>
            
            {/* Suggestion */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">SUGGESTION:</h2>
              <p className="text-muted-foreground text-lg leading-relaxed border-l-4 border-primary pl-4">
                {data.suggestion}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
