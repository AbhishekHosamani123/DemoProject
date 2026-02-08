import salesData from "@/data/sales-data.json";
import SalesDashboard from "@/components/dashboard/SalesDashboard";

export default function KpiMetricDashboardPage() {
    return <SalesDashboard data={salesData} />;
}
