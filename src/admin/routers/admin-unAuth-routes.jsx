import AdminUnAuthGuard from "../components/auth/guards/admin-unAuth-guard";
import Login from "../pages/auth/login/login";
import Register from "../pages/auth/register/register";

const AdminUnAuthRoutes = [
  {
    path: "/admin",
    element: <AdminUnAuthGuard component={<Login />} />,
  },
  {
    path: "/admin/login",
    element: <AdminUnAuthGuard component={<Login />} />,
  },
  {
    path: "/admin/register",
    element: <AdminUnAuthGuard component={<Register />} />,
  },
]

export default AdminUnAuthRoutes;