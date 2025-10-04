
"use client";

import { useState, useMemo } from "react";
import {
  BarChart,
  LineChart,
  PieChart,
  Bar,
  Line,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";

type ParsedData = Record<string, any>[];

interface ChartGeneratorProps {
  data: ParsedData;
  headers: string[];
}

const CHART_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-card/90 border border-border rounded-lg shadow-lg">
        <p className="label text-primary font-bold">{`${label}`}</p>
        {payload.map((pld: any, index: number) => (
           <p key={index} style={{ color: pld.fill }}>{`${pld.name}: ${pld.value}`}</p>
        ))}
      </div>
    );
  }
  return null;
};

export function ChartGenerator({ data, headers }: ChartGeneratorProps) {
  const [barX, setBarX] = useState<string>("");
  const [barY, setBarY] = useState<string>("");
  const [lineX, setLineX] = useState<string>("");
  const [lineY, setLineY] = useState<string>("");
  const [pieName, setPieName] = useState<string>("");
  const [pieValue, setPieValue] = useState<string>("");

  const numericHeaders = useMemo(() => {
    if (data.length === 0) return [];
    return headers.filter((header) =>
      data.every((row) => !isNaN(parseFloat(row[header])))
    );
  }, [data, headers]);

  const categoricalHeaders = useMemo(() => {
    return headers.filter((header) => !numericHeaders.includes(header));
  }, [headers, numericHeaders]);

  const transformedData = useMemo(() => {
    return data.map((row) => {
      const newRow = { ...row };
      numericHeaders.forEach((h) => {
        newRow[h] = parseFloat(row[h]);
      });
      return newRow;
    });
  }, [data, numericHeaders]);

  const pieData = useMemo(() => {
    if (!pieName || !pieValue || data.length === 0) return [];
    const aggregated: Record<string, number> = {};
    for (const row of transformedData) {
      const name = row[pieName];
      const value = row[pieValue];
      if (name && typeof value === "number") {
        aggregated[name] = (aggregated[name] || 0) + value;
      }
    }
    return Object.entries(aggregated).map(([name, value]) => ({ name, value }));
  }, [transformedData, pieName, pieValue]);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Chart Generator</CardTitle>
        <CardDescription>Visualize your data with custom charts.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="bar">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="bar">Bar</TabsTrigger>
            <TabsTrigger value="line">Line</TabsTrigger>
            <TabsTrigger value="pie">Pie</TabsTrigger>
          </TabsList>
          <TabsContent value="bar" className="mt-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="bar-x">X-Axis</Label>
                <Select value={barX} onValueChange={setBarX}>
                  <SelectTrigger id="bar-x">
                    <SelectValue placeholder="Select column" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoricalHeaders.map((h) => (
                      <SelectItem key={h} value={h}>
                        {h}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="bar-y">Y-Axis</Label>
                <Select value={barY} onValueChange={setBarY}>
                  <SelectTrigger id="bar-y">
                    <SelectValue placeholder="Select column" />
                  </SelectTrigger>
                  <SelectContent>
                    {numericHeaders.map((h) => (
                      <SelectItem key={h} value={h}>
                        {h}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            {barX && barY && (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={transformedData}>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                  <XAxis dataKey={barX} tickLine={false} axisLine={false} tickMargin={10} />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsla(var(--accent), 0.2)' }}/>
                  <Bar dataKey={barY} fill="hsl(var(--chart-1))" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </TabsContent>
          <TabsContent value="line" className="mt-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="line-x">X-Axis</Label>
                <Select value={lineX} onValueChange={setLineX}>
                  <SelectTrigger id="line-x">
                    <SelectValue placeholder="Select column" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoricalHeaders.map((h) => (
                      <SelectItem key={h} value={h}>
                        {h}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="line-y">Y-Axis</Label>
                <Select value={lineY} onValueChange={setLineY}>
                  <SelectTrigger id="line-y">
                    <SelectValue placeholder="Select column" />
                  </SelectTrigger>
                  <SelectContent>
                    {numericHeaders.map((h) => (
                      <SelectItem key={h} value={h}>
                        {h}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            {lineX && lineY && (
             <ResponsiveContainer width="100%" height={250}>
                <LineChart data={transformedData}>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                  <XAxis dataKey={lineX} tickLine={false} axisLine={false} tickMargin={10} />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1 }}/>
                  <Line type="monotone" dataKey={lineY} stroke="hsl(var(--chart-1))" strokeWidth={2} dot={{r: 4, fill: 'hsl(var(--chart-1))'}} activeDot={{ r: 8, fill: 'hsl(var(--primary))' }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </TabsContent>
          <TabsContent value="pie" className="mt-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="pie-name">Category</Label>
                <Select value={pieName} onValueChange={setPieName}>
                  <SelectTrigger id="pie-name">
                    <SelectValue placeholder="Select column" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoricalHeaders.map((h) => (
                      <SelectItem key={h} value={h}>
                        {h}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="pie-value">Value</Label>
                <Select value={pieValue} onValueChange={setPieValue}>
                  <SelectTrigger id="pie-value">
                    <SelectValue placeholder="Select column" />
                  </SelectTrigger>
                  <SelectContent>
                    {numericHeaders.map((h) => (
                      <SelectItem key={h} value={h}>
                        {h}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            {pieName && pieValue && pieData.length > 0 && (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Tooltip content={<CustomTooltip />} />
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} stroke="hsl(var(--background))" strokeWidth={2}>
                    {pieData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
