import { CheckCircle, Clock, DollarSign, ShoppingBag } from "lucide-react";
import Card from "../../components/card/card";
import "./orders.css";

const Orders = () => {
  const Orders_Stat = {
    totalOrders: "2,521",
    pendingOrders: "341",
    completedOrders: "2,180",
    totalRevenue: "$98,765",
  };
  return (
    <div className="admin-orders-wrapper">
      <div className="top-section">
        <Card title="Total Orders" icon={ShoppingBag} data={Orders_Stat.totalOrders} color="#6366f1" />
        <Card title="Pending Orders" icon={Clock} data={Orders_Stat.pendingOrders} color="#10b981" />
        <Card title="Completed Orders" icon={CheckCircle} data={Orders_Stat.completedOrders} color="#f59e0b" />
        <Card title="Total Revenue" icon={DollarSign} data={Orders_Stat.totalRevenue} color="#ef4444" />
      </div>
    </div>
  )
}

export default Orders;