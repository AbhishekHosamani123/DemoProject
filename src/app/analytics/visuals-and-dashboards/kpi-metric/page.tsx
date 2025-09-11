
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
  Wrench,
  TrendingUp,
  Users,
  Briefcase,
  Target,
  DollarSign,
  ArrowUp,
  ArrowDown,
  Video,
  MoreVertical,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


const kpiIcons: Record<string, React.ReactNode> = {
    DollarSign: <DollarSign className="h-4 w-4 text-muted-foreground" />,
    TrendingUp: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
    Users: <Users className="h-4 w-4 text-muted-foreground" />,
    Target: <Target className="h-4 w-4 text-muted-foreground" />,
    Briefcase: <Briefcase className="h-4 w-4 text-muted-foreground" />,
};

const generateDashboardData = () => {
    const data: Record<string, any> = {};
    const titles = [
      "Sales Performance", "Marketing Funnel", "Customer Service", "Financial Health", "Product Usage", 
      "Website Analytics", "E-commerce", "Supply Chain", "HR Dashboard", "Social Media",
      "Project Management", "IT Operations", "Healthcare", "Real Estate", "Education",
      "Manufacturing", "Retail", "Travel & Hospitality", "Energy Sector", "Automotive"
    ];

    for (let i = 0; i < titles.length; i++) {
        const key = titles[i].toLowerCase().replace(/\s+/g, '-');
        data[key] = {
            title: `${titles[i]} Dashboard`,
            kpis: [
                { title: "Total Revenue", value: `₹${(Math.random() * 50 + 10).toFixed(1)}Cr`, change: `+${(Math.random() * 15).toFixed(1)}%`, changeType: "increase", iconName: "DollarSign" },
                { title: "Profit Margin", value: `${(Math.random() * 30 + 10).toFixed(1)}%`, change: `+${(Math.random() * 5).toFixed(1)}%`, changeType: "increase", iconName: "TrendingUp" },
                { title: "New Customers", value: (Math.floor(Math.random() * 2000) + 500).toLocaleString(), change: `+${(Math.random() * 20).toFixed(1)}%`, changeType: "increase", iconName: "Users" },
                { title: "Conversion Rate", value: `${(Math.random() * 5 + 1).toFixed(1)}%`, change: `+${(Math.random() * 2).toFixed(1)}%`, changeType: "increase", iconName: "Target" },
                { title: "Avg. Order Value", value: `₹${(Math.floor(Math.random() * 5000) + 1000).toLocaleString()}`, change: `-${(Math.random() * 5).toFixed(1)}%`, changeType: "decrease", iconName: "Briefcase" },
                { title: "Active Users", value: (Math.floor(Math.random() * 10000) + 2000).toLocaleString(), change: `+${(Math.random() * 8).toFixed(1)}%`, changeType: "increase", iconName: "Users" },
            ],
            charts: [
                { 
                    title: "Metric Over Time", 
                    type: "line", 
                    data: Array.from({ length: 7 }, (_, j) => ({ name: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"][j], value: Math.floor(Math.random() * 3000) + 1000, pv: Math.floor(Math.random() * 2000) + 1000 })),
                    dataKeys: [{name: "value", color: "hsl(var(--chart-1))"}, {name: "pv", color: "hsl(var(--chart-2))"}]
                },
                { 
                    title: "Distribution by Category", 
                    type: "bar", 
                    data: Array.from({ length: 4 }, (_, j) => ({ name: ["North", "South", "East", "West"][j], value: Math.floor(Math.random() * 6000) + 1000 })),
                    dataKeys: [{name: "value", color: "hsl(var(--chart-2))"}]
                },
                { 
                    title: "Source Breakdown", 
                    type: "pie", 
                    data: [
                        { name: 'Organic', value: Math.floor(Math.random() * 500) + 200 },
                        { name: 'Paid', value: Math.floor(Math.random() * 400) + 100 },
                        { name: 'Direct', value: Math.floor(Math.random() * 300) + 100 },
                        { name: 'Referral', value: Math.floor(Math.random() * 200) + 50 },
                    ],
                    dataKeys: [{name: "value"}]
                },
                { 
                    title: "Secondary Distribution", 
                    type: "bar", 
                    data: Array.from({ length: 5 }, (_, j) => ({ name: ["A", "B", "C", "D", "E"][j], value: Math.floor(Math.random() * 2400) + 600 })),
                    dataKeys: [{name: "value", color: "hsl(var(--chart-1))"}]
                },
                 { 
                    title: "Performance Metrics", 
                    type: "stacked-bar", 
                    data: Array.from({ length: 6 }, (_, j) => ({ name: `Metric ${j+1}`, teamA: Math.floor(Math.random() * 2000) + 500, teamB: Math.floor(Math.random() * 2000) + 500 })),
                    dataKeys: [{name: "teamA", color: "hsl(var(--chart-1))"}, {name: "teamB", color: "hsl(var(--chart-2))"}]
                },
                {
                    title: "Capability Analysis",
                    type: "radar",
                    data: [
                        { subject: 'Marketing', A: Math.floor(Math.random() * 100) + 20, fullMark: 150 },
                        { subject: 'Sales', A: Math.floor(Math.random() * 100) + 50, fullMark: 150 },
                        { subject: 'Support', A: Math.floor(Math.random() * 100) + 30, fullMark: 150 },
                        { subject: 'Development', A: Math.floor(Math.random() * 100) + 40, fullMark: 150 },
                        { subject: 'Finance', A: Math.floor(Math.random() * 100) + 60, fullMark: 150 },
                        { subject: 'HR', A: Math.floor(Math.random() * 100) + 10, fullMark: 150 },
                    ],
                    dataKeys: [{name: "A", color: "hsl(var(--chart-1))"}]
                }
            ]
        };
    }
    return data;
}


const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-2 bg-card/90 border border-border rounded-lg shadow-lg">
                <p className="label text-primary font-bold">{label || payload[0].name}</p>
                {payload.map((pld: any, index: number) => (
                    <p key={index} style={{ color: pld.fill || pld.stroke }}>
                        {`${pld.name}: ${pld.value.toLocaleString()}`}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const renderChart = (chart: any) => {
  switch (chart.type) {
    case 'line':
      return (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chart.data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.2)" />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend iconType="plainline"/>
            {chart.dataKeys.map((key: any, i: number) => (
                <Line key={key.name} type="monotone" dataKey={key.name} stroke={key.color || COLORS[i % COLORS.length]} strokeWidth={2} dot={false} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      );
    case 'bar':
      return (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chart.data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.2)" />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            {chart.dataKeys.map((key: any, i: number) => (
                 <Bar key={key.name} dataKey={key.name} fill={key.color || COLORS[i % COLORS.length]} radius={[4, 4, 0, 0]} barSize={30}/>
            ))}
          </BarChart>
        </ResponsiveContainer>
      );
    case 'stacked-bar':
      return (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chart.data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.2)" />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {chart.dataKeys.map((key: any, i: number) => (
                 <Bar key={key.name} dataKey={key.name} stackId="a" fill={key.color || COLORS[i % COLORS.length]} radius={[4, 4, 0, 0]}/>
            ))}
          </BarChart>
        </ResponsiveContainer>
      );
    case 'pie':
      return (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<CustomTooltip />} />
            <Legend layout="horizontal" verticalAlign="bottom" align="center" iconType="circle" />
            <Pie
              data={chart.data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={"70%"}
              stroke="hsl(var(--background))"
              strokeWidth={2}
              labelLine={false}
              label={false}
            >
              {chart.data.map((_: any, index: number) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      );
    case 'radar':
      return (
        <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chart.data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Tooltip content={<CustomTooltip />} />
                {chart.dataKeys.map((key: any, i: number) => (
                    <Radar key={key.name} name="Mike" dataKey={key.name} stroke={key.color} fill={key.color} fillOpacity={0.6} />
                ))}
            </RadarChart>
        </ResponsiveContainer>
      )
    default:
      return <div>Invalid chart type</div>;
  }
};

const NumericalDataView = ({ data }: { data: any[] }) => {
    if (!data || data.length === 0) return null;
    const headers = Object.keys(data[0]);
    return (
        <ScrollArea className="h-full">
            <Table>
                <TableHeader>
                    <TableRow>
                        {headers.map(header => <TableHead key={header}>{header}</TableHead>)}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow key={index}>
                            {headers.map(header => <TableCell key={header}>{row[header]}</TableCell>)}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </ScrollArea>
    );
};


const ChartCard = ({chart, showMenu, onConvertToNumerical, onConvertToChart, isNumerical}: {
    chart: any, 
    showMenu: boolean, 
    onConvertToNumerical: () => void, 
    onConvertToChart: () => void,
    isNumerical: boolean
}) => (
    <Card className="bg-card/60 backdrop-blur-sm h-[300px]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>{chart.title}</CardTitle>
            {showMenu && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {isNumerical ? (
                            <DropdownMenuItem onClick={onConvertToChart}>Change to graphical representation</DropdownMenuItem>
                        ) : (
                            <>
                                <DropdownMenuItem onClick={onConvertToNumerical}>Change to numerical</DropdownMenuItem>
                                <DropdownMenuItem>Change chart style</DropdownMenuItem>
                            </>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </CardHeader>
        <CardContent className="h-[calc(100%-3rem)] p-4 pt-2">
            {isNumerical ? <NumericalDataView data={chart.data} /> : renderChart(chart)}
        </CardContent>
    </Card>
)


export default function KpiMetricDashboardPage() {
  const router = useRouter();
  const [dashboardData, setDashboardData] = React.useState<Record<string, any> | null>(null);
  const [selectedDashboard, setSelectedDashboard] = React.useState('sales-performance');
  const [loading, setLoading] = React.useState(true);
  const [isCustomizeMode, setIsCustomizeMode] = React.useState(false);
  const [chartDisplayModes, setChartDisplayModes] = React.useState<Record<string, 'chart' | 'numerical'>>({});


  React.useEffect(() => {
    const data = generateDashboardData();
    setDashboardData(data);
    setLoading(false);
  }, []);

  const handleConvertToNumerical = (chartTitle: string) => {
    setChartDisplayModes(prev => ({
        ...prev,
        [chartTitle]: 'numerical'
    }));
  }

  const handleConvertToChart = (chartTitle: string) => {
    setChartDisplayModes(prev => ({
        ...prev,
        [chartTitle]: 'chart'
    }));
  }

  if (loading || !dashboardData) {
    return (
      <div className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex items-start gap-8">
        <main className="flex-1 space-y-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-6">
                {Array.from({length: 6}).map((_, i) => <Skeleton key={i} className="h-28" />)}
            </div>
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 <Skeleton className="lg:col-span-3 h-[250px]" />
                 <Skeleton className="h-[300px]" />
                 <Skeleton className="h-[300px]" />
                 <Skeleton className="h-[300px]" />
            </div>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                 <Skeleton className="h-[300px]" />
                 <Skeleton className="h-[300px]" />
            </div>
        </main>
        <aside className="w-64 space-y-4 sticky top-8">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-[calc(100vh-14rem)]" />
        </aside>
      </div>
    );
  }

  const currentDashboard = dashboardData[selectedDashboard];

  const mainChart = currentDashboard.charts[0];
  const smallCharts = currentDashboard.charts.slice(1, 4);
  const bottomCharts = currentDashboard.charts.slice(4);

  return (
    <div className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex items-start flex-row-reverse gap-8">
      <aside className="w-64 space-y-4 sticky top-8">
          <h2 className="text-lg font-semibold text-primary pl-4">Dashboards</h2>
          <Card className="bg-card/60 backdrop-blur-sm">
              <CardContent className="p-2">
                <ScrollArea className="h-[calc(100vh-14rem)]">
                    <div className="space-y-2">
                    {Object.keys(dashboardData).map((key, index) => (
                        <div
                            key={key}
                            onClick={() => setSelectedDashboard(key)}
                            className="block group cursor-pointer"
                        >
                           <div className={cn(
                                "flex items-center justify-between p-3 rounded-lg border transition-colors",
                                selectedDashboard === key
                                ? "bg-primary border-primary text-primary-foreground"
                                : "bg-background/80 border-border hover:bg-accent"
                            )}>
                                <span className={cn(
                                    "font-medium",
                                     selectedDashboard === key ? "text-primary-foreground" : "group-hover:text-accent-foreground"
                                )}>
                                    {`Option ${index + 1}`}
                                </span>
                            </div>
                        </div>
                    ))}
                    </div>
                </ScrollArea>
              </CardContent>
          </Card>
      </aside>
      <main className="flex-1 space-y-8">
        <div className="flex justify-between items-center">
            <Button onClick={() => router.back()} variant="outline">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
        </div>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight inline-block border rounded-lg px-6 py-3 bg-card/60 backdrop-blur-sm">
            {currentDashboard.title}
          </h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {currentDashboard.kpis.map((kpi: any) => (
            <Card key={kpi.title} className="bg-card/60 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                {kpiIcons[kpi.iconName as keyof typeof kpiIcons] || null}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <p className={cn("text-xs text-muted-foreground flex items-center",
                  kpi.changeType === 'increase' ? 'text-green-500' : 'text-red-500'
                )}>
                  <span className={`mr-1`}>
                    {kpi.changeType === 'increase' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                  </span>
                  {kpi.change} vs last period
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-3">
                <ChartCard
                    chart={mainChart}
                    showMenu={isCustomizeMode}
                    onConvertToNumerical={() => handleConvertToNumerical(mainChart.title)}
                    onConvertToChart={() => handleConvertToChart(mainChart.title)}
                    isNumerical={chartDisplayModes[mainChart.title] === 'numerical'}
                />
            </div>
            {smallCharts.map((chart: any, index: number) => (
                <div key={index} className="lg:col-span-1">
                    <ChartCard
                        chart={chart}
                        showMenu={isCustomizeMode}
                        onConvertToNumerical={() => handleConvertToNumerical(chart.title)}
                        onConvertToChart={() => handleConvertToChart(chart.title)}
                        isNumerical={chartDisplayModes[chart.title] === 'numerical'}
                    />
                </div>
            ))}
            <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {bottomCharts.map((chart:any, index: number) => (
                     <div key={index} className="lg:col-span-1">
                        <ChartCard
                            chart={chart}
                            showMenu={isCustomizeMode}
                            onConvertToNumerical={() => handleConvertToNumerical(chart.title)}
                            onConvertToChart={() => handleConvertToChart(chart.title)}
                            isNumerical={chartDisplayModes[chart.title] === 'numerical'}
                        />
                    </div>
                ))}
            </div>
        </div>

        <div className="flex justify-start gap-4 pt-4">
          <Button size="lg">
            <Download className="mr-2" />
            Download
          </Button>
          <Button size="lg" variant="secondary">
            <Video className="mr-2" />
            Generate Video
          </Button>
          <Button size="lg" variant={isCustomizeMode ? "default": "secondary"} onClick={() => {
            setIsCustomizeMode(!isCustomizeMode);
            if(isCustomizeMode) {
                // When exiting customize mode, chart states are preserved.
                // setChartDisplayModes({}); // This would reset the view
            }
          }}>
            <Wrench className="mr-2" />
            {isCustomizeMode ? "Done" : "Customize"}
          </Button>
        </div>
      </main>
    </div>
  );
}

    