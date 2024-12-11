import { Provider } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';

import AdminAuthRoutes from "./admin/routers/admin-auth-routes.jsx";
import AdminUnAuthRoutes from "./admin/routers/admin-unAuth-routes.jsx";

import { useEffect } from 'react';
import './App.css';
import CartPopup from "./components/cart/cart-popup.jsx";
import Footer from "./components/footer/footer.jsx";
import Header from "./components/header/header.jsx";
import { CartProvider } from "./context/cart-context.jsx";
import NotFound from "./pages/not-found/not-found.jsx";
import AuthRoutes from "./routes/auth-routes.jsx";
import UnAuthRoutes from "./routes/unAuth-routes.jsx";
import { store } from './store/store.jsx';

const App = () => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith("/admin");

  useEffect(() => {
    window.addEventListener('beforeunload', (event) => {
      const leaveTime = new Date().toISOString();
      console.log("Last Active User time  ---->", leaveTime)
    });
  }, [])

  return (
    <Provider store={store}>
      <Toaster richColors theme="dark" />
      {isAdminPath ? (
        <Routes>
          {adminRoutes()}
          <Route path="*" element={<NotFound />} />
        </Routes>
      ) : (
        <CartProvider>
          <Header />
          <CartPopup />
          <Routes>
            {publicRoutes()}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </CartProvider>
      )}
    </Provider>
  );
}

const adminRoutes = () => {
  return (
    <>
      {AdminAuthRoutes.map(route => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
      {AdminUnAuthRoutes.map(route => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </>
  );
}

const publicRoutes = () => {
  return (
    <>
      {AuthRoutes.map(route => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
      {UnAuthRoutes.map(route => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </>
  );
}

export default App;
