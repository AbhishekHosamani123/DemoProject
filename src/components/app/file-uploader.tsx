
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

const mockCsvData = `Date,Region,Product,Sales,Revenue
2024-01-15,North,Widget A,150,15000
2024-01-18,South,Widget B,200,25000
2024-02-10,North,Widget A,120,12000
2024-02-22,West,Widget C,300,45000
2024-03-05,East,Widget B,180,22500
2024-03-20,South,Widget A,220,22000
2024-04-11,West,Widget C,250,37500
2024-04-25,North,Widget B,160,20000
2024-05-13,East,Widget A,280,28000
2024-05-30,South,Widget C,350,52500`;

const parseCsv = (
  csvText: string
): { headers: string[]; data: ParsedData } => {
  const lines = csvText
    .trim()
    .split(/\r\n|\n/)
    .filter((line) => line.trim() !== "");
  if (lines.length === 0) return { headers: [], data: [] };

  const headers = lines[0].split(",").map((h) => h.trim());
  const data = lines.slice(1).map((line) => {
    const values = line.split(",");
    return headers.reduce((obj, header, i) => {
      obj[header] = values[i] ? values[i].trim() : "";
      return obj;
    }, {} as Record<string, string>);
  });
  return { headers, data };
};

export function FileUploader({ onFileUpload }: FileUploaderProps) {
  const handleSimulatedUpload = () => {
    const { headers, data } = parseCsv(mockCsvData);
    onFileUpload(data, headers, mockCsvData, "sample_data.csv");
  };

  return (
    <Card className="bg-transparent border-0 shadow-none w-full">
      <CardContent className="p-0">
        <div
          className="border-2 border-dotted rounded-lg p-12 text-center transition-colors duration-300 border-slate-400 hover:border-primary"
        >
            <div className="flex flex-col items-center gap-4 text-slate-100">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <UploadCloud className="h-8 w-8 text-primary" />
                </div>
              <p className="font-semibold text-primary text-xl">
                Drag and Drop
              </p>
              <p className="text-base text-white">
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
