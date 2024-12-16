import { CheckCircle, Clock, DollarSign, Eye, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersDataThunk } from "../../../store/features/admin/orders/thunk";
import { formatDate, formatPrice } from "../../../utils/util";
import Card from "../../components/card/card";
import CommonLineChart from "../../components/common/line-chart/line-chart";
import CommonPieChart from "../../components/common/pie-chart/pie-chart";
import Table from "../../components/table/table";
import "./orders.css";

const COLORS = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#fed766", "#2ab7ca"];

const columns = [
  { key: "id", label: 'Order Id' },
  { key: "customer", label: 'Customer' },
  { key: "total", label: "Total", render: (value) => `$${formatPrice(value)}` },
  {
    key: "status",
    label: "Status",
    render: (value) => {
      let status = "";
      if (value === "Delivered") status = "green-label";
      else if (value === "Processing") status = "yellow-label";
      else if (value === "Pending") status = "red-label";
      else if (value === "Shipped") status = "blue-label";
      return (
        <span className={status}>
          {value}
        </span>
      );
    }
  },
  { key: "date", label: 'Date', render: (value) => formatDate(value) },
];

const actions = [
  { icon: <Eye size={18} />, className: 'view-btn', onClick: () => console.log("View") },
];

const Orders = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [paginatedOrders, setPaginatedOrders] = useState([]);
  const [ordersItems, setOrdersItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const ordersDataItems = useSelector((state) => state.adminOrders.ordersData);

  useEffect(() => {
    setLoading(true);
    dispatch(getOrdersDataThunk())
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching overview data:", error);
        setLoading(false);
      });
  }, [dispatch]);

  useEffect(() => {
    if (ordersDataItems && ordersDataItems.ordersList) {
      setOrdersItems(ordersDataItems);
      setFilteredOrders(ordersDataItems.ordersList);
    }
  }, [ordersDataItems]);


  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    setPaginatedOrders(filteredOrders.slice(startIndex, startIndex + itemsPerPage));
  }, [filteredOrders, currentPage]);

  const SearchHandler = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = ordersDataItems.ordersList.filter(
      (order) => order.customer.toLowerCase().includes(term)
    );
    setFilteredOrders(filtered);
    setCurrentPage(1);
  };

  return (
    <div className="admin-orders-wrapper">
      {
        loading ? <div>Loading...</div> :
          (
            <>
              <div className="top-section">
                <Card title="Total Orders" icon={ShoppingBag} data={ordersItems.totalOrders} color="#6366f1" />
                <Card title="Pending Orders" icon={Clock} data={ordersItems.totalPendingOrders} color="#10b981" />
                <Card title="Completed Orders" icon={CheckCircle} data={ordersItems.totalCompletedOrders} color="#f59e0b" />
                <Card title="Total Revenue" icon={DollarSign} data={`$${formatPrice(ordersItems.totalRevenue)}`} color="#ef4444" />
              </div>
              <div className="middle-section">
                <CommonLineChart name="Daily Orders" data={ordersItems.dailyOrders} xDataKey="value" yDataKey="name" />
                <CommonPieChart name="Category Distribution" value={ordersItems.categoryDistribution} colors={COLORS} width="50%" labelLine={false} />
              </div>
              <div className="table-section">
                <Table tableTitle="Orders List" searchBarValue={searchTerm} searchBarOnChange={SearchHandler} columns={columns} actions={actions} data={paginatedOrders} currentPage={currentPage} setCurrentPage={setCurrentPage} totalItems={filteredOrders.length} />
              </div>
            </>
          )
      }
    </div >
  )
}

export default Orders;