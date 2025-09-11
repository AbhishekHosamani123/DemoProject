
"use client";

import { useState } from "react";
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
  MoreVertical,
  Heart,
  ClipboardList,
  Building,
  Package,
  Headset,
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
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

const dashboardData: Record<string, any> = {
    'suggestion-1': {
        title: 'Sales Performance Dashboard',
        kpis: defaultKpiData,
        charts: [
            { 
                type: 'bar',
                title: 'Sales Trend',
                dataKey: 'salesByRegionData',
                height: 250,
                colSpan: 'lg:col-span-1',
                component: (data:any) => (
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="region" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="sales" fill="hsl(var(--primary))" />
                    </BarChart>
                )
            },
            {
                type: 'table',
                title: 'Business Overview',
                dataKey: 'businessOverviewData',
                colSpan: 'lg:col-span-1',
                component: (data: any) => (
                    <Table>
                        <TableBody>
                            {data.map((row:any) => (
                                <TableRow key={row.metric}>
                                    <TableCell className="font-medium">{row.metric}</TableCell>
                                    <TableCell className="text-right">{row.value}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )
            },
            { 
                type: 'pie',
                title: 'Top Sale Categories',
                dataKey: 'topProductsData',
                height: 150,
                colSpan: 'lg:col-span-1',
                component: (data:any) => {
                    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
                    return (
                        <PieChart>
                            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" label>
                                {data.map((entry:any, index:number) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    )
                }
            },
            { 
                type: 'line',
                title: 'Sales Growth Analysis',
                dataKey: 'revenueData',
                height: 150,
                colSpan: 'lg:col-span-2',
                component: (data:any) => (
                     <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} />
                        <Line type="monotone" dataKey="profit" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                    </LineChart>
                )
            },
        ],
        data: {
            revenueData: [
                { month: "Jan", revenue: 4000, profit: 2400 }, { month: "Feb", revenue: 3000, profit: 1398 }, { month: "Mar", revenue: 2000, profit: 9800 }, { month: "Apr", revenue: 2780, profit: 3908 }, { month: "May", revenue: 1890, profit: 4800 }, { month: "Jun", revenue: 2390, profit: 3800 }, { month: "Jul", revenue: 3490, profit: 4300 },
            ],
            salesByRegionData: [
                { region: "North", sales: 4000 }, { region: "South", sales: 3000 }, { region: "East", sales: 2000 }, { region: "West", sales: 2780 },
            ],
            topProductsData: [
                { name: 'Product A', value: 400 }, { name: 'Product B', value: 300 }, { name: 'Product C', value: 300 }, { name: 'Product D', value: 200 },
            ],
            businessOverviewData: [
                { metric: "Total Sales", value: "₹1.2Cr" }, { metric: "Avg. Sale", value: "₹8,540" }, { metric: "Total Orders", value: "1,405" }, { metric: "Returning Customers", value: "45%" },
            ],
        }
    },
    'suggestion-2': {
        title: `Marketing Campaign Dashboard`,
        kpis: [
            { title: "Impressions", value: `${(Math.random() * 500).toFixed(1)}k`, change: `+${(Math.random() * 10).toFixed(1)}%`, changeType: "increase", icon: <Search className="h-4 w-4 text-muted-foreground" /> },
            { title: "CTR", value: `${(Math.random() * 5).toFixed(2)}%`, change: `+${(Math.random() * 1).toFixed(2)}%`, changeType: "increase", icon: <MousePointerClick className="h-4 w-4 text-muted-foreground" /> },
            { title: "CPC", value: `₹${(Math.random() * 100).toFixed(2)}`, change: `-${(Math.random() * 5).toFixed(1)}%`, changeType: "decrease", icon: <DollarSign className="h-4 w-4 text-muted-foreground" /> },
            { title: "Conversions", value: `${Math.floor(Math.random() * 500)}`, change: `+${(Math.random() * 20).toFixed(1)}%`, changeType: "increase", icon: <Filter className="h-4 w-4 text-muted-foreground" /> },
            { title: "Organic Traffic", value: `${(Math.random() * 20).toFixed(1)}k`, change: `+${(Math.random() * 8).toFixed(1)}%`, changeType: "increase", icon: <Users2 className="h-4 w-4 text-muted-foreground" /> },
            { title: "ROAS", value: `${(Math.random() * 10).toFixed(1)}x`, change: `+${(Math.random() * 2).toFixed(1)}%`, changeType: "increase", icon: <TrendingUp className="h-4 w-4 text-muted-foreground" /> },
        ],
        charts: [
            { 
                type: 'bar',
                title: 'Campaign Performance',
                dataKey: 'campaignData',
                height: 250,
                colSpan: 'lg:col-span-2',
                component: (data:any) => (
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="impressions" fill="hsl(var(--chart-2))" name="Impressions (k)" />
                        <Bar dataKey="conversions" fill="hsl(var(--primary))" name="Conversions" />
                    </BarChart>
                )
            },
            {
                type: 'pie',
                title: 'Traffic Sources',
                dataKey: 'trafficData',
                colSpan: 'lg:col-span-1',
                height: 250,
                component: (data: any) => {
                    const COLORS = ['#FF8042', '#00C49F', '#0088FE', '#FFBB28'];
                    return (
                        <PieChart>
                            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={60} fill="#8884d8" paddingAngle={5}>
                                {data.map((entry:any, index:number) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    )
                }
            },
             { 
                type: 'line',
                title: 'SEO Keyword Funnel',
                dataKey: 'seoData',
                height: 150,
                colSpan: 'lg:col-span-3',
                component: (data:any) => (
                     <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="stage" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="volume" stroke="hsl(var(--chart-4))" strokeWidth={2} />
                    </LineChart>
                )
            },
        ],
        data: {
            campaignData: [
                { name: 'Campaign A', impressions: Math.random() * 1000, conversions: Math.random() * 100 },
                { name: 'Campaign B', impressions: Math.random() * 1000, conversions: Math.random() * 100 },
                { name: 'Campaign C', impressions: Math.random() * 1000, conversions: Math.random() * 100 },
                { name: 'Campaign D', impressions: Math.random() * 1000, conversions: Math.random() * 100 },
            ],
            trafficData: [
                { name: 'Organic', value: Math.random() * 10000 },
                { name: 'Paid', value: Math.random() * 5000 },
                { name: 'Direct', value: Math.random() * 3000 },
                { name: 'Referral', value: Math.random() * 2000 },
            ],
            seoData: [
                { stage: 'Awareness', volume: Math.random() * 20000 },
                { stage: 'Consideration', volume: Math.random() * 10000 },
                { stage: 'Conversion', volume: Math.random() * 5000 },
                { stage: 'Loyalty', volume: Math.random() * 2500 },
            ],
        }
    }
};

const diverseTopics = [
    { title: "Financial Health Overview", kpis: [
        { title: "Net Profit", value: `₹${(Math.random() * 10).toFixed(1)}Cr`, change: `+${(Math.random() * 5).toFixed(1)}%`, changeType: "increase", icon: <DollarSign/> },
        { title: "Operating Margin", value: `${(Math.random() * 30).toFixed(1)}%`, change: `+${(Math.random() * 2).toFixed(1)}%`, changeType: "increase", icon: <TrendingUp/> },
        { title: "Burn Rate", value: `₹${(Math.random() * 50).toFixed(1)}L`, change: `-${(Math.random() * 10).toFixed(1)}%`, changeType: "decrease", icon: <ArrowDown/> },
    ]},
    { title: "Product Performance Metrics", kpis: [
        { title: "Active Users (MAU)", value: `${(Math.random() * 100).toFixed(1)}k`, change: `+${(Math.random() * 15).toFixed(1)}%`, changeType: "increase", icon: <Users/> },
        { title: "Feature Adoption", value: `${(Math.random() * 60).toFixed(1)}%`, change: `+${(Math.random() * 5).toFixed(1)}%`, changeType: "increase", icon: <Target/> },
        { title: "Churn Rate", value: `${(Math.random() * 5).toFixed(2)}%`, change: `-${(Math.random() * 1).toFixed(2)}%`, changeType: "decrease", icon: <Users2/> },
    ]},
    { title: "Customer Support Insights", kpis: [
        { title: "Avg. Response Time", value: `${(Math.random() * 120).toFixed(0)} mins`, change: `-${(Math.random() * 10).toFixed(1)}%`, changeType: "decrease", icon: <Headset/> },
        { title: "CSAT Score", value: `${(Math.random() * 5).toFixed(2)}/5`, change: `+${(Math.random() * 0.5).toFixed(2)}`, changeType: "increase", icon: <Heart/> },
        { title: "Tickets Solved", value: `${Math.floor(Math.random() * 1000)}`, change: `+${(Math.random() * 20).toFixed(1)}%`, changeType: "increase", icon: <ClipboardList/> },
    ]},
    { title: "Operations &amp; Logistics", kpis: [
        { title: "Inventory Turnover", value: `${(Math.random() * 10).toFixed(1)}`, change: `+${(Math.random() * 1).toFixed(1)}`, changeType: "increase", icon: <Package/> },
        { title: "On-time Delivery", value: `${(Math.random() * 10 + 90).toFixed(1)}%`, change: `+${(Math.random() * 1).toFixed(1)}%`, changeType: "increase", icon: <TrendingUp/> },
        { title: "Supplier Reliability", value: `${(Math.random() * 10 + 90).toFixed(1)}%`, change: `-${(Math.random() * 1).toFixed(1)}%`, changeType: "decrease", icon: <Building/> },
    ]},
    { title: "HR &amp; Employee Engagement", kpis: [
        { title: "Employee Turnover", value: `${(Math.random() * 15).toFixed(1)}%`, change: `-${(Math.random() * 2).toFixed(1)}%`, changeType: "decrease", icon: <Users2/> },
        { title: "Avg. Tenure", value: `${(Math.random() * 5).toFixed(1)} yrs`, change: `+${(Math.random() * 0.5).toFixed(1)}`, changeType: "increase", icon: <Users/> },
        { title: "eNPS Score", value: `${Math.floor(Math.random() * 100)}`, change: `+${Math.floor(Math.random() * 10)}`, changeType: "increase", icon: <Heart/> },
    ]},
];

for (let i = 3; i <= 20; i++) {
    const topicIndex = (i - 3) % diverseTopics.length;
    const topic = diverseTopics[topicIndex];
    dashboardData[`suggestion-${i}`] = {
        title: `${topic.title} #${Math.floor((i-3)/diverseTopics.length) + 1}`,
        kpis: topic.kpis.map(kpi => ({...kpi})), // Basic copy for now
        charts: dashboardData['suggestion-2'].charts, // Reuse marketing charts for simplicity
        data: dashboardData['suggestion-2'].data
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

  const currentDashboard = dashboardData[selectedOption] || dashboardData['suggestion-1'];

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
                                {kpi.icon}
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{kpi.value}</div>
                                <p className="text-xs text-muted-foreground flex items-center">
                                    <span className={`mr-1 ${kpi.changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
                                        {kpi.changeType === 'increase' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                                    </span>
                                    {kpi.change} vs last period
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                
                <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
                    {currentDashboard.charts.map((chart:any, index: number) => (
                        <Card key={index} className={`bg-card/60 backdrop-blur-sm ${chart.colSpan || ''}`}>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>{chart.title}</CardTitle>
                                {isCustomizeMode && (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-6 w-6">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>Convert numerics to graphs</DropdownMenuItem>
                                            <DropdownMenuItem>Change graph styles</DropdownMenuItem>
                                            <DropdownMenuItem>Convert graphs to numerics</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                )}
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={chart.height}>
                                    {chart.component(currentDashboard.data[chart.dataKey])}
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    ))}
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
                    <Button size="lg" variant={isCustomizeMode ? "default" : "secondary"} onClick={() => setIsCustomizeMode(!isCustomizeMode)}>
                        <Wrench className="mr-2" />
                        Customize
                    </Button>
                </div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-4">
                <Card className="bg-card/60 backdrop-blur-sm">
                    <CardContent className="p-4">
                        <div className="space-y-3">
                        {suggestions.map((suggestion) => (
                            <div key={suggestion.id} className="group">
                                <button
                                    onClick={() => setSelectedOption(suggestion.id)}
                                    className={`w-full text-left flex items-center justify-between p-3 rounded-lg bg-background/80 border transition-colors cursor-pointer ${selectedOption === suggestion.id ? 'bg-accent text-primary' : 'hover:bg-accent'}`}
                                >
                                    <span className="font-medium">{suggestion.text}</span>
                                    <span className={`font-bold bg-primary/10 px-2 py-1 rounded-md ${selectedOption === suggestion.id ? 'text-black' : 'text-primary group-hover:text-black'}`}>{suggestion.percentage}%</span>
                                </button>
                            </div>
                        ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}

    