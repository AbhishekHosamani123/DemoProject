
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft, PlusCircle, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const initialTopics = [
  { id: "sales", label: "Sales Strategy" },
  { id: "financial", label: "Financial Review" },
  { id: "product", label: "Product Launch" },
  { id: "marketing", label: "Marketing Campaign" },
];

export default function MultipleTopicsPage() {
  const router = useRouter();
  const [topics, setTopics] = useState(initialTopics);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [newTopic, setNewTopic] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleTopicSelect = (topicId: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topicId)
        ? prev.filter((id) => id !== topicId)
        : [...prev, topicId]
    );
  };

  const handleAddTopic = () => {
    if (newTopic.trim()) {
      const newTopicId = newTopic.toLowerCase().replace(/\s+/g, "-");
      if (!topics.find((t) => t.id === newTopicId)) {
        setTopics([...topics, { id: newTopicId, label: newTopic }]);
        setNewTopic("");
        setIsDialogOpen(false);
      } else {
        toast({
          variant: "destructive",
          title: "Topic already exists",
          description: "Please enter a unique topic.",
        });
      }
    }
  };

  const handleGenerate = () => {
    if (selectedTopics.length === 0) {
      toast({
        variant: "destructive",
        title: "No topics selected",
        description: "Please select at least one topic to generate a presentation.",
      });
      return;
    }
    // Placeholder for generation logic
    toast({
      title: "Generating Presentation",
      description: `Creating a presentation with ${selectedTopics.length} topics.`,
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
          Select the topics you want to include in your presentation.
        </p>
      </div>
      <div className="w-full max-w-4xl mx-auto">
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
            <CardTitle>Select Topics</CardTitle>
            <CardDescription>
              Click on the topics to select them, or add your own.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {topics.map((topic) => (
                <Card
                  key={topic.id}
                  onClick={() => handleTopicSelect(topic.id)}
                  className={cn(
                    "cursor-pointer transition-all duration-200 p-4 flex items-center justify-center text-center flex-col aspect-square relative",
                    "border-2 bg-card/50 hover:bg-card/80",
                    selectedTopics.includes(topic.id)
                      ? "border-primary"
                      : "border-transparent hover:border-primary/50"
                  )}
                >
                  {selectedTopics.includes(topic.id) && (
                    <CheckCircle2 className="absolute top-2 right-2 h-5 w-5 text-primary" />
                  )}
                  <p className="font-semibold">{topic.label}</p>
                </Card>
              ))}

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Card
                    className={cn(
                      "cursor-pointer transition-all duration-200 p-4 flex items-center justify-center text-center flex-col aspect-square",
                      "border-2 border-dashed border-border hover:border-primary hover:text-primary"
                    )}
                  >
                    <PlusCircle className="h-8 w-8 mb-2" />
                    <p className="font-semibold">Add New Topic</p>
                  </Card>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-background/80 backdrop-blur-sm">
                  <DialogHeader>
                    <DialogTitle>Add a New Topic</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <Label htmlFor="new-topic">Topic Name</Label>
                    <Input
                      id="new-topic"
                      value={newTopic}
                      onChange={(e) => setNewTopic(e.target.value)}
                      placeholder="e.g., Q4 Marketing Strategy"
                    />
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleAddTopic}>
                      Add
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
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
