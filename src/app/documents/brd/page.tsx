import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Video, Wrench } from "lucide-react";

export default function BrdPage() {
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
    <div className="relative flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/10 blur-[100px]"></div>
      </div>
      <div className="w-full max-w-4xl text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight">
          Business Requirement Document
        </h1>
      </div>
      <Card className="w-full max-w-4xl bg-card/60 backdrop-blur-sm">
        <CardContent className="p-6">
          <Textarea
            className="w-full h-[400px] bg-background/50 text-base"
            readOnly
            value={generatedText}
          />
        </CardContent>
        <CardHeader className="p-6 pt-0">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg">
              <Download className="mr-2 h-5 w-5" />
              Download
            </Button>
            <Button variant="outline" size="lg">
              <Video className="mr-2 h-5 w-5" />
              Video
            </Button>
            <Button variant="outline" size="lg">
              <Wrench className="mr-2 h-5 w-5" />
              Customize
            </Button>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
