
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ChevronLeft, ArrowRight, UserCheck, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ExistenceInfoPage() {
  const router = useRouter();

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
          Existence Information Setup
        </h1>
        <p className="text-muted-foreground mb-8">
          Choose how you would like to provide your company's existence
          information.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl mx-auto">
          <Link href="/signup/industrialist-admin/setup/manual-setup" className="flex group">
            <Card className="w-full bg-card/60 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 p-6 text-center flex flex-col items-center justify-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Settings className="h-12 w-12 text-primary" />
                </div>
                <CardTitle className="text-2xl">Manual Setup</CardTitle>
                <CardDescription className="mt-2">
                  Fill in your company's details manually.
                </CardDescription>
              </CardHeader>
              <div className="mt-4 flex justify-end w-full">
                <ArrowRight className="h-5 w-5 text-muted-foreground/50 transition-transform duration-300 group-hover:text-primary group-hover:translate-x-1" />
              </div>
            </Card>
          </Link>

          <Link href="/signup/industrialist-admin/setup/assisted-setup" className="flex group">
            <Card className="w-full bg-card/60 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 p-6 text-center flex flex-col items-center justify-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <UserCheck className="h-12 w-12 text-primary" />
                </div>
                <CardTitle className="text-2xl">Need Assistance</CardTitle>
                <CardDescription className="mt-2">
                  Get guidance from our AI assistant to set up your account.
                </CardDescription>
              </CardHeader>
              <div className="mt-4 flex justify-end w-full">
                <ArrowRight className="h-5 w-5 text-muted-foreground/50 transition-transform duration-300 group-hover:text-primary group-hover:translate-x-1" />
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </main>
  );
}
