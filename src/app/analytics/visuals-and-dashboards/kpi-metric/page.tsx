
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
} from "recharts";
import { cn } from "@/lib/utils";

const kpiData = [
  { title: "Total Revenue", value: "₹45.2Cr", change: "+12.5%", changeType: "increase", icon: <DollarSign className="h-4 w-4 text-muted-foreground" /> },
  { title: "Profit Margin", value: "24.5%", change: "+2.1%", changeType: "increase", icon: <TrendingUp className="h-4 w-4 text-muted-foreground" /> },
  { title: "New Customers", value: "1,250", change: "+15.3%", changeType: "increase", icon: <Users className="h-4 w-4 text-muted-foreground" /> },
  { title: "Conversion Rate", value: "3.5%", change: "+0.8%", changeType: "increase", icon: <Target className="h-4 w-4 text-muted-foreground" /> },
  { title: "Customer Acquisition Cost", value: "₹2,500", change: "-5.2%", changeType: "decrease", icon: <DollarSign className="h-4 w-4 text-muted-foreground" /> },
  { title: "Customer Lifetime Value", value: "₹15,800", change: "+8.9%", changeType: "increase", icon: <Briefcase className="h-4 w-4 text-muted-foreground" /> },
];

const revenueData = [
  { name: "Jan", revenue: 4000, profit: 2400 }, { name: "Feb", revenue: 3000, profit: 1398 }, { name: "Mar", revenue: 2000, profit: 9800 }, { name: "Apr", revenue: 2780, profit: 3908 }, { name: "May", revenue: 1890, profit: 4800 }, { name: "Jun", revenue: 2390, profit: 3800 }, { name: "Jul", revenue: 3490, profit: 4300 },
];

const salesByRegionData = [
  { name: "North", value: 4000 }, { name: "South", value: 3000 }, { name: "East", value: 2000 }, { name: "West", value: 2780 },
];

const topProductsData = [
  { name: 'Product A', value: 400 }, { name: 'Product B', value: 300 }, { name: 'Product C', value: 300 }, { name: 'Product D', value: 200 },
];

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

export default function KpiMetricDashboardPage() {
  const router = useRouter();

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
                Sales Performance Dashboard
            </h1>
        </div>
        
        <div className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {kpiData.map((kpi: any) => (
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
                <Card className="bg-card/60 backdrop-blur-sm lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Sales Growth Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                             <LineChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.2)" />
                                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                                <YAxis stroke="hsl(var(--muted-foreground))" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'hsl(var(--background) / 0.9)',
                                        borderColor: 'hsl(var(--border) / 0.5)',
                                    }}
                                />
                                <Legend />
                                <Line type="monotone" dataKey="revenue" stroke="hsl(var(--chart-1))" strokeWidth={2} />
                                <Line type="monotone" dataKey="profit" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                 <Card className="bg-card/60 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>Sales By Region</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RechartsBarChart data={salesByRegionData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.2)" />
                                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                                <YAxis stroke="hsl(var(--muted-foreground))" />
                                 <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'hsl(var(--background) / 0.9)',
                                        borderColor: 'hsl(var(--border) / 0.5)',
                                    }}
                                />
                                <Bar dataKey="value" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                            </RechartsBarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card className="bg-card/60 backdrop-blur-sm lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Top Sale Categories</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[150px]">
                        <ResponsiveContainer width="100%" height="100%">
                             <PieChart>
                                <Pie data={topProductsData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} stroke="hsl(var(--background))" strokeWidth={2} label>
                                    {topProductsData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'hsl(var(--background) / 0.9)',
                                        borderColor: 'hsl(var(--border) / 0.5)',
                                    }}
                                />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
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
                <Button size="lg" variant="secondary">
                    <Wrench className="mr-2" />
                    Customize
                </Button>
            </div>
        </div>
    </div>
  );
}

    