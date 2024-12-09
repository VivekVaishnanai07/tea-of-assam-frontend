import { CheckCircle, Clock, DollarSign, Eye, ShoppingBag } from "lucide-react";
import { useState } from "react";
import Card from "../../components/card/card";
import CommonLineChart from "../../components/common/line-chart/line-chart";
import CommonPieChart from "../../components/common/pie-chart/pie-chart";
import Table from "../../components/table/table";
import "./orders.css";

const Daily_Orders_Data = [
  { value: "07/01", name: 48 },
  { value: "07/02", name: 42 },
  { value: "07/03", name: 49 },
  { value: "07/04", name: 62 },
  { value: "07/05", name: 55 },
  { value: "07/06", name: 52 },
  { value: "07/07", name: 62 },
]

const Category_Data = [
  { name: "Pending", value: 60 },
  { name: "Processing", value: 105 },
  { name: "Shipped", value: 80 },
  { name: "Delivered", value: 210 }
];

const COLORS = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#fed766", "#2ab7ca"];

const Order_Data = [
  { id: "ORD001", customer: "Mudassar", total: 235.4, status: "Delivered", date: "2023-07-01" },
  { id: "ORD002", customer: "Danish", total: 412.0, status: "Processing", date: "2023-07-02" },
  { id: "ORD003", customer: "Ayesha", total: 162.5, status: "Shipped", date: "2023-07-03" },
  { id: "ORD004", customer: "Hassan", total: 750.2, status: "Pending", date: "2023-07-04" },
  { id: "ORD005", customer: "Sarah", total: 95.8, status: "Delivered", date: "2023-07-05" },
  { id: "ORD006", customer: "Zainab", total: 310.75, status: "Processing", date: "2023-07-06" },
  { id: "ORD007", customer: "Rizwan", total: 528.9, status: "Shipped", date: "2023-07-07" },
  { id: "ORD008", customer: "Kiran", total: 189.6, status: "Delivered", date: "2023-07-08" },
  { id: "ORD009", customer: "Ali", total: 675.0, status: "Pending", date: "2023-07-09" },
  { id: "ORD010", customer: "Sara", total: 225.4, status: "Delivered", date: "2023-07-10" },
  { id: "ORD011", customer: "Kamran", total: 330.6, status: "Processing", date: "2023-07-11" },
  { id: "ORD012", customer: "Farah", total: 480.0, status: "Shipped", date: "2023-07-12" },
  { id: "ORD013", customer: "Usman", total: 560.2, status: "Delivered", date: "2023-07-13" },
  { id: "ORD014", customer: "Asma", total: 310.5, status: "Pending", date: "2023-07-14" },
  { id: "ORD015", customer: "Bilal", total: 745.8, status: "Processing", date: "2023-07-15" },
  { id: "ORD016", customer: "Imran", total: 420.0, status: "Shipped", date: "2023-07-16" },
  { id: "ORD017", customer: "Nida", total: 250.7, status: "Delivered", date: "2023-07-17" },
  { id: "ORD018", customer: "Hamza", total: 555.3, status: "Pending", date: "2023-07-18" }
];

const columns = [
  { key: "id", label: 'Order Id' },
  { key: "customer", label: 'Customer' },
  { key: "total", label: "Total", render: (value) => `$${value.toFixed(2)}` },
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
  { key: "date", label: 'Date' },
];

const actions = [
  { icon: <Eye size={18} />, className: 'view-btn', onClick: () => console.log("View") },
];

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState(Order_Data);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const Orders_Stat = {
    totalOrders: "2,521",
    pendingOrders: "341",
    completedOrders: "2,180",
    totalRevenue: "$98,765",
  };

  const SearchHandler = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = Order_Data.filter(order =>
      order.customer.toLowerCase().includes(term)
    );
    setFilteredOrders(filtered);
    setCurrentPage(1);
  };

  const getCurrentPageOrders = () => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredOrders.slice(start, start + itemsPerPage);
  };

  return (
    <div className="admin-orders-wrapper">
      <div className="top-section">
        <Card title="Total Orders" icon={ShoppingBag} data={Orders_Stat.totalOrders} color="#6366f1" />
        <Card title="Pending Orders" icon={Clock} data={Orders_Stat.pendingOrders} color="#10b981" />
        <Card title="Completed Orders" icon={CheckCircle} data={Orders_Stat.completedOrders} color="#f59e0b" />
        <Card title="Total Revenue" icon={DollarSign} data={Orders_Stat.totalRevenue} color="#ef4444" />
      </div>
      <div className="middle-section">
        <CommonLineChart name="Daily Orders" data={Daily_Orders_Data} xDataKey="value" yDataKey="name" />
        <CommonPieChart name="Category Distribution" value={Category_Data} colors={COLORS} width="50%" labelLine={false} />
      </div>
      <div className="table-section">
        <Table tableTitle="Orders List" searchBarValue={searchTerm} searchBarOnChange={SearchHandler} columns={columns} actions={actions} data={getCurrentPageOrders()} currentPage={currentPage} setCurrentPage={setCurrentPage} totalItems={filteredOrders.length} />
      </div>
    </div >
  )
}

export default Orders;