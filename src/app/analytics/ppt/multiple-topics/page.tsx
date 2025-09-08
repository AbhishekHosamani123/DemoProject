
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { ChevronLeft, PlusCircle, Wrench, Calendar as CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

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

  // C_P state
  const [numSlides, setNumSlides] = useState<number>(10);
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();
  const [isFromDatePickerOpen, setIsFromDatePickerOpen] = useState(false);
  const [isToDatePickerOpen, setIsToDatePickerOpen] = useState(false);
  const [isCustomizeDialogOpen, setIsCustomizeDialogOpen] = useState(false);


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

  const handleCustomizeGenerate = () => {
    toast({
      title: "Done",
      description: "Your presentation has been customized.",
      duration: 2000,
    });
    setIsCustomizeDialogOpen(false);
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <Button onClick={handleMainGenerate} className="w-full">
              Generate Presentation
            </Button>
            <Dialog open={isCustomizeDialogOpen} onOpenChange={setIsCustomizeDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Wrench className="mr-2 h-4 w-4" />
                  Customize
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-background/80 backdrop-blur-sm">
                <DialogHeader>
                  <DialogTitle>Customize Presentation</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="from-date" className="text-right">
                      From
                    </Label>
                    <Popover open={isFromDatePickerOpen} onOpenChange={setIsFromDatePickerOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          id="from-date"
                          variant={"outline"}
                          className={cn(
                            "col-span-3 justify-start text-left font-normal",
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
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="to-date" className="text-right">
                      To
                    </Label>
                    <Popover open={isToDatePickerOpen} onOpenChange={setIsToDatePickerOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          id="to-date"
                          variant={"outline"}
                          className={cn(
                            "col-span-3 justify-start text-left font-normal",
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
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="num-slides" className="text-right">
                      No. of Slides
                    </Label>
                    <Input
                      id="num-slides"
                      type="number"
                      value={numSlides}
                      onChange={(e) => setNumSlides(Number(e.target.value))}
                      className="col-span-3"
                      min="1"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleCustomizeGenerate}>Generate</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
