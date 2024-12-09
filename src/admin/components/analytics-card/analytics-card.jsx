import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, DollarSign, Eye, ShoppingBag, Users } from 'lucide-react';
import "./analytics-card.css";

const Analytics_Card_Data = [
  { name: 'Revenue', value: "$1,234,567", change: 12.5, icon: DollarSign },
  { name: 'Users', value: "45,678", change: 8.3, icon: Users },
  { name: 'Orders', value: "9,876", change: -6.9, icon: ShoppingBag },
  { name: 'Page Views', value: "2,345,678", change: 19.4, icon: Eye }
];

const AnalyticsCard = () => {
  return (
    <div className='analytics-card-wrapper'>
      {Analytics_Card_Data.map((item, index) => (
        <motion.div className='analytics-card' key={item.name} initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.2 }}>
          <div className='analytics-card-header'>
            <div>
              <h3 className='title-text'>{item.name}</h3>
              <p className='data-text'>{item.value}</p>
            </div>

            <div className={`icon-box ${item.change >= 0 ? "bg-green" : "bg-red"}`}>
              <item.icon className={`icon ${item.change >= 0 ? "color-green" : "color-red"}`} />
            </div>
          </div>

          <div className={`analytics-card-content ${item.change >= 0 ? "color-green" : "color-red"}`}>
            {item.change >= 0 ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
            <span className='change-value'>{Math.abs(item.change)}</span>
            <span className='last-period-text'>vs last period</span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default AnalyticsCard;