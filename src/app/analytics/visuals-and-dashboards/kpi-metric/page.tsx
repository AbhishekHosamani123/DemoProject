
"use client";

import {
  Card,
  CardContent,
  CardDescription,
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
} from "recharts";

const kpiData = [
  { title: "Total Revenue", value: "₹45.2Cr", change: "+12.5%", changeType: "increase", icon: <DollarSign className="h-4 w-4 text-muted-foreground" /> },
  { title: "Profit Margin", value: "24.5%", change: "+2.1%", changeType: "increase", icon: <TrendingUp className="h-4 w-4 text-muted-foreground" /> },
  { title: "New Customers", value: "1,250", change: "+15.3%", changeType: "increase", icon: <Users className="h-4 w-4 text-muted-foreground" /> },
  { title: "Conversion Rate", value: "3.5%", change: "+0.8%", changeType: "increase", icon: <Target className="h-4 w-4 text-muted-foreground" /> },
  { title: "Customer Acquisition Cost", value: "₹2,500", change: "-5.2%", changeType: "decrease", icon: <DollarSign className="h-4 w-4 text-muted-foreground" /> },
  { title: "Customer Lifetime Value", value: "₹15,800", change: "+8.9%", changeType: "increase", icon: <Briefcase className="h-4 w-4 text-muted-foreground" /> },
];

const revenueData = [
  { month: "Jan", revenue: 4000, profit: 2400 },
  { month: "Feb", revenue: 3000, profit: 1398 },
  { month: "Mar", revenue: 2000, profit: 9800 },
  { month: "Apr", revenue: 2780, profit: 3908 },
  { month: "May", revenue: 1890, profit: 4800 },
  { month: "Jun", revenue: 2390, profit: 3800 },
  { month: "Jul", revenue: 3490, profit: 4300 },
];

const salesByRegionData = [
  { region: "North", sales: 4000 },
  { region: "South", sales: 3000 },
  { region: "East", sales: 2000 },
  { region: "West", sales: 2780 },
];

export default function KpiMetricDashboardPage() {
  const router = useRouter();

  return (
    <div className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          KPIs & Metric Dashboard
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          An overview of your key business metrics and performance.
        </p>
      </div>

      <div className="mb-8">
        <Button onClick={() => router.back()} variant="outline">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 mb-8">
        {kpiData.map((kpi) => (
          <Card key={kpi.title} className="bg-card/60 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              {kpi.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className={`text-xs flex items-center ${kpi.changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
                {kpi.changeType === 'increase' ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                {kpi.change} vs last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 mb-8">
        <Card className="bg-card/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Revenue vs. Profit</CardTitle>
            <CardDescription>Monthly financial performance.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} />
                <Line type="monotone" dataKey="profit" stroke="hsl(var(--chart-2))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="bg-card/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Sales by Region</CardTitle>
            <CardDescription>Regional sales distribution.</CardDescription>
          CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesByRegionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-end gap-4 mt-auto">
        <Button size="lg">
          <Download className="mr-2" />
          Download
        </Button>
        <Button size="lg" variant="secondary">
          <Wrench className="mr-2" />
          Customize
        </Button>
      </div>
    </div>
  );
}
