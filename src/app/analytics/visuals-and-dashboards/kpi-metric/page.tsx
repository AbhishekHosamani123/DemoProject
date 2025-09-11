
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
  MoreVertical,
  Wrench,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart,
} from "recharts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


const distributionData = [
  { name: "North", value: 3200 },
  { name: "South", value: 2200 },
  { name: "East", value: 3400 },
  { name: "West", value: 2500 },
];

const secondaryDistributionData = [
    { name: "A", value: 1900 },
    { name: "B", value: 2100 },
    { name: "C", value: 1500 },
    { name: "D", value: 2400 },
    { name: "E", value: 1300 },
];

const performanceData = [
  { name: 'Metric 1', teamA: 1000, teamB: 2400 },
  { name: 'Metric 2', teamA: 2200, teamB: 1398 },
  { name: 'Metric 3', teamA: 900, teamB: 2800 },
  { name: 'Metric 4', teamA: 2100, teamB: 1908 },
  { name: 'Metric 5', teamA: 1200, teamB: 2800 },
  { name: 'Metric 6', teamA: 1400, teamB: 2300 },
];

const capabilityData = [
  { subject: 'Marketing', A: 120, fullMark: 150 },
  { subject: 'Sales', A: 98, fullMark: 150 },
  { subject: 'Support', A: 86, fullMark: 150 },
  { subject: 'Development', A: 99, fullMark: 150 },
  { subject: 'Finance', A: 85, fullMark: 150 },
  { subject: 'HR', A: 65, fullMark: 150 },
];

const sourceData = [
    { name: 'Organic', value: 250 },
    { name: 'Paid', value: 210 },
    { name: 'Direct', value: 234 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-card/90 border border-border rounded-lg shadow-lg text-sm">
        <p className="label text-primary font-bold">{label}</p>
        {payload.map((pld: any, index: number) => (
          <div key={index} className="flex justify-between gap-4" style={{ color: pld.fill }}>
            <span>{pld.name}:</span>
            <span className="font-bold">{pld.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const ChartCard = ({ title, children, showMenu = true, menuContent }: { title: string, children: React.ReactNode, showMenu?: boolean, menuContent?: React.ReactNode }) => (
    <Card className="bg-card/60 backdrop-blur-sm h-full flex flex-col border-primary/20">
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold text-primary">{title}</CardTitle>
            {showMenu && (
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    {menuContent && <DropdownMenuContent align="end">{menuContent}</DropdownMenuContent>}
                </DropdownMenu>
            )}
        </CardHeader>
        <CardContent className="flex-1 flex flex-col justify-center items-center p-2">
            {children}
        </CardContent>
    </Card>
)

export default function KpiMetricDashboardPage() {
  const router = useRouter();

  const performanceMenu = (
    <>
        <DropdownMenuItem>Change to numerical</DropdownMenuItem>
        <DropdownMenuItem>Change chart style</DropdownMenuItem>
    </>
  )

  return (
    <div className="flex flex-1 flex-col container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
            <div className="md:col-span-1">
                <ChartCard title="Distribution by Category">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={distributionData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.2)" vertical={false}/>
                            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} domain={[0, 3400]}/>
                            <Tooltip content={<CustomTooltip />} cursor={{fill: 'hsl(var(--accent) / 0.1)'}}/>
                            <Bar dataKey="value" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} barSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>
             <div className="md:col-span-1">
                <ChartCard title="Source Breakdown">
                     <Table>
                        <TableHeader>
                            <TableRow className="border-b-primary/30">
                                <TableHead className="text-primary">name</TableHead>
                                <TableHead className="text-right text-primary">value</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sourceData.map((row) => (
                                <TableRow key={row.name} className="border-b-primary/10">
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell className="text-right">{row.value}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </ChartCard>
            </div>
            <div className="md:col-span-1">
                <ChartCard title="Secondary Distribution">
                    <ResponsiveContainer width="100%" height={300}>
                         <BarChart data={secondaryDistributionData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.2)" vertical={false}/>
                            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} domain={[0, 2400]}/>
                            <Tooltip content={<CustomTooltip />} cursor={{fill: 'hsl(var(--accent) / 0.1)'}}/>
                            <Bar dataKey="value" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} barSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>
             <div className="md:col-span-2">
                <ChartCard title="Performance Metrics" menuContent={performanceMenu}>
                     <ResponsiveContainer width="100%" height={300}>
                        <ComposedChart data={performanceData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.2)" vertical={false}/>
                            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} domain={[0, 3800]}/>
                            <Tooltip content={<CustomTooltip />}/>
                             <Legend />
                            <Bar dataKey="teamA" barSize={30} stackId="a" fill="hsl(var(--chart-1))" />
                            <Bar dataKey="teamB" barSize={30} stackId="a" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                        </ComposedChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>
            <div className="md:col-span-1">
                <ChartCard title="Capability Analysis">
                    <ResponsiveContainer width="100%" height={300}>
                        <RadarChart data={capabilityData} cx="50%" cy="50%" outerRadius="80%">
                            <PolarGrid stroke="hsl(var(--border) / 0.2)" />
                            <PolarAngleAxis dataKey="subject" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                            <PolarRadiusAxis angle={30} domain={[0, 150]} stroke="hsl(var(--muted-foreground))" fontSize={10} axisLine={false} tick={false} />
                            <Radar name="Performance" dataKey="A" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" fillOpacity={0.6} />
                        </RadarChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>
        </div>
        <div className="flex justify-start gap-4 mt-8">
            <Button size="lg">
                <Download className="mr-2 h-4 w-4" />
                Download
            </Button>
            <Button size="lg" variant="secondary">
                <Video className="mr-2 h-4 w-4" />
                Generate Video
            </Button>
            <Button size="lg" variant="default">
                <Wrench className="mr-2 h-4 w-4" />
                Done
            </Button>
        </div>
    </div>
  );
}

    