
"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Download, Video, Wrench, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    <div className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col">
      <div className="w-full max-w-4xl mx-auto mb-8">
        <Button
          onClick={() => router.back()}
          variant="outline"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="w-full max-w-4xl mb-8 text-center mx-auto">
        <h1 className="text-3xl font-bold tracking-tight">
          Business Requirement Document
        </h1>
        <p className="text-muted-foreground mt-2">
          Review and take action on your generated BRD.
        </p>
      </div>

      <div className="w-full max-w-4xl space-y-6 mx-auto">
        <Card className="shadow-lg border-border/60 bg-card/60 backdrop-blur-sm">
          <CardContent className="p-0">
            <Textarea
              className="w-full h-[500px] resize-none border-0 focus:ring-0 text-base rounded-lg bg-transparent p-6"
              readOnly
              value={generatedText}
            />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button size="lg" className="w-full">
            <Download className="mr-2 h-4 w-4" />
            Download BRD
          </Button>
          <Button size="lg" className="w-full" variant="secondary">
            <Video className="mr-2 h-4 w-4" />
            Generate Video
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="lg" variant="secondary" className="w-full">
                <Wrench className="mr-2 h-4 w-4" />
                Customize
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Change to Numerics</DropdownMenuItem>
              <DropdownMenuItem>change style</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
