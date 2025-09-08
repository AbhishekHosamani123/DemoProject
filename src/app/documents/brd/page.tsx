"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Download, Video, Wrench, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BrdPage() {
  const router = useRouter();

  const generatedText = `1. Introduction

1.1. Purpose: To outline the business requirements for the new Customer Relationship Management (CRM) system.
1.2. Scope: This document covers the core functionalities of the CRM, including contact management, sales tracking, and reporting.
1.3. Objectives:
- Increase sales team productivity by 20%.
- Improve customer data accuracy to 95%.
- Enhance customer satisfaction by 15%.

2. User Requirements

2.1. Functional Requirements:
- The system must allow users to create, read, update, and delete customer contacts.
- The system must provide a real-time dashboard of sales activities.
- The system must generate weekly and monthly sales reports.

2.2. Non-Functional Requirements:
- The system must be available 99.9% of the time.
- The system must support up to 1,000 concurrent users.
- The system must be accessible on web and mobile devices.

3. Stakeholders

- Sales Team: Primary users of the system.
- Marketing Team: Will use the system for campaign management.
- IT Department: Responsible for system maintenance and support.`;

  return (
    <div className="relative flex-1 bg-background">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/10 blur-[100px]"></div>
      </div>
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col">
        <div className="w-full max-w-4xl mb-4 text-center mx-auto">
          <h1 className="text-4xl font-bold tracking-tight">
            Business Requirement Document
          </h1>
          <p className="text-muted-foreground mt-2">
            Review and take action on your generated BRD.
          </p>
        </div>

        <div className="w-full max-w-4xl mx-auto mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="self-start"
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
              Download BRD
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
