import { motion } from 'framer-motion';
import { CreditCard, DollarSign, ShoppingCart, TrendingUp } from "lucide-react";
import { useState } from "react";
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Card from "../../components/card/card";
import CommonBarChart from '../../components/common/bar-chart/bar-chart';
import CommonPieChart from '../../components/common/pie-chart/pie-chart';
import "./sales.css";

const Monthly_Sales_Data = [
  { month: "Jan", Sales: 4000 },
  { month: "Feb", Sales: 3000 },
  { month: "Mar", Sales: 5000 },
  { month: "Apr", Sales: 4500 },
  { month: "May", Sales: 6000 },
  { month: "Jun", Sales: 5500 },
  { month: "Jul", Sales: 7000 },
]

const SalesbyCategory = [
  { name: "Electronics", Value: 400 },
  { name: "Clothing", Value: 300 },
  { name: "Home & Garden", Value: 200 },
  { name: "Books", Value: 100 },
  { name: "Others", Value: 160 },
];

const Daily_Sales_Data = [
  { name: "Mon", Sales: 800 },
  { name: "Tue", Sales: 1250 },
  { name: "Wed", Sales: 500 },
  { name: "Thu", Sales: 1000 },
  { name: "Fri", Sales: 1300 },
  { name: "Sat", Sales: 1550 },
  { name: "Sun", Sales: 1150 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe"]

const Sales = () => {
  const [SelectedTimeRange, setSelectedTimeRange] = useState("This Quarter");
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
      <motion.div
        className='sales-overview-section'
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.2 }}
      >
        <div className='sales-overview-header'>
          <h2 className='sales-overview-title'>Sales Overview</h2>
          <select
            className='sales-overview-time-range'
            value={SelectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
          >
            <option>This Week</option>
            <option>This Month</option>
            <option>This Quarter</option>
            <option>This Year</option>
          </select>
        </div>

        <div className='sales-overview-content'>
          <ResponsiveContainer>
            <AreaChart data={Monthly_Sales_Data}>
              <CartesianGrid strokeDasharray='3 3' stroke='#374151' />
              <XAxis dataKey="month" stroke='#9ca3af' />
              <YAxis stroke='#9ca3af' />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(31, 41, 55, 0.8) ",
                  borderColor: "#4b5563",
                }}
                itemStyle={{ color: "#e5e7eb" }}
              />
              <Area type="monotone" dataKey="Sales" stroke='#8b5cf6' fill='#8b5cf6' fillOpacity={0.3} />
              <Legend />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
      <div className='bottom-section'>
        <CommonPieChart name="Sales by Category" value={SalesbyCategory} colors={COLORS} width="50%" />
        <CommonBarChart name="Daily Sales Trend" value={Daily_Sales_Data} bars={[{ dataKey: "Sales", fill: '#10b981' }]} labelLine={false} xDataKey="name" />
      </div>
    </div>
  )
}

export default Sales;