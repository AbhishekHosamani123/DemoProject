"use client";

import { useState } from "react";
import { Header } from "@/components/app/header";
import { FileUploader } from "@/components/app/file-uploader";
import { AiInsights } from "@/components/app/ai-insights";
import { DataPreview } from "@/components/app/data-preview";
import { ChartGenerator } from "@/components/app/chart-generator";
import { CloudConnect } from "@/components/app/cloud-connect";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight } from "lucide-react";

type ParsedData = Record<string, string>[];

export default function Home() {
  const [data, setData] = useState<ParsedData>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [rawCsv, setRawCsv] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const { toast } = useToast();

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
    toast({
      title: "Navigation Hint",
      description:
        "The full analytics dashboard is in development. Stay tuned!",
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        {data.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="max-w-4xl w-full">
              <h2 className="text-3xl font-headline tracking-tight mb-4">
                Connect Your Data Source
              </h2>
              <p className="text-muted-foreground mb-8">
                Upload a file or connect to a cloud service to get started.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                <div className="md:col-span-3">
                  <FileUploader onFileUpload={handleFileUpload} />
                </div>
                <div className="md:col-span-2">
                  <CloudConnect />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in duration-500">
            <h2 className="text-3xl font-headline tracking-tight">
              Dashboard for <span className="text-primary">{fileName}</span>
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <AiInsights data={rawCsv} />
              </div>
              <div className="lg:col-span-2">
                <ChartGenerator data={data} headers={headers} />
              </div>
            </div>
            <div>
              <DataPreview data={data} headers={headers} />
            </div>
            <div className="flex justify-end pt-4">
              <Button size="lg" onClick={handleProceed}>
                Proceed to Detailed Analytics
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
