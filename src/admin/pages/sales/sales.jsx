import { motion } from 'framer-motion';
import { CreditCard, DollarSign, ShoppingCart, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { getSalesDataThunk } from "../../../store/features/admin/sales/thunk";
import { formatPrice } from '../../../utils/util';
import Card from "../../components/card/card";
import CommonBarChart from '../../components/common/bar-chart/bar-chart';
import CommonPieChart from '../../components/common/pie-chart/pie-chart';
import "./sales.css";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe"]

const Sales = () => {
  const dispatch = useDispatch();
  const [selectedTimeRange, setSelectedTimeRange] = useState("month");
  const [salesItems, setSalesItems] = useState({});
  const [loading, setLoading] = useState(true);
  const salesDataItems = useSelector((state) => state.adminSales.salesData);

  useEffect(() => {
    const timeRange = selectedTimeRange;
    dispatch(getSalesDataThunk({ timeRange }))
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching overview data:", error);
        setLoading(false);
      });
  }, [dispatch]);

  useEffect(() => {
    if (salesDataItems) {
      setSalesItems(salesDataItems)
    }
  }, [salesDataItems])

  const handleTimeRangeChange = (e) => {
    setSelectedTimeRange(e.target.value)
    const timeRange = e.target.value;
    dispatch(getSalesDataThunk({ timeRange }))
  }

  return (
    <div className="admin-sales-wrapper">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="top-section">
            <Card icon={DollarSign} title="Total Revenue" color="#6366f1" data={`$${formatPrice(salesItems.totalSales)}`} />
            <Card icon={ShoppingCart} title="Avg. Order Value" color="#10b981" data={`$${formatPrice(salesItems.averageOrderValue)}`} />
            <Card icon={TrendingUp} title="Conversion Rate" color="#f59e0b" data={`${formatPrice(salesItems.conversionRate)}%`} />
            <Card icon={CreditCard} title="Sales Growth" color="#ef4444" data={`${salesItems.salesGrowth.toFixed(2)}%`} />
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
                value={selectedTimeRange}
                onChange={handleTimeRangeChange}
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
            </div>

            <div className='sales-overview-content'>
              <ResponsiveContainer>
                <AreaChart data={salesItems.salesOverview}>
                  <CartesianGrid strokeDasharray='3 3' stroke='#374151' />
                  <XAxis dataKey="period" stroke='#9ca3af' />
                  <YAxis stroke='#9ca3af' />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(31, 41, 55, 0.8) ",
                      borderColor: "#4b5563",
                    }}
                    itemStyle={{ color: "#e5e7eb" }}
                  />
                  <Area type="monotone" dataKey="sales" stroke='#8b5cf6' fill='#8b5cf6' fillOpacity={0.3} />
                  <Legend />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
          <div className='bottom-section'>
            <CommonPieChart name="Sales by Category" value={salesItems.salesByCategory} colors={COLORS} width="50%" />
            <CommonBarChart name="Daily Sales Trend" value={salesItems.dailySalesTrend} bars={[{ dataKey: "Sales", fill: '#10b981' }]} labelLine={false} xDataKey="name" />
          </div>
        </>
      )}
    </div>
  )
}

export default Sales;