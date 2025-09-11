
"use client";

import * as React from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Video, ChevronLeft, Wrench } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { generatedText, parsePresentationText } from "@/lib/content/sales-strategy-presentation";
import { useToast } from "@/hooks/use-toast";


export default function SalesStrategyPage() {
  const router = useRouter();
  const { toast } = useToast();
  const slides = parsePresentationText(generatedText);
  const [isCustomizeOpen, setIsCustomizeOpen] = React.useState(false);

  const handleCustomize = () => {
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
        <div className="flex justify-end">
            <Dialog open={isCustomizeOpen} onOpenChange={setIsCustomizeOpen}>
              <DialogTrigger asChild>
                <Button size="icon" variant="primary" className="rounded-full w-12 h-12">
                  <Wrench className="h-6 w-6" />
                  <span className="sr-only">Customize</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-background/80 backdrop-blur-sm">
                <DialogHeader>
                  <DialogTitle>Customize Slides</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="num-slides" className="text-right">
                      No. of Slides
                    </Label>
                    <Input
                      id="num-slides"
                      type="number"
                      defaultValue={slides.length}
                      className="col-span-3"
                      min="1"
                    />
                  </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="tone" className="text-right">
                      Tone
                    </Label>
                    <Input
                      id="tone"
                      defaultValue="Professional"
                      className="col-span-3"
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
        </div>

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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button size="lg" className="w-full">
            <Download className="mr-2 h-4 w-4" />
            Download PPT
          </Button>
          <Button size="lg" className="w-full" variant="secondary">
            <Video className="mr-2 h-4 w-4" />
            Generate Video
          </Button>
        </div>
      </div>
    </div>
  );
}
