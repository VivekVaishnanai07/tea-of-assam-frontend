import AuthGuard from "../components/auth/guards/auth-guard";
import Account from "../pages/account/account";
import NewCheckout from "../pages/checkout/new-checkout";
import OrderDetails from "../pages/order-details/order-details";
import OrderPlace from "../pages/order-place/order-place";
import Orders from "../pages/orders/orders";
import Wishlist from "../pages/wishlist/wishlist";

const AuthRoutes = [
  {
    path: "/wishlist",
    element: <AuthGuard component={<Wishlist />} />,
  },
  {
    path: "/orders",
    element: <AuthGuard component={<Orders />} />,
  },
  {
    path: "/order/:id",
    element: <AuthGuard component={<OrderDetails />} />,
  },
  {
    path: "/account",
    element: <AuthGuard component={<Account />} />,
  },
  {
    path: "/checkout",
    element: <AuthGuard component={<NewCheckout />} />,
  },
  {
    path: "/order-place",
    element: <AuthGuard component={<OrderPlace />} />,
  }
]

export default AuthRoutes;