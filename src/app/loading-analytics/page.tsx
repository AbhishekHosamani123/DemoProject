
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LoadingAnalyticsPage() {
  const router = useRouter();
  const [showContinue, setShowContinue] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContinue(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <div className="space-y-8 animate-in fade-in duration-500">
        {!showContinue ? (
          <>
            <div className="flex justify-center animate-pulse">
              <Image
                src="/logo.png"
                alt="Company Logo"
                width={100}
                height={100}
              />
            </div>
            <div className="h-10 flex items-center justify-center">
              <div className="flex items-center gap-4 text-xl text-primary">
                <Loader2 className="h-8 w-8 animate-spin" />
                <p>Loading...</p>
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-6 flex flex-col items-center">
            <h1 className="text-3xl font-bold tracking-tight text-primary">
              You are ready to change your future. All the best.
            </h1>
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
    </div>
  );
}
