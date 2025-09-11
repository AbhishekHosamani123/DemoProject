
"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  Download,
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
  Radar,
  AreaChart,
  Area,
  FunnelChart,
  Funnel,
  LabelList,
  ComposedChart,
} from "recharts";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

const kpiIcons: Record<string, React.ReactNode> = {
  DollarSign: <DollarSign className="h-4 w-4 text-muted-foreground" />,
  TrendingUp: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
  Users: <Users className="h-4 w-4 text-muted-foreground" />,
  Target: <Target className="h-4 w-4 text-muted-foreground" />,
  Briefcase: <Briefcase className="h-4 w-4 text-muted-foreground" />,
};

const dashboardData = {
  title: "Sales Performance Dashboard",
  kpis: [
    { title: "Total Revenue", value: `₹45.2Cr`, change: `+12.1%`, changeType: "increase", iconName: "DollarSign" },
    { title: "Profit Margin", value: `24.5%`, change: `+2.3%`, changeType: "increase", iconName: "TrendingUp" },
    { title: "New Customers", value: "1,254", change: `+8.5%`, changeType: "increase", iconName: "Users" },
    { title: "Conversion Rate", value: `3.2%`, change: `+0.5%`, changeType: "increase", iconName: "Target" },
    { title: "Avg. Order Value", value: `₹15,230`, change: `-1.2%`, changeType: "decrease", iconName: "Briefcase" },
    { title: "Active Users", value: "22,500", change: `+5.1%`, changeType: "increase", iconName: "Users" },
  ],
  charts: {
    revenueOverTime: {
      title: "Revenue Trend",
      data: Array.from({ length: 7 }, (_, j) => ({ name: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"][j], Revenue: Math.floor(Math.random() * 3000) + 1000, Profit: Math.floor(Math.random() * 2000) + 500 })),
    },
    distributionByCategory: {
      title: "Regional Sales",
      data: Array.from({ length: 4 }, (_, j) => ({ name: ["North", "South", "East", "West"][j], Sales: Math.floor(Math.random() * 6000) + 1000 })),
    },
    sourceBreakdown: {
      title: "Lead Source Breakdown",
      data: [
        { name: 'Organic', value: 400, fill: 'hsl(var(--chart-1))' },
        { name: 'Paid Ads', value: 300, fill: 'hsl(var(--chart-2))' },
        { name: 'Direct', value: 300, fill: 'hsl(var(--chart-3))' },
        { name: 'Referral', value: 200, fill: 'hsl(var(--chart-4))' },
      ],
    },
    salesFunnel: {
      title: "Sales Conversion Funnel",
      data: [
        { value: 100, name: 'Leads', fill: 'hsl(var(--chart-1))' },
        { value: 80, name: 'Qualified', fill: 'hsl(var(--chart-2))' },
        { value: 50, name: 'Proposal', fill: 'hsl(var(--chart-3))' },
        { value: 40, name: 'Negotiation', fill: 'hsl(var(--chart-4))' },
        { value: 25, name: 'Closed Won', fill: 'hsl(var(--chart-5))' },
      ],
    },
    salesVsGoal: {
        title: "Sales vs. Goal",
        data: Array.from({ length: 6 }, (_, j) => ({ name: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"][j], Sales: Math.floor(Math.random() * 2000) + 1000, Goal: 2500 }))
    },
    capabilityAnalysis: {
      title: "Capability Analysis",
      data: [
        { subject: 'Marketing', A: 120, fullMark: 150 },
        { subject: 'Sales', A: 98, fullMark: 150 },
        { subject: 'Support', A: 86, fullMark: 150 },
        { subject: 'Dev', A: 99, fullMark: 150 },
        { subject: 'Finance', A: 85, fullMark: 150 },
        { subject: 'HR', A: 65, fullMark: 150 },
      ],
    },
  },
};


const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-card/90 border border-border rounded-lg shadow-lg text-sm">
        <p className="label text-primary font-bold">{label}</p>
        {payload.map((pld: any, index: number) => (
          <div key={index} className="flex justify-between gap-4" style={{ color: pld.stroke || pld.fill || pld.color }}>
            <span>{pld.name}:</span>
            <span className="font-bold">{pld.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const ChartCard = ({ title, children, description }: { title: string, children: React.ReactNode, description?: string }) => (
    <Card className="bg-card/60 backdrop-blur-sm h-full flex flex-col">
        <CardHeader>
            <div className="flex justify-between items-center">
                <CardTitle className="text-base font-semibold">{title}</CardTitle>
                <MoreVertical className="h-4 w-4 text-muted-foreground" />
            </div>
            {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent className="flex-1 flex flex-col justify-center items-center">
            {children}
        </CardContent>
    </Card>
)

export default function KpiMetricDashboardPage() {
  const router = useRouter();

  return (
    <div className="flex flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <aside className="w-56 pr-6">
        <Card className="bg-card/60 backdrop-blur-sm h-full">
            <CardHeader>
                <CardTitle>Options</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[calc(100vh-12rem)]">
                    <div className="space-y-2">
                    {Array.from({ length: 20 }, (_, i) => (
                        <Button
                            key={i}
                            variant="ghost"
                            className="w-full justify-start"
                        >
                            Option {i + 1}
                        </Button>
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
            <h1 className="text-2xl font-bold tracking-tight text-center">
                {dashboardData.title}
            </h1>
            <div className="flex justify-start gap-4">
                <Button size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                </Button>
                <Button size="sm" variant="secondary">
                    <Video className="mr-2 h-4 w-4" />
                    Generate Video
                </Button>
            </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {dashboardData.kpis.map((kpi: any) => (
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
        
        <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-8">
                <ChartCard title={dashboardData.charts.revenueOverTime.title}>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={dashboardData.charts.revenueOverTime.data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                             <defs>
                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.2)" />
                            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value/1000}k`} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend iconType="circle"/>
                            <Area type="monotone" dataKey="Revenue" stroke="hsl(var(--chart-1))" strokeWidth={2} fill="url(#colorRevenue)" />
                            <Area type="monotone" dataKey="Profit" stroke="hsl(var(--chart-2))" strokeWidth={2} fill="url(#colorProfit)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>
            <div className="col-span-12 lg:col-span-4">
                <ChartCard title={dashboardData.charts.distributionByCategory.title}>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={dashboardData.charts.distributionByCategory.data} layout="vertical" margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                             <defs>
                                <linearGradient id="colorSales" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0.2}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.2)" horizontal={false} />
                            <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value/1000}k`} />
                            <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip content={<CustomTooltip />} cursor={{fill: 'hsl(var(--accent) / 0.1)'}}/>
                            <Bar dataKey="Sales" fill="url(#colorSales)" radius={[0, 4, 4, 0]} barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>
             <div className="col-span-12 md:col-span-6 lg:col-span-4">
                <ChartCard title={dashboardData.charts.sourceBreakdown.title}>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend layout="horizontal" verticalAlign="bottom" align="center" iconType="circle" />
                            <Pie data={dashboardData.charts.sourceBreakdown.data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={90} stroke="hsl(var(--background))" strokeWidth={2} labelLine={false} label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                                const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                                const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
                                const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
                                return (
                                <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={12}>
                                    {`${(percent * 100).toFixed(0)}%`}
                                </text>
                                );
                            }}>
                                {dashboardData.charts.sourceBreakdown.data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
                <ChartCard title={dashboardData.charts.salesVsGoal.title}>
                     <ResponsiveContainer width="100%" height={300}>
                        <ComposedChart data={dashboardData.charts.salesVsGoal.data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.2)" />
                            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value/1000}k`} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Bar dataKey="Sales" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} barSize={30}/>
                            <Line type="monotone" dataKey="Goal" stroke="hsl(var(--chart-4))" strokeWidth={2} dot={false} />
                        </ComposedChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>
             <div className="col-span-12 md:col-span-6 lg:col-span-4">
                <ChartCard title={dashboardData.charts.capabilityAnalysis.title}>
                    <ResponsiveContainer width="100%" height={300}>
                        <RadarChart data={dashboardData.charts.capabilityAnalysis.data} cx="50%" cy="50%" outerRadius="80%">
                            <PolarGrid stroke="hsl(var(--border) / 0.2)" />
                            <PolarAngleAxis dataKey="subject" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                            <Tooltip content={<CustomTooltip />} />
                            <Radar name="Performance" dataKey="A" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" fillOpacity={0.6} />
                        </RadarChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>
             <div className="col-span-12 md:col-span-6 lg:col-span-4">
                 <ChartCard title={dashboardData.charts.salesFunnel.title}>
                    <ResponsiveContainer width="100%" height={300}>
                       <FunnelChart>
                            <Tooltip content={<CustomTooltip />}/>
                            <Funnel
                                dataKey="value"
                                data={dashboardData.charts.salesFunnel.data}
                                isAnimationActive
                            >
                                <LabelList position="right" fill="hsl(var(--foreground))" stroke="none" dataKey="name" />
                            </Funnel>
                        </FunnelChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>
        </div>
      </main>
    </div>
  );
}
