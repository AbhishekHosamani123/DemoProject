
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, ChevronLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

const setupOptions = [
  {
    id: "personal-info",
    title: "Personal Information of Company",
    description: "Provide basic company details and contacts.",
    href: "/signup/industrialist-admin/setup/personal-information"
  },
  {
    id: "existence-info",
    title: "Existence Information of Company",
    description: "Verify your company's legal and operational status.",
    href: "/signup/industrialist-admin/setup/existence-information"
  },
  {
    id: "financial-info",
    title: "Financial and other Information of Company",
    description: "Input financial data and other key business metrics.",
    href: "/signup/industrialist-admin/setup/financial-information"
  },
];

export default function AdminSetupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    const completed = searchParams.get('completed');
    if (completed && !completedSteps.includes(completed)) {
      setCompletedSteps(prev => [...prev, completed]);
    }
  }, [searchParams, completedSteps]);

  const handleSubmit = () => {
    if (!selectedOption) {
        toast({
            variant: "destructive",
            title: "No option selected",
            description: "Please select a setup option to continue.",
        });
        return;
    }
    const selectedTitle = setupOptions.find(opt => opt.id === selectedOption)?.title;
    toast({
        title: "Setup Submitted",
        description: `You have submitted: ${selectedTitle}.`,
    });
    // TODO: Add actual submission logic
  };
  
  const handlePreview = () => {
     if (!selectedOption) {
        toast({
            variant: "destructive",
            title: "No option selected",
            description: "Please select a setup option to preview.",
        });
        return;
    }
    const selectedTitle = setupOptions.find(opt => opt.id === selectedOption)?.title;
    toast({
        title: "Loading Preview",
        description: `Showing a preview for: ${selectedTitle}.`,
    });
     // TODO: Add actual preview logic
  }

  return (
    <main className="relative flex-1 flex flex-col items-center justify-center p-4 min-h-screen bg-background">
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-10">
        <Button onClick={() => router.back()} variant="outline">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="w-full max-w-4xl text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Admin Account Setup
        </h1>
        <p className="text-muted-foreground mb-8">
          Choose a configuration to start with. You can customize it later.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {setupOptions.map((option) => (
             <Link href={option.href} key={option.id} onClick={() => setSelectedOption(option.id)} className="h-full">
              <Card
                className={cn(
                  "group relative cursor-pointer bg-card/60 backdrop-blur-sm border-2 border-input hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col justify-between",
                  selectedOption === option.id && "border-primary"
                )}
              >
                {(completedSteps.includes(option.id)) && (
                  <div className="absolute -top-3 -right-3 bg-primary text-primary-foreground rounded-full p-1 shadow-lg">
                      <CheckCircle2 className="h-6 w-6" />
                  </div>
                )}
                <CardHeader className="flex-1">
                  <CardTitle>{option.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{option.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <Button size="lg" variant="secondary" onClick={handlePreview}>
            Preview
          </Button>
          <Button size="lg" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </main>
  );
}
