
"use client";

import { useState, useEffect } from "react";
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
  Search,
  MousePointerClick,
  Filter,
  Users2,
  Heart,
  ClipboardList,
  Building,
  Package,
  Headset,
  MoreVertical,
  BarChart,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
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
  BarChart as RechartsBarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const defaultKpiData = [
  { title: "Total Revenue", value: "₹45.2Cr", change: "+12.5%", changeType: "increase", icon: <DollarSign className="h-4 w-4 text-muted-foreground" /> },
  { title: "Profit Margin", value: "24.5%", change: "+2.1%", changeType: "increase", icon: <TrendingUp className="h-4 w-4 text-muted-foreground" /> },
  { title: "New Customers", value: "1,250", change: "+15.3%", changeType: "increase", icon: <Users className="h-4 w-4 text-muted-foreground" /> },
  { title: "Conversion Rate", value: "3.5%", change: "+0.8%", changeType: "increase", icon: <Target className="h-4 w-4 text-muted-foreground" /> },
  { title: "Customer Acquisition Cost", value: "₹2,500", change: "-5.2%", changeType: "decrease", icon: <DollarSign className="h-4 w-4 text-muted-foreground" /> },
  { title: "Customer Lifetime Value", value: "₹15,800", change: "+8.9%", changeType: "increase", icon: <Briefcase className="h-4 w-4 text-muted-foreground" /> },
];

const TableComponent = ({ data }: { data: any[] }) => {
    if (!data || data.length === 0) {
        return <div className="text-center text-muted-foreground">No data available.</div>;
    }
    const headers = Object.keys(data[0] || {});
    return (
        <ScrollArea className="h-full">
        <Table>
            <TableHeader>
                <TableRow>
                    {headers.map(key => <TableHead key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</TableHead>)}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((row:any, index: number) => (
                    <TableRow key={index}>
                        {headers.map((header) => <TableCell key={header}>{row[header]}</TableCell>)}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </ScrollArea>
    );
};


const chartComponents: Record<string, React.FC<any>> = {
  bar: ({ data, dataKey, nameKey }) => (
    <RechartsBarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={nameKey} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey={dataKey} fill="hsl(var(--primary))" />
    </RechartsBarChart>
  ),
  line: ({ data }) => (
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} />
      <Line type="monotone" dataKey="profit" stroke="hsl(var(--chart-2))" strokeWidth={2} />
    </LineChart>
  ),
  pie: ({ data }) => {
    const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];
    return (
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" label>
            {data.map((entry:any, index:number) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    )
  },
  area: ({ data }) => (
    <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
    </AreaChart>
  ),
  table: TableComponent
};


const dashboardData: Record<string, any> = {
    'suggestion-1': {
        title: 'Sales Performance Dashboard',
        kpis: defaultKpiData,
        charts: [
            {
                type: 'table',
                originalType: 'line',
                title: 'Sales Growth Analysis',
                dataKey: 'revenueData',
                height: 250,
                colSpan: 'lg:col-span-2',
            },
            {
                type: 'table',
                originalType: 'bar',
                title: 'Business Overview',
                dataKey: 'businessOverviewData',
                nameKey: 'Metric',
                valueKey: 'Value',
                colSpan: 'lg:col-span-1',
                height: 250,
            },
            {
                type: 'table',
                originalType: 'bar',
                title: 'Sales Trend',
                dataKey: 'salesByRegionData',
                nameKey: 'name',
                valueKey: 'value',
                height: 150,
                colSpan: 'lg:col-span-2',
            },
            {
                type: 'table',
                originalType: 'pie',
                title: 'Top Sale Categories',
                dataKey: 'topProductsData',
                height: 150,
                colSpan: 'lg:col-span-1',
            },
        ],
        data: {
            revenueData: [
                { name: "Jan", revenue: 4000, profit: 2400 }, { name: "Feb", revenue: 3000, profit: 1398 }, { name: "Mar", revenue: 2000, profit: 9800 }, { name: "Apr", revenue: 2780, profit: 3908 }, { name: "May", revenue: 1890, profit: 4800 }, { name: "Jun", revenue: 2390, profit: 3800 }, { name: "Jul", revenue: 3490, profit: 4300 },
            ],
            salesByRegionData: [
                { name: "North", value: 4000 }, { name: "South", value: 3000 }, { name: "East", value: 2000 }, { name: "West", value: 2780 },
            ],
            topProductsData: [
                { name: 'Product A', value: 400 }, { name: 'Product B', value: 300 }, { name: 'Product C', value: 300 }, { name: 'Product D', value: 200 },
            ],
            businessOverviewData: [
                { "Metric": "Total Sales", "Value": "12000000" }, { "Metric": "Avg. Sale", "Value": "8540" }, { "Metric": "Total Orders", "Value": "1405" }, { "Metric": "Returning Customers", "Value": "45" },
            ],
        }
    },
    'suggestion-2': {
        title: `Marketing Campaign Dashboard`,
        kpis: [
            { title: "Impressions", value: `523.1k`, change: `+12.1%`, changeType: "increase", icon: <Search className="h-4 w-4 text-muted-foreground" /> },
            { title: "CTR", value: `2.87%`, change: `+0.5%`, changeType: "increase", icon: <MousePointerClick className="h-4 w-4 text-muted-foreground" /> },
            { title: "CPC", value: `₹75.50`, change: `-3.2%`, changeType: "decrease", icon: <DollarSign className="h-4 w-4 text-muted-foreground" /> },
            { title: "Conversions", value: `432`, change: `+18.9%`, changeType: "increase", icon: <Filter className="h-4 w-4 text-muted-foreground" /> },
            { title: "Organic Traffic", value: `15.2k`, change: `+7.8%`, changeType: "increase", icon: <Users2 className="h-4 w-4 text-muted-foreground" /> },
            { title: "ROAS", value: `4.5x`, change: `+1.2%`, changeType: "increase", icon: <TrendingUp className="h-4 w-4 text-muted-foreground" /> },
        ],
        charts: [
            {
                type: 'table',
                originalType: 'bar',
                title: 'Campaign Performance',
                dataKey: 'campaignData',
                nameKey: 'name',
                valueKey: 'value',
                height: 250,
                colSpan: 'lg:col-span-2',
            },
            {
                type: 'table',
                originalType: 'pie',
                title: 'Traffic Sources',
                dataKey: 'trafficData',
                colSpan: 'lg:col-span-1',
                height: 250,
            },
             {
                type: 'table',
                originalType: 'area',
                title: 'SEO Keyword Funnel',
                dataKey: 'seoData',
                height: 150,
                colSpan: 'lg:col-span-3',
            },
        ],
        data: {
            campaignData: [
                { name: 'Campaign A', value: 450, impressions: 1200, conversions: 50 },
                { name: 'Campaign B', value: 380, impressions: 980, conversions: 42 },
                { name: 'Campaign C', value: 510, impressions: 1500, conversions: 65 },
                { name: 'Campaign D', value: 320, impressions: 850, conversions: 35 },
            ],
            trafficData: [
                { name: 'Organic', value: 8200 },
                { name: 'Paid', value: 4500 },
                { name: 'Direct', value: 2100 },
                { name: 'Referral', value: 1500 },
            ],
            seoData: [
                { name: 'Awareness', value: 18000 },
                { name: 'Consideration', value: 11000 },
                { name: 'Conversion', value: 6000 },
                { name: 'Loyalty', value: 3000 },
            ],
        }
    }
};

const diverseTopics = [
    { title: "Financial Health Overview", kpis: [
        { title: "Net Profit", value: `₹8.2Cr`, change: `+4.1%`, changeType: "increase", icon: <DollarSign className="h-4 w-4 text-muted-foreground"/> },
        { title: "Operating Margin", value: `18.7%`, change: `+1.8%`, changeType: "increase", icon: <TrendingUp className="h-4 w-4 text-muted-foreground"/> },
        { title: "Burn Rate", value: `₹35L`, change: `-8.2%`, changeType: "decrease", icon: <ArrowDown className="h-4 w-4 text-muted-foreground"/> },
    ], charts: dashboardData['suggestion-1'].charts, data: dashboardData['suggestion-1'].data },
    { title: "Product Performance Metrics", kpis: [
        { title: "Active Users (MAU)", value: `88.2k`, change: `+12.5%`, changeType: "increase", icon: <Users className="h-4 w-4 text-muted-foreground"/> },
        { title: "Feature Adoption", value: `45%`, change: `+4.2%`, changeType: "increase", icon: <Target className="h-4 w-4 text-muted-foreground"/> },
        { title: "Churn Rate", value: `2.1%`, change: `-0.8%`, changeType: "decrease", icon: <Users2 className="h-4 w-4 text-muted-foreground"/> },
    ], charts: dashboardData['suggestion-2'].charts, data: dashboardData['suggestion-2'].data },
    { title: "Customer Support Insights", kpis: [
        { title: "Avg. Response Time", value: `45 mins`, change: `-8.1%`, changeType: "decrease", icon: <Headset className="h-4 w-4 text-muted-foreground"/> },
        { title: "CSAT Score", value: `4.6/5`, change: `+0.2`, changeType: "increase", icon: <Heart className="h-4 w-4 text-muted-foreground"/> },
        { title: "Tickets Solved", value: `850`, change: `+15.3%`, changeType: "increase", icon: <ClipboardList className="h-4 w-4 text-muted-foreground"/> },
    ], charts: dashboardData['suggestion-1'].charts, data: dashboardData['suggestion-1'].data },
    { title: "Operations & Logistics", kpis: [
        { title: "Inventory Turnover", value: `6.2`, change: `+0.8`, changeType: "increase", icon: <Package className="h-4 w-4 text-muted-foreground"/> },
        { title: "On-time Delivery", value: `96.5%`, change: `+0.9%`, changeType: "increase", icon: <TrendingUp className="h-4 w-4 text-muted-foreground"/> },
        { title: "Supplier Reliability", value: `98.2%`, change: `-0.5%`, changeType: "decrease", icon: <Building className="h-4 w-4 text-muted-foreground"/> },
    ], charts: dashboardData['suggestion-2'].charts, data: dashboardData['suggestion-2'].data },
    { title: "HR & Employee Engagement", kpis: [
        { title: "Employee Turnover", value: `8.5%`, change: `-1.2%`, changeType: "decrease", icon: <Users2 className="h-4 w-4 text-muted-foreground"/> },
        { title: "Avg. Tenure", value: `3.2 yrs`, change: `+0.3`, changeType: "increase", icon: <Users className="h-4 w-4 text-muted-foreground"/> },
        { title: "eNPS Score", value: `55`, change: `+8`, changeType: "increase", icon: <Heart className="h-4 w-4 text-muted-foreground"/> },
    ], charts: dashboardData['suggestion-1'].charts, data: dashboardData['suggestion-1'].data },
];

for (let i = 3; i <= 20; i++) {
    const topicIndex = (i - 3) % diverseTopics.length;
    const topic = diverseTopics[topicIndex];
    dashboardData[`suggestion-${i}`] = {
        title: `${topic.title} #${Math.floor((i-3)/diverseTopics.length) + 1}`,
        kpis: topic.kpis.map(kpi => ({...kpi})), // Deep copy
        charts: topic.charts.map(c => ({ ...c, type: 'table' })), // Default all to table
        data: JSON.parse(JSON.stringify(topic.data)), // Deep copy
    };
}

const suggestions = Array.from({ length: 20 }, (_, i) => ({
    id: `suggestion-${i + 1}`,
    text: `Option ${i + 1}`,
    percentage: 98 - i,
}));

export default function KpiMetricDashboardPage() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState('suggestion-1');
  const [isCustomizeMode, setIsCustomizeMode] = useState(false);
  const [dynamicDashboard, setDynamicDashboard] = useState(dashboardData[selectedOption]);

  useEffect(() => {
    // Deep copy to prevent state mutation issues
    setDynamicDashboard(JSON.parse(JSON.stringify(dashboardData[selectedOption])));
  }, [selectedOption]);

  const handleConvertToGraph = (chartIndex: number) => {
    const newCharts = [...dynamicDashboard.charts];
    const chartToUpdate = newCharts[chartIndex];
    if (chartToUpdate) {
      chartToUpdate.type = chartToUpdate.originalType;
      setDynamicDashboard({ ...dynamicDashboard, charts: newCharts });
    }
  };

  const currentDashboard = dynamicDashboard;

  if (!currentDashboard) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col">
        <div className="mb-8">
            <Button onClick={() => router.back()} variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
            </Button>
        </div>

        <div className="text-center mb-8">
            <h1 className="text-4xl font-bold tracking-tight inline-block border rounded-lg px-6 py-3 bg-card/60 backdrop-blur-sm">
                {currentDashboard.title}
            </h1>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main content */}
            <div className="lg:col-span-3 space-y-8">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {currentDashboard.kpis.map((kpi: any) => (
                        <Card key={kpi.title} className="bg-card/60 backdrop-blur-sm">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                                {kpi.icon ? kpi.icon : null}
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

                <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
                    {currentDashboard.charts.map((chart:any, index: number) => {
                        const ChartComponent = chartComponents[chart.type] || (() => <div>Unsupported chart type</div>);
                        
                        let chartData = currentDashboard.data[chart.dataKey];
                        
                        // Transform data for bar chart if needed
                        if (chart.type === 'bar' && chart.valueKey === 'Value') {
                             chartData = currentDashboard.data[chart.dataKey].map((item: any) => ({
                                [chart.nameKey]: item.Metric,
                                [chart.valueKey]: parseFloat(item.Value) || 0
                            }));
                        } else if (chart.type === 'bar' && chart.valueKey) {
                            chartData = chartData.map((item: any) => ({
                                ...item,
                                [chart.valueKey]: parseFloat(item[chart.valueKey]) || 0
                            }));
                        }

                        const heightClass = `h-[${chart.height}px]`;
                        
                        return (
                        <Card key={index} className={`bg-card/60 backdrop-blur-sm ${chart.colSpan || ''}`}>
                            <CardHeader className="flex flex-row justify-between items-center">
                                <CardTitle>{chart.title}</CardTitle>
                                {isCustomizeMode && (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-6 w-6">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => handleConvertToGraph(index)}>
                                                Convert to Graph
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                )}
                            </CardHeader>
                            <CardContent className={heightClass}>
                                <ResponsiveContainer width="100%" height="100%">
                                     <ChartComponent data={chartData} dataKey={chart.valueKey} nameKey={chart.nameKey} />
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    )})}
                </div>

                 <div className="flex justify-start gap-4 mt-auto">
                    <Button size="lg">
                        <Download className="mr-2" />
                        Download
                    </Button>
                     <Button size="lg" variant="secondary">
                        <Video className="mr-2" />
                        Generate Video
                    </Button>
                    <Button size="lg" variant="secondary" onClick={() => setIsCustomizeMode(!isCustomizeMode)}>
                        <Wrench className="mr-2" />
                        {isCustomizeMode ? 'Finish' : 'Customize'}
                    </Button>
                </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
                <Card className="bg-card/60 backdrop-blur-sm">
                    <CardContent className="p-4">
                         <ScrollArea className="h-[calc(100vh-200px)]">
                            <div className="space-y-3">
                            {suggestions.map((suggestion) => (
                                <div key={suggestion.id} className="group">
                                    <button
                                        onClick={() => setSelectedOption(suggestion.id)}
                                        className={`w-full text-left flex items-center justify-between p-3 rounded-lg bg-background/80 border transition-colors cursor-pointer ${selectedOption === suggestion.id ? 'bg-accent text-accent-foreground' : 'hover:bg-accent'}`}
                                    >
                                        <span className="font-medium">{suggestion.text}</span>
                                        <span className={`font-bold bg-primary/10 px-2 py-1 rounded-md ${selectedOption === suggestion.id ? 'text-primary-foreground bg-primary' : 'text-primary group-hover:text-primary-foreground group-hover:bg-primary'}`}>{suggestion.percentage}%</span>
                                    </button>
                                </div>
                            ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
