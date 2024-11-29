import { motion } from 'framer-motion';
import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Card from '../../components/card/card';
import "./dashboard.css";

const Sales_Data = [
  { name: "Aug", Sales: 3000 },
  { name: "Sep", Sales: 3700 },
  { name: "Oct", Sales: 5200 },
  { name: "Nov", Sales: 4600 },
  { name: "Dec", Sales: 5400 },
  { name: "Jan", Sales: 7300 },
  { name: "Feb", Sales: 6100 },
  { name: "Mar", Sales: 5600 },
  { name: "Apr", Sales: 6600 },
  { name: "May", Sales: 6200 },
  { name: "Jun", Sales: 7100 },
  { name: "Jul", Sales: 7700 },
];

const Category_Data = [
  { name: "Electronics", value: 4500 },
  { name: "Clothing", value: 3200 },
  { name: "Home & Garden", value: 2800 },
  { name: "Books", value: 2100 },
  { name: "Sports & Outdoors", value: 1800 },
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
        <motion.div
          className='sales-overview-section'
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className='sales-overview-title'>Sales Overview</h2>
          <div className='sales-overview-content'>
            <ResponsiveContainer width="100%" height={"100%"}>
              <LineChart data={Sales_Data}>
                <CartesianGrid strokeDasharray={'3 3'} stroke="#4b5563" />
                <XAxis dataKey={"name"} stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(31, 45, 55, 0.8)",
                    borderColor: "#4b5563",
                  }}
                  itemStyle={{ color: "#e5e7eb" }}
                />
                <Line
                  type="monotone"
                  dataKey="Sales"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{ fill: "#6366f1", strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 8, strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        <motion.div
          className='category-distribution-section'
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className='category-distribution-title'>Category Distribution</h2>
          <div className='category-distribution-content'>
            <ResponsiveContainer width={"100%"} height={"100%"}>
              <PieChart>
                <Pie
                  data={Category_Data}
                  cx={"50%"}
                  cy={"50%"}
                  labelLine={false}
                  outerRadius={80}
                  fill='#8884d8'
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {Category_Data.map((item, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(31, 41, 55, 0.8)",
                    borderColor: "#4b5563",
                  }}
                  itemStyle={{ color: "#e5e7eb" }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
      <div className='sales-by-channel-section'>
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h2 className='sales-by-channel-title'>Sales by Channel</h2>
          <div className='sales-by-channel-content'>
            <ResponsiveContainer>
              <BarChart
                data={Sales_Channel_Data}
              >
                <CartesianGrid strokeDasharray='3 3' stroke='#4b5563' />
                <XAxis dataKey="name" stroke='#9ca3af' />
                <YAxis stroke='#9ca3af' />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(31, 41, 55, 0.8)",
                    borderColor: "#4b5563",
                  }}
                  itemStyle={{ color: "#e5e7eb" }}
                />
                <Legend />  {/* if want to remove text {"Value"} at the most bottom the remove this legend  */}
                <Bar
                  dataKey={"Value"} fill='#8884d8'
                >
                  {Sales_Channel_Data.map((item, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS1[index % COLORS1.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;