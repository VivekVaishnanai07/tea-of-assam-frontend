import { configureStore } from '@reduxjs/toolkit';
import cartReducer from "./features/cart/slice";
import clientsReducer from "./features/clients/slice";
import giftProductReducer from "./features/gift-products/slice";
import ordersReducer from './features/orders/slice';
import productReducer from "./features/products/slice";
import wishlistReducer from './features/wishlist/slice';

// Admin Reducers
import overViewReducer from './features/admin/overview/slice';
import adminProductsReducer from './features/admin/products/slice';
import adminUsersReducer from './features/admin/users/slice';

export const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    cart: cartReducer,
    products: productReducer,
    giftProducts: giftProductReducer,
    clients: clientsReducer,
    orders: ordersReducer,
    overview: overViewReducer,
    adminProducts: adminProductsReducer,
    adminUsers: adminUsersReducer,
  },
})