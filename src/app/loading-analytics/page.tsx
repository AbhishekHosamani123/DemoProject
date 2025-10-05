
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function LoadingAnalyticsPage() {
  const router = useRouter();
  const [hideLoader, setHideLoader] = useState(false);
  const [showContinue, setShowContinue] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setHideLoader(true);
    }, 4000); 

    const timer2 = setTimeout(() => {
      setShowContinue(true);
    }, 5000);

    return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center overflow-hidden">
      <div
        className={cn(
          "space-y-8 transition-opacity duration-500 ease-in-out",
          hideLoader ? "opacity-0" : "opacity-100"
        )}
      >
        <div className="flex justify-center animate-pulse">
          <Image
            src="/logo.png"
            alt="Company Logo"
            width={100}
            height={100}
            priority
          />
        </div>
        <div className="h-10 flex items-center justify-center">
          <div className="flex items-center gap-4 text-xl text-primary">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p>Loading...</p>
          </div>
        </div>
      </div>

      {showContinue && (
        <div className="absolute flex flex-col items-center space-y-8 animate-in fade-in duration-1000">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-primary">
              You are ready to change your future.
            </h1>
            <p className="text-xl text-muted-foreground">All the best.</p>
          </div>
          <Button
            size="lg"
            onClick={() => router.push("/analytics")}
            className="w-full max-w-xs"
          >
            Continue
          </Button>
        </div>
      )}
    </div>
  );
}
