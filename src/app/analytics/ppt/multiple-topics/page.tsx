
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const initialTopics = [
  { id: "sales", label: "Sales Strategy Presentation" },
  { id: "financial", label: "Financial Review Presentation" },
  { id: "product", label: "Product Launch Presentation" },
  { id: "marketing", label: "Marketing Campaign Presentation" },
];

export default function MultipleTopicsPage() {
  const router = useRouter();
  const [topics, setTopics] = useState(initialTopics);
  const [selectedTopics, setSelectedTopics] = useState<Record<string, boolean>>(
    {}
  );
  const [newTopic, setNewTopic] = useState("");
  const [isAddTopicOpen, setIsAddTopicOpen] = useState(false);
  const { toast } = useToast();

  const handleTopicToggle = (topicId: string) => {
    setSelectedTopics((prev) => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const handleAddTopic = () => {
    if (newTopic.trim() === "") {
      toast({
        variant: "destructive",
        title: "Topic cannot be empty",
        description: "Please enter a topic name.",
      });
      return;
    }
    const newTopicId = newTopic.toLowerCase().replace(/\s+/g, "-");
    if (topics.some((t) => t.id === newTopicId)) {
        toast({
            variant: "destructive",
            title: "Topic already exists",
            description: "Please enter a unique topic name.",
        });
        return;
    }
    setTopics([...topics, { id: newTopicId, label: newTopic }]);
    setNewTopic("");
    setIsAddTopicOpen(false);
  };

  const handleMainGenerate = () => {
    const chosenTopics = Object.keys(selectedTopics).filter(
      (key) => selectedTopics[key]
    );
    if (chosenTopics.length === 0) {
      toast({
        variant: "destructive",
        title: "No topics selected",
        description: "Please select at least one topic for your presentation.",
      });
      return;
    }
    // For now, just show a success message
    toast({
      title: "Generating Presentation",
      description: `Creating a presentation for: ${chosenTopics
        .map(
          (id) => (topics.find((t) => t.id === id) || { label: "" }).label
        )
        .join(", ")}.`,
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
            <CardTitle>Select Presentation Topics</CardTitle>
            <CardDescription>
              Choose from the list below or add your own custom topics.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {topics.map((topic) => (
                <div key={topic.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={topic.id}
                    checked={!!selectedTopics[topic.id]}
                    onCheckedChange={() => handleTopicToggle(topic.id)}
                  />
                  <Label
                    htmlFor={topic.id}
                    className="text-base font-normal cursor-pointer"
                  >
                    {topic.label}
                  </Label>
                </div>
              ))}
            </div>

            <Dialog open={isAddTopicOpen} onOpenChange={setIsAddTopicOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Topic
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-background/80 backdrop-blur-sm">
                <DialogHeader>
                  <DialogTitle>Add Custom Topic</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <Input
                    id="new-topic"
                    placeholder="e.g., Q4 Projections"
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                  />
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                     <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button onClick={handleAddTopic}>Add</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button onClick={handleMainGenerate} className="w-full">
              Generate Presentation
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
