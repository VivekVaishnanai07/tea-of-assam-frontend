import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import Card from '../../components/card/card';
import CommonBarChart from "../../components/common/bar-chart/bar-chart";
import CommonLineChart from "../../components/common/line-chart/line-chart";
import CommonPieChart from "../../components/common/pie-chart/pie-chart";
import "./dashboard.css";

const Sales_Data = [
  { name: "Aug", value: 3000 },
  { name: "Sep", value: 3700 },
  { name: "Oct", value: 5200 },
  { name: "Nov", value: 4600 },
  { name: "Dec", value: 5400 },
  { name: "Jan", value: 7300 },
  { name: "Feb", value: 6100 },
  { name: "Mar", value: 5600 },
  { name: "Apr", value: 6600 },
  { name: "May", value: 6200 },
  { name: "Jun", value: 7100 },
  { name: "Jul", value: 7700 },
];

const Category_Data = [
  { name: "Electronics", Value: 4500 },
  { name: "Clothing", Value: 3200 },
  { name: "Home & Garden", Value: 2800 },
  { name: "Books", Value: 2100 },
  { name: "Sports & Outdoors", Value: 1800 },
];

const COLORS = ["#6366f1", "#6b8afa", "#ec4899", "#10b981", "#f59e0b"];

const Sales_Channel_Data = [
  { name: "Website", Value: 53000 },
  { name: "Mobile App", Value: 38200 },
  { name: "Marketplace", Value: 17000 },
  { name: "Social Media", Value: 28700 },
  { name: "Email Marketing", Value: 50000 },
  { name: "Affiliate Marketing", Value: 35000 },
  { name: "Direct Sales", Value: 25000 },
];

const COLORS1 = ["#6366f1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B", "#3B82F6", "#6EE7B7"];

const Dashboard = () => {
  return (
    <div className="admin-dashboard-wrapper">
      <div className="top-section">
        <Card icon={Zap} title="Total Orders" color="#6366f1" data="2,521" />
        <Card icon={Users} title="Pending Orders" color="#8b5cf6" data="341" />
        <Card icon={ShoppingBag} title="Completed Orders" color="#ec4899" data="2,180" />
        <Card icon={BarChart2} title="Total Revenue" color="#10b981" data="$98,765" />
      </div>
      <div className="middle-section">
        <CommonLineChart name="Sales Overview" data={Sales_Data} dataKey="name" />
        <CommonPieChart name="Category Distribution" value={Category_Data} colors={COLORS} width="50%" />
      </div>
      <div className='sales-by-channel-section'>
        <CommonBarChart name="Sales by Channel" value={Sales_Channel_Data} colors={COLORS1} bars={[{ dataKey: "Value", fill: '#8884d8' }]} width="100%" />
      </div>
    </div>
  );
};

export default Dashboard;