
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft } from "lucide-react";
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
      "To address the declining Q3 sales, our primary recommendation is to launch a targeted 'Win-Back' email campaign aimed at customers who have churned in the last 6-12 months. This segment represents a high-potential opportunity for re-engagement with a relatively low cost per acquisition. The campaign should highlight new product features, offer a limited-time discount, and include personalized content based on their past purchase history to maximize relevance and impact.",
    hypotheses: `Hypothesis A (Week 1): Identify and segment the target audience. Filter customers who have not made a purchase in the last 180-365 days but were previously active. Further segment based on purchase frequency and average order value.

Hypothesis B (Week 1): Develop three distinct offers for the A/B test. Offer A: 25% off their next purchase. Offer B: A fixed-value coupon (e.g., $50 off). Offer C: A free, high-value complementary product with their next order.

Hypothesis C (Week 2): Design and write the email copy. Create compelling subject lines and personalized email bodies that reference their previous relationship with the brand and showcase new, relevant product enhancements.

Hypothesis D (Week 3): Launch the campaign and monitor initial engagement metrics such as open rates, click-through rates, and conversion rates for each segment and offer.

Hypothesis E (Week 4-5): Analyze the results of the A/B test to identify the winning offer and scale the campaign to the entire churned customer list. Continuously track revenue and ROI.`,
  },
  "suggestion-2": {
    title: "Suggestion 2",
    percentage: 95,
    suggestion:
      "To combat the recent increase in customer support tickets related to onboarding, we propose developing an interactive, in-app product tour. This solution will provide new users with a guided walkthrough of key features and functionalities, reducing their initial learning curve and empowering them to find value faster. This will not only improve the user experience but also decrease the burden on the support team, allowing them to focus on more complex issues.",
    hypotheses: `Hypothesis A (Week 1): Map out the critical user activation journey. Identify the top 5-7 'aha!' moments and core features that a new user must understand to be successful with the product.

Hypothesis B (Week 2): Write the script for the product tour. Keep the language clear, concise, and action-oriented. Break down complex steps into smaller, digestible pieces of information.

Hypothesis C (Week 2-3): Choose and integrate a suitable in-app guidance tool (e.g., Pendo, Appcues, or a custom-built solution) that allows for easy creation and deployment of product tours.

Hypothesis D (Week 4): Build the interactive tour within the chosen tool. Implement tooltips, modals, and hotspots to guide the user through the interface.

Hypothesis E (Week 5): Launch the tour to a segment of new users (e.g., 25% of sign-ups) and gather feedback. Monitor key metrics such as tour completion rate, feature adoption, and the number of support tickets from this user cohort. Iterate based on feedback before a full rollout.`,
  },
  "suggestion-3": {
    title: "Suggestion 3",
    percentage: 92,
    suggestion:
      "To address the low conversion rate from trial to paid accounts, we recommend implementing a lead scoring model and a targeted drip email campaign. By identifying the most engaged trial users, the sales team can focus their efforts on high-potential leads, while automated emails can nurture less-engaged users. This dual approach will increase conversion efficiency and ensure no potential customer is left behind.",
    hypotheses: `Hypothesis A (Week 1): Define lead scoring criteria based on user behavior (e.g., features used, session frequency, team members invited). Assign points to each action to quantify user engagement.

Hypothesis B (Week 1): Implement the lead scoring model in your CRM or marketing automation platform to automatically track and score trial users.

Hypothesis C (Week 2): Create two separate email nurture streams. One for highly-engaged users ('hot leads') with case studies and a direct call-to-action to speak with sales. The other for less-engaged users with educational content and tips to encourage product exploration.

Hypothesis D (Week 3): Set up triggers to automatically enroll users into the appropriate drip campaign based on their lead score.

Hypothesis E (Week 4): Launch the system and closely monitor the conversion rates for both nurtured groups compared to a control group. Provide the sales team with a real-time dashboard of hot leads.`,
  },
  "suggestion-4": {
    title: "Suggestion 4",
    percentage: 88,
    suggestion:
      "To improve marketing ROI, we suggest reallocating a portion of the paid advertising budget towards creating high-quality, SEO-optimized content marketing. This includes in-depth blog posts, a comprehensive industry report, and a series of video tutorials. This long-term strategy will build organic traffic, establish brand authority, and generate leads at a much lower cost-per-acquisition compared to paid channels.",
    hypotheses: `Hypothesis A (Week 1): Conduct comprehensive keyword research to identify high-intent, low-competition topics relevant to your target audience.

Hypothesis B (Week 2-3): Develop a content calendar for the next quarter. Plan for at least two in-depth blog posts per month, one major industry report, and a series of five short video tutorials.

Hypothesis C (Week 4-8): Produce the content. Assign topics to writers and videographers. Ensure all content is high-quality, well-researched, and aligns with SEO best practices (meta descriptions, internal linking, etc.).

Hypothesis D (Ongoing): Publish and promote the content across social media, email newsletters, and relevant online communities.

Hypothesis E (Ongoing): Track key SEO metrics (organic traffic, keyword rankings, backlinks) and lead generation from content downloads. Use this data to refine the content strategy for the following quarter.`,
  },
  "suggestion-5": {
    title: "Suggestion 5",
    percentage: 85,
    suggestion:
      "To reduce the high employee turnover rate in the engineering department, we recommend implementing a formal mentorship program and creating clearer career progression paths. Pairing junior engineers with senior mentors will accelerate their development and increase job satisfaction. Clearly defined career ladders will provide transparency and motivation, showing engineers a clear future within the company.",
    hypotheses: `Hypothesis A (Month 1): Survey the engineering team to understand their career aspirations and pain points. Use this feedback to design the mentorship program and career ladders.

Hypothesis B (Month 1): Define the roles, responsibilities, and expectations for both mentors and mentees. Create a framework for career levels (e.g., Junior, Mid-Level, Senior, Staff Engineer) with specific skill and impact requirements for each.

Hypothesis C (Month 2): Launch the mentorship program. Match mentors and mentees based on skills, experience, and career goals. Provide training for mentors on how to give effective feedback and guidance.

Hypothesis D (Month 2): Announce and document the new career progression paths. Make this information easily accessible to all team members.

Hypothesis E (Ongoing): Conduct regular check-ins with mentorship pairs and hold quarterly career development conversations. Track employee satisfaction scores and retention rates over the next 6-12 months to measure the program's impact.`,
  },
  "suggestion-6": {
    title: "Suggestion 6",
    percentage: 80,
    suggestion:
      "To optimize inventory management and reduce carrying costs, we suggest adopting a Just-In-Time (JIT) inventory system for your top 20% best-selling products. This will minimize the amount of capital tied up in stock and reduce the risk of overstocking. This requires closer collaboration with key suppliers to ensure timely deliveries.",
    hypotheses: `Hypothesis A (Week 1): Analyze sales data from the past 12 months to identify the top 20% of products by sales volume and revenue.

Hypothesis B (Week 2-3): Engage with the suppliers for these key products. Negotiate new agreements that support smaller, more frequent orders and establish clear communication channels for demand forecasting.

Hypothesis C (Week 4): Implement an inventory management software that provides real-time visibility into stock levels and sales data. Set up automated low-stock alerts for the selected products.

Hypothesis D (Month 2): Begin placing smaller, more frequent orders based on real-time demand and sales forecasts.

Hypothesis E (Ongoing): Continuously monitor inventory turnover rates, carrying costs, and stockout incidents for the products under the JIT system. Gradually expand the system to other products as the process is refined and supplier relationships are strengthened.`,
  },
};

export default function SolutionReportPage() {
  const router = useRouter();
  const params = useParams();
  const suggestionId = params.suggestionId as string;
  const data = suggestionData[suggestionId] || {
    title: "Suggestion not found",
    percentage: 0,
    suggestion: "No suggestion available for this problem.",
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
  );
}

    