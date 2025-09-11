
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
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const { toast } = useToast();

  const handleCustomizeClick = () => {
    setIsCustomizeOpen(true);
  };
  
  const handleApplyCustomization = () => {
    toast({
        title: "Customization Applied",
        description: "Your presentation settings have been updated.",
    });
    setIsCustomizeOpen(false);
  }

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
                      <CardContent className="text-left w-full max-w-2xl mx-auto text-base">
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
          <CarouselPrevious className="absolute left-[-50px] top-1/2 -translate-y-1/2 fill-black" />
          <CarouselNext className="absolute right-[-50px] top-1/2 -translate-y-1/2 fill-black" />
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
            <Dialog open={isCustomizeOpen} onOpenChange={setIsCustomizeOpen}>
              <DialogTrigger asChild>
                  <Button
                    size="lg"
                    variant="secondary"
                    className="w-full"
                  >
                    <Wrench className="mr-2 h-4 w-4" />
                    Customize
                  </Button>
              </DialogTrigger>
              <DialogContent>
                  <DialogHeader>
                      <DialogTitle>Customize Presentation</DialogTitle>
                  </DialogHeader>
                  <div className="py-4 space-y-4">
                      <p>Customization options will go here.</p>
                  </div>
                  <DialogFooter>
                      <Button onClick={handleApplyCustomization}>Apply</Button>
                  </DialogFooter>
              </DialogContent>
            </Dialog>
        </div>
      </div>
    </div>
  );
}
