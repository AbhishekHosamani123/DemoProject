
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
  Wrench,
  Calendar as CalendarIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
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
  const [isCustomizeDialogOpen, setIsCustomizeDialogOpen] = useState(false);
  const [numSlides, setNumSlides] = useState<number>(10);
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
          "Please select at least one topic to generate a presentation.",
      });
      return;
    }
    toast({
      title: "Generating Presentation",
      description: `Creating a presentation with ${selectedTopics.length} topics.`,
    });
  };

  const handleCustomize = () => {
    toast({
      title: "Settings Applied",
      description: "Your presentation settings have been saved.",
      duration: 2000,
    });
    setIsCustomizeDialogOpen(false);
  };

  return (
    <div className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col">
       <div className="w-full max-w-2xl mx-auto mb-8">
        <Button
          onClick={() => router.back()}
          variant="outline"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Multiple Topics Presentation
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Select the topics you want to include in your presentation.
        </p>
      </div>
      <div className="w-full max-w-2xl mx-auto">
        <Card className="bg-card/60 backdrop-blur-sm p-6">
          <CardHeader className="p-0 mb-6">
            <CardTitle>Select Topics</CardTitle>
            <CardDescription>
              Choose from the list below or add your own.
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

        <div className="mt-8 flex justify-end gap-4">
          <Dialog open={isCustomizeDialogOpen} onOpenChange={setIsCustomizeDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" variant="secondary">
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
                <Button type="submit" onClick={handleCustomize}>Apply</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button size="lg" onClick={handleGenerate}>
            Generate Presentation
          </Button>
        </div>
      </div>
    </div>
  );
}
