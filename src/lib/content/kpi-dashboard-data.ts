
import { DollarSign, TrendingUp, Users, Target, TrendingDown, Package, Activity, BarChart, type LucideIcon } from "lucide-react";

type ChartType = 'Area' | 'Pie' | 'Bar' | 'Line' | 'Composed' | 'Funnel' | 'Radar' | 'Scatter';

export interface Kpi {
    title: string;
    value: string;
    change: string;
    icon: LucideIcon;
}

export interface ChartConfig {
    title: string;
    defaultChart: ChartType;
    data: any[];
    dataKey: string;
    nameKey: string;
    secondaryDataKey?: string;
    colSpan?: number;
}

export interface KpiDashboardData {
    title: string;
    kpis: Kpi[];
    charts: {
        [key: string]: ChartConfig;
    };
}

const generateRandomData = (numPoints: number, keys: string[], valueRanges: [number, number][]) => {
    const data = [];
    for (let i = 0; i < numPoints; i++) {
        const entry: { [key: string]: any } = { name: `Item ${i + 1}` };
        keys.forEach((key, index) => {
            const [min, max] = valueRanges[index];
            entry[key] = Math.floor(Math.random() * (max - min + 1)) + min;
        });
        data.push(entry);
    }
    return data;
}

const option1Data: KpiDashboardData = {
    title: "Sales Performance Dashboard",
    kpis: [
        { title: "Total Revenue", value: "₹45.2Cr", change: "+12.1% vs last period", icon: DollarSign },
        { title: "Profit Margin", value: "24.5%", change: "+2.3% vs last period", icon: TrendingUp },
        { title: "New Customers", value: "1,254", change: "+8.5% vs last period", icon: Users },
        { title: "Conversion Rate", value: "3.2%", change: "+0.5% vs last period", icon: Target },
    ],
    charts: {
        revenueTrend: {
            title: "Revenue Trend",
            defaultChart: "Area",
            data: [
                { name: "Jan", revenue: 2400 }, { name: "Feb", revenue: 1398 }, { name: "Mar", revenue: 9800 },
                { name: "Apr", revenue: 3908 }, { name: "May", revenue: 4800 }, { name: "Jun", revenue: 3800 },
            ],
            dataKey: "revenue",
            nameKey: "name"
        },
        salesByRegion: {
            title: "Sales by Region",
            defaultChart: "Pie",
            data: [
                { name: 'North America', value: 400 }, { name: 'Europe', value: 300 },
                { name: 'APAC', value: 200 }, { name: 'LATAM', value: 100 },
            ],
            dataKey: "value",
            nameKey: "name"
        },
        monthlySales: {
            title: "Monthly Sales vs Goal",
            defaultChart: "Composed",
            data: [
                { name: "Jan", sales: 4000, goal: 5000 }, { name: "Feb", sales: 3000, goal: 5000 },
                { name: "Mar", sales: 5000, goal: 5000 }, { name: "Apr", sales: 4500, goal: 6000 },
                { name: "May", sales: 6000, goal: 6000 }, { name: "Jun", sales: 5500, goal: 7000 },
            ],
            dataKey: "sales",
            secondaryDataKey: "goal",
            nameKey: "name"
        },
        salesFunnel: {
            title: "Sales Conversion Funnel",
            defaultChart: "Funnel",
            data: [
                { name: "Leads", value: 100 }, { name: "Contacts", value: 80 }, { name: "Qualified", value: 50 },
                { name: "Proposal", value: 30 }, { name: "Closed", value: 20 },
            ],
            dataKey: "value",
            nameKey: "name"
        },
        quarterlyPerformance: {
            title: "Quarterly Performance",
            defaultChart: "Radar",
            data: [
                { name: 'Q1', A: 120, B: 110 }, { name: 'Q2', A: 98, B: 130 },
                { name: 'Q3', A: 86, B: 130 }, { name: 'Q4', A: 99, B: 100 },
            ],
            dataKey: "A",
            secondaryDataKey: "B",
            nameKey: "name",
            colSpan: 2
        }
    }
}

const option2Data: KpiDashboardData = {
    title: "Marketing Campaign Analysis",
    kpis: [
        { title: "Total Spend", value: "₹5.1Cr", change: "+5% vs last campaign", icon: DollarSign },
        { title: "Cost Per Acquisition", value: "₹12,500", change: "-8% vs last campaign", icon: TrendingDown },
        { title: "Total Leads", value: "4,080", change: "+15% vs last campaign", icon: Users },
        { title: "Lead Conversion", value: "18%", change: "+2% vs last campaign", icon: Activity },
    ],
    charts: {
        spendVsLeads: {
            title: "Spend vs. Leads Generated",
            defaultChart: "Composed",
            data: generateRandomData(6, ["spend", "leads"], [[1000, 5000], [50, 200]]),
            dataKey: "spend",
            secondaryDataKey: "leads",
            nameKey: "name",
        },
        cpaByChannel: {
            title: "Cost Per Acquisition by Channel",
            defaultChart: "Bar",
            data: generateRandomData(5, ["cpa"], [[5000, 20000]]),
            dataKey: "cpa",
            nameKey: "name",
        },
        leadSource: {
            title: "Lead Source Distribution",
            defaultChart: "Pie",
            data: generateRandomData(4, ["value"], [[100, 500]]),
            dataKey: "value",
            nameKey: "name",
        },
        conversionOverTime: {
            title: "Conversion Rate Over Time",
            defaultChart: "Area",
            data: generateRandomData(12, ["rate"], [[10, 25]]),
            dataKey: "rate",
            nameKey: "name",
        }
    }
}

const option3Data: KpiDashboardData = {
    title: "Inventory Management Overview",
    kpis: [
        { title: "Items in Stock", value: "1.2M", change: "-2% vs last week", icon: Package },
        { title: "Stock Turn Rate", value: "4.8", change: "+0.2 vs last month", icon: TrendingUp },
        { title: "Out of Stock Items", value: "89", change: "+10 vs last week", icon: TrendingDown },
        { title: "Inventory Value", value: "₹8.2Cr", change: "-1.5% vs last month", icon: BarChart },
    ],
    charts: {
        stockLevels: {
            title: "Stock Levels by Category",
            defaultChart: "Bar",
            data: generateRandomData(8, ["stock"], [[1000, 50000]]),
            dataKey: "stock",
            nameKey: "name",
        },
        sellThrough: {
            title: "Sell-through Rate by Product",
            defaultChart: "Line",
            data: generateRandomData(10, ["rate"], [[40, 95]]),
            dataKey: "rate",
            nameKey: "name",
        },
        inventoryAge: {
            title: "Inventory Ageing",
            defaultChart: "Pie",
            data: [
                { name: '0-30 Days', value: 400 },
                { name: '31-60 Days', value: 300 },
                { name: '61-90 Days', value: 200 },
                { name: '>90 Days', value: 100 },
            ],
            dataKey: "value",
            nameKey: "name",
        },
        stockoutHistory: {
            title: "Stock-out History",
            defaultChart: "Area",
            data: generateRandomData(12, ["events"], [[0, 20]]),
            dataKey: "events",
            nameKey: "name",
            colSpan: 2
        }
    }
}

export const allDashboardData: { [key: string]: KpiDashboardData } = {
    'option-1': option1Data,
    'option-2': option2Data,
    'option-3': option3Data,
};

// Generate placeholder data for the rest of the options
for (let i = 4; i <= 20; i++) {
    const chartCount = Math.floor(Math.random() * 3) + 2; // 2 to 4 charts
    const charts: { [key: string]: ChartConfig } = {};
    for (let j = 1; j <= chartCount; j++) {
        charts[`chart${j}`] = {
            title: `Metric ${i}-${j}`,
            defaultChart: "Bar",
            data: generateRandomData(6, ["value"], [[100, 1000]]),
            dataKey: "value",
            nameKey: "name"
        }
    }

    allDashboardData[`option-${i}`] = {
        title: `Dashboard View ${i}`,
        kpis: [
            { title: `KPI ${i}-1`, value: `₹${(Math.random() * 100).toFixed(1)}Cr`, change: `+${(Math.random() * 10).toFixed(1)}%`, icon: TrendingUp },
            { title: `KPI ${i}-2`, value: `${(Math.random() * 50).toFixed(1)}%`, change: `-${(Math.random() * 5).toFixed(1)}%`, icon: TrendingDown },
            { title: `KPI ${i}-3`, value: `${Math.floor(Math.random() * 5000)}`, change: `+${(Math.random() * 20).toFixed(1)}%`, icon: Users },
            { title: `KPI ${i}-4`, value: `${(Math.random() * 10).toFixed(1)}`, change: `+${(Math.random() * 1).toFixed(1)}`, icon: Activity },
        ],
        charts
    };
}
