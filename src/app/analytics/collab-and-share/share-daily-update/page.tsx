
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

export default function ShareDailyUpdatePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [phoneNumbers, setPhoneNumbers] = useState("");
  const [emailIds, setEmailIds] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
          <h1 className="text-3xl font-bold tracking-tight inline-block border-2 border-primary rounded-lg px-8 py-3 bg-card/60 backdrop-blur-sm text-primary shadow-lg">
            Share Daily Update
            <span className="block text-sm text-muted-foreground font-normal mt-1">(AS NOTIFICATION)</span>
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
            <Card className="bg-card/60 backdrop-blur-sm p-6">
                <CardContent className="space-y-6 p-0">
                    <div className="space-y-2">
                        <Label htmlFor="summary" className="text-lg">MAIN SUMMARY BASED UPDATE / REAL TIME ISSUES</Label>
                        <p className="text-sm text-muted-foreground"># AUTO GENERATED OF END OF SETTED TIME</p>
                        <Textarea id="summary" placeholder="Enter the summary or let the AI generate it..." className="h-32" />
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox id="analytics" />
                        <Label htmlFor="analytics" className="text-lg font-medium">ANALYTICS</Label>
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
            </Card>
             <div className="mt-8 flex justify-center">
                <Button type="submit" size="lg" className="w-full max-w-xs">
                    SUBMIT
                </Button>
            </div>
        </form>
      </div>
    </div>
  );
}
