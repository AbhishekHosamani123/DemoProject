
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft, Wand2, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { ManualDashboardCustomization } from "./manual/page";

export default function CustomDashboardPage() {
  const router = useRouter();
  const [view, setView] = useState<"cards" | "automated" | "manual">("cards");

  const handleBack = () => {
    if (view !== 'cards') {
      setView('cards');
    } else {
      router.back();
    }
  }

  return (
    <div className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-4xl mx-auto">
        <div className="mb-8">
          <Button onClick={handleBack} variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
        
        {view === 'cards' && (
          <div className="animate-in fade-in duration-300">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold tracking-tight">
                Custom Visuals & Dashboard
              </h1>
              <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                Choose your dashboard creation method.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card 
                  onClick={() => setView('automated')}
                  className="text-center p-8 h-full flex flex-col justify-center items-center hover:bg-primary/5 hover:border-primary/50 transition-all transform hover:-translate-y-1 cursor-pointer">
                    <Wand2 className="h-12 w-12 text-primary mb-4" />
                    <CardHeader>
                        <CardTitle className="text-2xl">Automated Dashboard</CardTitle>
                    </CardHeader>
                    <CardDescription>
                        Let our AI analyze your data and automatically generate the most relevant dashboards for you.
                    </CardDescription>
                </Card>
                <Card 
                  onClick={() => router.push('/analytics/visuals-and-dashboards/custom/manual')}
                  className="text-center p-8 h-full flex flex-col justify-center items-center hover:bg-primary/5 hover:border-primary/50 transition-all transform hover:-translate-y-1 cursor-pointer">
                    <Settings className="h-12 w-12 text-primary mb-4" />
                    <CardHeader>
                        <CardTitle className="text-2xl">Manual Customization</CardTitle>
                    </CardHeader>
                    <CardDescription>
                        Take full control. Select specific topics and metrics to build your own dashboard from scratch.
                    </CardDescription>
                </Card>
            </div>
          </div>
        )}

        {view === 'automated' && (
          <div className="w-full animate-in fade-in duration-300">
             <ManualDashboardCustomization />
          </div>
        )}
      </div>
    </div>
  );
}
