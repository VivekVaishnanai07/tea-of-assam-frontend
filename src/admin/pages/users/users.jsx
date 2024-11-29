import { UserCheck, UserIcon, UserPlus, UserX } from "lucide-react";
import Card from "../../components/card/card";
import "./users.css";

const Users = () => {
  const Users_Stat = {
    totalUsers: 874504,
    newUsersToday: 243,
    activeUsers: 23091,
    churnRate: "2.3%",
  }
  return (
    <div className="admin-user-wrapper">
      <div className="top-section">
        <Card icon={UserIcon} title="Total Users" color="#6366f1" data={Users_Stat.totalUsers.toLocaleString()} />
        <Card icon={UserPlus} title="New Users Today" color="#10b981" data={Users_Stat.newUsersToday} />
        <Card icon={UserCheck} title="Active Users" color="#f59e0b" data={Users_Stat.activeUsers.toLocaleString()} />
        <Card icon={UserX} title="Churn Rate" color="#ef4444" data={Users_Stat.churnRate} />
      </div>
    </div>
  )
}

export default Users;