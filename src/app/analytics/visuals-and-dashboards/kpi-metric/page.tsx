
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
  TrendingUp,
  Users,
  Briefcase,
  Target,
  DollarSign,
  ArrowUp,
  ArrowDown,
  Video,
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
} from "recharts";
import { cn } from "@/lib/utils";

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
    charts: [
        { 
            title: "Metric Over Time", 
            type: "line", 
            data: Array.from({ length: 7 }, (_, j) => ({ name: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"][j], value: Math.floor(Math.random() * 3000) + 1000, pv: Math.floor(Math.random() * 2000) + 1000 })) 
        },
        { 
            title: "Distribution by Category", 
            type: "bar", 
            data: Array.from({ length: 4 }, (_, j) => ({ name: ["North", "South", "East", "West"][j], value: Math.floor(Math.random() * 6000) + 1000 })) 
        },
        { 
            title: "Source Breakdown", 
            type: "pie", 
            data: [
                { name: 'Organic', value: 400 },
                { name: 'Paid', value: 300 },
                { name: 'Direct', value: 300 },
                { name: 'Referral', value: 200 },
            ] 
        },
        { 
            title: "Secondary Distribution", 
            type: "bar", 
            data: Array.from({ length: 5 }, (_, j) => ({ name: ["A", "B", "C", "D", "E"][j], value: Math.floor(Math.random() * 2400) + 600 })) 
        },
         { 
            title: "Performance Metrics", 
            type: "stacked-bar", 
            data: Array.from({ length: 6 }, (_, j) => ({ name: `Metric ${j+1}`, teamA: Math.floor(Math.random() * 2000) + 500, teamB: Math.floor(Math.random() * 2000) + 500 })) 
        },
        {
            title: "Capability Analysis",
            type: "radar",
            data: [
                { subject: 'Marketing', A: 120, fullMark: 150 },
                { subject: 'Sales', A: 98, fullMark: 150 },
                { subject: 'Support', A: 86, fullMark: 150 },
                { subject: 'Dev', A: 99, fullMark: 150 },
                { subject: 'Finance', A: 85, fullMark: 150 },
                { subject: 'HR', A: 65, fullMark: 150 },
            ]
        }
    ]
};

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-2 bg-card/90 border border-border rounded-lg shadow-lg">
                <p className="label text-primary font-bold">{label || payload[0].name}</p>
                {payload.map((pld: any, index: number) => (
                    <p key={index} style={{ color: pld.fill || pld.stroke }}>
                        {`${pld.name || pld.dataKey}: ${pld.value.toLocaleString()}`}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

export default function KpiMetricDashboardPage() {
  const router = useRouter();
  
  const allCharts = dashboardData.charts;

  return (
    <div className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <main className="flex-1 space-y-8">
        <Button onClick={() => router.back()} variant="outline">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight inline-block border rounded-lg px-6 py-3 bg-card/60 backdrop-blur-sm">
            {dashboardData.title}
          </h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
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
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-3 bg-card/60 backdrop-blur-sm p-4">
                <CardHeader>
                    <CardTitle>{allCharts[0].title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={allCharts[0].data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.2)" />
                            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend iconType="plainline"/>
                            <Line type="monotone" dataKey="value" name="Current" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} />
                            <Line type="monotone" dataKey="pv" name="Previous" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
            <Card className="bg-card/60 backdrop-blur-sm p-4">
                <CardHeader>
                    <CardTitle>{allCharts[1].title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={allCharts[1].data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.2)" />
                            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="value" name="Value" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} barSize={30}/>
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
            <Card className="bg-card/60 backdrop-blur-sm p-4">
                 <CardHeader>
                    <CardTitle>{allCharts[2].title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend layout="horizontal" verticalAlign="bottom" align="center" iconType="circle" />
                            <Pie data={allCharts[2].data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} stroke="hsl(var(--background))" strokeWidth={2} labelLine={false} label={false}>
                                {(allCharts[2].data as any[]).map((_: any, index: number) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
            <Card className="bg-card/60 backdrop-blur-sm p-4">
                 <CardHeader>
                    <CardTitle>{allCharts[3].title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={allCharts[3].data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.2)" />
                            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="value" name="Value" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]}/>
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card/60 backdrop-blur-sm p-4">
                 <CardHeader>
                    <CardTitle>{allCharts[4].title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={allCharts[4].data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.2)" />
                            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Bar dataKey="teamA" name="Team A" stackId="a" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]}/>
                            <Bar dataKey="teamB" name="Team B" stackId="a" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]}/>
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
            <Card className="bg-card/60 backdrop-blur-sm p-4">
                 <CardHeader>
                    <CardTitle>{allCharts[5].title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <RadarChart data={allCharts[5].data} cx="50%" cy="50%" outerRadius="80%">
                            <PolarGrid />
                            <PolarAngleAxis dataKey="subject" />
                            <Tooltip content={<CustomTooltip />} />
                            <Radar name="Performance" dataKey="A" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" fillOpacity={0.6} />
                        </RadarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
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
        </div>
      </main>
    </div>
  );
}

    