
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function IndustrialistAdminSignUpPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add actual form validation and submission logic
    toast({
      title: "Account Created",
      description: "The admin account has been successfully created.",
    });
  };

  return (
    <main className="relative flex-1 flex flex-col items-center justify-center p-4 min-h-screen bg-background">
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-10">
        <Button onClick={() => router.back()} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <Card className="w-full max-w-lg bg-card/60 backdrop-blur-sm border-primary/20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Industrialist & Admin Sign Up</CardTitle>
          <CardDescription>
            Create an administrative account for your organization.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleCreateAccount}>
            <div className="space-y-2">
              <Label htmlFor="industry-id">Industry ID</Label>
              <Input
                id="industry-id"
                placeholder="Enter your Industry ID"
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter a strong password"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="retype-password">Retype Password</Label>
                <Input
                  id="retype-password"
                  type="password"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="grant-access">
                Accounts or UserIDs to Grant Access
              </Label>
              <Textarea
                id="grant-access"
                placeholder="Enter user IDs, separated by commas..."
                className="min-h-[100px]"
              />
            </div>
            <Button type="submit" className="w-full !mt-6">
              Create Account
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
