import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, DollarSign, Eye, ShoppingBag, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { formatPrice } from "../../../utils/util";
import "./analytics-card.css";

const Analytics_Card_Data = [
  { name: 'Revenue', icon: DollarSign },
  { name: 'Users', icon: Users },
  { name: 'Orders', icon: ShoppingBag },
  { name: 'Page Views', icon: Eye }
];

const AnalyticsCard = ({ analyticsData }) => {
  const [newAnalyticsData, setNewAnalyticsData] = useState([]);

  useEffect(() => {
    if (analyticsData) {
      const updatedData = analyticsData.map(item => {
        const matchingItem = Analytics_Card_Data.find(b => b.name === item.name);
        if (matchingItem) {
          return {
            ...item,
            icon: matchingItem.icon,
          };
        }
        return item;
      });
      setNewAnalyticsData(updatedData);
    }
  }, [analyticsData]);

  return (
    <div className='analytics-card-wrapper'>
      {newAnalyticsData.map((item, index) => (
        <motion.div className='analytics-card' key={item.name} initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.2 }}>
          <div className='analytics-card-header'>
            <div>
              <h3 className='title-text'>{item.name}</h3>
              <p className='data-text'>{item.name === "Revenue" ? `$${formatPrice(item.value)}` : formatPrice(item.value)}</p>
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