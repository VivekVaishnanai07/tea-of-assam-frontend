import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import rightbutton from "../../assets/img/right.png";
import addToCartImg from "../../assets/svg/cart2.svg";
import wishlistImg from "../../assets/svg/wishlist.svg";
import { getAllGiftProductsThunk, } from "../../store/features/gift-products/thunk.jsx";
import { getAllProductsThunk } from "../../store/features/products/thunk.jsx";
import { addWishlistItem } from "../../store/features/wishlist/thunk.jsx";
import { addCartItem } from '../../store/features/cart/thunk.jsx';
import "./dashboard.css";

const Dashboard = () => {
  let navigate = useNavigate();
  let isToken = localStorage.getItem('clientToken');
  const dispatch = useDispatch();
  const productsItems = useSelector((state) => state.products.products);
  const itemsGiftProducts = useSelector((state) => state.giftProducts.giftProducts);

  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [productLeft, setProductLeft] = useState("product");

  const filteredProducts = productsItems !== undefined && productsItems.filter((product) => product.featured === true);
  const itemsPerPage = windowWidth < 891 ? 2 : filteredProducts.length;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  useEffect(() => {
    if (isToken) {
      setUser(jwtDecode(isToken));
    }
  }, [isToken])

  useEffect(() => {
    dispatch(getAllProductsThunk());
    dispatch(getAllGiftProductsThunk());
  }, [dispatch])

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setCurrentPage(0);
  }, [itemsPerPage, filteredProducts.length]);

  const paginate = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
    setProductLeft("product");
  };

  const paginateMinus = () => {
    setCurrentPage((prevPage) => {
      if (prevPage - 1 < 0) {
        return totalPages - 1;
      } else {
        return prevPage - 1;
      }
    });
    setProductLeft("product-left-swipe");
  };

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const giftSubtitles =
    "As the coffee shop market becomes more popular, the number of cafe websites is growing. The internet and social media play an important role in finding new customers.";

  return (
    <div className="dashboard-wrapper">
      <div className="hero-container">
        <div className="hero-background-image"></div>
        <h1 className="hero-heading">Assam's Finest Tea</h1>
        <p className="hero-subtitle">
          A Sip of Authenticity, Directly from the Tea Gardens to Your Cup
        </p>
        <Link to="/all-products">
          <button className="shop-now">Explore</button>
        </Link>
      </div>
      <div className="featured-container">
        <div className="featured-heading">
          <p className="featured-text">Featured Products</p>
          <Link to="/all-products">
            <p className="f-show-more">View All </p>
          </Link>
        </div>
        <div className="featured-products-890px">
          <div className="featured-products">
            {currentItems.map((item, index) => (
              <div key={index + 1} className={productLeft}>
                <Link to={`/products/${item._id}?type=products`}>
                  <img className="product-image" src={item.image} alt={item.name} />
                </Link>
                <div className="product-details">
                  <h3 className="product-name">
                    <Link to={`/products/${item._id}?type=products`}>
                      {item.name}
                    </Link>
                  </h3>
                  <p className="product-size">{item.size}</p>
                  <p className="product-price">${item.price}</p>
                  <div>
                    <button
                      className="padd-to-wish"
                      onClick={() => {
                        if (isToken) {
                          dispatch(addWishlistItem({ client_id: user.id, product_id: item._id }));
                        } else {
                          navigate("/login");
                        }
                      }}
                    >
                      <img src={wishlistImg} alt="Add to Wishlist" />
                    </button>
                    <button
                      className="padd-to-cart"
                      onClick={() => {
                        if (isToken) {
                          // Check if the item is already in the cart
                          const existingItem = productsItems.find((product) => product._id === item._id);
                          if (existingItem) {
                            // If the item already exists, increase its quantity by 1
                            dispatch(addCartItem({ client_id: user.id, product_id: item._id, quantity: 1 }));
                          } else {
                            // If the item doesn't exist in the cart, add it with a quantity of 1
                            dispatch(addCartItem({ client_id: user.id, product_id: item._id, quantity: 1 }));
                          }
                        } else {
                          navigate("/login");
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
          {windowWidth < 891 && totalPages > 1 && (
            <div className="pagination">
              <img
                className="prev-page"
                src={rightbutton}
                alt="Prev Page"
                onClick={paginateMinus}
              />
              <img
                className="nextPage"
                src={rightbutton}
                alt="Next Page"
                onClick={paginate}
              />
            </div>
          )}
        </div>
      </div>
      <div className="gift-main-container">
        <div className="gift-container">
          <div className="gift-bg-image"></div>
          <div className="gift-info">
            <h3 className="gift-boxes-text">Gift Boxes</h3>
            <h2 className="gift-heading">
              Gift your loved ones the Tea of Assam Gift Boxes
            </h2>
            <p className="gift-subtitles">{giftSubtitles}</p>
          </div>

          <div className="gift-products">
            {itemsGiftProducts !== undefined && itemsGiftProducts.map((item, index) => (
              <div key={index + 1} className="gift-product">
                <Link to={`/products/${item._id}?type=gift`}>
                  <img src={item.image} alt="gift-image" className="gift-image" />
                </Link>
                <div className="gift-details">
                  <Link to={`/products/${item._id}?type=gift`}>
                    <h2 className="gift-name">{item.name}</h2>
                  </Link>
                  <h3 className="gift-size">{item.size}</h3>
                  <h3 className="gift-price">${item.price}</h3>

                  <div className="gift-btns">
                    <button
                      className="gift-padd-to-wish"
                      onClick={() => {
                        if (isToken) {
                          dispatch(addWishlistItem({ client_id: user.id, product_id: item._id }));
                        } else {
                          navigate("/login");
                        }
                      }}
                    >
                      <img src={wishlistImg} alt="Add to Wishlist" />
                    </button>
                    <button
                      className="gift-padd-to-cart"
                      onClick={() => {
                        if (isToken) {
                          dispatch(addCartItem({ client_id: user.id, product_id: item._id, quantity: 1 }));
                          toast.success("Added to Cart", { duration: 1000 });
                        } else {
                          navigate("/login");
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
