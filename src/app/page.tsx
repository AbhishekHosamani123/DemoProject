
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, LogIn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LandingPage() {
    const router = useRouter();

    return (
        <main className="flex-1 flex flex-col items-center justify-center p-4 min-h-screen bg-background">
            <div className="flex flex-col items-center justify-center text-center">
                <Image
                    src="/logo.png"
                    alt="Company Logo"
                    width={120}
                    height={120}
                    className="mb-6"
                />
                <h1 className="text-5xl font-bold tracking-tight text-white mb-4">
                    Welcome to <span className="text-primary">INERA</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                    Your intelligent navigator for turning complex business data into actionable insights.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                     <Button
                        size="lg"
                        className="h-14 px-10 text-lg font-bold"
                        onClick={() => router.push('/dashboard')}
                    >
                        <LogIn className="mr-3 h-5 w-5"/>
                        Sign In
                    </Button>
                    <Button
                        size="lg"
                        variant="secondary"
                        className="h-14 px-10 text-lg font-bold"
                        disabled
                    >
                        Sign Up
                        <ArrowRight className="ml-3 h-5 w-5"/>
                    </Button>
                </div>
            </div>
        </main>
    )
}
