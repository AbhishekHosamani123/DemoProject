
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Calendar as CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function DatabaseBackupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();
  const [isFromDatePickerOpen, setIsFromDatePickerOpen] = useState(false);
  const [isToDatePickerOpen, setIsToDatePickerOpen] = useState(false);

  const backupPolicyText = `The system stores summary data in the database for 30 days. After this period, it consolidates the past 30 days of data into a single monthly summary and deletes the original 30-day data. This monthly summarization continues for up to 12 months.

Once 12 months of monthly summaries accumulate, these are further consolidated into a yearly summary, and all the individual monthly data is removed. This cycle of daily, monthly, and yearly summarization and deletion repeats continuously over multiple years.

This process ensures that the database retains summarized data at different granularities without storing all detailed older data, which is how data is effectively backed up and managed for long-term analysis while optimizing storage.`;

  const handleStartBackup = () => {
    if (!fromDate || !toDate) {
      toast({
        variant: "destructive",
        title: "Date range not selected",
        description: "Please select both a 'From' and 'To' date.",
      });
      return;
    }
    toast({
      title: "Backup Started",
      description: `Backup initiated for the period from ${format(fromDate, "PPP")} to ${format(toDate, "PPP")}.`,
    });
  }

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

        <Card className="shadow-lg border-border/60 bg-card/60 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle>Data Management Cycle</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              className="w-full h-[300px] resize-none border-0 focus:ring-0 text-lg leading-relaxed bg-transparent p-0 text-muted-foreground"
              readOnly
              value={backupPolicyText}
            />
          </CardContent>
        </Card>

        <Card className="bg-card/60 backdrop-blur-sm p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                 <div className="space-y-2">
                  <Label htmlFor="from-date">From</Label>
                  <Popover open={isFromDatePickerOpen} onOpenChange={setIsFromDatePickerOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        id="from-date"
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !fromDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {fromDate ? format(fromDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={fromDate}
                        onSelect={(date) => {
                          setFromDate(date);
                          setIsFromDatePickerOpen(false);
                        }}
                        captionLayout="dropdown-buttons"
                        fromYear={2001}
                        toYear={2025}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="to-date">To</Label>
                  <Popover open={isToDatePickerOpen} onOpenChange={setIsToDatePickerOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        id="to-date"
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !toDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {toDate ? format(toDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={toDate}
                        onSelect={(date) => {
                          setToDate(date);
                          setIsToDatePickerOpen(false);
                        }}
                        captionLayout="dropdown-buttons"
                        fromYear={2001}
                        toYear={2025}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
            </div>
             <div className="flex justify-center">
                <Button size="lg" onClick={handleStartBackup} className="w-full max-w-xs">
                    Start Backup
                </Button>
            </div>
        </Card>
      </div>
    </div>
  );
}
