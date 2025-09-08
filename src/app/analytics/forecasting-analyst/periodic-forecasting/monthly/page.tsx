
"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Dot,
} from "recharts";
import { cn } from "@/lib/utils";

const forecastData = [
  { name: "Past", period: "(Only View)", value: 8000, isPast: true },
  { name: "Current", period: "(May)", value: 10000, isCurrent: true },
  { name: "Next", period: "(June)", value: 11000 },
  { name: "July", value: 14000 },
  { name: "Aug", value: 18000 },
];

const CustomDot = (props: any) => {
  const { cx, cy, payload } = props;

  const isNext = payload.name === 'Next';
  const isPast = payload.isPast;

  return (
    <Dot
      cx={cx}
      cy={cy}
      r={30}
      fill="hsl(var(--card))"
      stroke={isNext ? "hsl(var(--primary))" : "hsl(var(--border))"}
      strokeWidth={isNext ? 3 : 2}
    />
  );
};

const CustomXAxisTick = (props: any) => {
    const { x, y, payload } = props;
    const { value } = payload;
    const dataPoint = forecastData.find(d => d.name === value);

    if (!dataPoint) return null;

    const isNext = dataPoint.name === 'Next';

    return (
        <g transform={`translate(${x},${y})`}>
            <foreignObject x={-50} y={15} width={100} height={100}>
                <div className="flex flex-col items-center text-center">
                    <div className={cn("flex flex-col items-center justify-center h-[60px] w-[60px] rounded-full border-2",
                      isNext ? "border-primary border-4" : "border-border"
                    )}>
                        <div className="text-sm font-bold text-foreground">{dataPoint.name}</div>
                        {dataPoint.period && <div className="text-xs text-muted-foreground">{dataPoint.period}</div>}
                    </div>
                    {!dataPoint.isPast &&
                        <div className="mt-4 text-sm font-semibold text-foreground bg-primary/20 text-primary-foreground px-3 py-1 rounded-md">
                           {`RS. ${dataPoint.value.toLocaleString()}`}
                        </div>
                    }
                </div>
            </foreignObject>
        </g>
    );
}

export default function MonthlyForecastingPage() {
  const router = useRouter();

  return (
    <div className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-5xl">
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

        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={forecastData.filter(d => !d.isPast)}
              margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)"/>
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                interval={0}
                tick={<CustomXAxisTick />}
              />
              <YAxis hide={true} domain={['dataMin - 2000', 'dataMax + 2000']} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  borderColor: 'hsl(var(--border))'
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
                formatter={(value: number) => [`RS. ${value.toLocaleString()}`, "Forecast"]}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--destructive))"
                strokeWidth={4}
                dot={<CustomDot/>}
                connectNulls
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
