
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
  const [isPreviewed, setIsPreviewed] = useState(false);
  const [previewData, setPreviewData] = useState<any>({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const stepsFromStorage = JSON.parse(localStorage.getItem('completedSteps') || '[]');
    setCompletedSteps(stepsFromStorage);

    const completed = searchParams.get('completed');
    if (completed && !stepsFromStorage.includes(completed)) {
      const newSteps = [...stepsFromStorage, completed];
      setCompletedSteps(newSteps);
      localStorage.setItem('completedSteps', JSON.stringify(newSteps));
    }
  }, [searchParams]);

  const allStepsCompleted = isClient && completedSteps.length === setupOptions.length;

  const handleSubmit = () => {
    if (!allStepsCompleted || !isPreviewed) {
        toast({
            variant: "destructive",
            title: "Setup Incomplete",
            description: "Please complete all steps and preview the details before submitting.",
        });
        return;
    }
    
    toast({
        title: "Setup Submitted Successfully!",
        description: "Your company profile is now active.",
    });

    localStorage.removeItem('completedSteps');
    localStorage.removeItem('personalInfo');
    localStorage.removeItem('existenceInfo');
    localStorage.removeItem('financialInfo');

    router.push('/dashboard');
  };
  
  const handlePreview = () => {
     if (!allStepsCompleted) {
        toast({
            variant: "destructive",
            title: "Complete All Steps",
            description: "Please complete all setup steps before previewing.",
        });
        return;
    }
    const personalInfo = JSON.parse(localStorage.getItem('personalInfo') || '{}');
    const existenceInfo = JSON.parse(localStorage.getItem('existenceInfo') || '{}');
    const financialInfo = JSON.parse(localStorage.getItem('financialInfo') || '{}');
    setPreviewData({ personalInfo, existenceInfo, financialInfo });

    setIsPreviewed(true);
  }

  const renderPreviewData = (data: any) => {
    return Object.entries(data).map(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        return (
          <div key={key} className="mt-2 pl-4">
             <h4 className="font-semibold capitalize text-primary/90">{key.replace(/([A-Z])/g, ' $1')}</h4>
             {renderPreviewData(value)}
          </div>
        )
      }
      return (
        <div key={key} className="flex justify-between text-sm">
          <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
          <span className="font-medium text-right">{String(value)}</span>
        </div>
      )
    })
  }

  if (!isClient) {
    return null; // or a loading spinner
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
             <Link href={option.href} key={option.id} className="h-full">
              <Card
                className={cn(
                  "group relative cursor-pointer bg-card/60 backdrop-blur-sm border-2 border-input hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col justify-between"
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
          <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" onClick={handlePreview} disabled={!allStepsCompleted}>
                    Preview
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-card/90 backdrop-blur-md">
                  <DialogHeader>
                      <DialogTitle>Setup Information Preview</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 max-h-[60vh] overflow-y-auto p-4">
                      <div>
                          <h3 className="text-lg font-bold text-primary mb-2 border-b pb-1">Personal Information</h3>
                          <div className="space-y-1">{renderPreviewData(previewData.personalInfo || {})}</div>
                      </div>
                       <div>
                          <h3 className="text-lg font-bold text-primary mb-2 border-b pb-1">Existence Information</h3>
                           <div className="space-y-1">{renderPreviewData(previewData.existenceInfo || {})}</div>
                      </div>
                       <div>
                          <h3 className="text-lg font-bold text-primary mb-2 border-b pb-1">Financial Information</h3>
                           <div className="space-y-1">{renderPreviewData(previewData.financialInfo || {})}</div>
                      </div>
                  </div>
              </DialogContent>
          </Dialog>

          <Button size="lg" onClick={handleSubmit} disabled={!allStepsCompleted || !isPreviewed}>
            Submit
          </Button>
        </div>
      </div>
    </main>
  );
}
