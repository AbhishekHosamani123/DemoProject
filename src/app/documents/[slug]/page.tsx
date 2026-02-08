"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Download, Video, Wrench, ChevronLeft, Bot, Wand2, Copy } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useData } from "@/contexts/data-context";
import { generateDocumentAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function DocumentGenerationPage() {
    const router = useRouter();
    const params = useParams();
    const { data, rawCsv, fileName } = useData();
    const { toast } = useToast();

    const slug = params.slug as string;
    const documentType = slug.toUpperCase().replace("-", " ");

    const [generatedText, setGeneratedText] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        // If no data, encourage upload or use placeholder logic (optional)
        if (!data || data.length === 0) {
            // We could redirect or show a banner. Users might want to see the template loop.
        }
    }, [data]);

    const handleGenerate = async () => {
        if (!rawCsv) {
            toast({
                variant: "destructive",
                title: "No Data Found",
                description: "Please upload a data file in the Dashboard first.",
            });
            return;
        }

        setIsGenerating(true);
        try {
            const result = await generateDocumentAction({
                documentType: documentType,
                data: rawCsv.substring(0, 50000), // Limit context size if necessary
                fileName: fileName
            });

            if ("error" in result) {
                toast({
                    variant: "destructive",
                    title: "Generation Failed",
                    description: result.error,
                });
            } else {
                setGeneratedText(result.content);
                toast({
                    title: "Document Generated",
                    description: `Successfully generated ${documentType}.`,
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "An unexpected error occurred.",
            });
        } finally {
            setIsGenerating(false);
        }
    };

    const [isEditing, setIsEditing] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedText);
        toast({
            title: "Copied to Clipboard",
            description: "Document content copied successfully.",
        });
    };

    const contentRef = useRef<HTMLDivElement>(null);

    const handleDownload = async () => {
        if (!contentRef.current) return;

        try {
            const html2pdf = (await import('html2pdf.js')).default;
            const element = contentRef.current;
            const opt = {
                margin: [10, 10, 10, 10],
                filename: `${slug.toUpperCase()}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };

            await html2pdf().set(opt).from(element).save();

            toast({
                title: "Download Started",
                description: "Your PDF is being generated.",
            });
        } catch (error) {
            console.error("PDF generation failed:", error);
            toast({
                variant: "destructive",
                title: "Download Failed",
                description: "Could not generate PDF.",
            });
        }
    };

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
                    {documentType} Generator
                </h1>
                <p className="text-muted-foreground mt-2">
                    {fileName ? `Generating based on ${fileName}` : "Upload data to generate a custom document"}
                </p>
            </div>

            <div className="w-full max-w-4xl space-y-6 mx-auto">
                <Card className="shadow-lg border-border/60 bg-card/60 backdrop-blur-sm min-h-[500px] flex flex-col">
                    <CardContent className="p-0 flex-1 flex flex-col">
                        {generatedText ? (
                            isEditing ? (
                                <Textarea
                                    className={cn(
                                        "w-full flex-1 resize-none border-0 focus:ring-0 text-base rounded-lg bg-transparent p-6 min-h-[500px]",
                                        "bg-accent/10"
                                    )}
                                    value={generatedText}
                                    onChange={(e) => setGeneratedText(e.target.value)}
                                />
                            ) : (
                                <div ref={contentRef} className="p-6 min-h-[500px] overflow-auto prose prose-invert max-w-none">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {generatedText}
                                    </ReactMarkdown>
                                </div>
                            )
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-4">
                                {isGenerating ? (
                                    <div className="flex flex-col items-center space-y-4 animate-pulse">
                                        <Bot className="h-12 w-12 text-primary animate-bounce" />
                                        <p className="text-lg text-muted-foreground">AI is analyzing your data and writing the requirements...</p>
                                        <div className="w-full max-w-xs space-y-2">
                                            <Skeleton className="h-2 w-full" />
                                            <Skeleton className="h-2 w-3/4" />
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <Wand2 className="h-12 w-12 text-muted-foreground" />
                                        <p className="text-lg text-muted-foreground max-w-md">
                                            Ready to generate your {documentType}? Ensure you have uploaded your sales data in the dashboard.
                                        </p>
                                        <Button size="lg" onClick={handleGenerate} className="mt-4" variant="default">
                                            <Bot className="mr-2 h-5 w-5" />
                                            Generate {documentType} with AI
                                        </Button>
                                    </>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {generatedText && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-in fade-in duration-500">
                        <Button size="lg" className="w-full" onClick={handleDownload} variant="secondary">
                            <Download className="mr-2 h-4 w-4" />
                            Download {slug.toUpperCase()}.txt
                        </Button>
                        <Button size="lg" className="w-full" variant="secondary" onClick={handleCopy}>
                            <Copy className="mr-2 h-4 w-4" />
                            Copy to Clipboard
                        </Button>
                        <Button
                            size="lg"
                            variant={isEditing ? "default" : "secondary"}
                            className="w-full"
                            onClick={() => setIsEditing(!isEditing)}
                        >
                            <Wrench className="mr-2 h-4 w-4" />
                            {isEditing ? "Done Editing" : "Edit Document"}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
