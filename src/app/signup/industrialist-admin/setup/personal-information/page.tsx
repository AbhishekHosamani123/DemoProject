
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronLeft, Calendar as CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function PersonalInfoPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [date, setDate] = React.useState<Date>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Information Saved",
      description: "Company personal details have been saved.",
    });
    router.push('/signup/industrialist-admin/setup');
  };

  return (
    <main className="relative flex-1 flex flex-col items-center justify-center p-4 min-h-screen bg-background">
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-10">
        <Button onClick={() => router.back()} variant="outline">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <Card className="w-full max-w-2xl bg-card/60 backdrop-blur-sm border-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl">
            Step 1: Company Personal Details Collection
          </CardTitle>
          <CardDescription>
            Enter the exact legal name as registered with authorities to ensure
            official identification.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <fieldset className="border p-4 rounded-lg space-y-4">
                <legend className="px-2 text-primary font-semibold">Basic Company Information</legend>
                <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input id="company-name" placeholder="Enter the exact legal name as registered" />
                    <p className="text-xs text-muted-foreground">Ensure official identification and avoid name ambiguity.</p>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="established-date">Established Date</Label>
                     <Popover>
                        <PopoverTrigger asChild>
                            <Button
                            variant={"outline"}
                            className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                            )}
                            >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            captionLayout="dropdown-buttons" fromYear={1900} toYear={2024}
                            />
                        </PopoverContent>
                    </Popover>
                    <p className="text-xs text-muted-foreground">Crucial for legal records and historical performance analysis.</p>
                </div>
                <div className="space-y-2">
                    <Label>Business Registration Status</Label>
                    <RadioGroup defaultValue="active" className="flex gap-4 pt-2">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="active" id="active" />
                            <Label htmlFor="active">Active</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="dormant" id="dormant" />
                            <Label htmlFor="dormant">Dormant</Label>
                        </div>
                         <div className="flex items-center space-x-2">
                            <RadioGroupItem value="restructuring" id="restructuring" />
                            <Label htmlFor="restructuring">Under Restructuring</Label>
                        </div>
                    </RadioGroup>
                    <p className="text-xs text-muted-foreground">Determines eligibility for certain workflows and reporting.</p>
                </div>
            </fieldset>

            <fieldset className="border p-4 rounded-lg space-y-4">
                <legend className="px-2 text-primary font-semibold">Contact Information</legend>
                 <div className="space-y-2">
                    <Label htmlFor="primary-email">Primary Email Address</Label>
                    <Input id="primary-email" type="email" placeholder="official@company.com" />
                     <p className="text-xs text-muted-foreground">Official business email for system notifications.</p>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="secondary-email">Secondary Email Address</Label>
                    <Input id="secondary-email" type="email" placeholder="backup@company.com" />
                     <p className="text-xs text-muted-foreground">Backup for account recovery and additional communications.</p>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="website">Official Website URL</Label>
                    <Input id="website" type="url" placeholder="https://www.company.com" />
                     <p className="text-xs text-muted-foreground">Company's primary web presence for digital identity verification.</p>
                </div>
            </fieldset>
            
            <fieldset className="border p-4 rounded-lg">
                <legend className="px-2 text-primary font-semibold">Company Legal Structure</legend>
                <div className="space-y-2">
                    <Label htmlFor="legal-structure">Select from dropdown menu:</Label>
                    <Select>
                        <SelectTrigger id="legal-structure">
                            <SelectValue placeholder="Select a legal structure" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pvt-ltd">Private Limited Company (Pvt. Ltd.)</SelectItem>
                            <SelectItem value="ltd">Public Limited Company (Ltd.)</SelectItem>
                            <SelectItem value="llp">Limited Liability Partnership (LLP)</SelectItem>
                            <SelectItem value="partnership">Partnership Firm</SelectItem>
                            <SelectItem value="sole-prop">Sole Proprietorship</SelectItem>
                            <SelectItem value="section-8">Section 8 Company (Non-profit)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </fieldset>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Save and Continue
            </Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
