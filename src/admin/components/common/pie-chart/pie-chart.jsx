import { motion } from 'framer-motion';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import "./pie-chart.css";

const CommonPieChart = ({ name, value, colors, width, labelLine }) => {

  return (
    <motion.div
      className='pie-chart-wrapper'
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.3, delay: .7 }}
      style={{ width: width }}
    >
      <h2 className='pie-chart-title'>{name}</h2>

      <div className='pie-chart-content'>
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <PieChart>
            <Pie
              data={value}
              cx={"50%"}
              cy={"50%"}
              labelLine={labelLine}
              outerRadius={80}
              fill='#8884d8'
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {value && value.map((item, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
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
  )
}

export default CommonPieChart;