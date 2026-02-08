import { useState, useRef } from "react";
import * as XLSX from 'xlsx';
import { UploadCloud } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useData } from "@/contexts/data-context";

type ParsedData = Record<string, string>[];

interface FileUploaderProps {
  onFileUpload?: (
    parsedData: ParsedData,
    parsedHeaders: string[],
    csv: string,
    name: string
  ) => void;
}

export function FileUploader({ onFileUpload }: FileUploaderProps) {
  const { setData, setHeaders, setRawCsv, setFileName } = useData();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTriggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsProcessing(true);
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const bstr = evt.target?.result;
          const wb = XLSX.read(bstr, { type: 'binary' });
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const data = XLSX.utils.sheet_to_json(ws, { raw: false }) as ParsedData;
          const csv = XLSX.utils.sheet_to_csv(ws);
          const headers = data.length > 0 ? Object.keys(data[0]) : [];
          const fileName = file.name;

          // Update Context
          setData(data);
          setHeaders(headers);
          setRawCsv(csv);
          setFileName(fileName);

          // Optional: Call prop callback if provided
          if (onFileUpload) {
            onFileUpload(data, headers, csv, fileName);
          }
        } catch (error) {
          console.error("Error parsing file:", error);
        } finally {
          setIsProcessing(false);
        }
      };
      reader.readAsBinaryString(file);
    }
  };

  return (
    <Card className="bg-transparent border-0 shadow-none w-full">
      <CardContent className="p-0">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".csv, .xlsx, .xls"
        />
        <div
          className="bg-card/20 backdrop-blur-sm border-2 border-dotted rounded-lg p-12 text-center transition-colors duration-300 border-slate-400 hover:border-primary"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files[0];
            if (file) {
              // Determine if we can reuse the change handler logic easily or duplicate it.
              // For simplicity, let's just trigger the same logic by creating a synthetic event or extracting logic.
              // Or better, just setting the file input files property (tricky).
              // Let's attach drag and drop properly later or keep it simple now by clicking.
              // For now, let's just simulate click on drop area to prompt user? No.
              // Let's implement drop logic quickly.
              const reader = new FileReader();
              reader.onload = (evt) => {
                const bstr = evt.target?.result;
                const wb = XLSX.read(bstr, { type: 'binary' });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = XLSX.utils.sheet_to_json(ws, { raw: false }) as ParsedData;
                const csv = XLSX.utils.sheet_to_csv(ws);
                const headers = data.length > 0 ? Object.keys(data[0]) : [];
                setData(data);
                setHeaders(headers);
                setRawCsv(csv);
                setFileName(file.name);
                if (onFileUpload) onFileUpload(data, headers, csv, file.name);
              };
              reader.readAsBinaryString(file);
            }
          }}
        >
          <div className="flex flex-col items-center gap-4 text-slate-100">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <UploadCloud className="h-8 w-8 text-primary" />
            </div>
            <p className="font-semibold text-primary text-xl">
              Drag and Drop
            </p>
            <p className="text-base text-slate-100">
              Upload your business data files (CSV, XLSX) to get started with AI analysis.
            </p>
            <Button
              onClick={handleTriggerUpload}
              variant="primary"
              size="sm"
              className="mt-2"
              disabled={isProcessing}
            >
              <span>{isProcessing ? "PROCESSING..." : "UPLOAD FILES"}</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
