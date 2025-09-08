
"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DatabaseBackupPage() {
  const router = useRouter();

  const backupPolicyText = `The system stores summary data in the database for 30 days. After this period, it consolidates the past 30 days of data into a single monthly summary and deletes the original 30-day data. This monthly summarization continues for up to 12 months.

Once 12 months of monthly summaries accumulate, these are further consolidated into a yearly summary, and all the individual monthly data is removed. This cycle of daily, monthly, and yearly summarization and deletion repeats continuously over multiple years.

This process ensures that the database retains summarized data at different granularities without storing all detailed older data, which is how data is effectively backed up and managed for long-term analysis while optimizing storage.`;

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
            Database Backup
          </h1>
        </div>

        <Card className="shadow-lg border-border/60 bg-card/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Data Management Cycle</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              className="w-full h-[400px] resize-none border-0 focus:ring-0 text-lg leading-relaxed bg-transparent p-0 text-muted-foreground"
              readOnly
              value={backupPolicyText}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
