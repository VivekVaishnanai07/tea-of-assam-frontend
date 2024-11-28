import AdminAuthGuard from "../../admin/components/auth/guards/admin-auth-guard";
import Analytics from "../../admin/pages/analytics/analytics";
import Dashboard from "../../admin/pages/dashboard/dashboard";
import Orders from "../../admin/pages/orders/orders";
import Products from "../../admin/pages/products/products";
import Sales from "../../admin/pages/sales/sales";
import Settings from "../../admin/pages/settings/settings";
import { roles } from "../../utils/util";
import Users from "../pages/users/users";

const AdminAuthRoutes = [
  {
    path: "/admin/dashboard",
    element: <AdminAuthGuard component={<Dashboard />} allowedRole={[roles.Admin_Role]} />,
  },
  {
    path: "/admin/products",
    element: <AdminAuthGuard component={<Products />} allowedRole={[roles.Admin_Role]} />,
  },
  {
    path: "/admin/users",
    element: <AdminAuthGuard component={<Users />} allowedRole={[roles.Admin_Role]} />,
  },
  {
    path: "/admin/sales",
    element: <AdminAuthGuard component={<Sales />} allowedRole={[roles.Admin_Role]} />,
  },
  {
    path: "/admin/orders",
    element: <AdminAuthGuard component={<Orders />} allowedRole={[roles.Admin_Role]} />,
  },
  {
    path: "/admin/analytics",
    element: <AdminAuthGuard component={<Analytics />} allowedRole={[roles.Admin_Role]} />,
  },
  {
    path: "/admin/settings",
    element: <AdminAuthGuard component={<Settings />} allowedRole={[roles.Admin_Role]} />,
  },
]

export default AdminAuthRoutes;