import AdminAuthGuard from "../../admin/components/auth/guards/admin-auth-guard";
import Dashboard from "../../admin/pages/dashboard/dashboard";
import { roles } from "../../utils/util";

const AdminAuthRoutes = [
  {
    path: "/admin/dashboard",
    element: <AdminAuthGuard component={<Dashboard />} allowedRole={[roles.Admin_Role]} />,
  },
]

export default AdminAuthRoutes;