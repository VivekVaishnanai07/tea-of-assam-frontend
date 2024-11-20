import { configureStore } from '@reduxjs/toolkit';
import cartReducer from "./features/cart/slice";
import clientsReducer from "./features/clients/slice";
import giftProductReducer from "./features/gift-products/slice";
import productReducer from "./features/products/slice";
import wishlistReducer from './features/wishlist/slice';

export const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    cart: cartReducer,
    products: productReducer,
    giftProducts: giftProductReducer,
    clients: clientsReducer,
  },
})