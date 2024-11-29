import { motion } from 'framer-motion';
import { Edit, Trash2, UserCheck, UserIcon, UserPlus, UserX } from "lucide-react";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Card from "../../components/card/card";
import CommonLineChart from "../../components/common/line-chart/line-chart";
import CommonPieChart from "../../components/common/pie-chart/pie-chart";
import Table from "../../components/table/table";
import "./users.css";

const User_Data = [
  { id: 1, name: "Mudassar", email: "mudassar@gmail.com", role: "Admin", status: "Active" },
  { id: 2, name: "Ustad g", email: "john.smith@gmail.com", role: "Customer", status: "Active" },
  { id: 3, name: "Wahab", email: "wahab.noor@gmail.com", role: "Customer", status: "Inactive" },
  { id: 4, name: "Danish", email: "danish.joe@gmail.com", role: "Moderator", status: "Active" },
  { id: 5, name: "Usama", email: "usama.glasses@gmail.com", role: "Customer", status: "Active" },
  { id: 6, name: "Ayesha", email: "ayesha.khan@gmail.com", role: "Admin", status: "Inactive" },
  { id: 7, name: "Hassan", email: "hassan.ali@gmail.com", role: "Customer", status: "Active" },
  { id: 8, name: "Sarah", email: "sarah.jones@gmail.com", role: "Admin", status: "Active" },
  { id: 9, name: "Ali", email: "ali.baba@gmail.com", role: "Customer", status: "Inactive" },
  { id: 10, name: "Fahad", email: "fahad.king@gmail.com", role: "Moderator", status: "Active" },
  { id: 11, name: "Zainab", email: "zainab.queen@gmail.com", role: "Customer", status: "Active" },
  { id: 12, name: "Bilal", email: "bilal.smart@gmail.com", role: "Customer", status: "Inactive" },
  { id: 13, name: "Rizwan", email: "rizwan.shah@gmail.com", role: "Moderator", status: "Active" },
  { id: 14, name: "Kiran", email: "kiran.doe@gmail.com", role: "Customer", status: "Inactive" },
  { id: 15, name: "Yasir", email: "yasir.ace@gmail.com", role: "Admin", status: "Active" }
];

const columns = [
  { key: "name", label: 'Name' },
  { key: "email", label: 'Email' },
  {
    key: "role",
    label: "Role",
    render: (value) => {
      let roleClass = "";
      if (value === "Admin") roleClass = "green-label";
      else if (value === "Moderator") roleClass = "green-label";
      else if (value === "Customer") roleClass = "red-label";
      return (
        <span className={roleClass}>
          {value}
        </span>
      );
    }
  },
  {
    key: "status",
    label: "Status",
    render: (value) => {
      const statusClass = value === "Active"
        ? "active-status"
        : "inactive-status";
      return (
        <span className={statusClass}>
          {value}
        </span>
      );
    }
  },
];

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(User_Data);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const Users_Stat = {
    totalUsers: 874504,
    newUsersToday: 243,
    activeUsers: 23091,
    churnRate: "2.3%",
  }

  const SearchHandler = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = User_Data.filter(user =>
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  const getCurrentPageUsers = () => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(start, start + itemsPerPage);
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
      <Table tableTitle="Users" searchBarValue={searchTerm} searchBarOnChange={SearchHandler} columns={columns} data={getCurrentPageUsers()} actions={actions} currentPage={currentPage} setCurrentPage={setCurrentPage} totalItems={filteredUsers.length} />

      <div className="bottom-section">
        <CommonLineChart name="User Growth" data={User_Growth_Data} />
        <motion.div
          className='user-activity-heatMap-section'
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.7 }}
        >
          <h2 className='user-activity-heatMap-title'>User Activity HeatMap</h2>

          <div className='user-activity-heatMap-content'>
            <ResponsiveContainer>
              <BarChart data={User_Activity_Data}>
                <CartesianGrid strokeDasharray='3, 3' stroke='#374151' />
                <XAxis dataKey="name" stroke='#9ca3af' />
                <YAxis stroke='#9ca3af' />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(31, 45, 55, 0.8)",
                    borderColor: "#4b5563"
                  }}
                  itemStyle={{ color: "#e5e7eb" }}
                />
                <Legend />
                <Bar dataKey="0-4" stackId='a' fill='#5B82F7' />
                <Bar dataKey="4-8" stackId='a' fill='#8B5CF6' />
                <Bar dataKey="8-12" stackId='a' fill='#EC4899' />
                <Bar dataKey="12-16" stackId='a' fill='#10B981' />
                <Bar dataKey="16-20" stackId='a' fill='#F59E0B' />
                <Bar dataKey="20-24" stackId='a' fill='#6EE7B7' />
              </BarChart>
            </ResponsiveContainer>

          </div>
        </motion.div>
      </div>
      <div className='user-demographics-section'>
        <CommonPieChart name="User Demographics" value={User_Demographic_Data} colors={COLORS} width="100%" />
      </div>
    </div>
  )
}

export default Users;