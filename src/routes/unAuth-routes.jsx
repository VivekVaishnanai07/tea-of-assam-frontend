import UnAuthGuard from "../components/auth/guards/unAuth-guard.jsx";
import SingleProduct from "../components/single-product/single-product.jsx";
import About from "../pages/about/about.jsx";
import AllProducts from "../pages/all-products/all-products.jsx";
import Login from "../pages/auth/login/login.jsx";
import Register from "../pages/auth/register/register.jsx";
import ContactUs from "../pages/contact/contact.jsx";
import Dashboard from "../pages/dashboard/dashboard.jsx";
import Faqs from "../pages/faqs/faqs.jsx";
import Policies from "../pages/policies/Policies.jsx";
import Wholesale from "../pages/wholesale/wholesale.jsx";

const UnAuthRoutes = [
  {
    path: "/",
    element: <UnAuthGuard component={Dashboard} />,
  },
  {
    path: "/dashboard",
    element: <UnAuthGuard component={Dashboard} />,
  },
  {
    path: "/all-products",
    element: <UnAuthGuard component={AllProducts} />,
  },
  {
    path: "/products/:id",
    element: <UnAuthGuard component={SingleProduct} />,
  },
  {
    path: "/contact",
    element: <UnAuthGuard component={ContactUs} />,
  },
  {
    path: "/about",
    element: <UnAuthGuard component={About} />,
  },
  {
    path: "/wholesale",
    element: <UnAuthGuard component={Wholesale} />,
  },
  {
    path: "/faqs",
    element: <UnAuthGuard component={Faqs} />,
  },
  {
    path: "/policies",
    element: <UnAuthGuard component={Policies} />,
  },
  {
    path: "/login",
    element: <UnAuthGuard component={Login} />,
  },
  {
    path: "/register",
    element: <UnAuthGuard component={Register} />,
  },

]

export default UnAuthRoutes;