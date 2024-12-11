import { Edit, Trash2, UserCheck, UserIcon, UserPlus, UserX } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersListThunk } from "../../../store/features/admin/users/thunk";
import Card from "../../components/card/card";
import CommonBarChart from "../../components/common/bar-chart/bar-chart";
import CommonLineChart from "../../components/common/line-chart/line-chart";
import CommonPieChart from "../../components/common/pie-chart/pie-chart";
import Table from "../../components/table/table";
import UserModal from "./user-modal/user-modal";
import "./users.css";


const columns = [
  { key: "firstName", label: 'First Name' },
  { key: "lastName", label: 'Last Name' },
  { key: "email", label: 'Email' },
  {
    key: "role",
    label: "Role",
    render: (value) => {
      let roleClass = "";
      if (value === "admin") roleClass = "green-label";
      else if (value === "client") roleClass = "green-label";
      return (
        <span className={roleClass}>
          {value}
        </span>
      );
    }
  },
  // {
  //   key: "status",
  //   label: "Status",
  //   render: (value) => {
  //     const statusClass = value === "Active"
  //       ? "active-status"
  //       : "inactive-status";
  //     return (
  //       <span className={statusClass}>
  //         {value}
  //       </span>
  //     );
  //   }
  // },
];

const Users = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [paginatedUsers, setPaginatedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const Users_Stat = {
    totalUsers: 874504,
    newUsersToday: 243,
    activeUsers: 23091,
    churnRate: "2.3%",
  }
  const usersList = useSelector((state) => state.adminUsers.usersList);

  useEffect(() => {
    dispatch(getUsersListThunk()).then(() => {
      setLoading(false);
    })
      .catch((error) => {
        console.error("Error fetching users data:", error);
        setLoading(false);
      });
  }, [dispatch])

  useEffect(() => {
    if (usersList) {
      setFilteredUsers(usersList);
    }
  }, [usersList]);

  useEffect(() => {
    if (filteredUsers) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      console.log(filteredUsers);
      setPaginatedUsers(filteredUsers.slice(startIndex, startIndex + itemsPerPage));
    }
  }, [filteredUsers, currentPage]);

  const SearchHandler = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = usersList.filter(product =>
      product.firstName.toLowerCase().includes(term) ||
      product.lastName.toLowerCase().includes(term) ||
      product.email.toLowerCase().includes(term)
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  const actions = [
    { icon: <Edit size={18} />, className: 'edit-btn', onClick: () => console.log("Edit") },
    { icon: <Trash2 size={18} />, className: 'delete-btn', onClick: (row) => console.log("Delete", row.id) },
  ];

  const COLORS = ['#8884d8', "#82ca9d", "#ffc658", "#ff8042", "#0088fe"];

  const User_Growth_Data = [
    { name: "Aug", value: 800 },
    { name: "Sep", value: 1500 },
    { name: "Oct", value: 1600 },
    { name: "Nov", value: 1950 },
    { name: "Dec", value: 3300 },
    { name: "Jan", value: 4000 },
  ]

  const User_Activity_Data = [
    { name: "Mon", "0-4": 20, "4-8": 40, "8-12": 60, "12-16": 80, "16-20": 100, "20-24": 30 },
    { name: "Tue", "0-4": 30, "4-8": 50, "8-12": 70, "12-16": 90, "16-20": 110, "20-24": 40 },
    { name: "Wed", "0-4": 40, "4-8": 60, "8-12": 80, "12-16": 100, "16-20": 120, "20-24": 50 },
    { name: "Thu", "0-4": 50, "4-8": 70, "8-12": 90, "12-16": 110, "16-20": 130, "20-24": 60 },
    { name: "Fri", "0-4": 60, "4-8": 80, "8-12": 100, "12-16": 120, "16-20": 140, "20-24": 70 },
    { name: "Sat", "0-4": 70, "4-8": 90, "8-12": 110, "12-16": 130, "16-20": 150, "20-24": 80 },
    { name: "Sun", "0-4": 80, "4-8": 100, "8-12": 120, "12-16": 140, "16-20": 160, "20-24": 90 },
  ];

  const User_Demographic_Data = [
    { name: "18-24", Value: 20 },
    { name: "25-34", Value: 30 },
    { name: "35-44", Value: 25 },
    { name: "45-54", Value: 15 },
    { name: "55+", Value: 10 },
  ];

  return (
    <div className="admin-user-wrapper">
      <div className="top-section">
        <Card icon={UserIcon} title="Total Users" color="#6366f1" data={Users_Stat.totalUsers.toLocaleString()} />
        <Card icon={UserPlus} title="New Users Today" color="#10b981" data={Users_Stat.newUsersToday} />
        <Card icon={UserCheck} title="Active Users" color="#f59e0b" data={Users_Stat.activeUsers.toLocaleString()} />
        <Card icon={UserX} title="Churn Rate" color="#ef4444" data={Users_Stat.churnRate} />
      </div>
      <div className="add-user-section">
        <button className="add-user-btn" onClick={() => setIsOpen(true)}>Add User</button>
      </div>
      {
        loading ? "Loading..." :
          <Table
            tableTitle="Users"
            searchBarValue={searchTerm}
            searchBarOnChange={SearchHandler}
            columns={columns}
            data={paginatedUsers}
            actions={actions}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalItems={filteredUsers.length}
          />
      }

      <div className="bottom-section">
        <CommonLineChart name="User Growth" data={User_Growth_Data} xDataKey="name" yDataKey="value" />
        <CommonBarChart name="User Activity HeatMap" value={User_Activity_Data} bars={[
          { dataKey: "0-4", fill: "#5B82F7" },
          { dataKey: "4-8", fill: "#8B5CF6" },
          { dataKey: "8-12", fill: "#EC4899" },
          { dataKey: "12-16", fill: "#10B981" },
          { dataKey: "16-20", fill: "#F59E0B" },
          { dataKey: "20-24", fill: "#6EE7B7" },
        ]}
          xDataKey="name"
          stacked={true} />
      </div>
      <div className='user-demographics-section'>
        <CommonPieChart name="User Demographics" value={User_Demographic_Data} colors={COLORS} width="100%" labelLine={false} />
      </div>
      <UserModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}

export default Users;