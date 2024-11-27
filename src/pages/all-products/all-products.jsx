import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import addToCartImg from "../../assets/svg/cart2.svg";
import wishlistImg from "../../assets/svg/wishlist.svg";
import { addCartItem } from "../../store/features/cart/thunk";
import { getAllProductsThunk } from "../../store/features/products/thunk";
import { addWishlistItem } from "../../store/features/wishlist/thunk";
import "./all-products.css";

const AllProducts = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  let isToken = localStorage.getItem("clientToken");
  let productsItems = useSelector((state) => state.products.products);

  useEffect(() => {
    if (isToken) {
      setUser(jwtDecode(isToken));
    }
  }, [isToken])


  useEffect(() => {
    dispatch(getAllProductsThunk());
  }, [dispatch]);

  return (
    <div className="all-products-container">
      <div className="all-products">
        {productsItems !== undefined && productsItems.map((item, index) => (
          <div key={index + 1} className="all-product">
            <Link to={`/products/${item.product_id}?type=products`} >
              <img
                className="all-product-image"
                src={item.image}
                alt={item.name}
              />
            </Link>
            <div className="all-product-details">
              <h3 className="all-product-name">
                <Link to={`/products/${item._id}?type=products`}>
                  {item.name}
                </Link>
              </h3>
              <p className="all-product-size">{item.size}</p>
              <p className="all-product-price">${item.price}</p>
              <div className="all-products-btns">
                <button
                  className="all-padd-to-wish"
                  onClick={() => {
                    if (isToken) {
                      dispatch(addWishlistItem({ client_id: user.id, product_id: item._id }));
                    } else {
                      navigate("/login");
                    }
                  }}
                >
                  <img src={wishlistImg} />
                </button>
                <button
                  className="all-padd-to-cart"
                  onClick={() => {
                    if (isToken) {
                      dispatch(addCartItem({ client_id: user.id, product_id: item._id, quantity: 1 }));
                      toast.success("Added to Cart", { duration: 1000 });
                    } else {
                      navigate("/login");
                    }
                  }}
                >
                  <img src={addToCartImg} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllProducts;