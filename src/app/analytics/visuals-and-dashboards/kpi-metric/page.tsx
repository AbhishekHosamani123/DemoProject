
"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  Download,
  Video,
  Wrench,
  ArrowUp,
  MoreVertical,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuPortal,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
  FunnelChart,
  Funnel,
  LabelList,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
} from "recharts";
import { allDashboardData, type KpiDashboardData } from "@/lib/content/kpi-dashboard-data";
import { cn } from "@/lib/utils";
import Link from "next/link";

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

type ChartDisplayMode = 'chart' | 'numeric';
type ChartCardId = keyof KpiDashboardData['charts'];
type ChartType = 'Area' | 'Pie' | 'Bar' | 'Line' | 'Composed' | 'Funnel' | 'Radar' | 'Scatter';

const chartDisplayOptions: {name: string, type: ChartType}[] = [
    { name: 'Pie Chart', type: 'Pie'}, 
    { name: 'Bar Graph', type: 'Bar' },
    { name: 'Line Graph', type: 'Line' },
    { name: 'Area Chart', type: 'Area' },
    { name: 'Funnel Chart', type: 'Funnel' },
    { name: 'Radar Chart', type: 'Radar' },
    { name: 'Scatter Plot', type: 'Scatter' },
];

const getChartComponent = (type: ChartType, data: any[], dataKey: string, nameKey?: string, secondaryDataKey?: string) => {
    switch(type) {
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
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.2)" vertical={false}/>
                    <XAxis dataKey={nameKey || 'name'} stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} cursor={{fill: 'hsl(var(--accent) / 0.1)'}}/>
                    <Legend />
                    <Bar dataKey={dataKey} fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                </ComposedChart>
            );
        case 'Line':
            return (
                <ComposedChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.2)" vertical={false}/>
                    <XAxis dataKey={nameKey || 'name'} stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} cursor={{fill: 'hsl(var(--accent) / 0.1)'}}/>
                    <Legend />
                    <Line type="monotone" dataKey={dataKey} stroke="hsl(var(--chart-1))" strokeWidth={2} />
                </ComposedChart>
            );
        case 'Area':
             return (
                <AreaChart data={data}>
                     <defs>
                        <linearGradient id={`color-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.2)" vertical={false}/>
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
                    {secondaryDataKey && <Radar name="Product B" dataKey={secondaryDataKey} stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" fillOpacity={0.6} />}
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
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.2)" vertical={false}/>
                    <XAxis dataKey={nameKey || 'name'} stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} cursor={{fill: 'hsl(var(--accent) / 0.1)'}}/>
                    <Legend />
                    <Bar dataKey={dataKey} fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                    {secondaryDataKey && <Line type="monotone" dataKey={secondaryDataKey} stroke="hsl(var(--chart-1))" strokeWidth={2} />}
                </ComposedChart>
            );
        default:
             return <p className="text-center text-muted-foreground p-4">Unsupported chart type. Select another from the menu.</p>;
    }
}

const ChartCard = ({ 
    title, 
    children, 
    isCustomizeMode, 
    onDisplayChange, 
    onChartTypeChange,
    displayMode, 
    numericData,
    chartId
}: { 
    title: string, 
    children: React.ReactNode, 
    isCustomizeMode: boolean, 
    onDisplayChange: (chartCardId: ChartCardId, mode: ChartDisplayMode) => void,
    onChartTypeChange: (chartCardId: ChartCardId, type: ChartType) => void,
    displayMode: ChartDisplayMode,
    numericData: { label: string, value: string | number }[],
    chartId: ChartCardId
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
                                <DropdownMenuItem onClick={() => onDisplayChange(chartId, 'numeric')}>Change to numerics</DropdownMenuItem>
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>Change graph style</DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            {chartDisplayOptions.map(option => (
                                                <DropdownMenuItem 
                                                    key={option.type} 
                                                    onClick={() => onChartTypeChange(chartId, option.type)}
                                                >
                                                    {option.name}
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>
                            </>
                        ) : (
                            <DropdownMenuItem onClick={() => onDisplayChange(chartId, 'chart')}>Change to Graphical representation</DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </CardHeader>
        <CardContent className="flex-1 flex flex-col justify-center items-center p-2">
            {displayMode === 'chart' ? (
                <ResponsiveContainer width="100%" height={250}>
                   {children}
                </ResponsiveContainer>
            ) : (
                <div className="w-full h-full p-4 overflow-auto">
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

const KpiCard = ({ title, value, change, icon: Icon }: { title: string, value: string, change: string, icon: React.ElementType }) => (
  <Card className="bg-card/60 backdrop-blur-sm border-primary/20 shadow-lg shadow-black/20 p-4">
    <CardHeader className="flex flex-row items-center justify-between p-0 pb-2">
      <CardTitle className="text-sm font-medium text-primary">{title}</CardTitle>
      <Icon className="h-5 w-5 text-primary" />
    </CardHeader>
    <CardContent className="p-0">
      <div className="text-3xl font-bold text-foreground">{value}</div>
      <p className="text-xs text-green-400 flex items-center gap-1 mt-1">
        <ArrowUp className="h-3 w-3"/>
        {change}
      </p>
    </CardContent>
  </Card>
)

type ChartDisplayModes = Record<ChartCardId, ChartDisplayMode>;
type ChartTypes = Record<ChartCardId, ChartType>;

export default function KpiMetricDashboardPage() {
  const router = useRouter();
  const [isCustomizeMode, setIsCustomizeMode] = React.useState(false);
  const [activeOption, setActiveOption] = React.useState('option-1');

  const activeData = allDashboardData[activeOption as keyof typeof allDashboardData];
  const chartIds = React.useMemo(() => Object.keys(activeData.charts) as ChartCardId[], [activeData]);

  const initialDisplayModes = React.useMemo(() => chartIds.reduce((acc, id) => {
    acc[id] = 'chart';
    return acc;
  }, {} as ChartDisplayModes), [chartIds]);
  
  const getInitialChartTypes = React.useCallback(() => {
    return chartIds.reduce((acc, id) => {
        acc[id] = allDashboardData[activeOption as keyof typeof allDashboardData].charts[id].defaultChart;
        return acc;
    }, {} as ChartTypes);
  }, [chartIds, activeOption]);


  const [displayModes, setDisplayModes] = React.useState<ChartDisplayModes>(initialDisplayModes);
  const [tempDisplayModes, setTempDisplayModes] = React.useState<ChartDisplayModes>(initialDisplayModes);

  const [chartTypes, setChartTypes] = React.useState<ChartTypes>(getInitialChartTypes());
  const [tempChartTypes, setTempChartTypes] = React.useState<ChartTypes>(getInitialChartTypes());

  React.useEffect(() => {
    const newInitialTypes = getInitialChartTypes();
    setChartTypes(newInitialTypes);
    setTempChartTypes(newInitialTypes);

    const newInitialDisplayModes = chartIds.reduce((acc, id) => {
        acc[id] = 'chart';
        return acc;
    }, {} as ChartDisplayModes);
    setDisplayModes(newInitialDisplayModes);
    setTempDisplayModes(newInitialDisplayModes);

  }, [activeOption, chartIds, getInitialChartTypes]);


  const handleCustomizeClick = () => {
    if (isCustomizeMode) {
      // Apply changes
      setDisplayModes(tempDisplayModes);
      setChartTypes(tempChartTypes);
    } else {
        // Enter customize mode
        setTempDisplayModes(displayModes);
        setTempChartTypes(chartTypes);
    }
    setIsCustomizeMode(!isCustomizeMode);
  };

  const handleDisplayChange = (chartId: ChartCardId, mode: ChartDisplayMode) => {
    setTempDisplayModes(prev => ({ ...prev, [chartId]: mode }));
  };
  
  const handleChartTypeChange = (chartId: ChartCardId, type: ChartType) => {
    setTempChartTypes(prev => ({ ...prev, [chartId]: type }));
  };

  const renderChart = (chartId: ChartCardId) => {
    const chartType = isCustomizeMode ? tempChartTypes[chartId] : chartTypes[chartId];
    const chartConfig = activeData.charts[chartId];
    return getChartComponent(
        chartType, 
        chartConfig.data, 
        chartConfig.dataKey, 
        chartConfig.nameKey, 
        chartConfig.secondaryDataKey
    );
  };


  return (
    <div className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <Button onClick={() => router.back()} variant="outline">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="flex items-center gap-4">
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button variant="secondary">
              <Video className="mr-2 h-4 w-4" />
              Generate Video
            </Button>
            <Button variant="secondary" onClick={handleCustomizeClick}>
              <Wrench className="mr-2 h-4 w-4" />
              {isCustomizeMode ? "Apply" : "Customize"}
            </Button>
          </div>
      </div>
      <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight inline-block border rounded-lg px-6 py-3 bg-card/60 backdrop-blur-sm">
              {activeData.title}
          </h1>
      </div>

      <main className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {activeData.kpis.map(kpi => <KpiCard key={kpi.title} {...kpi} />)}
          </div>
          <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       {chartIds.map(chartId => {
                          const chartConfig = activeData.charts[chartId];
                          return (
                              <div key={chartId} className={cn(chartConfig.colSpan === 2 ? 'md:col-span-2' : '')}>
                                  <ChartCard 
                                      title={chartConfig.title}
                                      isCustomizeMode={isCustomizeMode}
                                      onDisplayChange={handleDisplayChange}
                                      onChartTypeChange={handleChartTypeChange}
                                      displayMode={isCustomizeMode ? tempDisplayModes[chartId] : displayModes[chartId]}
                                      numericData={chartConfig.data.map(d => ({label: d[chartConfig.nameKey], value: d[chartConfig.dataKey]}))}
                                      chartId={chartId}
                                  >
                                      {renderChart(chartId)}
                                  </ChartCard>
                              </div>
                          )
                       })}
                  </div>
              </div>
              <div className="col-span-12 lg:col-span-4">
                  <Card className="bg-card/60 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-lg text-primary text-center">OPTIONS</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                        <div className="space-y-3">
                            {Object.keys(allDashboardData).map((optionKey, i) => (
                                <div key={optionKey} className="block group cursor-pointer" onClick={() => setActiveOption(optionKey)}>
                                   <Card className={cn(
                                        "group bg-card/60 backdrop-blur-sm p-3 text-center border-2 border-input hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1",
                                        activeOption === optionKey && "bg-accent border-primary"
                                    )}>
                                        <CardContent className="flex flex-col items-center justify-center p-0">
                                            <p className="mt-2 text-lg font-semibold text-foreground group-hover:text-accent-foreground">
                                                {`Option ${i + 1}`}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
              </div>
          </div>
      </main>
    </div>
  );
}
