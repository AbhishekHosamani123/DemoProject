
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, Users, Shield, Share, FileClock } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const collabFeatures = [
  {
    title: "MULTI USER LIVE EDITING",
    icon: <Users className="h-8 w-8 text-primary" />,
  },
  {
    title: "ROLE BASED ACCESS CONTROL ( By Admin System only )",
    icon: <Shield className="h-8 w-8 text-primary" />,
  },
];

const shareFeatures = [
  {
    title: "Secure share ( Via password )",
    icon: <Share className="h-8 w-8 text-primary" />,
    href: "#",
  },
  {
    title: "Share Daily update",
    icon: <FileClock className="h-8 w-8 text-primary" />,
    href: "/analytics/collab-and-share/share-daily-update",
  },
];

export default function CollabAndSharePage() {
  const router = useRouter();

  return (
    <div className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-4xl">
<<<<<<< HEAD
        <div className="mb-8 relative z-10">
=======
        <div className="mb-8">
>>>>>>> 0587db9e554d528414ad04f1d6f28159f3dc25d4
          <Button onClick={() => router.back()} variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight inline-block border-2 border-primary rounded-lg px-8 py-3 bg-card/60 backdrop-blur-sm text-primary shadow-lg">
            COLLAB & SHARE
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          <div className="space-y-8">
            {collabFeatures.map((feature) => (
              <Card
                key={feature.title}
                className="bg-card/60 backdrop-blur-sm p-6 text-center border-2 border-input hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 h-full"
              >
                <CardContent className="flex flex-col items-center justify-center p-0">
                  {feature.icon}
                  <p className="mt-4 text-lg font-semibold text-foreground">
                    {feature.title}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-8">
            {shareFeatures.map((feature) => (
               <Link href={feature.href} key={feature.title}>
                <Card
                  className="bg-card/60 backdrop-blur-sm p-6 text-center border-2 border-input hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 h-full"
                >
                  <CardContent className="flex flex-col items-center justify-center p-0">
                    {feature.icon}
                    <p className="mt-4 text-lg font-semibold text-foreground">
                      {feature.title}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
