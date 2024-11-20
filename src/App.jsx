import { Provider } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import AdminAuthRoutes from "./admin/routers/admin-auth-routes.jsx";
import AdminUnAuthRoutes from "./admin/routers/admin-unAuth-routes.jsx";
import './App.css';
import CartPopup from "./components/cart/cart-popup.jsx";
import Footer from "./components/footer/footer.jsx";
import Header from "./components/header/header.jsx";
import { CartProvider } from "./context/cart-context.jsx";
import NotFound from "./pages/not-found/not-found.jsx";
import AuthRoutes from "./routes/auth-routes.jsx";
import UnAuthRoutes from "./routes/unAuth-routes.jsx";
import { store } from './store/store.jsx';

function App() {
  const location = useLocation();
  const currentPath = location.pathname;
  const isAdminPath = currentPath.startsWith("/admin");

  return (
    <Provider store={store}>
      <Toaster richColors theme="dark" />
      <CartProvider>
        {!isAdminPath && <Header />}
        <CartPopup />
        <Routes>
          {isAdminPath ? (
            <>
              {AdminAuthRoutes.map(route => (
                <Route key={route.path} path={route.path} element={route.element} />
              ))}
              {AdminUnAuthRoutes.map(route => (
                <Route key={route.path} path={route.path} element={route.element} />
              ))}
            </>
          ) : (
            <>
              {AuthRoutes.map(route => (
                <Route key={route.path} path={route.path} element={route.element} />
              ))}
              {UnAuthRoutes.map(route => (
                <Route key={route.path} path={route.path} element={route.element} />
              ))}
            </>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
        {!isAdminPath && <Footer />}
      </CartProvider>
    </Provider>
  );
}

export default App;
