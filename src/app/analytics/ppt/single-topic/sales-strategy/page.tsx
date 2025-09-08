
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Video, Wrench, ChevronLeft, Calendar as CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { generatedText, parsePresentationText } from "@/lib/content/sales-strategy-presentation";

interface Slide {
  title: string;
  content: string[];
}

export default function SalesStrategyPage() {
  const router = useRouter();
  const slides = parsePresentationText(generatedText);
  const [numSlides, setNumSlides] = useState<number>(10);
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();
  const [isFromDatePickerOpen, setIsFromDatePickerOpen] = useState(false);
  const [isToDatePickerOpen, setIsToDatePickerOpen] = useState(false);
  const [isCustomizeDialogOpen, setIsCustomizeDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleGenerate = () => {
    toast({
      title: "Settings Applied",
      description: "Your presentation has been customized.",
      duration: 2000,
    });
    setIsCustomizeDialogOpen(false);
  };

  return (
    <div className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col">
       <div className="w-full max-w-4xl mx-auto mb-8">
        <Button
          onClick={() => router.back()}
          variant="outline"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      <div className="w-full max-w-4xl mb-8 text-center mx-auto">
        <h1 className="text-3xl font-bold tracking-tight">
          Sales Strategy Presentation
        </h1>
        <p className="text-muted-foreground mt-2">
          Review and take action on your generated presentation.
        </p>
      </div>

      <div className="w-full max-w-4xl space-y-8 mx-auto">
        <Carousel className="w-full">
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card className="shadow-lg border-border/60 aspect-video flex flex-col justify-center items-center relative overflow-hidden bg-card/60 backdrop-blur-sm">
                    <Image
                      src="https://picsum.photos/1280/720"
                      alt="Presentation background"
                      width={1280}
                      height={720}
                      className="object-cover absolute inset-0 w-full h-full opacity-10"
                      data-ai-hint="business strategy"
                    />
                    <div className="relative z-10 text-foreground w-full p-6">
                      <CardHeader>
                        <CardTitle className="text-center text-2xl">{slide.title.replace('Title: ', '')}</CardTitle>
                      </CardHeader>
                      <CardContent className="text-left w-full max-w-2xl mx-auto text-sm">
                        <ul className="list-disc pl-5 space-y-2">
                          {slide.content.map((item, i) => {
                            if (item.startsWith('- Subtitle:') || item.startsWith('- Date:') || item.startsWith('- Presenter:')) {
                              return <li key={i} className="text-center text-muted-foreground list-none">{item.split(': ')[1]}</li>
                            }
                            return (
                              <li key={i}>{item.replace(/^- /, '')}</li>
                            )
                          })}
                        </ul>
                      </CardContent>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-12 text-foreground" />
          <CarouselNext className="mr-12 text-foreground" />
        </Carousel>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button size="lg" className="w-full">
            <Download className="mr-2 h-4 w-4" />
            Download PPT
          </Button>
          <Button size="lg" className="w-full" variant="secondary">
            <Video className="mr-2 h-4 w-4" />
            Generate Video
          </Button>
          <Dialog open={isCustomizeDialogOpen} onOpenChange={setIsCustomizeDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="w-full" variant="secondary">
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
                <Button type="submit" onClick={handleGenerate}>Apply</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
