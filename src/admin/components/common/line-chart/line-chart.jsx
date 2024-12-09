import { motion } from 'framer-motion';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import "./line-chart.css";

const CommonLineChart = ({ name, data, xDataKey, yDataKey }) => {
  return (
    <motion.div
      className='line-chart-wrapper'
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className='line-chart-title'>{name}</h2>
      <div className='line-chart-content'>
        <ResponsiveContainer width="100%" height={"100%"}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray={'3 3'} stroke="#4b5563" />
            <XAxis dataKey={xDataKey} stroke="#9ca3af" />
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
              dataKey={yDataKey}
              stroke="#6366f1"
              strokeWidth={3}
              dot={{ fill: "#6366f1", strokeWidth: 2, r: 5 }}
              activeDot={{ r: 8, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
};

export default CommonLineChart;