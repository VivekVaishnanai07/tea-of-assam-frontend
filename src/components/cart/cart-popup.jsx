import { jwtDecode } from "jwt-decode";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import cartClose from "../../assets/svg/close-cart.svg";
import deleteImg from "../../assets/svg/delete.svg";
import CartContext from "../../context/cart-context";
import { decreaseQuantity, getCartProductsList, increaseQuantity, removeCartItem } from "../../store/features/cart/thunk";
import "./cart-popup.css";

const CartPopup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = localStorage.getItem("clientToken");
  const [totalQuantity, setTotalQuantity] = useState(0);

  const { isCartVisible, hideCart } = useContext(CartContext);
  const cartItems = useSelector((state) => state.cart.cartProducts)

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      setTotalQuantity(cartItems.reduce((acc, item) => acc + item.quantity, 0))
    } else {
      setTotalQuantity(0)
    }
  }, [cartItems]);

  useEffect(() => {
    if (user) {
      dispatch(getCartProductsList(jwtDecode(user).id));
    }
  }, [dispatch, user])

  const handleRemoveFromCart = (id) => {
    if (id && user) {
      dispatch(removeCartItem({ client_id: jwtDecode(user).id, product_id: id }))
    }
  }

  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity({ client_id: jwtDecode(user).id, product_id: id }));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity({ client_id: jwtDecode(user).id, product_id: id }));
  };

  // Subtotal calculation
  const subtotal = cartItems.reduce((total, item) => {
    const itemPrice = item.price ? parseFloat(item.price.substring(1)) : 0; // Remove '$' and convert to number
    return total + item.quantity * itemPrice; // Multiply price by quantity and accumulate
  }, 0);

  return (
    <div className="cart-popup-wrapper">
      <div className="popupcart" style={{ display: isCartVisible ? "flex" : "none" }}>
        <div className="popup-head">
          <p>My Cart</p>
          <p>{totalQuantity} Items</p>
          <img src={cartClose} onClick={() => hideCart()} />
        </div>
        <div className="popup-top">
          {cartItems.length > 0 && cartItems.map((item, index) => (
            <div className="popup-product-card" key={index + 1}>
              <div className="card-top">
                <img src={item.image} alt={item.name} />
                <div className="popup-product-details">
                  <h3>{item.name}</h3>
                  <p>{item.size}</p>
                  <div className="popup-counter">
                    <button
                      onClick={() => handleDecreaseQuantity(item.product_id)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <p>{item.quantity}</p>
                    <button onClick={() => handleIncreaseQuantity(item.product_id)}>+</button>
                  </div>
                </div>
              </div>
              <div className="price-delete">
                <p>${(parseFloat(item.price.substring(1)) * item.quantity).toFixed(2)}</p>
                <img src={deleteImg} onClick={() => handleRemoveFromCart(item.product_id)} />
              </div>
            </div>
          ))}
        </div>
        <div className="popup-bottom">
          <div className="subtotal">
            <p>Subtotal</p>
            <p>${subtotal.toFixed(2)}</p>
          </div>

          <button
            onClick={() =>
              totalQuantity > 0
                ? (
                  navigate("/checkout"),
                  localStorage.removeItem('orderPlaced'),
                  hideCart()
                )
                : toast.warning("Your cart is empty!", { duration: 1000 })
            }
            className="buy"
          >
            Checkout
          </button>
        </div>
      </div >
    </div>
  );
}

export default CartPopup;
