
"use client";

import { useState } from "react";
import { FileUploader } from "@/components/app/file-uploader";
import { AiInsights } from "@/components/app/ai-insights";
import { DataPreview } from "@/components/app/data-preview";
import { ChartGenerator } from "@/components/app/chart-generator";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Server, ChevronLeft } from "lucide-react";
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

export default function DashboardPage() {
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
    router.push('/loading-analytics');
  };
  
  const handleGoBack = () => {
    setData([]);
    setHeaders([]);
    setRawCsv("");
    setFileName("");
  };


  return (
    <main className="flex-1 flex flex-col items-center justify-start p-4 pt-24 sm:pt-32 md:pt-48">
       <div className="relative w-full max-w-7xl">
        {data.length === 0 ? (
           <div className="relative max-w-xl mx-auto flex flex-col items-center gap-8">
            <FileUploader onFileUpload={handleFileUpload} />
             <div className="w-full max-w-sm">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="lg"
                      variant="primary"
                      className="w-full mb-2 text-black hover:bg-primary/90"
                    >
                      <Server className="mr-2 h-5 w-5" />
                      Connect Cloud Server
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md bg-card/80 backdrop-blur-sm">
                    <DialogHeader>
                      <DialogTitle>Connect Cloud Source</DialogTitle>
                    </DialogHeader>
                    <CloudConnect />
                  </DialogContent>
                </Dialog>
                <Button
                  size="lg"
                  onClick={handleProceed}
                  className="w-full text-black bg-white hover:bg-slate-200"
                >
                  Proceed <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in duration-500 py-8 w-full">
            <div className="flex justify-between items-center">
              <h2 className="text-4xl tracking-tight font-bold">
                Dashboard for <span className="text-primary">{fileName}</span>
              </h2>
              <Button onClick={handleGoBack} variant="outline">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Upload
              </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <AiInsights data={rawCsv} />
              </div>
              <div className="lg:col-span-2">
                <ChartGenerator data={data} headers={headers} />
              </div>
            </div>
            <div className="col-span-1 lg:col-span-3">
              <DataPreview data={data} headers={headers} />
            </div>
            <div className="flex justify-end pt-4">
              <Button size="lg" onClick={handleProceed} className="w-full sm:w-auto" variant="primary">
                Proceed to Detailed Analytics
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
