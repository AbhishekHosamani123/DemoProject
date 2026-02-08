"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Video, Wrench, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import KpiGrid from "./KpiGrid";
import ChartsGrid from "./ChartsGrid";
import RecentOrders from "./RecentOrders";

interface SalesDashboardProps {
    data: any;
}

export default function SalesDashboard({ data }: SalesDashboardProps) {
    const router = useRouter();
    const [isCustomizeMode, setIsCustomizeMode] = useState(false);

    // Helper function to simulate downloading reports
    const handleDownload = () => {
        alert("Downloading report... (This is a demo action)");
    };

    // Helper function to simulate generating video
    const handleGenerateVideo = () => {
        alert("Generating video summary... (This is a demo action)");
    };

    return (
        <div className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                <Button onClick={() => router.back()} variant="outline" className="self-start sm:self-auto">
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
                <div className="flex items-center gap-4 flex-wrap justify-end">
                    <Button onClick={handleDownload} variant="outline" className="hidden sm:flex">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                    </Button>
                    <Button variant="secondary" onClick={handleGenerateVideo} className="hidden sm:flex">
                        <Video className="mr-2 h-4 w-4" />
                        Generate Video
                    </Button>
                    <Button
                        variant={isCustomizeMode ? "default" : "secondary"}
                        onClick={() => setIsCustomizeMode(!isCustomizeMode)}
                    >
                        <Wrench className="mr-2 h-4 w-4" />
                        {isCustomizeMode ? "Done Customizing" : "Customize"}
                    </Button>
                </div>
            </div>

            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold tracking-tight inline-block border rounded-lg px-6 py-3 bg-card/60 backdrop-blur-sm shadow-md">
                    Sales Data Dashboard
                </h1>
                <p className="text-muted-foreground mt-2">
                    Real-time insights and performance metrics
                </p>
            </div>

            <main className="space-y-6">
                <KpiGrid data={data.kpis} />

                <ChartsGrid
                    data={data.charts}
                    isCustomizeMode={isCustomizeMode}
                />

                <RecentOrders orders={data.rawData} />
            </main>
        </div>
    );
}
