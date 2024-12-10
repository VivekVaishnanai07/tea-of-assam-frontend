import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOverviewData } from "../../../store/features/admin/overview/thunk";
import { formatPrice } from "../../../utils/util";
import Card from '../../components/card/card';
import CommonBarChart from "../../components/common/bar-chart/bar-chart";
import CommonLineChart from "../../components/common/line-chart/line-chart";
import CommonPieChart from "../../components/common/pie-chart/pie-chart";
import "./dashboard.css";

const COLORS = ["#6366f1", "#6b8afa", "#ec4899"];

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
  const dispatch = useDispatch();
  const [overviewData, setOverviewData] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const overviewItem = useSelector((state) => state.overview.overviewData)

  useEffect(() => {
    dispatch(getOverviewData())
      .then(() => {
        setLoading(false); // Set loading to false when data is loaded
      })
      .catch((error) => {
        console.error("Error fetching overview data:", error);
        setLoading(false); // Set loading to false even on error to prevent hanging UI
      });
  }, [dispatch]);


  useEffect(() => {
    if (overviewItem !== null) {
      setOverviewData(overviewItem)
    }
  }, [overviewItem])

  return (
    <div className="admin-dashboard-wrapper">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="top-section">
            <Card icon={Zap} title="Total Sales" color="#6366f1" data={`$${formatPrice(overviewData.totalSales)}`} />
            <Card icon={Users} title="New Users" color="#8b5cf6" data={`${formatPrice(overviewData.newUsers)}`} />
            <Card icon={ShoppingBag} title="Total Products" color="#ec4899" data={`${formatPrice(overviewData.totalProducts)}`} />
            <Card icon={BarChart2} title="Conversion Rate" color="#10b981" data={`${overviewData.conversionRate}%`} />
          </div>
          <div className="middle-section">
            <CommonLineChart name="Sales Overview" data={overviewData.salesOverview} xDataKey="name" yDataKey="value" />
            <CommonPieChart name="Category Distribution" value={overviewData.categoryDistribution} colors={COLORS} width="50%" labelLine={false} />
          </div>
          <div className='sales-by-channel-section'>
            <CommonBarChart name="Sales by Channel" value={Sales_Channel_Data} colors={COLORS1} bars={[{ dataKey: "Value", fill: '#8884d8' }]} width="100%" xDataKey="name" />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;