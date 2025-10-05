
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
import {
  ChevronLeft,
  Wrench,
  Calendar as CalendarIcon,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function CustomTopicPage() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [isCustomizeDialogOpen, setIsCustomizeDialogOpen] = useState(false);
  const [numSlides, setNumSlides] = useState<number>(10);
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();
  const [isFromDatePickerOpen, setIsFromDatePickerOpen] = useState(false);
  const [isToDatePickerOpen, setIsToDatePickerOpen] = useState(false);
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
    toast({
      title: "Generating Presentation",
      description: `Creating a presentation based on your prompt.`,
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
          Customized Topic Presentation
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Describe the presentation you want to create.
        </p>
      </div>
      <div className="w-full max-w-2xl mx-auto">
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
              placeholder="e.g., 'Create a 10-slide presentation on Q3 sales performance for the executive team...'"
              className="h-40"
            />
          </CardContent>
        </Card>

        <div className="mt-8 flex flex-col-reverse sm:flex-row items-center justify-center gap-4">
          <Dialog
            open={isCustomizeDialogOpen}
            onOpenChange={setIsCustomizeDialogOpen}
          >
            <DialogTrigger asChild>
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto"
              >
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
                  <Popover
                    open={isFromDatePickerOpen}
                    onOpenChange={setIsFromDatePickerOpen}
                  >
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
                        {fromDate ? (
                          format(fromDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
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
                  <Popover
                    open={isToDatePickerOpen}
                    onOpenChange={setIsToDatePickerOpen}
                  >
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
                        {toDate ? (
                          format(toDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
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
                <Button type="submit" onClick={handleCustomize}>
                  Apply
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
           <Button 
            size="lg" 
            onClick={handleGenerate} 
            className="w-full sm:w-auto rounded-full h-14 px-10 text-lg font-bold shadow-lg shadow-primary/20 transform hover:scale-105"
          >
            <Sparkles className="mr-3 h-5 w-5" />
            Generate Presentation
          </Button>
        </div>
      </div>
    </div>
  );
}
