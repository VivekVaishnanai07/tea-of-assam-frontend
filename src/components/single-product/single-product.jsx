import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "sonner";
import UserContext from "../../context/user-context";
import { getGiftProductThunk } from "../../store/features/gift-products/thunk";
import { getProductThunk } from "../../store/features/products/thunk";
import { addWishlistItem } from "../../store/features/wishlist/thunk";
import "./single-product.css";
import { addCartItem } from "../../store/features/cart/thunk";
import { jwtDecode } from "jwt-decode";

const SingleProduct = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const itemsProducts = useSelector((state) => state.products.product)
  const itemsGiftProduct = useSelector((state) => state.giftProducts.giftProduct)
  const [itemQuantity, setItemQuantity] = useState(1);
  const [user, setUser] = useState(null);
  const [items, setItems] = useState({});
  const queryParams = new URLSearchParams(location.search);
  const productType = queryParams.get("type");
  const isToken = localStorage.getItem("clientToken");

  useEffect(() => {
    if (isToken) {
      setUser(jwtDecode(isToken));
    }
  }, [isToken])

  useEffect(() => {
    if (productType === "gift") {
      dispatch(getGiftProductThunk({ productId: params.id }))
    } else {
      dispatch(getProductThunk({ productId: params.id }))
    }

  }, [dispatch, params.id])

  useEffect(() => {
    if (productType === "gift") {
      if (itemsGiftProduct && itemsGiftProduct !== undefined) {
        setItems(itemsGiftProduct);
      }
    } else {
      if (itemsProducts && itemsProducts !== undefined) {
        setItems(itemsProducts);
      }
    }
  })

  const minusItem = () => {
    if (itemQuantity > 1) setItemQuantity(itemQuantity - 1);
  };

  const plusItem = () => {
    setItemQuantity(itemQuantity + 1);
  };

  return (
    <div className="single-product-container">
      <div className="sp-container">
        <div className="sp-img-container">
          <img src={items.image} className="sp-img" />
        </div>
        <div className="sp-details">
          <h3 className="sp-name">{items.name}</h3>
          <p className="sp-size">{items.size}</p>
          <p className="sp-price">{items.price}</p>
          <div className="sp-desc">{items.desc}</div>
          <div className="quantity-text">Quantity:</div>
          <div className="sp-counter">
            <button className="buttonminus" onClick={minusItem}>
              -
            </button>
            <p>{itemQuantity}</p>
            <button className="buttonplus" onClick={plusItem}>
              +
            </button>
          </div>
          <button
            className="sp-add-to-cart"
            onClick={() => {
              if (isToken) {
                dispatch(addCartItem({ client_id: user.id, product_id: items._id, quantity: itemQuantity }));
              } else {
                navigate("/login");
              }
            }}
          >
            Add to Cart
          </button>
          <button
            className="sp-add-to-cart"
            onClick={() => {
              dispatch(addWishlistItem({ client_id: user.id, product_id: items._id }));
            }}
          >
            Add to Wishlist
          </button>
        </div>
      </div>
    </div >
  )
};

export default SingleProduct;