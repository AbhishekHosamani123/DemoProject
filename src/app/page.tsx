
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
                    className="mb-6 animate-pulse"
                    priority
                />
                <h1 className="text-5xl font-bold tracking-tight text-white mb-4">
                    Welcome to <span className="text-primary">INERA SOFTWARE</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                    Intelligence at the speed of thought
                </p>

                <div className="container max-w-5xl mb-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Card className="bg-card/60 backdrop-blur-sm border-primary/20">
                            <CardHeader>
                                <CardTitle className="text-center text-2xl tracking-wider">OUR MISSION</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-center text-lg text-muted-foreground leading-relaxed">
                                    Empower every business with intelligent, fully automated decision-making.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="bg-card/60 backdrop-blur-sm border-primary/20">
                            <CardHeader>
                                <CardTitle className="text-center text-2xl tracking-wider">OUR VISION</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-center text-lg text-muted-foreground leading-relaxed">
                                    To become the Top leading autonomous BI operating system, providing instant AI-powered intelligence and making insights universally accessible.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                     <Button
                        size="lg"
                        className="h-14 px-10 text-lg font-bold"
                        onClick={() => router.push('/dashboard')}
                    >
                        <LogIn className="mr-3 h-5 w-5"/>
                        Sign In
                    </Button>
                    <Link href="/signup">
                        <Button
                            size="lg"
                            variant="secondary"
                            className="h-14 px-10 text-lg font-bold"
                        >
                            Sign Up
                            <ArrowRight className="ml-3 h-5 w-5"/>
                        </Button>
                    </Link>
                </div>
            </div>
        </main>
    )
}
