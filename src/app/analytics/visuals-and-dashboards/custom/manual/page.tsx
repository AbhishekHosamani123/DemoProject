
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
import {
  ChevronLeft,
  PlusCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

const initialTopics = [
  { id: "sales", label: "Sales Strategy" },
  { id: "financial", label: "Financial Review" },
  { id: "product", label: "Product Launch" },
  { id: "marketing", label: "Marketing Campaign" },
  { id: "investor", label: "Investor Pitch" },
  { id: "projects", label: "Project Status" },
];

export default function ManualDashboardPage() {
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
        description:
          "Please select at least one topic to generate a dashboard.",
      });
      return;
    }
    // Placeholder for generation logic
    toast({
      title: "Generating Dashboard",
      description: `Creating a dashboard with ${selectedTopics.length} topics.`,
    });
  };

  return (
    <div className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-2xl mx-auto">
        <div className="mb-8">
          <Button onClick={() => router.back()} variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight">
            Manual Dashboard Customization
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Select the topics you want to include in your custom dashboard.
          </p>
        </div>

        <Card className="bg-card/60 backdrop-blur-sm p-6">
          <CardHeader className="p-0 mb-6">
            <CardTitle>Select Topics</CardTitle>
            <CardDescription>
              Choose from the list below or add your own. The AI will pull relevant data to build your dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-4">
              {topics.map((topic) => (
                <div key={topic.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={topic.id}
                    checked={selectedTopics.includes(topic.id)}
                    onCheckedChange={() => handleTopicSelect(topic.id)}
                  />
                  <Label
                    htmlFor={topic.id}
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {topic.label}
                  </Label>
                </div>
              ))}
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="mt-6 w-full">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New Topic
                </Button>
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
                    Add Topic
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        <div className="mt-8 flex justify-center">
            <Button size="lg" className="h-14 text-lg font-bold" onClick={handleGenerate}>
                Generate Dashboard
            </Button>
        </div>
      </div>
    </div>
  );
}
