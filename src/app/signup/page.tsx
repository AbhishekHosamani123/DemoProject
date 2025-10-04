
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Shield, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function SignUpPage() {
    const router = useRouter();

  return (
    <main className="relative flex-1 flex flex-col items-center justify-center p-4 min-h-screen bg-background">
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-10">
        <Button onClick={() => router.back()} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      <div className="flex flex-col items-center justify-center text-center">
         <Image
            src="/logo.png"
            alt="Company Logo"
            width={100}
            height={100}
            className="mb-6"
        />
        <h1 className="text-3xl font-bold tracking-tight mb-2">Choose Your Role</h1>
        <p className="text-muted-foreground mb-8">Select the appropriate category to sign up.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
            <Link href="/signup/industrialist-admin" className="flex group">
                 <Card className="w-full bg-card/60 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 p-6 text-center flex flex-col items-center justify-center">
                    <CardHeader>
                        <div className="flex justify-center mb-4">
                            <Shield className="h-12 w-12 text-primary" />
                        </div>
                        <CardTitle className="text-2xl">Industrialist & Admins</CardTitle>
                        <CardDescription className="mt-2">
                            Manage your organization, users, and data insights.
                        </CardDescription>
                    </CardHeader>
                    <div className="mt-4 flex justify-end w-full">
                        <ArrowRight className="h-5 w-5 text-muted-foreground/50 transition-transform duration-300 group-hover:text-primary group-hover:translate-x-1" />
                    </div>
                </Card>
            </Link>

            <Link href="/signup/employee" className="flex group">
                 <Card className="w-full bg-card/60 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 p-6 text-center flex flex-col items-center justify-center">
                    <CardHeader>
                        <div className="flex justify-center mb-4">
                            <Users className="h-12 w-12 text-primary" />
                        </div>
                        <CardTitle className="text-2xl">Employees & Workers</CardTitle>
                        <CardDescription className="mt-2">
                            Access your dashboard and collaborate with your team.
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
