
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
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

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

const topProductsData = [
  { name: 'Product A', value: 400 },
  { name: 'Product B', value: 300 },
  { name: 'Product C', value: 300 },
  { name: 'Product D', value: 200 },
];

const businessOverviewData = [
    { metric: "Total Sales", value: "₹1.2Cr" },
    { metric: "Avg. Sale", value: "₹8,540" },
    { metric: "Total Orders", value: "1,405" },
    { metric: "Returning Customers", value: "45%" },
]

const marketingOverviewData = [
    { channel: "Organic Search", visitors: "12.5k" },
    { channel: "Direct", visitors: "8.2k" },
    { channel: "Referral", visitors: "6.1k" },
    { channel: "Social Media", visitors: "4.5k" },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const suggestions = [
  { id: "suggestion-1", text: "Option 2", percentage: 98 },
  { id: "suggestion-2", text: "Option 3", percentage: 95 },
  { id: "suggestion-3", text: "Option 4", percentage: 93 },
  { id: "suggestion-4", text: "Option 5", percentage: 90 },
  { id: "suggestion-5", text: "", percentage: 88 },
  { id: "suggestion-6", text: "Option 20", percentage: 80 },
];

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
                KPI &amp; METRIC DASHBOARD
            </h1>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main content */}
            <div className="lg:col-span-3 space-y-8">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="bg-card/60 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle>Sales</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={150}>
                                <LineChart data={revenueData.slice(0, 4)}>
                                    <Tooltip />
                                    <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                    <Card className="bg-card/60 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle>Profit</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={150}>
                                <LineChart data={revenueData.slice(0, 4)}>
                                    <Tooltip />
                                    <Line type="monotone" dataKey="profit" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                    <Card className="bg-card/60 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle>Orders</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={150}>
                                <BarChart data={salesByRegionData}>
                                    <Tooltip />
                                    <Bar dataKey="sales" fill="hsl(var(--chart-4))" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                    <Card className="bg-card/60 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle>Returns</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={150}>
                                <LineChart data={revenueData.slice(0, 4)}>
                                    <Tooltip />
                                    <Line type="monotone" dataKey="profit" stroke="hsl(var(--chart-5))" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                    <Card className="bg-card/60 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle>Sales Trend</CardTitle>
                        </CardHeader>
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
                    <Card className="bg-card/60 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle>Business Overview</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableBody>
                                    {businessOverviewData.map((row) => (
                                        <TableRow key={row.metric}>
                                            <TableCell className="font-medium">{row.metric}</TableCell>
                                            <TableCell className="text-right">{row.value}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
                     <Card className="bg-card/60 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle>Top Sale Categories</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart>
                                <Pie data={topProductsData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                                    {topProductsData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                     <Card className="lg:col-span-2 bg-card/60 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle>Sales Growth Analysis</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <ResponsiveContainer width="100%" height={200}>
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
            
            {/* Sidebar */}
            <div className="space-y-4">
                <Card className="bg-card/60 backdrop-blur-sm">
                    <CardContent className="p-4">
                        <div className="space-y-3">
                        {suggestions.map((suggestion) => (
                            <Link href="#" key={suggestion.id} className="group">
                            <div className="flex items-center justify-between p-3 rounded-lg bg-background/80 border hover:bg-accent transition-colors cursor-pointer">
                                <span className="font-medium group-hover:text-accent-foreground">{suggestion.text}</span>
                                <span className="text-primary font-bold bg-primary/10 px-2 py-1 rounded-md group-hover:text-black">{suggestion.percentage}%</span>
                            </div>
                            </Link>
                        ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
