import { roles } from "../../utils/util";
import AdminAuthGuard from "../components/auth/guards/admin-auth-guard";
import Dashboard from "../pages/dashboard/dashboard";

const AdminAuthRoutes = [
  {
    path: "/admin/dashboard",
    element: <AdminAuthGuard component={<Dashboard />} allowedRole={[roles.Admin_Role]} />,
  },
]

export default AdminAuthRoutes;