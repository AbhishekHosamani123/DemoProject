
"use client";

import { useState, useEffect } from "react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const defaultKpiData = [
  { title: "Total Revenue", value: "₹45.2Cr", change: "+12.5%", changeType: "increase", icon: <DollarSign className="h-4 w-4 text-muted-foreground" /> },
  { title: "Profit Margin", value: "24.5%", change: "+2.1%", changeType: "increase", icon: <TrendingUp className="h-4 w-4 text-muted-foreground" /> },
  { title: "New Customers", value: "1,250", change: "+15.3%", changeType: "increase", icon: <Users className="h-4 w-4 text-muted-foreground" /> },
  { title: "Conversion Rate", value: "3.5%", change: "+0.8%", changeType: "increase", icon: <Target className="h-4 w-4 text-muted-foreground" /> },
  { title: "Customer Acquisition Cost", value: "₹2,500", change: "-5.2%", changeType: "decrease", icon: <DollarSign className="h-4 w-4 text-muted-foreground" /> },
  { title: "Customer Lifetime Value", value: "₹15,800", change: "+8.9%", changeType: "increase", icon: <Briefcase className="h-4 w-4 text-muted-foreground" /> },
];

const chartComponents: Record<string, React.FC<any>> = {
  bar: (props) => (
    <BarChart {...props}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="hsl(var(--primary))" />
       <Bar dataKey="impressions" fill="hsl(var(--chart-2))" name="Impressions (k)" />
      <Bar dataKey="conversions" fill="hsl(var(--primary))" name="Conversions" />
      <Bar dataKey="sales" fill="hsl(var(--primary))" />
    </BarChart>
  ),
  line: (props) => (
    <LineChart {...props}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" />
      <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} />
      <Line type="monotone" dataKey="profit" stroke="hsl(var(--chart-2))" strokeWidth={2} />
      <Line type="monotone" dataKey="volume" stroke="hsl(var(--chart-4))" strokeWidth={2} />
    </LineChart>
  ),
  pie: ({data}) => {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
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
  area: (props) => (
    <AreaChart {...props}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
    </AreaChart>
  ),
  table: ({ data }) => (
    <ScrollArea className="h-full">
      <Table>
          <TableHeader>
              <TableRow>
                  {Object.keys(data[0] || {}).map(key => <TableHead key={key}>{key}</TableHead>)}
              </TableRow>
          </TableHeader>
          <TableBody>
              {data.map((row:any, index: number) => (
                  <TableRow key={index}>
                      {Object.values(row).map((val: any, i: number) => <TableCell key={i}>{val}</TableCell>)}
                  </TableRow>
              ))}
          </TableBody>
      </Table>
    </ScrollArea>
  )
};

const dashboardData: Record<string, any> = {
    'suggestion-1': {
        title: 'Sales Performance Dashboard',
        kpis: defaultKpiData,
        charts: [
            { 
                type: 'bar',
                originalType: 'bar',
                title: 'Sales Trend',
                dataKey: 'salesByRegionData',
                height: 250,
                colSpan: 'lg:col-span-1',
            },
            {
                type: 'table',
                originalType: 'table',
                title: 'Business Overview',
                dataKey: 'businessOverviewData',
                colSpan: 'lg:col-span-1',
            },
            { 
                type: 'pie',
                originalType: 'pie',
                title: 'Top Sale Categories',
                dataKey: 'topProductsData',
                height: 150,
                colSpan: 'lg:col-span-1',
            },
            { 
                type: 'line',
                originalType: 'line',
                title: 'Sales Growth Analysis',
                dataKey: 'revenueData',
                height: 150,
                colSpan: 'lg:col-span-2',
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
                originalType: 'bar',
                title: 'Campaign Performance',
                dataKey: 'campaignData',
                height: 250,
                colSpan: 'lg:col-span-2',
            },
            {
                type: 'pie',
                originalType: 'pie',
                title: 'Traffic Sources',
                dataKey: 'trafficData',
                colSpan: 'lg:col-span-1',
                height: 250,
            },
             { 
                type: 'line',
                originalType: 'line',
                title: 'SEO Keyword Funnel',
                dataKey: 'seoData',
                height: 150,
                colSpan: 'lg:col-span-3',
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
                { name: 'Awareness', value: Math.random() * 20000 },
                { name: 'Consideration', value: Math.random() * 10000 },
                { name: 'Conversion', value: Math.random() * 5000 },
                { name: 'Loyalty', value: Math.random() * 2500 },
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
    { title: "Operations & Logistics", kpis: [
        { title: "Inventory Turnover", value: `${(Math.random() * 10).toFixed(1)}`, change: `+${(Math.random() * 1).toFixed(1)}`, changeType: "increase", icon: <Package/> },
        { title: "On-time Delivery", value: `${(Math.random() * 10 + 90).toFixed(1)}%`, change: `+${(Math.random() * 1).toFixed(1)}%`, changeType: "increase", icon: <TrendingUp/> },
        { title: "Supplier Reliability", value: `${(Math.random() * 10 + 90).toFixed(1)}%`, change: `-${(Math.random() * 1).toFixed(1)}%`, changeType: "decrease", icon: <Building/> },
    ]},
    { title: "HR & Employee Engagement", kpis: [
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
        charts: dashboardData['suggestion-2'].charts.map(c => ({...c})), // copy
        data: dashboardData['suggestion-2'].data
    };
}

const suggestions = Array.from({ length: 20 }, (_, i) => ({
    id: `suggestion-${i + 1}`,
    text: `Option ${i + 1}`,
    percentage: 98 - i,
}));

const chartCycle: (keyof typeof chartComponents)[] = ['bar', 'line', 'area', 'pie'];

import { ScrollArea } from "@/components/ui/scroll-area";

export default function KpiMetricDashboardPage() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState('suggestion-1');
  const [isCustomizeMode, setIsCustomizeMode] = useState(false);
  const [dynamicDashboard, setDynamicDashboard] = useState<any>(dashboardData[selectedOption]);

  useEffect(() => {
    // Deep copy to prevent state mutation issues
    setDynamicDashboard(JSON.parse(JSON.stringify(dashboardData[selectedOption])));
  }, [selectedOption]);

  const handleChartTypeChange = (chartIndex: number) => {
    setDynamicDashboard((prev: any) => {
      const newDashboard = JSON.parse(JSON.stringify(prev));
      const chart = newDashboard.charts[chartIndex];
      if (chart.type === 'table' || chart.type === 'pie') return prev; // Don't cycle table or pie for now

      const currentCycleIndex = chartCycle.indexOf(chart.type);
      const nextCycleIndex = (currentCycleIndex + 1) % chartCycle.length;
      chart.type = chartCycle[nextCycleIndex];
      return newDashboard;
    });
  };

  const handleConvertToNumeric = (chartIndex: number) => {
     setDynamicDashboard((prev: any) => {
      const newDashboard = JSON.parse(JSON.stringify(prev));
      const chart = newDashboard.charts[chartIndex];
      if (chart.type !== 'table') {
        chart.type = 'table';
      }
      return newDashboard;
    });
  };

  const handleConvertToGraph = (chartIndex: number) => {
     setDynamicDashboard((prev: any) => {
      const newDashboard = JSON.parse(JSON.stringify(prev));
      const chart = newDashboard.charts[chartIndex];
      if (chart.type === 'table') {
        chart.type = chart.originalType;
      }
      return newDashboard;
    });
  };
  
  if (!dynamicDashboard) {
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
                {dynamicDashboard.title}
            </h1>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main content */}
            <div className="lg:col-span-3 space-y-8">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {dynamicDashboard.kpis.map((kpi: any) => (
                        <Card key={kpi.title} className="bg-card/60 backdrop-blur-sm">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                                {kpi.icon}
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
                    {dynamicDashboard.charts.map((chart:any, index: number) => {
                        const ChartComponent = chartComponents[chart.type] || (() => <div>Unsupported chart type</div>);
                        const chartData = dynamicDashboard.data[chart.dataKey];
                        const isTable = chart.type === 'table';
                        const heightClass = isTable ? "h-[300px]" : `h-[${chart.height}px]`;
                        return (
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
                                            <DropdownMenuItem onSelect={() => handleConvertToGraph(index)} disabled={!isTable}>
                                                Convert to Graph
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onSelect={() => handleChartTypeChange(index)} disabled={isTable}>
                                                Change Graph Style
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onSelect={() => handleConvertToNumeric(index)} disabled={isTable}>
                                                Convert to Numerics
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                )}
                            </CardHeader>
                            <CardContent className={heightClass}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <ChartComponent data={chartData} />
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
                    <Button size="lg" variant={isCustomizeMode ? "default" : "secondary"} onClick={() => setIsCustomizeMode(!isCustomizeMode)}>
                        <Wrench className="mr-2" />
                        {isCustomizeMode ? "Finish Customizing" : "Customize"}
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
                                    className={`w-full text-left flex items-center justify-between p-3 rounded-lg bg-background/80 border transition-colors cursor-pointer ${selectedOption === suggestion.id ? 'bg-accent text-accent-foreground' : 'hover:bg-accent'}`}
                                >
                                    <span className="font-medium">{suggestion.text}</span>
                                    <span className={`font-bold bg-primary/10 px-2 py-1 rounded-md ${selectedOption === suggestion.id ? 'text-primary-foreground bg-primary' : 'text-primary group-hover:text-primary-foreground group-hover:bg-primary'}`}>{suggestion.percentage}%</span>
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

    

    