import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import addToCartImg from "../../assets/svg/cart2.svg";
import deleteImg from "../../assets/svg/deletewish.svg";
import UserContext from "../../context/user-context";
import { getWishlist, removeWishlistItem } from "../../store/features/wishlist/thunk";
import "./wishlist.css";
import { addCartItem } from "../../store/features/cart/thunk";

const Wishlist = () => {
  const { user } = useContext(UserContext)
  const dispatch = useDispatch();
  const [productsList, setProductsList] = useState([]);
  const wishItems = useSelector((state) => state.wishlist.wishlistProducts);

  useEffect(() => {
    if (user && user._id) {
      dispatch(getWishlist(user._id))
    }
  }, [dispatch, user])


  useEffect(() => {
    if (wishItems !== null && wishItems.length > 0) {
      setProductsList(wishItems);
    } else if (wishItems.length === 0) {
      setProductsList(wishItems)
    }
  }, [dispatch, wishItems])

  return (
    <div className="wish-products-container">
      {productsList.length === 0 ? (
        <div className="empty-wishlist-message">Your wishlist is empty!</div>
      ) : (
        <div className="wish-products">
          {productsList !== null && productsList.map((item, index) => (
            <div key={index + 1} className="wish-product">
              <Link to={`/products/${item.product_id}`}>
                <img
                  className="wish-product-image"
                  src={item.image}
                  alt={item.name}
                />
              </Link>
              <div className="wish-product-details">
                <h3 className="wish-product-name">
                  <Link to={`/products/${item.product_id}`} >
                    {item.name}
                  </Link>
                </h3>
                <p className="wish-product-size">{item.size}</p>
                <p className="wish-product-price">{item.price}</p>
                <div className="wish-product-btns">
                  <button
                    className="wish-removed"
                    onClick={() => {
                      dispatch(removeWishlistItem({ client_id: user._id, product_id: item.product_id }));
                    }}
                  >
                    <img src={deleteImg} alt="Remove from Wishlist" />
                  </button>
                  <button
                    className="wish-padd-to-cart"
                    onClick={() => {
                      // Check if the item is already in the cart
                      const existingItem = productsItems.find((product) => product._id === item._id);

                      if (existingItem) {
                        // If the item already exists, increase its quantity by 1
                        dispatch(addCartItem({ client_id: user._id, product_id: item._id, quantity: 1 }));
                        toast.success("Item quantity updated", { duration: 1000 });
                      } else {
                        // If the item doesn't exist in the cart, add it with a quantity of 1
                        dispatch(addCartItem({ client_id: user._id, product_id: item._id, quantity: 1 }));
                        toast.success("Added to Cart", { duration: 1000 });
                      }
                    }}
                  >
                    <img src={addToCartImg} alt="Add to Cart" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
};

export default Wishlist;