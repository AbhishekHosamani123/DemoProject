
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export default function LoadingAnalyticsPage() {
  const router = useRouter();
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const messageTimer = setTimeout(() => {
      setShowMessage(true);
    }, 2000);

    const redirectTimer = setTimeout(() => {
      router.push("/analytics");
    }, 4000);

    return () => {
      clearTimeout(messageTimer);
      clearTimeout(redirectTimer);
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
        <div className="h-10">
            {showMessage ? (
                 <p className="text-xl text-primary animate-in fade-in duration-500">
                    You are ready to change your future. All the best.
                 </p>
            ) : (
                <Loader2 className="h-8 w-8 mx-auto animate-spin text-primary" />
            )}
        </div>
      </div>
    </div>
  );
}
