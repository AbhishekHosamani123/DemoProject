
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

export default function SignUpPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [industryId, setIndustryId] = useState("");
    const [password, setPassword] = useState("");
    const [retypePassword, setRetypePassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault();
        if (!industryId.trim() || !password.trim() || !retypePassword.trim()) {
            toast({
                variant: "destructive",
                title: "Missing Information",
                description: "Please fill out all fields.",
            });
            return;
        }

        if (password !== retypePassword) {
            toast({
                variant: "destructive",
                title: "Passwords do not match",
                description: "Please make sure your passwords match.",
            });
            return;
        }

        setIsLoading(true);
        toast({
            title: "Creating Account...",
            description: "Please wait while we set things up for you.",
        });

        // Simulate network request
        setTimeout(() => {
            setIsLoading(false);
            toast({
                title: "Account Created!",
                description: "Redirecting you to the dashboard.",
            });
            router.push('/dashboard');
        }, 2000);
    }

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-4 min-h-screen bg-background">
      <div className="absolute top-8 left-8">
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
        <Card className="w-full max-w-sm bg-card/60 backdrop-blur-sm border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl">Create an Account</CardTitle>
            <CardDescription>
              Enter your industry details to get started.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSignUp}>
            <CardContent className="grid gap-4">
              <div className="grid gap-2 text-left">
                <Label htmlFor="industry-id">Industry ID</Label>
                <Input 
                    id="industry-id" 
                    placeholder="Enter your industry ID" 
                    value={industryId}
                    onChange={(e) => setIndustryId(e.target.value)}
                    required 
                />
              </div>
              <div className="grid gap-2 text-left">
                <Label htmlFor="password">Password</Label>
                <Input 
                    id="password" 
                    type="password" 
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                />
              </div>
              <div className="grid gap-2 text-left">
                <Label htmlFor="retype-password">Retype Password</Label>
                <Input 
                    id="retype-password" 
                    type="password" 
                    placeholder="Retype your password"
                    value={retypePassword}
                    onChange={(e) => setRetypePassword(e.target.value)}
                    required 
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? "Signing Up..." : "Sign Up"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </main>
  );
}
