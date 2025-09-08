
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const auditDetails = [
  {
    title: "Latest Updates",
    points: [
      "All updated news related to compliance and regulations.",
      "Market-cap-based updates, customized as per your company's scale and needs.",
    ],
  },
  {
    title: "Company-Specific Rules & Formats",
    points: [
      "Standard formats, rules, and procedures necessary for your company.",
      "Personalized display of rules and information applicable only to your organization.",
    ],
  },
  {
    title: "Laws & Sections",
    points: [
      "All concerned laws and sections that must be followed.",
      "Display of only the specific provisions applicable to your company.",
    ],
  },
  {
    title: "Government Regulations",
    points: [
      "Central government rules and regulations relevant to your operations.",
      "State government rules and regulations applicable to your company.",
    ],
  },
  {
    title: "Compliance & Applicability",
    points: [
      "Only the laws, rules, and sections directly impacting your company will be shown.",
      "Ensures you follow exactly what is required—nothing more, nothing less.",
    ],
  },
];

export default function AuditZonePage() {
  const router = useRouter();

  return (
    <div className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <div className="mb-8">
          <Button onClick={() => router.back()} variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>

        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight inline-block border rounded-lg px-6 py-3 bg-card/60 backdrop-blur-sm">
              Zone Overview
            </h1>
        </div>
        
        <Card className="bg-card/60 backdrop-blur-sm p-6">
            <CardContent className="text-lg space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                    In this section, you will find all relevant updates and guidelines for your company.
                </p>
                
                <div>
                    <h2 className="text-2xl font-semibold mb-4 text-primary">Details include:</h2>
                    <ul className="space-y-4 list-disc pl-5">
                        {auditDetails.map((category) => (
                            <li key={category.title} className="text-xl font-medium text-foreground">
                                {category.title}
                                <ul className="list-disc pl-6 mt-2 space-y-2">
                                    {category.points.map((point, index) => (
                                        <li key={index} className="text-base font-normal text-muted-foreground">
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>

            </CardContent>
        </Card>
      </div>
    </div>
  );
}
