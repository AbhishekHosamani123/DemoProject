
"use client";

import { UploadCloud } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type ParsedData = Record<string, string>[];

interface FileUploaderProps {
  onFileUpload: (
    parsedData: ParsedData,
    parsedHeaders: string[],
    csv: string,
    name: string
  ) => void;
}

export function FileUploader({ onFileUpload }: FileUploaderProps) {
  const handleSimulatedUpload = () => {
    // This function is now empty and does nothing.
  };

  return (
    <Card className="bg-transparent border-0 shadow-none w-full">
      <CardContent className="p-0">
        <div
          className="bg-card/20 backdrop-blur-sm border-2 border-dotted rounded-lg p-12 text-center transition-colors duration-300 border-slate-400 hover:border-primary"
        >
            <div className="flex flex-col items-center gap-4 text-slate-100">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <UploadCloud className="h-8 w-8 text-primary" />
                </div>
              <p className="font-semibold text-primary text-xl">
                Drag and Drop
              </p>
              <p className="text-base text-slate-100">
                Upload your business data files to get started with AI analysis
              </p>
              <Button
                onClick={handleSimulatedUpload}
                variant="primary"
                size="sm"
                className="mt-2"
              >
                <span>UPLOAD FILES</span>
              </Button>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
