import { Edit, Trash2, UserCheck, UserIcon, UserPlus, UserX } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersDataThunk, getUsersListThunk } from "../../../store/features/admin/users/thunk";
import { formatPrice } from "../../../utils/util";
import Card from "../../components/card/card";
import CommonBarChart from "../../components/common/bar-chart/bar-chart";
import CommonLineChart from "../../components/common/line-chart/line-chart";
import CommonPieChart from "../../components/common/pie-chart/pie-chart";
import Table from "../../components/table/table";
import UserModal from "./user-modal/user-modal";
import "./users.css";

const Users = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [paginatedUsers, setPaginatedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const usersDataItem = useSelector((state) => state.adminUsers.usersData);
  const usersList = useSelector((state) => state.adminUsers.usersList);

  useEffect(() => {
    setLoading(true);
    dispatch(getUsersListThunk())
      .then(() => dispatch(getUsersDataThunk()))
      .finally(() => setLoading(false))
      .catch((error) => console.error("Error fetching user data:", error));
  }, [dispatch]);

  useEffect(() => {
    setFilteredUsers(usersList);
  }, [usersList]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    setPaginatedUsers(filteredUsers.slice(startIndex, startIndex + itemsPerPage));
  }, [filteredUsers, currentPage]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = usersList.filter(
      (user) =>
        user.firstName.toLowerCase().includes(term) ||
        user.lastName.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  const columns = [
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "email", label: "Email" },
    {
      key: "role",
      label: "Role",
      render: (value) => {
        const roleClass = value === "admin" ? "green-label" : "red-label";
        return <span className={roleClass}>{value}</span>;
      },
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

  const actions = [
    { icon: <Edit size={18} />, className: "edit-btn", onClick: () => console.log("Edit") },
    { icon: <Trash2 size={18} />, className: "delete-btn", onClick: (row) => console.log("Delete", row.id) },
  ];

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe"];

  const userActivityHeatMap = (rawData) => {
    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const hourRanges = ["0-4", "4-8", "8-12", "12-16", "16-20", "20-24"];

    // Initialize the desired structure with all counts set to 0
    const transformedData = daysOfWeek.map((day) => {
      const entry = { name: day };
      hourRanges.forEach((range) => {
        entry[range] = 0;
      });
      return entry;
    });

    // Fill the data based on rawData
    rawData && rawData.forEach(({ count, dayOfWeek, hourRange }) => {
      const dayIndex = dayOfWeek - 1; // Convert 1-based to 0-based index
      if (dayIndex >= 0 && dayIndex < daysOfWeek.length) {
        transformedData[dayIndex][hourRange] += count;
      }
    });
    return transformedData;
  }

  return (
    <div className="admin-user-wrapper">
      {/* Top Cards Section */}
      <div className="top-section">
        <Card icon={UserIcon} title="Total Users" color="#6366f1" data={formatPrice(usersDataItem?.totalUsers || 0)} />
        <Card icon={UserPlus} title="New Users Today" color="#10b981" data={formatPrice(usersDataItem?.newUsersToday || 0)} />
        <Card icon={UserCheck} title="Active Users" color="#f59e0b" data={formatPrice(usersDataItem?.activeUsers || 0)} />
        <Card icon={UserX} title="Churn Rate" color="#ef4444" data={`${formatPrice(usersDataItem?.churnRate || 0)}%`} />
      </div>

      {/* Add User Button */}
      <div className="add-user-section">
        <button className="add-user-btn" onClick={() => setIsOpen(true)}>Add User</button>
      </div>

      {/* Table Section */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table
          tableTitle="Users"
          searchBarValue={searchTerm}
          searchBarOnChange={handleSearch}
          columns={columns}
          data={paginatedUsers}
          actions={actions}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalItems={filteredUsers.length}
        />
      )}

      {/* Bottom Section */}
      <div className="bottom-section">
        <CommonLineChart name="User Growth" data={usersDataItem?.userGrowth} xDataKey="name" yDataKey="value" />
        <CommonBarChart
          name="User Activity HeatMap"
          value={userActivityHeatMap(usersDataItem?.userActivityHeatMap)}
          bars={[
            { dataKey: "0-4", fill: "#5B82F7" },
            { dataKey: "4-8", fill: "#8B5CF6" },
            { dataKey: "8-12", fill: "#EC4899" },
            { dataKey: "12-16", fill: "#10B981" },
            { dataKey: "16-20", fill: "#F59E0B" },
            { dataKey: "20-24", fill: "#6EE7B7" },
          ]}
          xDataKey="name"
          stacked={true}
        />
      </div>

      {/* User Demographics Section */}
      <div className="user-demographics-section">
        <CommonPieChart
          name="User Demographics"
          value={usersDataItem?.userDemographics}
          colors={COLORS}
          width="100%"
          labelLine={false}
        />
      </div>

      {/* User Modal */}
      <UserModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Users;