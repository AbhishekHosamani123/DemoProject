
"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Download, Video, Wrench, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SalesStrategyPage() {
  const router = useRouter();

  const generatedText = `Slide 1: Title Slide
Title: Dominating the Market: A Q3 Sales Strategy
Subtitle: Driving Growth and Exceeding Targets
Date: [Date]
Presenter: [Your Name/Team Name]

Slide 2: Agenda
- Q2 Performance Review
- Q3 Goals and Objectives
- Target Market Analysis
- Key Strategies and Initiatives
- Sales Team Structure and Roles
- Tools and Resources
- KPIs and Success Metrics
- Q&A

Slide 3: Q2 Performance Review
- Total Sales: $1.2M (15% above target)
- Key Wins: Secured 3 enterprise clients
- Areas for Improvement: Need to increase outreach in the EMEA region.

Slide 4: Q3 Goals and Objectives
- Primary Goal: Achieve $1.5M in new sales revenue.
- Secondary Goal: Increase customer retention by 10%.
- Tertiary Goal: Expand market share in the APAC region by 5%.

Slide 5: Target Market Analysis
- Ideal Customer Profile: Mid-to-large enterprises in the tech industry.
- Key Pain Points: Inefficient workflows, lack of data integration.
- Our Solution: A comprehensive platform that streamlines operations and provides actionable insights.

Slide 6: Key Strategies and Initiatives
1.  Content Marketing: Publish 5 new case studies and host 2 webinars.
2.  Outbound Sales: Launch a targeted email campaign to 1,000 prospects.
3.  Partnerships: Collaborate with 3 new channel partners.

Slide 7: Sales Team Structure and Roles
- Sales Director: Oversees the entire sales process.
- Account Executives: Focus on closing new deals.
- Sales Development Reps: Generate and qualify leads.

Slide 8: Tools and Resources
- CRM: Salesforce
- Sales Engagement: Outreach.io
- Marketing Automation: Marketo

Slide 9: KPIs and Success Metrics
- Number of qualified leads per month.
- Conversion rate from lead to customer.
- Average deal size.
- Customer lifetime value.

Slide 10: Q&A
- Open floor for questions and discussion.
`;

  return (
    <div className="relative flex-1 bg-background">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/10 blur-[100px]"></div>
      </div>
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col">
        <div className="w-full max-w-4xl mb-4 text-center mx-auto">
          <h1 className="text-4xl font-bold tracking-tight">
            Sales Strategy Presentation
          </h1>
          <p className="text-muted-foreground mt-2">
            Review and take action on your generated presentation.
          </p>
        </div>

        <div className="w-full max-w-4xl mx-auto mb-8">
          <Button
            onClick={() => router.back()}
            className="bg-yellow-400 text-black hover:bg-yellow-500"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>

        <div className="w-full max-w-4xl space-y-8 mx-auto">
          <Card className="shadow-lg border-border/60">
            <CardContent className="p-0">
              <Textarea
                className="w-full h-[600px] resize-none border-0 focus:ring-0 text-base rounded-lg"
                readOnly
                value={generatedText}
              />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button size="lg" className="w-full">
              <Download className="mr-2" />
              Download PPT
            </Button>
            <Button size="lg" className="w-full">
              <Video className="mr-2" />
              Generate Video
            </Button>
            <Button size="lg" className="w-full">
              <Wrench className="mr-2" />
              Customize
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
