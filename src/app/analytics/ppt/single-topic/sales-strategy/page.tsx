
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

interface Slide {
  title: string;
  content: string[];
}

function parsePresentationText(text: string): Slide[] {
  const slides: Slide[] = [];
  const slideTexts = text.trim().split(/Slide \d+:/).slice(1);

  slideTexts.forEach((slideText) => {
    const lines = slideText.trim().split('\n');
    const titleLine = lines.shift() || '';
    const title = titleLine.replace(/Title: /, '').trim();
    const content = lines.map(line => line.trim()).filter(line => line);
    slides.push({ title, content });
  });

  return slides;
}


const generatedText = `Slide 1: Title: Q3 2024 Sales Strategy
- Subtitle: Accelerating Growth & Market Leadership
- Date: [Date]
- Presenter: [Your Name/Team Name]

Slide 2: Title: Agenda
- Review of Q2 Performance
- Q3 2024 Strategic Goals
- Target Segments & Expansion
- Product Focus & Messaging
- Go-to-Market Strategy & Key Initiatives
- KPIs & Success Measurement
- Q&A

Slide 3: Title: Q2 2024 Performance Review
- Revenue: $2.5M vs. $2.2M Target (14% Beat)
- Key Wins: Landed 5 strategic accounts in the finance sector.
- Growth Areas: 30% increase in pipeline from inbound marketing.
- Lessons Learned: Long sales cycles in EMEA require more localized assets.

Slide 4: Title: Q3 2024 Strategic Goals
- Primary Objective: Achieve $3.0M in new ARR.
- Secondary Objective: Increase enterprise pipeline by 25%.
- Tertiary Objective: Reduce sales cycle from 90 to 75 days.

Slide 5: Title: Target Segments & Expansion
- Core Focus: Deepen penetration in North American finance & healthcare.
- Expansion Market: Launch targeted outbound campaigns for retail in APAC.
- Ideal Customer Profile: Companies with 500-5000 employees and complex data needs.

Slide 6: Title: Product Focus & Messaging
- Lead Product: 'InsightEngine' Advanced Analytics Suite.
- Core Value Proposition: "Turn your data into predictable revenue."
- Key Differentiators: Real-time processing, codeless integration, and predictive AI.

Slide 7: Title: Go-to-Market Strategy & Initiatives
- Inbound: Launch 'Future of Data' webinar series & 3 new case studies.
- Outbound: Execute ABM campaigns for 50 target enterprise accounts.
- Channel: Onboard 2 new strategic partners in the APAC region.

Slide 8: Title: Sales Team & Resources
- Team Structure: 2 Enterprise AEs, 4 Mid-Market AEs, 4 SDRs.
- Key Hires: Hiring 1 Enterprise AE for EMEA.
- Resources: New competitor battlecards and ROI calculator.

Slide 9: Title: KPIs & Success Measurement
- Pipeline: $12M in qualified pipeline generated.
- Conversion: Maintain a 25% lead-to-close conversion rate.
- Deal Size: Increase average deal size by 15% to $75k.
- Activity: 50 outbound calls and 10 demos booked per SDR per week.

Slide 10: Title: Q&A and Next Steps
- Open floor for questions.
- Next Steps: Finalize account lists by EOW.
`;

export default function SalesStrategyPage() {
  const router = useRouter();
  const slides = parsePresentationText(generatedText);
  const [numSlides, setNumSlides] = useState<number>(10);
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();
  const { toast } = useToast();

  const handleGenerate = () => {
    toast({
      title: "Done",
      description: "Your presentation has been customized.",
      duration: 2000,
    });
  };

  return (
    <div className="relative flex-1 bg-background">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/10 blur-[100px]"></div>
      </div>
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col">
        <div className="w-full max-w-4xl mb-4 text-center mx-auto">
          <h1 className="text-4xl font-bold tracking-tight">
            Sales Strategy Presentation
          </h1>
          <p className="text-muted-foreground mt-2">
            Review and take action on your generated presentation.
          </p>
        </div>

        <div className="w-full max-w-4xl mx-auto mb-8">
          <Button
            onClick={() => router.back()}
            className="bg-yellow-400 text-black hover:bg-yellow-500"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>

        <div className="w-full max-w-4xl space-y-8 mx-auto">
          <Carousel className="w-full">
            <CarouselContent>
              {slides.map((slide, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card className="shadow-lg border-border/60 aspect-video flex flex-col justify-center items-center relative overflow-hidden">
                      <Image
                        src="https://picsum.photos/1280/720"
                        alt="Presentation background"
                        fill
                        className="object-cover"
                        data-ai-hint="business strategy"
                      />
                      <div className="absolute inset-0 bg-black/50" />
                      <div className="relative z-10 text-white w-full">
                        <CardHeader>
                          <CardTitle className="text-center">{slide.title.replace('Title: ', '')}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-left w-full max-w-2xl mx-auto">
                          {slide.content.map((item, i) => {
                            if (item.startsWith('- Subtitle:') || item.startsWith('- Date:') || item.startsWith('- Presenter:')) {
                              return <p key={i} className="text-center text-slate-300">{item.split(': ')[1]}</p>
                            }
                            return (
                              <p key={i} className="my-2">{item}</p>
                            )
                          })}
                        </CardContent>
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="ml-12 text-white"/>
            <CarouselNext className="mr-12 text-white"/>
          </Carousel>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button size="lg" className="w-full">
              <Download className="mr-2" />
              Download PPT
            </Button>
            <Button size="lg" className="w-full">
              <Video className="mr-2" />
              Generate Video
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="w-full">
                  <Wrench className="mr-2" />
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
                    <Popover>
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
                          captionLayout="dropdown-buttons"
                          fromYear={2001}
                          toYear={2025}
                          selected={fromDate}
                          onSelect={setFromDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="to-date" className="text-right">
                      To
                    </Label>
                    <Popover>
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
                          captionLayout="dropdown-buttons"
                          fromYear={2001}
                          toYear={2025}
                          selected={toDate}
                          onSelect={setToDate}
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
                  <Button type="submit" onClick={handleGenerate}>Generate</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}
