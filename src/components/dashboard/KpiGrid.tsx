"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, LayoutDashboard, Users, ShoppingCart, DollarSign, Package } from "lucide-react";
import { cn } from "@/lib/utils";

interface KpiData {
    totalSales: number;
    totalProfit: number;
    totalOrders: number;
    totalQuantity: number;
}

interface KpiGridProps {
    data: KpiData;
}

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(value);
};

const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-IN').format(value);
};

const KpiCard = ({ title, value, change, icon: Icon, className }: { title: string, value: string, change: string, icon: React.ElementType, className?: string }) => (
    <Card className={cn("bg-card/60 backdrop-blur-sm border-primary/20 shadow-lg shadow-black/20 p-4 transition-all hover:scale-105", className)}>
        <CardHeader className="flex flex-row items-center justify-between p-0 pb-2">
            <CardTitle className="text-sm font-medium text-primary">{title}</CardTitle>
            <Icon className="h-5 w-5 text-primary opacity-75" />
        </CardHeader>
        <CardContent className="p-0">
            <div className="text-3xl font-bold text-foreground">{value}</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <span className={cn("font-medium", change.startsWith('+') ? "text-green-500" : "text-red-500")}>
                    {change}
                </span>
                from last month
            </p>
        </CardContent>
    </Card>
);

export default function KpiGrid({ data }: KpiGridProps) {
    const kpis = [
        {
            title: "Total Sales",
            value: formatCurrency(data.totalSales),
            change: "+12.5%",
            icon: DollarSign
        },
        {
            title: "Total Profit",
            value: formatCurrency(data.totalProfit),
            change: "+8.2%",
            icon: TrendingUp
        },
        {
            title: "Total Orders",
            value: formatNumber(data.totalOrders),
            change: "+5.1%",
            icon: ShoppingCart
        },
        {
            title: "Total Quantity",
            value: formatNumber(data.totalQuantity),
            change: "+3.2%",
            icon: Package
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {kpis.map((kpi, index) => (
                <KpiCard key={index} {...kpi} />
            ))}
        </div>
    );
}
