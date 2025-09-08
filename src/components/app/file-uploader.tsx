
"use client";

import { useState, useCallback, type DragEvent } from "react";
import { UploadCloud } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
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
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

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
      // Basic parser, doesn't handle commas in quoted fields.
      const values = line.split(",");
      return headers.reduce((obj, header, i) => {
        obj[header] = values[i] ? values[i].trim() : "";
        return obj;
      }, {} as Record<string, string>);
    });
    return { headers, data };
  };

  const processFile = (file: File) => {
    if (file && (file.type === "text/csv" || file.name.endsWith(".csv"))) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        if (text) {
          const { headers, data } = parseCsv(text);
          if (headers.length > 0 && data.length > 0) {
            onFileUpload(data, headers, text, file.name);
          } else {
            toast({
              variant: "destructive",
              title: "Error Parsing File",
              description: "Could not parse CSV file. Please check the format.",
            });
          }
        }
      };
      reader.readAsText(file);
    } else {
      toast({
        variant: "destructive",
        title: "Invalid File Type",
        description: "Please upload a CSV file.",
      });
    }
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        processFile(e.dataTransfer.files[0]);
        e.dataTransfer.clearData();
      }
    },
    [onFileUpload, processFile]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <Card className="bg-transparent border-0 shadow-none">
      <CardContent className="p-8">
        <div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-300
            ${
              isDragging
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/50"
            }`}
        >
          <input
            id="file-upload"
            type="file"
            className="hidden"
            accept=".csv"
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <div className="flex flex-col items-center gap-4 text-muted-foreground">
              <UploadCloud className="h-10 w-10 text-primary" />
              <p className="font-semibold text-foreground">
                {isDragging ? "Drop it here!" : "Drag and Drop"}
              </p>
              <p className="text-sm">
                Upload your business data files to get started with AI analysis
              </p>
              <Button
                asChild
              >
                <span>UPLOAD FILES</span>
              </Button>
            </div>
          </label>
        </div>
      </CardContent>
    </Card>
  );
}
