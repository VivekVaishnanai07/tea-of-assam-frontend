import { createContext, useState } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [isCartVisible, setIsCartVisible] = useState(false);

  // Function to show the CartPopup
  const showCart = () => setIsCartVisible(true);

  // Function to hide the CartPopup
  const hideCart = () => setIsCartVisible(false);

  return (
    <CartContext.Provider value={{ isCartVisible, showCart, hideCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;