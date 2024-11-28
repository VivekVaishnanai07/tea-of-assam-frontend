import { motion } from 'framer-motion';
import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
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
        <div className="card-item">
          <div className="card-header">
            <Zap size={22} style={{ color: "#6366f1", marginRight: "0.5rem" }} />
            Total Orders</div>
          <div className="card-content">2,521</div>
        </div>
        <div className="card-item">
          <div className="card-header">
            <Users size={22} style={{ color: "#8b5cf6", marginRight: "0.5rem" }} />
            Pending Orders</div>
          <div className="card-content">341</div>
        </div>
        <div className="card-item">
          <div className="card-header">
            <ShoppingBag size={22} style={{ color: "#ec4899", marginRight: "0.5rem" }} />
            Completed Orders</div>
          <div className="card-content">2,180</div>
        </div>
        <div className="card-item">
          <div className="card-header">
            <BarChart2 size={22} style={{ color: "#10b981", marginRight: "0.5rem" }} />
            Total Revenue</div>
          <div className="card-content">$98,765</div>
        </div>
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