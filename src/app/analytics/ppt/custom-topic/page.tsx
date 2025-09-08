
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function CustomTopicPage() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const { toast } = useToast();

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast({
        variant: "destructive",
        title: "Prompt is empty",
        description: "Please enter a prompt to generate the presentation.",
      });
      return;
    }
    // Placeholder for generation logic
    toast({
      title: "Generating Presentation",
      description: `Creating a presentation based on your prompt.`,
    });
  };

  return (
    <div className="relative flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/10 blur-[100px]"></div>
      </div>
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Customized Topics Presentation
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Describe the presentation you want to create.
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

        <Card className="bg-card/60 backdrop-blur-sm p-6">
          <CardHeader className="p-0 mb-6">
            <CardTitle>Enter Your Prompt</CardTitle>
            <CardDescription>
              Be as specific as you can. You can ask for a certain number of
              slides, specific topics, or a particular tone.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., 'Create a 10-slide presentation on our Q3 financial performance. Include slides on revenue, profit margins, and a forecast for Q4. Keep the tone professional.'"
              className="h-40"
            />
          </CardContent>
        </Card>

        <div className="mt-8 flex justify-end">
          <Button size="lg" onClick={handleGenerate}>
            Generate Presentation
          </Button>
        </div>
      </div>
    </div>
  );
}
