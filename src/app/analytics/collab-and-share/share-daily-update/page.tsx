
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ChevronLeft, BellRing, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const latestUpdate = {
  title: "SEBI (LODR) Second Amendment Regulations, 2023",
  summary: "The SEBI (Listing Obligations and Disclosure Requirements) (Second Amendment) Regulations, 2023, have been enacted, effective from June 14, 2023. This update introduces mandatory ESG reporting for the top 1000 listed companies by market capitalization, requiring detailed disclosures on environmental, social, and governance metrics. All relevant internal teams must align their reporting frameworks immediately to ensure compliance by the next filing cycle."
};

export default function ShareDailyUpdatePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [phoneNumbers, setPhoneNumbers] = useState("");
  const [emailIds, setEmailIds] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumbers.trim() && !emailIds.trim()) {
        toast({
            variant: "destructive",
            title: "No recipients",
            description: "Please enter at least one phone number or email.",
        });
        return;
    }
    toast({
        title: "Notification Sent",
        description: "Your daily update has been sent successfully."
    })
  }

  return (
    <div className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <Button onClick={() => router.back()} variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight inline-flex items-center gap-4 border-2 border-primary rounded-lg px-8 py-3 bg-card/60 backdrop-blur-sm text-primary shadow-lg">
            <BellRing className="h-8 w-8 animate-pulse" />
            <span className="animate-pulse">ALERT:</span> {latestUpdate.title}
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
            <Card className="bg-card/60 backdrop-blur-sm p-6">
                <CardContent className="space-y-6 p-0">
                    <div className="space-y-4">
                        <Label htmlFor="summary" className="text-xl font-semibold">MAIN SUMMARY BASED UPDATE</Label>
                        
                        <Card className="bg-background/50">
                            <CardHeader>
                                <CardTitle>{latestUpdate.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{latestUpdate.summary}</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-xl font-semibold border-b pb-2">ANALYTICS</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="phone">ADD PHONE NUMBERS</Label>
                            <Input 
                                id="phone" 
                                type="text"
                                value={phoneNumbers}
                                onChange={e => setPhoneNumbers(e.target.value)}
                                placeholder="e.g., +919876543210, +11234567890" 
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">ADD EMAIL ID</Label>
                            <Input 
                                id="email" 
                                type="email"
                                value={emailIds}
                                onChange={e => setEmailIds(e.target.value)}
                                placeholder="e.g., user1@example.com, user2@example.com" 
                            />
                        </div>
                    </div>
                </CardContent>
                 <CardFooter className="justify-center pt-8 p-0">
                    <div className="flex gap-4 w-full max-w-sm">
                        <Button type="submit" size="lg" className="flex-1">
                            SEND NOTIFICATION
                        </Button>
                        <Button type="button" size="lg" variant="secondary" className="flex-1">
                            <Video className="mr-2 h-5 w-5" />
                            Generate Video
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </form>
      </div>
    </div>
  );
}
