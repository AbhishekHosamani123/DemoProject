
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
  DollarSign,
  TrendingUp,
  Users,
  Target,
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

const salesData = [
    { month: "Jan", sales: 4000, goal: 5000 },
    { month: "Feb", sales: 3000, goal: 5000 },
    { month: "Mar", sales: 5000, goal: 5000 },
    { month: "Apr", sales: 4500, goal: 6000 },
    { month: "May", sales: 6000, goal: 6000 },
    { month: "Jun", sales: 5500, goal: 7000 },
];

const revenueData = [
    { date: "2024-01", revenue: 2400 },
    { date: "2024-02", revenue: 1398 },
    { date: "2024-03", revenue: 9800 },
    { date: "2024-04", revenue: 3908 },
    { date: "2024-05", revenue: 4800 },
    { date: "2024-06", revenue: 3800 },
    { date: "2024-07", revenue: 4300 },
];

const funnelData = [
    { name: "Leads", value: 100, fill: "hsl(var(--chart-5))" },
    { name: "Contacts", value: 80, fill: "hsl(var(--chart-4))" },
    { name: "Qualified", value: 50, fill: "hsl(var(--chart-3))" },
    { name: "Proposal", value: 30, fill: "hsl(var(--chart-2))" },
    { name: "Closed", value: 20, fill: "hsl(var(--chart-1))" },
]

const regionData = [
  { name: 'North America', value: 400 },
  { name: 'Europe', value: 300 },
  { name: 'APAC', value: 200 },
  { name: 'LATAM', value: 100 },
];

const quarterlyPerformanceData = [
  { subject: 'Q1', A: 120, B: 110, fullMark: 150 },
  { subject: 'Q2', A: 98, B: 130, fullMark: 150 },
  { subject: 'Q3', A: 86, B: 130, fullMark: 150 },
  { subject: 'Q4', A: 99, B: 100, fullMark: 150 },
];


const kpiData = [
  {
    title: "Total Revenue",
    value: "₹45.2Cr",
    change: "+12.1% vs last period",
    icon: <DollarSign className="h-5 w-5 text-primary" />
  },
  {
    title: "Profit Margin",
    value: "24.5%",
    change: "+2.3% vs last period",
    icon: <TrendingUp className="h-5 w-5 text-primary" />
  },
  {
    title: "New Customers",
    value: "1,254",
    change: "+8.5% vs last period",
    icon: <Users className="h-5 w-5 text-primary" />
  },
  {
    title: "Conversion Rate",
    value: "3.2%",
    change: "+0.5% vs last period",
    icon: <Target className="h-5 w-5 text-primary" />
  },
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

type ChartDisplayMode = 'chart' | 'numeric';
type ChartCardId = 'revenueTrend' | 'salesByRegion' | 'monthlySales' | 'salesFunnel' | 'quarterlyPerformance';
type ChartType = 'Area' | 'Pie' | 'Bar' | 'Line' | 'Composed' | 'Funnel' | 'Radar' | 'Scatter' | 'Bubble' | 'Heatmap' | 'Waterfall';

const chartDisplayOptions = [
    'Pie Chart', 'Bar Graph', 'Line Graph', 'Area Chart', 'Funnel Chart', 'Radar Chart', 'Scatter Plot', 'Bubble Chart', 'Heatmap', 'Waterfall Chart'
];

const getChartComponent = (type: ChartType, data: any, dataKey: string, nameKey?: string) => {
    switch(type) {
        case 'Pie':
            return (
                <PieChart>
                    <Tooltip content={<CustomTooltip />} />
                    <Pie data={data} dataKey={dataKey} nameKey={nameKey} cx="50%" cy="50%" outerRadius={80} label>
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
                    <XAxis dataKey={nameKey} stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
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
                    <XAxis dataKey={nameKey} stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
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
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.2)" vertical={false}/>
                    <XAxis dataKey={nameKey} stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey={dataKey} stroke="hsl(var(--chart-1))" fillOpacity={1} fill="url(#colorRevenue)" />
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
                        <LabelList position="right" fill="hsl(var(--foreground))" dataKey={nameKey} />
                    </Funnel>
                </FunnelChart>
            );
        case 'Radar':
             return (
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid stroke="hsl(var(--border) / 0.2)" />
                    <PolarAngleAxis dataKey={nameKey} />
                    <PolarRadiusAxis />
                    <Radar name="Product A" dataKey="A" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" fillOpacity={0.6} />
                    <Radar name="Product B" dataKey="B" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" fillOpacity={0.6} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                </RadarChart>
            );
        case 'Scatter':
             return (
                <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.2)" />
                    <XAxis type="category" dataKey={nameKey} name={nameKey} stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis type="number" dataKey={dataKey} name={dataKey} stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter name="Sales Data" data={data} fill="hsl(var(--chart-1))" />
                </ScatterChart>
            );
        default:
             return <p>Unsupported chart type. Select another from the menu.</p>;
    }
}

const ChartCard = ({ 
    title, 
    children, 
    isCustomizeMode, 
    onDisplayChange, 
    onChartTypeChange,
    displayMode, 
    chartType,
    numericData,
    chartId
}: { 
    title: string, 
    children: React.ReactNode, 
    isCustomizeMode: boolean, 
    onDisplayChange: (chartCardId: ChartCardId, mode: ChartDisplayMode) => void,
    onChartTypeChange: (chartCardId: ChartCardId, type: ChartType) => void,
    displayMode: ChartDisplayMode,
    chartType: ChartType,
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
                                                    key={option} 
                                                    onClick={() => onChartTypeChange(chartId, option.replace(' ', '') as ChartType)}
                                                >
                                                    {option}
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

const KpiCard = ({ title, value, change, icon }: { title: string, value: string, change: string, icon: React.ReactNode }) => (
  <Card className="bg-card/60 backdrop-blur-sm border-primary/20 shadow-lg shadow-black/20 p-4">
    <CardHeader className="flex flex-row items-center justify-between p-0 pb-2">
      <CardTitle className="text-sm font-medium text-primary">{title}</CardTitle>
      {icon}
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

  const initialDisplayModes: ChartDisplayModes = {
    revenueTrend: 'chart',
    salesByRegion: 'chart',
    monthlySales: 'chart',
    salesFunnel: 'chart',
    quarterlyPerformance: 'chart',
  }
  
  const initialChartTypes: ChartTypes = {
    revenueTrend: 'Area',
    salesByRegion: 'Pie',
    monthlySales: 'Composed',
    salesFunnel: 'Funnel',
    quarterlyPerformance: 'Radar',
  };

  const [displayModes, setDisplayModes] = React.useState<ChartDisplayModes>(initialDisplayModes);
  const [tempDisplayModes, setTempDisplayModes] = React.useState<ChartDisplayModes>(initialDisplayModes);

  const [chartTypes, setChartTypes] = React.useState<ChartTypes>(initialChartTypes);
  const [tempChartTypes, setTempChartTypes] = React.useState<ChartTypes>(initialChartTypes);


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
    switch (chartId) {
        case 'revenueTrend':
            return getChartComponent(chartType, revenueData, 'revenue', 'date');
        case 'salesByRegion':
            return getChartComponent(chartType, regionData, 'value', 'name');
        case 'monthlySales':
            return getChartComponent(chartType, salesData, 'sales', 'month');
        case 'salesFunnel':
            return getChartComponent(chartType, funnelData, 'value', 'name');
        case 'quarterlyPerformance':
            return getChartComponent(chartType, quarterlyPerformanceData, 'A', 'subject');
        default:
            return null;
    }
  };


  return (
    <div className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col">
        <div className="flex items-start justify-between">
            <div className="space-y-4">
                <Button
                    onClick={() => router.back()}
                    variant="outline"
                >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
                <h1 className="text-3xl font-bold tracking-tight">Sales Performance Dashboard</h1>
            </div>
        </div>

        <main className="flex-1 overflow-y-auto pt-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpiData.map(kpi => <KpiCard key={kpi.title} {...kpi} />)}
            </div>
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 lg:col-span-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ChartCard 
                            title="Revenue Trend" 
                            isCustomizeMode={isCustomizeMode}
                            onDisplayChange={handleDisplayChange}
                            onChartTypeChange={handleChartTypeChange}
                            displayMode={isCustomizeMode ? tempDisplayModes.revenueTrend : displayModes.revenueTrend}
                            chartType={isCustomizeMode ? tempChartTypes.revenueTrend : chartTypes.revenueTrend}
                            numericData={revenueData.map(d => ({label: d.date, value: d.revenue}))}
                            chartId="revenueTrend"
                        >
                            {renderChart('revenueTrend')}
                       </ChartCard>
                       <ChartCard 
                            title="Sales by Region" 
                            isCustomizeMode={isCustomizeMode}
                            onDisplayChange={handleDisplayChange}
                            onChartTypeChange={handleChartTypeChange}
                            displayMode={isCustomizeMode ? tempDisplayModes.salesByRegion : displayModes.salesByRegion}
                            chartType={isCustomizeMode ? tempChartTypes.salesByRegion : chartTypes.salesByRegion}
                            numericData={regionData.map(d => ({label: d.name, value: d.value}))}
                            chartId="salesByRegion"
                        >
                            {renderChart('salesByRegion')}
                        </ChartCard>
                        <ChartCard 
                            title="Monthly Sales vs Goal" 
                            isCustomizeMode={isCustomizeMode}
                            onDisplayChange={handleDisplayChange}
                            onChartTypeChange={handleChartTypeChange}
                            displayMode={isCustomizeMode ? tempDisplayModes.monthlySales : displayModes.monthlySales}
                            chartType={isCustomizeMode ? tempChartTypes.monthlySales : chartTypes.monthlySales}
                            numericData={salesData.map(d => ({label: `${d.month} (Goal: ${d.goal})`, value: d.sales}))}
                            chartId="monthlySales"
                        >
                            {renderChart('monthlySales')}
                        </ChartCard>
                        <ChartCard 
                            title="Sales Conversion Funnel" 
                            isCustomizeMode={isCustomizeMode}
                            onDisplayChange={handleDisplayChange}
                            onChartTypeChange={handleChartTypeChange}
                            displayMode={isCustomizeMode ? tempDisplayModes.salesFunnel : displayModes.salesFunnel}
                            chartType={isCustomizeMode ? tempChartTypes.salesFunnel : chartTypes.salesFunnel}
                            numericData={funnelData.map(d => ({label: d.name, value: d.value}))}
                            chartId="salesFunnel"
                        >
                             {renderChart('salesFunnel')}
                        </ChartCard>
                         <div className="md:col-span-2">
                             <ChartCard 
                                title="Quarterly Performance" 
                                isCustomizeMode={isCustomizeMode}
                                onDisplayChange={handleDisplayChange}
                                onChartTypeChange={handleChartTypeChange}
                                displayMode={isCustomizeMode ? tempDisplayModes.quarterlyPerformance : displayModes.quarterlyPerformance}
                                chartType={isCustomizeMode ? tempChartTypes.quarterlyPerformance : chartTypes.quarterlyPerformance}
                                numericData={quarterlyPerformanceData.flatMap(d => ([{label: `${d.subject} - Prod A`, value: d.A}, {label: `${d.subject} - Prod B`, value: d.B}]))}
                                chartId="quarterlyPerformance"
                            >
                                {renderChart('quarterlyPerformance')}
                            </ChartCard>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-4">
                    <Card className="bg-transparent shadow-none border-none">
                      <CardHeader>
                          <CardTitle className="text-lg text-primary text-center">OPTIONS</CardTitle>
                      </CardHeader>
                      <CardContent className="p-2">
                          <div className="space-y-3">
                              {Array.from({ length: 20 }, (_, i) => (
                                  <div key={i + 1} className="block group cursor-pointer">
                                    <div className="flex items-center justify-between p-3 rounded-lg bg-background/80 border hover:bg-accent transition-colors">
                                        <span className="font-medium group-hover:text-accent-foreground">Option {i + 1}</span>
                                    </div>
                                  </div>
                              ))}
                          </div>
                      </CardContent>
                  </Card>
                </div>
            </div>
            <div className="flex items-center justify-center gap-4 pt-6">
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
        </main>
    </div>
  );
}
