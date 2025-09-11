
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
} from "lucide-react";
import { useRouter } from "next/navigation";
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

const ChartCard = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <Card className="bg-card/60 backdrop-blur-sm h-full flex flex-col border-primary/20 shadow-lg shadow-black/20">
        <CardHeader className="flex flex-row items-center justify-between py-4 px-6">
            <CardTitle className="text-base font-semibold text-primary">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col justify-center items-center p-2">
            {children}
        </CardContent>
    </Card>
)

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

export default function KpiMetricDashboardPage() {
  const router = useRouter();

  return (
    <div className="flex flex-1 flex-col h-screen overflow-hidden">
        <div className="flex-1 flex overflow-hidden p-4 sm:p-6 lg:p-8">
            <main className="flex-1 overflow-y-auto pr-6 space-y-6">
                <div className="space-y-4">
                    <Button
                        onClick={() => router.back()}
                        variant="outline"
                        className="max-w-min"
                        >
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back
                    </Button>
                     <div className="text-left">
                        <h1 className="text-3xl font-bold tracking-tight text-primary">Sales Performance Dashboard</h1>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {kpiData.map(kpi => <KpiCard key={kpi.title} {...kpi} />)}
                </div>
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 lg:col-span-7">
                       <ChartCard title="Revenue Trend">
                            <ResponsiveContainer width="100%" height={250}>
                                <AreaChart data={revenueData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                     <defs>
                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.2)" vertical={false}/>
                                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Area type="monotone" dataKey="revenue" stroke="hsl(var(--chart-1))" fillOpacity={1} fill="url(#colorRevenue)" />
                                </AreaChart>
                            </ResponsiveContainer>
                       </ChartCard>
                    </div>
                    <div className="col-span-12 lg:col-span-5">
                         <ChartCard title="Sales by Region">
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Tooltip content={<CustomTooltip />} />
                                    <Pie data={regionData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                                        {regionData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </ChartCard>
                    </div>
                    <div className="col-span-12 lg:col-span-4">
                        <ChartCard title="Monthly Sales vs Goal">
                            <ResponsiveContainer width="100%" height={250}>
                                <ComposedChart data={salesData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.2)" vertical={false}/>
                                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip content={<CustomTooltip />} cursor={{fill: 'hsl(var(--accent) / 0.1)'}}/>
                                    <Legend />
                                    <Bar dataKey="sales" name="Sales" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                                    <Line type="monotone" dataKey="goal" name="Goal" stroke="hsl(var(--chart-1))" strokeWidth={2} />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </ChartCard>
                    </div>
                     <div className="col-span-12 lg:col-span-4">
                        <ChartCard title="Sales Conversion Funnel">
                             <ResponsiveContainer width="100%" height={250}>
                                <FunnelChart>
                                    <Tooltip content={<CustomTooltip />} />
                                    <Funnel
                                        dataKey="value"
                                        data={funnelData}
                                        isAnimationActive
                                    >
                                        <LabelList position="right" fill="hsl(var(--foreground))" dataKey="name" />
                                    </Funnel>
                                </FunnelChart>
                            </ResponsiveContainer>
                        </ChartCard>
                    </div>
                    <div className="col-span-12 lg:col-span-4">
                        <ChartCard title="Quarterly Performance">
                            <ResponsiveContainer width="100%" height={250}>
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={quarterlyPerformanceData}>
                                    <PolarGrid stroke="hsl(var(--border) / 0.2)" />
                                    <PolarAngleAxis dataKey="subject" />
                                    <PolarRadiusAxis />
                                    <Radar name="Product A" dataKey="A" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" fillOpacity={0.6} />
                                    <Radar name="Product B" dataKey="B" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" fillOpacity={0.6} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend />
                                </RadarChart>
                            </ResponsiveContainer>
                        </ChartCard>
                    </div>
                </div>
                <div className="flex justify-start gap-4 mt-8 pb-8">
                    <Button size="lg" variant="primary">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                    </Button>
                    <Button size="lg" variant="secondary">
                        <Video className="mr-2 h-4 w-4" />
                        Generate Video
                    </Button>
                     <Button size="lg" variant="secondary">
                        <Wrench className="mr-2 h-4 w-4" />
                        Customize
                    </Button>
                </div>
            </main>
            <aside className="w-64 py-6 bg-transparent border-l-0 overflow-y-auto">
                 <Card className="bg-card/60 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-lg text-primary text-center">OPTIONS</CardTitle>
                    </CardHeader>
                    <CardContent className="p-2">
                        <div className="space-y-2">
                            {Array.from({ length: 20 }, (_, i) => (
                                 <Card
                                    key={i + 1}
                                    className="bg-background/80 border border-transparent hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer group"
                                >
                                    <CardContent className="p-3">
                                        <span className="font-medium text-foreground group-hover:text-accent-foreground">Option {i + 1}</span>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </aside>
        </div>
    </div>
  );
}

    