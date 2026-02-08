
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Video, ChevronLeft, Wrench, Calendar as CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function SalesStrategyPage() {
  const router = useRouter();
  const { toast } = useToast();


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
        <div className="w-full aspect-video rounded-lg overflow-hidden shadow-2xl border border-border/50">
          <iframe
            src="https://gamma.app/embed/lg018m3jupmvcrf"
            className="w-full h-full min-h-[500px]"
            allowFullScreen
            title="Sales Strategy & Growth Plan (2018)"
          />
        </div>

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
