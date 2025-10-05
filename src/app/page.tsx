
"use client";

<<<<<<< HEAD
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, LogIn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LandingPage() {
    const router = useRouter();

    return (
        <main className="flex-1 flex flex-col items-center justify-center p-4 min-h-screen bg-background">
            <div className="flex flex-col items-center justify-center text-center">
                <Image
                    src="/logo.png"
                    alt="Company Logo"
                    width={120}
                    height={120}
                    className="mb-6 animate-pulse"
                    priority
                />
                <h1 className="text-5xl font-bold tracking-tight text-white mb-4">
                    Welcome to <span className="text-primary">INERA SOFTWARE</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                    Intelligence at the speed of thought
                </p>

                <div className="container max-w-5xl mb-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Card className="bg-card/60 backdrop-blur-sm border-primary/20">
                            <CardHeader>
                                <CardTitle className="text-center text-2xl tracking-wider">OUR MISSION</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-center text-lg text-muted-foreground leading-relaxed">
                                    Empower every business with intelligent, fully automated decision-making.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="bg-card/60 backdrop-blur-sm border-primary/20">
                            <CardHeader>
                                <CardTitle className="text-center text-2xl tracking-wider">OUR VISION</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-center text-lg text-muted-foreground leading-relaxed">
                                    To become the Top leading autonomous BI operating system, providing instant AI-powered intelligence and making insights universally accessible.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                     <Button
                        size="lg"
                        className="h-14 px-10 text-lg font-bold"
                        onClick={() => router.push('/dashboard')}
                    >
                        <LogIn className="mr-3 h-5 w-5"/>
                        Sign In
                    </Button>
                    <Link href="/signup">
                        <Button
                            size="lg"
                            variant="secondary"
                            className="h-14 px-10 text-lg font-bold"
                        >
                            Sign Up
                            <ArrowRight className="ml-3 h-5 w-5"/>
                        </Button>
                    </Link>
                </div>
            </div>
        </main>
    )
=======
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
    router.push('/loading-analytics');
  };
  
  const handleGoBack = () => {
    setData([]);
    setHeaders([]);
    setRawCsv("");
    setFileName("");
  };


  return (
    <main className="flex-1 flex flex-col items-center justify-start p-4 pt-48">
       <div className="relative w-full max-w-7xl" style={{ left: '-1rem' }}>
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
>>>>>>> 0587db9e554d528414ad04f1d6f28159f3dc25d4
}
