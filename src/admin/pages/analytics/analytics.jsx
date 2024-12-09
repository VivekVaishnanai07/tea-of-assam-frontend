import { motion } from 'framer-motion';
import { DollarSign, ShoppingBag, TrendingUp, Users } from 'lucide-react';
import { useState } from 'react';
import { Area, AreaChart, CartesianGrid, Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import AnalyticsCard from "../../components/analytics-card/analytics-card";
import CommonBarChart from "../../components/common/bar-chart/bar-chart";
import CommonLineChart from "../../components/common/line-chart/line-chart";
import CommonPieChart from "../../components/common/pie-chart/pie-chart";
import "./analytics.css";

const Analytics_Data = [
  { month: "Jan", Revenue: 4200, Target: 5000 },
  { month: "Feb", Revenue: 3000, Target: 3200 },
  { month: "Mar", Revenue: 5500, Target: 4500 },
  { month: "Apr", Revenue: 4500, Target: 4200 },
  { month: "May", Revenue: 5500, Target: 6000 },
  { month: "Jun", Revenue: 4500, Target: 4800 },
  { month: "Jul", Revenue: 7000, Target: 6500 },
]

const Channel_Data = [
  { name: "Organic Search", Value: 4500 },
  { name: "Paid Search", Value: 3000 },
  { name: "Direct", Value: 2500 },
  { name: "Social Media", Value: 2700 },
  { name: "Referral", Value: 1800 },
  { name: "Email", Value: 2400 },
];
const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE", "#00C49F"];

const Product_Performance_Data = [
  { name: "Product A", Sales: 4000, Revenue: 2650, Profit: 2200 },
  { name: "Product B", Sales: 3000, Revenue: 1398, Profit: 2210 },
  { name: "Product C", Sales: 2000, Revenue: 5500, Profit: 2290 },
  { name: "Product D", Sales: 2780, Revenue: 3908, Profit: 2000 },
  { name: "Product E", Sales: 1890, Revenue: 4800, Profit: 2181 },
];

const userRetentionData = [
  { name: "Week 1", Retention: 100 },
  { name: "Week 2", Retention: 76 },
  { name: "Week 3", Retention: 60 },
  { name: "Week 4", Retention: 50 },
  { name: "Week 5", Retention: 45 },
  { name: "Week 6", Retention: 40 },
  { name: "Week 7", Retention: 35 },
  { name: "Week 8", Retention: 30 },
];

const Customer_Segmentation_Data = [
  { subject: "Engagement", A: 120, B: 110, fullMark: 150 },
  { subject: "Loyalty", A: 98, B: 130, fullMark: 150 },
  { subject: "Satisfaction", A: 86, B: 130, fullMark: 150 },
  { subject: "Spend", A: 99, B: 100, fullMark: 150 },
  { subject: "Frequency", A: 85, B: 90, fullMark: 150 },
  { subject: "Recency", A: 65, B: 85, fullMark: 150 },
];

const INSIGHTS = [
  {
    icon: TrendingUp,
    color: "text-green",
    insight: "Revenue is up 15% compared to last month, driven primarily by a successful email campaign.",
  },
  {
    icon: Users,
    color: "text-blue",
    insight: "Customer retention has improved by 8% following the launch of the new loyalty program.",
  },
  {
    icon: ShoppingBag,
    color: "text-purple",
    insight: 'Product category "Electronics" shows the highest growth potential based on recent market trends.',
  },
  {
    icon: DollarSign,
    color: "text-yellow",
    insight: "Optimizing pricing strategy could potentially increase overall profit margins by 5-7%.",
  },
];

const Analytics = () => {
  const [SelectedTimeRange, setSelectedTimeRange] = useState("This Quarter");

  return (
    <div className="analytics-content-wrapper">
      <AnalyticsCard />
      <div className='revenue-vs-target-section'>
        <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: 0.2 }}>
          <div className="header-section">
            <h2 className='title-text'>Revenue Vs Target</h2>
            <select className="time-range" value={SelectedTimeRange} onChange={(e) => setSelectedTimeRange(e.target.value)}>
              <option>This Week</option>
              <option>This Month</option>
              <option>This Quarter</option>
              <option>This Year</option>
            </select>
          </div>

          <div className='content-section'>
            <ResponsiveContainer>
              <AreaChart data={Analytics_Data}>
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
                <Legend />
                <Area type="monotone" dataKey="Revenue" stroke='#8b5cf6' fill='#8b5cf6' fillOpacity={0.3} />
                <Area type="monotone" dataKey="Target" stroke='#10b981' fill='#10b981' fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
      <div className='other-chart-section'>
        <CommonPieChart name="Channel Performance" value={Channel_Data} colors={COLORS} width="50%" labelLine={true} />
        <CommonBarChart name="Product Performance" value={Product_Performance_Data} bars={[
          { dataKey: "Sales", fill: "#8B5CF6" },
          { dataKey: "Revenue", fill: "#10B981" },
          { dataKey: "Profit", fill: "#F59E0B" },
        ]}
          stacked={false} />
      </div>
      <div className='other-chart-section'>
        <CommonLineChart name="User Retention" data={userRetentionData} xDataKey="name" yDataKey="Retention" />
        <motion.div
          className='radar-chart-section'
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <h2 className='radar-chart-title'>Customer Segmentation</h2>
          <ResponsiveContainer className="radar-chart-content" width="100%" height="100%">
            <RadarChart data={Customer_Segmentation_Data} cx="50%" cy="50%" outerRadius="80%">
              <PolarGrid stroke='#374151' />
              <PolarAngleAxis dataKey="subject" stroke='#7ca3af' />
              <PolarRadiusAxis angle={30} domain={[0, 150]} stroke='#9ca3af' />
              <Radar name='Segment A' dataKey="A" stroke='#8b5cf6' fill='#8b5cf6' fillOpacity={0.6} />
              <Radar name='Segment B' dataKey="B" stroke='#10b981' fill='#10b981' fillOpacity={0.6} />
              <Legend />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(31, 41, 55, 0.8)",
                  borderColor: "#4B5563",
                }}
                itemStyle={{ color: "#E5E7EB" }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
      <motion.div
        className='ai-powered-insights-section'
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <h2 className='ai-powered-insights-title'>
          AI Powered Insights
        </h2>

        <div className='ai-powered-insights-content'>
          {INSIGHTS.map((item, index) => (
            <div key={index} className='content-item'>
              <div className={`icon-content ${item.color}`}>
                <item.icon className={`icon ${item.color}`} />
              </div>
              <p className='dec'>{item.insight}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Analytics;