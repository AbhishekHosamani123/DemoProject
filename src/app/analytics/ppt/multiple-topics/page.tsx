"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function MultipleTopicsPage() {
  const router = useRouter();
  const [topics, setTopics] = useState("");
  const { toast } = useToast();

  const handleGenerate = () => {
    if (topics.trim() === "") {
      toast({
        variant: "destructive",
        title: "No topics provided",
        description: "Please enter the topics for your presentation.",
      });
      return;
    }
    // For now, just show a success message
    toast({
      title: "Generating Presentation",
      description: "Your presentation is being created with the provided topics.",
    });
  };

  return (
    <div className="relative flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/10 blur-[100px]"></div>
      </div>
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Multiple Topics Presentation
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Enter the topics you want to include in your presentation.
        </p>
      </div>
      <div className="w-full max-w-2xl mx-auto">
        <div className="mb-8">
          <Button
            onClick={() => router.back()}
            className="bg-yellow-400 text-black hover:bg-yellow-500"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
        <Card className="bg-card/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Presentation Topics</CardTitle>
            <CardDescription>
              Enter each topic on a new line or separated by commas.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="e.g. Q2 Sales Performance, Key Marketing Initiatives, Q3 Goals..."
              className="h-40 resize-none"
              value={topics}
              onChange={(e) => setTopics(e.target.value)}
            />
            <Button onClick={handleGenerate} className="w-full">
              Generate Presentation
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
