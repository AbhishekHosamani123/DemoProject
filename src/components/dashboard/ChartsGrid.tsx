"use client";

import React, { useState, useMemo } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ResponsiveContainer,
    ComposedChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
    AreaChart,
    Area,
    PieChart,
    Pie,
    Cell,
    FunnelChart,
    Funnel,
    LabelList,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    ScatterChart,
    Scatter
} from "recharts";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuPortal,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type ChartDisplayMode = 'chart' | 'numeric';
type ChartType = 'Area' | 'Pie' | 'Bar' | 'Line' | 'Composed' | 'Funnel' | 'Radar' | 'Scatter';

const chartDisplayOptions: { name: string, type: ChartType }[] = [
    { name: 'Pie Chart', type: 'Pie' },
    { name: 'Bar Graph', type: 'Bar' },
    { name: 'Line Graph', type: 'Line' },
    { name: 'Area Chart', type: 'Area' },
    { name: 'Funnel Chart', type: 'Funnel' },
    { name: 'Radar Chart', type: 'Radar' },
    { name: 'Scatter Plot', type: 'Scatter' },
];

const PIE_COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-2 bg-card/90 border border-border rounded-lg shadow-lg text-sm">
                <p className="label text-primary font-bold">{label}</p>
                {payload.map((pld: any, index: number) => (
                    <div key={index} className="flex justify-between gap-4" style={{ color: pld.color || pld.fill }}>
                        <span>{pld.name}:</span>
                        <span className="font-bold">{pld.value.toLocaleString()}</span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

const getChartComponent = (type: ChartType, data: any[], dataKey: string, nameKey?: string, secondaryDataKey?: string) => {
    switch (type) {
        case 'Pie':
            return (
                <PieChart>
                    <Tooltip content={<CustomTooltip />} />
                    <Pie data={data} dataKey={dataKey} nameKey={nameKey || 'name'} cx="50%" cy="50%" outerRadius={80} label>
                        {data.map((_: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend />
                </PieChart>
            );
        case 'Bar':
            return (
                <ComposedChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.2)" vertical={false} />
                    <XAxis dataKey={nameKey || 'name'} stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--accent) / 0.1)' }} />
                    <Legend />
                    <Bar dataKey={dataKey} fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                </ComposedChart>
            );
        case 'Line':
            return (
                <ComposedChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.2)" vertical={false} />
                    <XAxis dataKey={nameKey || 'name'} stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--accent) / 0.1)' }} />
                    <Legend />
                    <Line type="monotone" dataKey={dataKey} stroke="hsl(var(--chart-1))" strokeWidth={2} />
                </ComposedChart>
            );
        case 'Area':
            return (
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id={`color-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.2)" vertical={false} />
                    <XAxis dataKey={nameKey || 'name'} stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey={dataKey} stroke="hsl(var(--chart-1))" fillOpacity={1} fill={`url(#color-${dataKey})`} />
                </AreaChart>
            );
        case 'Funnel':
            return (
                <FunnelChart>
                    <Tooltip content={<CustomTooltip />} />
                    <Funnel
                        dataKey={dataKey}
                        data={data}
                        isAnimationActive
                    >
                        <LabelList position="right" fill="hsl(var(--foreground))" dataKey={nameKey || 'name'} />
                    </Funnel>
                </FunnelChart>
            );
        case 'Radar':
            return (
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid stroke="hsl(var(--border) / 0.2)" />
                    <PolarAngleAxis dataKey={nameKey || 'name'} />
                    <PolarRadiusAxis />
                    <Radar name="Product A" dataKey={dataKey} stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" fillOpacity={0.6} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                </RadarChart>
            );
        case 'Scatter':
            return (
                <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.2)" />
                    <XAxis type="category" dataKey={nameKey || 'name'} name={nameKey || 'name'} stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis type="number" dataKey={dataKey} name={dataKey} stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter name="Sales Data" data={data} fill="hsl(var(--chart-1))" />
                </ScatterChart>
            );
        case 'Composed':
            return (
                <ComposedChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.2)" vertical={false} />
                    <XAxis dataKey={nameKey || 'name'} stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--accent) / 0.1)' }} />
                    <Legend />
                    <Bar dataKey={dataKey} fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                    {secondaryDataKey && <Line type="monotone" dataKey={secondaryDataKey} stroke="hsl(var(--chart-1))" strokeWidth={2} />}
                </ComposedChart>
            );
        default:
            return <p className="text-center text-muted-foreground p-4">Unsupported chart type.</p>;
    }
}


const ChartCard = ({
    title,
    children,
    isCustomizeMode,
    displayMode,
    onDisplayChange,
    onChartTypeChange,
    numericData
}: {
    title: string,
    children: React.ReactNode,
    isCustomizeMode: boolean,
    displayMode: ChartDisplayMode,
    onDisplayChange: (mode: ChartDisplayMode) => void,
    onChartTypeChange: (type: ChartType) => void,
    numericData: { label: string, value: string | number }[],
}) => {
    return (
        <Card className="bg-card/60 backdrop-blur-sm h-full flex flex-col border-primary/20 shadow-lg shadow-black/20">
            <CardHeader className="flex flex-row items-center justify-between py-4 px-6">
                <CardTitle className="text-base font-semibold text-primary">{title}</CardTitle>
                {isCustomizeMode && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {displayMode === 'chart' ? (
                                <>
                                    <DropdownMenuItem onClick={() => onDisplayChange('numeric')}>Change to numerics</DropdownMenuItem>
                                    <DropdownMenuSub>
                                        <DropdownMenuSubTrigger>Change graph style</DropdownMenuSubTrigger>
                                        <DropdownMenuPortal>
                                            <DropdownMenuSubContent>
                                                {chartDisplayOptions.map(option => (
                                                    <DropdownMenuItem
                                                        key={option.type}
                                                        onClick={() => onChartTypeChange(option.type)}
                                                    >
                                                        {option.name}
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuSubContent>
                                        </DropdownMenuPortal>
                                    </DropdownMenuSub>
                                </>
                            ) : (
                                <DropdownMenuItem onClick={() => onDisplayChange('chart')}>Change to Graphical representation</DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center items-center p-2">
                {displayMode === 'chart' ? (
                    <ResponsiveContainer width="100%" height={300}>
                        {children as any}
                    </ResponsiveContainer>
                ) : (
                    <div className="w-full h-full p-4 overflow-auto max-h-[300px]">
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                            {numericData.map((d, i) => (
                                <React.Fragment key={i}>
                                    <div className="text-muted-foreground truncate">{d.label}:</div>
                                    <div className="font-bold text-right text-foreground">{d.value.toLocaleString()}</div>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

interface ChartsGridProps {
    data: any;
    isCustomizeMode: boolean;
}

export default function ChartsGrid({ data, isCustomizeMode }: ChartsGridProps) {
    const chartsConfig = useMemo(() => ({
        salesByCategory: {
            title: "Sales by Category",
            data: data.salesByCategory,
            dataKey: "value",
            nameKey: "name",
            defaultChart: "Pie" as ChartType,
            colSpan: 1
        },
        topStates: {
            title: "Top 10 States by Sales",
            data: data.topStates,
            dataKey: "value",
            nameKey: "name",
            defaultChart: "Bar" as ChartType,
            colSpan: 2
        },
        monthlyTrend: {
            title: "Monthly Sales Trend",
            data: data.monthlyTrend,
            dataKey: "value",
            nameKey: "name",
            defaultChart: "Area" as ChartType,
            colSpan: 2
        },
        topSubCategories: {
            title: "Top 5 Sub-Categories",
            data: data.topSubCategories,
            dataKey: "value",
            nameKey: "name",
            defaultChart: "Bar" as ChartType,
            colSpan: 1
        }
    }), [data]);

    const chartIds = Object.keys(chartsConfig);

    const [chartStates, setChartStates] = useState<Record<string, { mode: ChartDisplayMode, type: ChartType }>>(() => {
        const initialStates: Record<string, any> = {};
        Object.entries(chartsConfig).forEach(([key, config]) => {
            initialStates[key] = {
                mode: 'chart',
                type: config.defaultChart
            };
        });
        return initialStates;
    });

    // Reset state if config changes heavily (optional)

    const updateChartState = (id: string, updates: Partial<{ mode: ChartDisplayMode, type: ChartType }>) => {
        setChartStates(prev => ({
            ...prev,
            [id]: { ...prev[id], ...updates }
        }));
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {chartIds.map((id) => {
                const config = chartsConfig[id as keyof typeof chartsConfig];
                const state = chartStates[id] || { mode: 'chart', type: config.defaultChart };

                return (
                    <div key={id} className={cn(config.colSpan === 2 ? 'md:col-span-2' : 'col-span-1')}>
                        <ChartCard
                            title={config.title}
                            isCustomizeMode={isCustomizeMode}
                            displayMode={state.mode}
                            onDisplayChange={(mode) => updateChartState(id, { mode })}
                            onChartTypeChange={(type) => updateChartState(id, { type })}
                            numericData={config.data.map((d: any) => ({ label: d[config.nameKey], value: d[config.dataKey] }))}
                        >
                            {getChartComponent(
                                state.type,
                                config.data,
                                config.dataKey,
                                config.nameKey
                            )}
                        </ChartCard>
                    </div>
                );
            })}
        </div>
    );
}
