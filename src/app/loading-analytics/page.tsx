
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2 } from "lucide-react";

const loadingMessages = [
  "Loading...",
  "Processing...",
  "Done",
  "You are ready to change your future. All the best.",
];

export default function LoadingAnalyticsPage() {
  const router = useRouter();
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setCurrentMessageIndex(1), 1500), // Loading... -> Processing...
      setTimeout(() => setCurrentMessageIndex(2), 3000), // Processing... -> Done
      setTimeout(() => setCurrentMessageIndex(3), 4000), // Done -> Final Message
      setTimeout(() => router.push("/analytics"), 6000), // Redirect after final message
    ];

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <div className="space-y-8">
        <div className="flex justify-center animate-pulse">
          <Image
            src="/logo.png"
            alt="Company Logo"
            width={100}
            height={100}
          />
        </div>
        <div className="h-10 flex items-center justify-center">
          <div className="flex items-center gap-4 text-xl text-primary animate-in fade-in duration-500">
            {currentMessageIndex < 2 && ( // Show loader for "Loading..." and "Processing..."
              <Loader2 className="h-8 w-8 animate-spin" />
            )}
            <p>{loadingMessages[currentMessageIndex]}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
