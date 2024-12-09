import { motion } from 'framer-motion';
import { Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import "./bar-chart.css";

const CommonBarChart = ({ name, value, colors, bars, stacked = false, width, xDataKey }) => {
  return (
    <motion.div
      className='bar-chart-wrapper'
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      style={{ width: width }}
    >
      <h2 className='bar-chart-title'>{name}</h2>
      <div className='bar-chart-content'>
        <ResponsiveContainer>
          <BarChart data={value}>
            <CartesianGrid strokeDasharray='3 3' stroke='#4b5563' />
            <XAxis dataKey={xDataKey} stroke='#9ca3af' />
            <YAxis stroke='#9ca3af' />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4b5563",
              }}
              itemStyle={{ color: "#e5e7eb" }}
            />
            <Legend />
            {bars.map((bar, index) => (
              <Bar
                key={bar.dataKey}
                dataKey={bar.dataKey}
                fill={bar.fill}
                stackId={stacked ? "a" : undefined}
              >
                {colors && colors.length > 0 &&
                  value.map((_, i) => (
                    <Cell key={`cell-${i}`} fill={colors[i % colors.length]} />
                  ))}
              </Bar>
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
};

export default CommonBarChart;