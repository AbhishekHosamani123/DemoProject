
"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";

const forecastData = [
    { name: "Past", period: "(Apr)", isPast: true, value: 8000, profit: 5000, loss: 1000, revenue: 4000 },
    { name: "Current", period: "(May)", value: 10000, profit: 6000, loss: 1000, revenue: 5000, isCurrent: true },
    { name: "Next", period: "(June)", value: 11000, profit: 7000, loss: 1500, revenue: 5500 },
    { name: "July", value: 14000, profit: 9000, loss: 2000, revenue: 7000 },
    { name: "Aug", value: 18000, profit: 12000, loss: 2500, revenue: 8500 },
];

const COLORS = {
  profit: 'hsl(var(--chart-2))',
  loss: 'hsl(var(--chart-5))',
  revenue: 'hsl(var(--chart-1))',
};

const CustomTimelineNode = ({ dataPoint }: { dataPoint: typeof forecastData[0] }) => {
    const isNext = dataPoint.name === 'Next';

    const pieData = [
        { name: 'Profit', value: dataPoint.profit },
        { name: 'Loss', value: dataPoint.loss },
        { name: 'Revenue', value: dataPoint.revenue },
    ];
    
    const hasData = pieData.some(d => d.value > 0);

    return (
        <div className="flex flex-col items-center text-center w-40">
             <div className={cn("flex flex-col items-center justify-center h-24 w-24 rounded-full border-2 relative transition-all duration-300",
                isNext ? "border-primary border-4 shadow-lg shadow-primary/20" : "border-border",
            )}>
                {hasData ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={28}
                                outerRadius={38}
                                dataKey="value"
                                stroke="none"
                            >
                                <Cell key={`cell-profit`} fill={COLORS.profit} />
                                <Cell key={`cell-loss`} fill={COLORS.loss} />
                                <Cell key={`cell-revenue`} fill={COLORS.revenue} />
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full w-full">
                         <div className="text-lg font-bold text-muted-foreground">{dataPoint.name}</div>
                         <div className="text-sm text-muted-foreground">{dataPoint.period}</div>
                    </div>
                )}
                {hasData && (
                    <div className="absolute flex flex-col items-center justify-center">
                        <div className="text-lg font-bold text-foreground">{dataPoint.name}</div>
                        {dataPoint.period && <div className="text-sm text-muted-foreground">{dataPoint.period}</div>}
                    </div>
                )}
            </div>
             <div className={cn("mt-4 text-base font-semibold text-foreground bg-card/80 border px-4 py-2 rounded-lg shadow-sm")}>
                {`₹${dataPoint.value.toLocaleString()}`}
            </div>
        </div>
    );
}

export default function MonthlyForecastingPage() {
  const router = useRouter();

  return (
    <div className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-6xl">
        <div className="mb-8">
          <Button onClick={() => router.back()} variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight inline-block border rounded-lg px-6 py-3 bg-card/60 backdrop-blur-sm">
            PERIODICALLY FORECASTING
          </h1>
        </div>

        <div className="text-center mb-16">
            <div className="inline-block px-8 py-2 border rounded-lg bg-card/80 text-xl font-semibold">
                MONTHLY
            </div>
        </div>

        <div className="w-full flex justify-center items-start relative">
             <div className="w-full h-0.5 bg-border absolute top-12 -z-10" />
            <div className="flex justify-between w-full max-w-5xl px-4">
                {forecastData.map((dataPoint) => (
                    <CustomTimelineNode key={dataPoint.name} dataPoint={dataPoint} />
                ))}
            </div>
        </div>

        <div className="flex justify-center mt-16 space-x-8">
            <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full" style={{backgroundColor: COLORS.profit}} />
                <span className="text-sm font-medium">Profit</span>
            </div>
             <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full" style={{backgroundColor: COLORS.loss}} />
                <span className="text-sm font-medium">Loss</span>
            </div>
             <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full" style={{backgroundColor: COLORS.revenue}} />
                <span className="text-sm font-medium">Revenue</span>
            </div>
        </div>

      </div>
    </div>
  );
}
