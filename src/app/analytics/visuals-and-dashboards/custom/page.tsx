
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
import { PlusCircle, ChevronLeft, Calendar as CalendarIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const initialTopics = [
  { id: "sales", label: "Sales Strategy" },
  { id: "financial", label: "Financial Review" },
  { id: "product", label: "Product Launch" },
  { id: "marketing", label: "Marketing Campaign" },
  { id: "investor", label: "Investor Pitch" },
  { id: "projects", label: "Project Status" },
];

export default function CustomDashboardPage() {
  const router = useRouter();
  const [topics, setTopics] = useState(initialTopics);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [newTopic, setNewTopic] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState("formal");
  const [audience, setAudience] = useState("");
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();
  const [isFromDatePickerOpen, setIsFromDatePickerOpen] = useState(false);
  const [isToDatePickerOpen, setIsToDatePickerOpen] = useState(false);
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
        toast({
          title: "Topic Added",
          description: `Successfully added "${newTopic}".`,
        });
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
        description: "Please select at least one topic to generate visuals.",
      });
      return;
    }
    // Placeholder for generation logic
    toast({
      title: "Generating Visuals...",
      description: `Creating a BI file for: ${selectedTopics.join(", ")}. This might take up to 2 minutes.`,
      duration: 5000,
    });
  };

  return (
    <div className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-3xl mx-auto">
        <div className="mb-8">
          <Button onClick={() => router.back()} variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight">
            Custom Visuals & Dashboard
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Tailor your dashboard by selecting topics and defining the tone and
            audience.
          </p>
        </div>

        <div className="space-y-8">
          <Card className="bg-card/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Automated Working Style</CardTitle>
              <CardDescription>
                Select topics for the AI to assemble a logical, branded deck.
                The AI will pull relevant data.
              </CardDescription>
            </CardHeader>
            <CardContent>
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

          <Card className="bg-card/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Customizations</CardTitle>
              <CardDescription>
                Fine-tune the output by specifying the prompt, tone, and target
                audience.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="custom-prompt" className="text-base">
                  Custom Prompt
                </Label>
                <Textarea
                  id="custom-prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe how you want to customize your visuals and dashboard..."
                  className="h-24"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="from-date">From</Label>
                  <Popover open={isFromDatePickerOpen} onOpenChange={setIsFromDatePickerOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        id="from-date"
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !fromDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {fromDate ? format(fromDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={fromDate}
                        onSelect={(date) => {
                          setFromDate(date);
                          setIsFromDatePickerOpen(false);
                        }}
                        captionLayout="dropdown-buttons"
                        fromYear={2001}
                        toYear={2025}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="to-date">To</Label>
                  <Popover open={isToDatePickerOpen} onOpenChange={setIsToDatePickerOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        id="to-date"
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !toDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {toDate ? format(toDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={toDate}
                        onSelect={(date) => {
                          setToDate(date);
                          setIsToDatePickerOpen(false);
                        }}
                        captionLayout="dropdown-buttons"
                        fromYear={2001}
                        toYear={2025}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="space-y-3">
                <Label className="text-base">Tone of Voice</Label>
                <RadioGroup
                  value={tone}
                  onValueChange={setTone}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="formal" id="tone-formal" />
                    <Label htmlFor="tone-formal">Formal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="creative" id="tone-creative" />
                    <Label htmlFor="tone-creative">Creative</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="technical" id="tone-technical" />
                    <Label htmlFor="tone-technical">Technical</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label htmlFor="audience" className="text-base">
                  Target Audience
                </Label>
                <Select value={audience} onValueChange={setAudience}>
                  <SelectTrigger id="audience">
                    <SelectValue placeholder="Select target audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="executive-board">
                      Executive Board
                    </SelectItem>
                    <SelectItem value="marketing-team">
                      Marketing Team
                    </SelectItem>
                    <SelectItem value="sales-team">Sales Team</SelectItem>
                    <SelectItem value="investors">Investors</SelectItem>
                    <SelectItem value="technical-team">
                      Technical Team
                    </SelectItem>
                    <SelectItem value="customers">Customers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            size="lg"
            className="h-14 text-lg font-bold"
            onClick={handleGenerate}
          >
            Generate Visuals
          </Button>
        </div>
      </div>
    </div>
  );
}
