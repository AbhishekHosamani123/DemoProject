
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, PartyPopper } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { text: "Initializing setup...", delay: 1500 },
  { text: "Configuring dashboard...", delay: 1500 },
  { text: "Finalizing account...", delay: 1500 },
];

export default function SetupCompletePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [generatedId, setGeneratedId] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const userType = searchParams.get('type') || 'User';

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (currentStep < STEPS.length) {
      timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, STEPS[currentStep].delay);
    } else {
      // All steps are done, generate ID and show completion
      setGeneratedId(
        `${userType.slice(0, 3).toUpperCase()}-${Math.random()
          .toString(36)
          .substring(2, 10)
          .toUpperCase()}`
      );
      setIsComplete(true);
    }

    return () => clearTimeout(timer);
  }, [currentStep, userType]);

  return (
    <main className="flex flex-col items-center justify-center p-4 min-h-screen bg-background text-center">
        {!isComplete ? (
            <div className="space-y-6">
                <div className="flex justify-center">
                    <Loader2 className="h-16 w-16 text-primary animate-spin" />
                </div>
                <div className="relative h-6 w-80 max-w-full overflow-hidden">
                    {STEPS.map((step, index) => (
                        <p
                            key={index}
                            className={cn(
                                "absolute w-full transition-all duration-500 text-lg text-muted-foreground",
                                currentStep === index
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 -translate-y-5"
                            )}
                        >
                            {step.text}
                        </p>
                    ))}
                </div>
            </div>
        ) : (
            <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
                <div className="flex justify-center">
                    <PartyPopper className="h-20 w-20 text-primary" />
                </div>
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight text-primary">All Set!</h1>
                    <p className="text-lg text-muted-foreground">Your account has been successfully configured.</p>
                </div>
                <div className="p-4 bg-card/80 border-2 border-dashed border-primary/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">Your {userType} ID is:</p>
                    <p className="text-xl font-mono font-bold text-primary tracking-widest">{generatedId}</p>
                </div>
                <Button size="lg" onClick={() => router.push('/dashboard')}>
                    Continue to Dashboard
                </Button>
            </div>
        )}
    </main>
  );
}
