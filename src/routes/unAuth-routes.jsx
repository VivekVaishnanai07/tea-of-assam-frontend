import UnAuthGuard from "../components/auth/guards/unAuth-guard";
import SingleProduct from "../components/single-product/single-product";
import About from "../pages/about/about";
import AllProducts from "../pages/all-products/all-products";
import Login from "../pages/auth/login/login";
import Register from "../pages/auth/register/register";
import ContactUs from "../pages/contact/contact";
import Dashboard from "../pages/dashboard/dashboard";
import Faqs from "../pages/faqs/faqs";
import Policies from "../pages/policies/policies";
import Wholesale from "../pages/wholesale/wholesale";

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