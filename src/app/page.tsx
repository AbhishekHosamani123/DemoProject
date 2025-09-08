
"use client";

import { useState } from "react";
import { FileUploader } from "@/components/app/file-uploader";
import { AiInsights } from "@/components/app/ai-insights";
import { DataPreview } from "@/components/app/data-preview";
import { ChartGenerator } from "@/components/app/chart-generator";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Server } from "lucide-react";
import { CloudConnect } from "@/components/app/cloud-connect";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

type ParsedData = Record<string, string>[];

export default function Home() {
  const [data, setData] = useState<ParsedData>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [rawCsv, setRawCsv] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const { toast } = useToast();
  const router = useRouter();


  const handleFileUpload = (
    parsedData: ParsedData,
    parsedHeaders: string[],
    csv: string,
    name: string
  ) => {
    setData(parsedData);
    setHeaders(parsedHeaders);
    setRawCsv(csv);
    setFileName(name);
  };

  const handleProceed = () => {
    if (fileName) {
      router.push('/analytics');
    } else {
      toast({
        variant: "destructive",
        title: "No file uploaded",
        description: "Please upload a file to proceed.",
      });
    }
  };

  return (
    <main className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col">
      {data.length === 0 ? (
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          <div className="w-full max-w-lg">
            <FileUploader onFileUpload={handleFileUpload} />
          </div>
          <div className="w-full max-w-lg flex flex-col items-center gap-4 py-8">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Server className="mr-2 h-5 w-5" />
                  CONNECT CLOUD SERVER
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-background/80 backdrop-blur-sm">
                <DialogHeader>
                  <DialogTitle>Connect Cloud Source</DialogTitle>
                </DialogHeader>
                <CloudConnect />
              </DialogContent>
            </Dialog>
            <Button
              size="lg"
              onClick={handleProceed}
              variant="secondary"
              className="w-full"
            >
              PROCEED TO ANALYTICS
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in duration-500">
          <h2 className="text-3xl tracking-tight">
            Dashboard for <span className="text-primary">{fileName}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="md:col-span-2 lg:col-span-1">
              <AiInsights data={rawCsv} />
            </div>
            <div className="md:col-span-2 lg:col-span-2">
              <ChartGenerator data={data} headers={headers} />
            </div>
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <DataPreview data={data} headers={headers} />
          </div>
          <div className="flex justify-end pt-4">
            <Button size="lg" onClick={handleProceed} className="w-full sm:w-auto">
              Proceed to Detailed Analytics
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}
