
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
      "Our analysis strongly indicates a significant opportunity in upselling 'InsightEngine' to your existing customer base. Specifically, customers who have purchased 'DataScribe' within the last 12 months represent a high-potential segment, demonstrating a 40% higher likelihood of conversion compared to other segments. Focusing sales efforts here could lead to a substantial increase in revenue with a lower customer acquisition cost.",
    hypotheses: `Hypothesis A: Targeting the top 20% of 'DataScribe' customers from the last quarter with a bundled offer for 'InsightEngine' will yield a conversion rate of at least 25%, significantly higher than the typical 5% rate for new acquisitions. This is based on observed purchasing patterns and product synergy.

Hypothesis B: A personalized email campaign aimed at users who have shown high engagement with 'DataScribe' but have not yet adopted 'InsightEngine' will reactivate interest and lead to a 15% uplift in trials for 'InsightEngine' within 30 days.

Hypothesis C: Increasing marketing ad spend on platforms like LinkedIn, targeting professionals in data analysis and business intelligence, will boost lead generation for 'InsightEngine' by 10%. However, this is expected to come with a 5% increase in customer acquisition cost, which should be monitored closely.`,
  },
  "suggestion-2": {
    title: "Suggestion 2",
    percentage: 95,
    suggestion:
      "We recommend launching a targeted marketing campaign for the APAC region, with a primary focus on the retail sector. Our market analysis indicates a significant and untapped potential in this area, driven by rapid digitalization and a growing need for advanced analytics solutions. A localized approach is crucial for success.",
    hypotheses: `Hypothesis D: Offering a 20% discount for annual subscriptions of our product suite to the first 100 enterprise clients in the APAC region will increase the customer lifetime value by an average of 25% by securing long-term commitments.

Hypothesis E: Partnering with three key technology influencers in the APAC retail niche will drive a 30% increase in brand awareness and generate a 15% increase in organic traffic to our regional landing page within the first quarter.

Hypothesis F: Implementing a more comprehensive and localized onboarding process, including in-language support and region-specific use cases, will reduce customer churn by 20% in the first 90 days for new APAC clients.`,
  },
  "suggestion-3": {
    title: "Suggestion 3",
    percentage: 92,
    suggestion:
      "A strategic opportunity exists in offering bundled discounts for 'InsightEngine' and 'DataScribe' to new enterprise-level clients. This approach not only enhances the value proposition but is also projected to increase the average deal size by a noteworthy 25%, accelerating revenue growth.",
    hypotheses: `Hypothesis G: Historical data suggests that enterprise clients who purchase 'InsightEngine' are 50% more likely to adopt 'DataScribe' within the subsequent six months. Proactively offering a bundle can capitalize on this trend and shorten the cross-sell cycle.

Hypothesis H: To achieve conversion rates in the European market similar to those in North America, it is essential to develop localized marketing content and case studies. A generic approach is projected to result in a 40% lower conversion rate.`,
  },
  "suggestion-4": {
    title: "Suggestion 4",
    percentage: 88,
    suggestion:
      "Developing a structured referral program for existing customers could unlock a new, high-quality stream of leads with a significantly lower acquisition cost. Satisfied customers can become powerful brand advocates, leading to more trusted and faster conversions.",
    hypotheses: `Hypothesis I: A well-structured referral program, offering a 10% commission on the first year's subscription value, has the potential to generate at least 10% of all new leads from the existing customer base within the next two quarters.

Hypothesis J: Simplifying the current multi-tiered pricing model into three clear packages ('Starter', 'Professional', 'Enterprise') will reduce decision fatigue for potential clients and is projected to shorten the average sales cycle by 10-15 days.`,
  },
  "suggestion-5": {
    title: "Suggestion 5",
    percentage: 85,
    suggestion:
      "To better educate potential leads and establish our brand as a thought leader, we recommend creating more in-depth content marketing materials. High-quality whitepapers, detailed case studies, and comprehensive webinars will help articulate the value of our products and nurture leads through the sales funnel.",
    hypotheses: `Hypothesis K: Providing a dedicated account manager for all enterprise-level clients will increase customer retention by 30% over a 12-month period, as it fosters a stronger, more personalized relationship and ensures that clients are maximizing the value of our products.

Hypothesis L: A/B testing different landing pages for our upcoming marketing campaign, one focused on technical features and the other on business outcomes, will improve overall conversion rates by up to 5% by identifying the most effective messaging for our target audience.`,
  },
  "suggestion-6": {
    title: "Suggestion 6",
    percentage: 80,
    suggestion:
      "Executing a targeted win-back campaign aimed at customers who have churned within the past 12 months presents a valuable opportunity. A special, limited-time offer, combined with messaging that highlights new features and improvements, could successfully reactivate a portion of this valuable segment.",
    hypotheses: `Hypothesis M: Automating the initial follow-up emails in our sales process can increase the productivity of our sales team by 15%, freeing them up to focus on more qualified leads and high-value conversations.

Hypothesis N: Hosting a monthly webinar on emerging industry trends, featuring guest experts, will position our company as a thought leader in the space. This is expected to attract high-quality leads and result in a 10% increase in MQLs (Marketing Qualified Leads).`,
  },
};

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
                    value={data.hypotheses.split('\n\n').map(h => h.trim()).join('\n\n')}
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
