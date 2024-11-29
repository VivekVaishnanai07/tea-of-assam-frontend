import { CreditCard, DollarSign, ShoppingCart, TrendingUp } from "lucide-react";
import Card from "../../components/card/card";
import "./sales.css";

const Sales = () => {
  const Sales_Stats = {
    totalRevenue: "$1,234,567",
    averageOrderValue: "$78.90",
    conversionRate: "43.67%",
    salesGrowth: "59.3%",
  };
  return (
    <div className="admin-sales-wrapper">
      <div className="top-section">
        <Card icon={DollarSign} title="Total Revenue" color="#6366f1" data={Sales_Stats.totalRevenue} />
        <Card icon={ShoppingCart} title="Avg. Order Value" color="#10b981" data={Sales_Stats.averageOrderValue} />
        <Card icon={TrendingUp} title="Conversion Rate" color="#f59e0b" data={Sales_Stats.conversionRate} />
        <Card icon={CreditCard} title="Sales Growth" color="#ef4444" data={Sales_Stats.salesGrowth} />
      </div>
    </div>
  )
}

export default Sales;