import { jwtDecode } from "jwt-decode";
import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import headerLogo from "../../assets/img/headerlogo.png";
import accountIcon from "../../assets/svg/account.svg";
import cartIcon from "../../assets/svg/cart2.svg";
import closeSearch from "../../assets/svg/close2.svg";
import dropdown from "../../assets/svg/dd.svg";
import searchImg from "../../assets/svg/search.svg";
import wishlistIcon from "../../assets/svg/wishlist.svg";
import CartContext from "../../context/cart-context";
import { getCartProductsList } from "../../store/features/cart/thunk";
import { getWishlist } from "../../store/features/wishlist/thunk";
import "./header.css";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  let isToken = localStorage.getItem('clientToken');

  const [user, setUser] = useState(null);
  const [wishCount, setWishCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchIcon, setSearchIcon] = useState(searchImg);
  const [pholder, setPlaceholder] = useState("Search products...");
  const [isOpen, setIsOpen] = useState(false);
  const { showCart } = useContext(CartContext);

  // Get wishlist and cart items from Redux store
  const wishItems = useSelector((state) => state.wishlist.wishlistProducts);
  const cartItems = useSelector((state) => state.cart.cartProducts);

  useEffect(() => {
    if (isToken) {
      setUser(jwtDecode(isToken));
    }
  }, [isToken])

  useEffect(() => {
    if (user && user.id) {
      dispatch(getWishlist(user.id))
      dispatch(getCartProductsList(user.id))
    }
  }, [dispatch, user])

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 800) {
        setPlaceholder("Search");
      } else {
        setPlaceholder("Search products...");
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (wishItems && wishItems.length > 0) {
      setWishCount(wishItems.length);
    } else {
      setWishCount(0);
    }
  }, [wishItems]);

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      setCartCount(cartItems.length);
    } else {
      setCartCount(0);
    }
  }, [cartItems]);

  const filteredProducts = [];
  // searchTerm.length >= 2
  //   ? Products.filter(
  //     (product) =>
  //       product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       product.brandName.toLowerCase().includes(searchTerm.toLowerCase())
  //   )
  //   : [];

  const toggleInput = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => inputRef.current.focus(), 0);
    }
  };

  const logout = () => {
    localStorage.removeItem("clientToken");
    navigate("/login");
    window.location.reload();
  }

  return (
    <div className="header-container">
      <header className="header">
        <Link to="/">
          <img src={headerLogo} alt="" className="header-logo" />
        </Link>
        <ul className="navigation">
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/all-products">Shop Now</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li className="pages">
            Company <img className="dd" src={dropdown} alt="dropdown icon" />
            <ul className="dropdown-content">
              <li>
                <Link to="/about">About TOA</Link>
              </li>
              <li>
                <Link to="/wholesale">Wholesale</Link>
              </li>
              <li>
                <Link to="/faqs">FAQs</Link>
              </li>
              <li>
                <Link to="/policies">Policies</Link>
              </li>
            </ul>
          </li>
        </ul>

        <div className="head-icons-container">
          <div
            className={
              isOpen ? "head-search-container-open" : "head-search-container"
            }
          >
            <div className="search-modal-content">
              <input
                type="text"
                placeholder={pholder}
                className={isOpen ? "head-search-input-open" : "head-search-input"}
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setSearchIcon(closeSearch);
                }}
                ref={inputRef}
              />

              <div className="search-results">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/products/${product.slug}`}
                    state={{ items: product }}
                  >
                    <div className="search-result-item">
                      <img
                        className="search-p-img"
                        src={product.image}
                        alt={product.name}
                      />
                      <div className="search-p-name">{product.name}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <img
              onClick={() => {
                toggleInput();
                setSearchTerm("");
                setSearchIcon(isOpen ? searchImg : closeSearch);
              }}
              src={searchIcon}
              alt=""
              className="search-icon head-icons"
              aria-label="Toggle search input"
              role="button"
            />
          </div>
          <span className="pages">
            <Link to="/account">
              <img
                src={accountIcon}
                alt="account-icon"
                className="account-icon head-icons"
              />
            </Link>
            {isToken && (
              <ul className="dropdown-content account-dropdown">
                <li>
                  <Link to="/orders">Orders</Link>
                </li>
                <li>
                  <Link onClick={logout}>Log Out</Link>
                </li>
              </ul>
            )}
          </span>

          <span className="wishlist-icon-container">
            <Link to="/wishlist">
              <img
                src={wishlistIcon}
                alt="wishlist-icon"
                className="wishlist-icon head-icons"
              />
            </Link>
            {wishCount > 0 && <span className="wishlist-counter">{wishCount}</span>}
          </span>

          <span className="cart-icon-container">
            <img
              onClick={() => {
                if (isToken) {
                  showCart()
                } else {
                  navigate("/login");
                }
              }}
              src={cartIcon}
              alt=""
              className="cart-icon head-icons"
            />
            {cartCount > 0 && <span className="cart-counter">{cartCount}</span>}
          </span>
        </div>
      </header>
    </div>
  );
};

export default Header;
