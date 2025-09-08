
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { ChevronLeft, Download, Wrench } from "lucide-react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

const suggestions = [
  { id: "suggestion-1", text: "Suggestion 1", percentage: 98 },
  { id: "suggestion-2", text: "Suggestion 2", percentage: 95 },
  { id: "suggestion-3",text: "Suggestion 3", percentage: 92 },
  { id: "suggestion-4", text: "Suggestion 4", percentage: 88 },
  { id: "suggestion-5", text: "Suggestion 5", percentage: 85 },
  { id: "suggestion-6", text: "Suggestion 6", percentage: 80 },
];

const generatedText = `Q3 2024 Sales Forecast & Analysis

1. Executive Summary
This report projects a 15% quarter-over-quarter revenue growth, reaching ₹25.6Cr. Key drivers include the launch of 'InsightEngine v2' and expansion into the APAC market. The Indian market remains the dominant region, with a projected 60% of total revenue.

2. Forecast by Region
- India: ₹15.36Cr (60%)
- Europe: ₹6.4Cr (25%)
- APAC: ₹3.84Cr (15%)

3. Product Performance
- InsightEngine: Expected to contribute 70% of new revenue, driven by strong enterprise adoption.
- DataScribe: Stable growth, projected at 10% QoQ.
- Legacy Products: Declining sales, recommend sunsetting by Q1 2025.

4. Key Performance Indicators (KPIs)
- New ARR Target: ₹24Cr
- Customer Acquisition Cost (CAC): Target < ₹4L
- Lifetime Value (LTV): Maintain LTV/CAC ratio of 3:1 or higher.

5. Risks & Mitigation
- Risk: Increased competition in the analytics space.
- Mitigation: Emphasize unique AI-driven features in marketing campaigns and provide competitive pricing bundles.`;

export default function SalesForecastingPage() {
  const router = useRouter();

  return (
    <div className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col">
      <div className="w-full mb-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Sales Forecasting
        </h1>
      </div>

      <div className="w-full max-w-6xl mx-auto mb-8">
        <Button
          onClick={() => router.back()}
          variant="outline"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <Card className="shadow-lg border-border/60">
            <CardContent className="p-0">
               <Textarea
                  className="w-full h-[600px] resize-none border-0 focus:ring-0 text-base rounded-lg"
                  readOnly
                  value={generatedText}
                />
            </CardContent>
          </Card>
          <div className="flex gap-4">
            <Button size="lg" className="w-full">
              <Download className="mr-2" />
              Download
            </Button>
            <Button size="lg" variant="secondary" className="w-full">
              <Wrench className="mr-2" />
              Customize
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Card className="bg-card/60 backdrop-blur-sm">
              <CardContent className="p-4">
                  <div className="space-y-3">
                  {suggestions.map((suggestion) => (
                    <Link href={`/analytics/forecasting-analyst/sales-forecasting/${suggestion.id}`} key={suggestion.id} className="group">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-background/80 border hover:bg-accent transition-colors cursor-pointer">
                        <span className="font-medium group-hover:text-accent-foreground">{suggestion.text}</span>
                        <span className="text-primary font-bold bg-primary/10 px-2 py-1 rounded-md">{suggestion.percentage}%</span>
                      </div>
                    </Link>
                  ))}
                  </div>
              </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
