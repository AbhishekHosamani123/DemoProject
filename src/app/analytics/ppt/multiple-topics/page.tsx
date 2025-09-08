"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ChevronLeft, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const initialTopics = [
  { id: "sales-strategy", label: "Sales Strategy Presentation" },
  { id: "financial-review", label: "Financial Review Presentation" },
  { id: "product-launch", label: "Product Launch Presentation" },
  { id: "marketing-campaign", label: "Marketing Campaign Presentation" },
];

export default function MultipleTopicsPage() {
  const router = useRouter();
  const [topics, setTopics] = useState(initialTopics);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [newTopic, setNewTopic] = useState("");
  const [isAddTopicOpen, setIsAddTopicOpen] = useState(false);

  const handleTopicSelection = (topicId: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topicId)
        ? prev.filter((id) => id !== topicId)
        : [...prev, topicId]
    );
  };

  const handleAddTopic = () => {
    if (newTopic.trim() !== "") {
      const newTopicId = newTopic.toLowerCase().replace(/\s+/g, "-");
      setTopics([...topics, { id: newTopicId, label: newTopic }]);
      setNewTopic("");
      setIsAddTopicOpen(false);
    }
  };

  return (
    <div className="relative flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/10 blur-[100px]"></div>
      </div>
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            Multiple Topics Presentation
          </h1>
          <p className="text-muted-foreground mt-2">
            Select the topics you want to include in your presentation.
          </p>
        </div>
        <div className="mb-8 w-full">
          <Button
            onClick={() => router.back()}
            className="bg-yellow-400 text-black hover:bg-yellow-500"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Select Topics</CardTitle>
            <CardDescription>
              Choose from the list below or add your own custom topics.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topics.map((topic) => (
                <div key={topic.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={topic.id}
                    onCheckedChange={() => handleTopicSelection(topic.id)}
                  />
                  <Label htmlFor={topic.id} className="text-base">
                    {topic.label}
                  </Label>
                </div>
              ))}
              <Dialog open={isAddTopicOpen} onOpenChange={setIsAddTopicOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full mt-4">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Topic
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-background/80 backdrop-blur-sm">
                  <DialogHeader>
                    <DialogTitle>Add a New Topic</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <Label htmlFor="new-topic">Topic Name</Label>
                    <Input
                      id="new-topic"
                      value={newTopic}
                      onChange={(e) => setNewTopic(e.target.value)}
                      placeholder="e.g., Q4 Projections"
                    />
                  </div>
                  <DialogFooter>
                    <Button onClick={handleAddTopic}>Add</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
        <div className="mt-8 flex justify-end gap-4">
          <Button size="lg" disabled={selectedTopics.length === 0}>
            Generate Presentation
          </Button>
        </div>
      </div>
    </div>
  );
}