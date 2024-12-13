import { jwtDecode } from "jwt-decode";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import AddIcon from "../../assets/svg/add.svg";
import ClockIcon from "../../assets/svg/clock.svg";
import deleteImg from "../../assets/svg/delete.svg";
import ReloadIcon from "../../assets/svg/reload.svg";
import { decreaseQuantity, getCartProductsList, increaseQuantity, removeCartItem } from "../../store/features/cart/thunk";
import { addNewAddressThunk, clientsThunk, updateAddressThunk } from "../../store/features/clients/thunk";
import { placeOrderThunk } from "../../store/features/orders/thunk";
import { generateTrackingNumber, generateTransactionID } from "../../utils/util";
import "./new-checkout.css";

const NewCheckout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);
  const isToken = localStorage.getItem("clientToken");
  const user = jwtDecode(isToken);

  const [activeSection, setActiveSection] = useState(2);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [editingAddressIndex, setEditingAddressIndex] = useState(null);
  const [clientDetails, setClientDetails] = useState({
    name: "",
    mobile: "",
    zip: "",
    locality: "",
    streetAddress: "",
    city: "",
    state: "",
    type: "home"
  })
  const [addNewAddress, setAddNewAddress] = useState(false);
  const [addNewDeliveryAddress, setAddNewDeliveryAddress] = useState({
    name: "",
    mobile: "",
    zip: "",
    locality: "",
    streetAddress: "",
    city: "",
    state: "",
    type: "home"
  })
  const [errors, setErrors] = useState({
    name: true,
    mobile: true,
    zip: true,
    locality: true,
    streetAddress: true,
    city: true,
    state: true,
    type: true,
  });
  const [timeLeft, setTimeLeft] = useState(900);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [upiValue, setUpiValue] = useState("");
  const [upiButton, setUpiButton] = useState(true);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: ""
  });
  const [userInput, setUserInput] = useState('');
  const [captchaText, setCaptchaText] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(null);
  const [platformCharge, setPlatformCharge] = useState(3);

  const cartItems = useSelector((state) => state.cart.cartProducts);
  const userData = useSelector((state) => state.clients.client);
  const addressData = useSelector((state) => state.clients.addressData);

  useEffect(() => {
    if (localStorage.getItem('orderPlaced')) {
      navigate('/order-place');
    }
  }, [navigate]);

  useEffect(() => {
    if (user) {
      dispatch(getCartProductsList(user.id));
      dispatch(clientsThunk({ clientId: user.id }));
    }
  }, [dispatch])

  useEffect(() => {
    if (userData.deliveryAddresses) {
      if (selectedAddress === null) {
        setSelectedAddress(userData.deliveryAddresses[0]);
      }
      setClientDetails({
        name: "",
        mobile: "",
        zip: "",
        locality: "",
        streetAddress: "",
        city: "",
        state: "",
        type: "home"
      });
    }
  }, [userData.deliveryAddresses, selectedAddress])

  useEffect(() => {
    if (activeSection === 4) {
      // Reset timer when this section becomes active
      setTimeLeft(900); // Reset to 5 minutes
      clearInterval(intervalRef.current); // Clear any previous timer

      // Start a new timer
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    } else {
      // Clear the timer if the section is closed
      clearInterval(intervalRef.current);
    }

    // Cleanup timer when component unmounts
    return () => clearInterval(intervalRef.current);
  }, [activeSection]);

  useEffect(() => {
    if (selectedPaymentMethod === "cod") {
      initializeCaptcha();
    }
  }, [selectedPaymentMethod]);

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      setCartCount(cartItems.length);
      const total = cartItems.reduce((acc, item) => {
        const itemTotal = item.price * item.quantity;
        return acc + itemTotal;
      }, 0);
      setTotalAmount(total);
    } else {
      setCartCount(0);
    }
  }, [cartItems]);

  const toggleSection = (index) => {
    setActiveSection(index);
  };

  const logout = () => {
    localStorage.removeItem("clientToken");
    navigate("/login");
    window.location.reload();
  }

  const handleAddressSelect = (address) => {
    if (address === "addressNew") {
      setSelectedAddress(address);
      setAddNewDeliveryAddress({
        name: "",
        mobile: "",
        zip: "",
        locality: "",
        streetAddress: "",
        city: "",
        state: "",
        type: "home"
      });
    } else {
      console.log(addNewAddress);
      setSelectedAddress(address);
      setAddNewAddress(false);
    }
  };

  const handleAddressFormChange = (index, address) => {
    const addressToEdit = userData.deliveryAddresses[index];
    setEditingAddressIndex(index);
    setClientDetails({
      ...addressToEdit,
    });
    setSelectedAddress(address);
    if (address !== "addressNew") {
      setAddNewDeliveryAddress({
        name: "",
        mobile: "",
        zip: "",
        locality: "",
        streetAddress: "",
        city: "",
        state: "",
        type: "home"
      });
      setAddNewAddress(false);
    }
  }

  const handleTypeChange = (event, address) => {
    const { value } = event.target;
    if (address === "update") {
      setClientDetails((prevDetails) => ({
        ...prevDetails,
        type: value,
      }));
    } else {
      setAddNewDeliveryAddress((prevDetails) => ({
        ...prevDetails,
        type: value,
      }));
    }
  };

  const handleAddNewAddressFormChange = () => {
    setSelectedAddress("addressNew");
    setAddNewAddress(!addNewAddress);
    setEditingAddressIndex(null);
  }

  const saveAndHereAddress = (address) => {
    let isValid = true;

    if (!/^[A-Za-z\s]+$/.test(address === "update" ? clientDetails.name : addNewDeliveryAddress.name)) {
      errors.lastName = false;
      toast.error("Invalid Name");
      isValid = false;
    }

    if (!/^\d+$/.test(address === "update" ? clientDetails.mobile : addNewDeliveryAddress.mobile)) {
      errors.mobile = false;
      toast.error("Invalid Mobile Number");
      isValid = false;
    }

    if (!/^\d{6}(-\d{5})?$/.test(address === "update" ? clientDetails.zip : addNewDeliveryAddress.zip)) {
      errors.zip = false;
      toast.error("Invalid ZipCode");
      isValid = false;
    }

    const locality = address === "update" ? !clientDetails.locality.trim() : !addNewDeliveryAddress.locality.trim();
    if (locality) {
      errors.locality = false;
      toast.error("Invalid Locality");
      isValid = false;
    }

    const streetAddress = address === "update" ? !clientDetails.streetAddress.trim() : !addNewDeliveryAddress.streetAddress.trim();
    if (streetAddress) {
      errors.streetAddress = false;
      toast.error("Invalid Address");
      isValid = false;
    }

    const city = address === "update" ? !clientDetails.city.trim() : !addNewDeliveryAddress.city.trim();
    if (city) {
      errors.city = false;
      toast.error("Invalid City");
      isValid = false;
    }

    const state = address === "update" ? !clientDetails.state.trim() : !addNewDeliveryAddress.state.trim();
    if (state) {
      errors.state = false;
      toast.error("Invalid State");
      isValid = false;
    }
    setErrors(errors);

    if (address === "update") {
      if (isValid) {
        dispatch(updateAddressThunk({ clientId: userData._id, newAddress: clientDetails }))
        dispatch(clientsThunk({ clientId: user.id }));
        if (addressData) {
          setClientDetails({
            name: "",
            mobile: "",
            zip: "",
            locality: "",
            streetAddress: "",
            city: "",
            state: "",
            type: "home"
          });
          setSelectedAddress(clientDetails);
          setActiveSection(3);
        }
      }
    } else if (address === "add") {
      if (isValid) {
        dispatch(addNewAddressThunk({ clientId: userData._id, newAddress: addNewDeliveryAddress }))
        dispatch(clientsThunk({ clientId: user.id }));
        if (addressData) {
          setAddNewDeliveryAddress({
            name: "",
            mobile: "",
            zip: "",
            locality: "",
            streetAddress: "",
            city: "",
            state: "",
            type: "home"
          });
          setSelectedAddress(addNewDeliveryAddress);
          setActiveSection(3);
        }
      }
    }
  }

  const handleRemoveFromCart = (id) => {
    if (id && user) {
      dispatch(removeCartItem({ client_id: user.id, product_id: id }))
    }
  }

  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity({ client_id: user.id, product_id: id }));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity({ client_id: user.id, product_id: id }));
  };

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
  };

  function validateUPI() {
    const upiPattern = /^[0-9]{10}@[a-zA-Z0-9]+$/;
    if (upiPattern.test(upiValue)) {
      toast.success("Valid UPI ID format.")
      setUpiButton(false);
    } else {
      toast.error("Invalid UPI ID.")
      setUpiButton(true);
    }
  }

  const validateCardDetails = () => {
    let valid = true;

    // Trim spaces from inputs
    const cardNumber = cardDetails.cardNumber.replace(/\s+/g, ''); // Remove spaces
    const expiryDate = cardDetails.expiryDate.trim();
    const cvv = cardDetails.cvv.trim();

    // Card number validation (16 digits, spaces allowed)
    const cardNumberPattern = /^[0-9]{16}$/;
    if (!cardNumberPattern.test(cardNumber)) {
      toast.error("Card number must be 16 digits (no spaces or dashes).");
      valid = false;
    }

    // Expiry date validation (MM/YY format)
    const expiryDatePattern = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    if (!expiryDatePattern.test(expiryDate)) {
      toast.error("Expiry date must be in MM/YY format.");
      valid = false;
    } else {
      // Check if expiry date is in the future
      const [month, year] = expiryDate.split('/').map(Number);
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100; // Last two digits of current year
      const currentMonth = currentDate.getMonth() + 1;

      if (year < currentYear || (year === currentYear && month < currentMonth)) {
        toast.error("Your card is expiry.");
        valid = false;
      }
    }

    // CVV validation (3 digits)
    const cvvPattern = /^[0-9]{3,4}$/; // Support 4 digits for AmEx
    if (!cvvPattern.test(cvv)) {
      toast.error("CVV must be 3 or 4 digits.");
      valid = false;
    }

    return valid;
  };

  const initializeCaptcha = (digitCount = 3) => {
    const canvas = canvasRef.current;

    // Ensure canvas is available
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const chars = '0123456789';

    // Generate random digits based on `digitCount`
    const generatedText = Array.from({ length: digitCount }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    ).join('');
    setCaptchaText(generatedText); // Set the generated text for validation

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set background color
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw each digit at random positions and orientations
    for (let i = 0; i < digitCount; i++) {
      const digit = generatedText[i];

      // Randomize position
      const x = 10 + i * 40 + Math.random() * 10; // Horizontal spacing + slight offset
      const y = 30 + Math.random() * 10; // Vertical randomness, restricted to stay within 50px height

      // Save canvas state
      ctx.save();

      // Randomize rotation
      const angle = (Math.random() - 0.5) * 0.5; // Random rotation between -0.25 to +0.25 radians
      ctx.translate(x, y); // Move to the digit's position
      ctx.rotate(angle); // Rotate the canvas

      // Draw the digit
      ctx.font = '40px Pinyon Script';
      ctx.fillStyle = '#00a63f'; // Green color for digits
      ctx.fillText(digit, 0, 0);

      // Restore canvas state
      ctx.restore();
    }

    // Add random noise lines
    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }
  };

  const handleReload = () => {
    initializeCaptcha();
    setUserInput('');
  };

  const handlePlaceOrder = (paymentMethod) => {
    if (paymentMethod === "COD") {
      if (userInput === captchaText) {
        const orderData = {
          clientId: userData._id,
          email: userData.email,
          products: cartItems,
          orderTotal: totalAmount,
          orderStatus: "Processing",
          shippingAddress: selectedAddress,
          shippingMethod: "Standard",
          shippingStatus: "In Transit",
          trackingNumber: generateTrackingNumber(),
          paymentMethod: paymentMethod,
          amount: totalAmount + platformCharge,
          transaction_id: generateTransactionID()
        };
        dispatch(placeOrderThunk(orderData)).unwrap()
          .then((response) => {
            if (response.orderId) {
              localStorage.setItem('orderPlaced', 'true');
              dispatch(getCartProductsList(user.id));
              navigate('/order-place', { state: { orderId: response.orderId } });
            }
          })
          .catch((error) => {
            toast.error("Order placement failed. Please try again.");
            console.error(error);
          });
      } else {
        toast.info('Incorrect CAPTCHA. Reloading...');
        initializeCaptcha();
        setUserInput('');
      }
    } else if (paymentMethod === "CARD") {
      if (validateCardDetails()) {
        const orderData = {
          clientId: userData._id,
          email: userData.email,
          products: cartItems,
          orderTotal: totalAmount,
          orderStatus: "Processing",
          shippingAddress: selectedAddress,
          shippingMethod: "Standard",
          shippingStatus: "In Transit",
          trackingNumber: generateTrackingNumber(),
          paymentMethod: paymentMethod,
          amount: totalAmount + platformCharge,
          transaction_id: generateTransactionID(),
          cardNumber: cardDetails.cardNumber,
          cardExpiryDate: cardDetails.expiryDate,
          cvv: cardDetails.cvv
        };
        dispatch(placeOrderThunk(orderData)).unwrap()
          .then((response) => {
            if (response.orderId) {
              localStorage.setItem('orderPlaced', 'true');
              dispatch(getCartProductsList(user.id));
              navigate('/order-place', { state: { orderId: response.orderId } });
            }
          })
          .catch((error) => {
            toast.error("Order placement failed. Please try again.");
            console.error(error);
          });
      }
    } else if (paymentMethod === "UPI") {
      const orderData = {
        clientId: userData._id,
        email: userData.email,
        products: cartItems,
        orderTotal: totalAmount,
        orderStatus: "Processing",
        shippingAddress: selectedAddress,
        shippingMethod: "Standard",
        shippingStatus: "In Transit",
        trackingNumber: generateTrackingNumber(),
        paymentMethod: paymentMethod,
        amount: totalAmount + platformCharge,
        transaction_id: generateTransactionID(),
        upiId: upiValue
      };
      dispatch(placeOrderThunk(orderData)).unwrap()
        .then((response) => {
          if (response.orderId) {
            localStorage.setItem('orderPlaced', 'true');
            dispatch(getCartProductsList(user.id));
            navigate('/order-place', { state: { orderId: response.orderId } });
          }
        })
        .catch((error) => {
          toast.error("Order placement failed. Please try again.");
          console.error(error);
        });
    }
  }

  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="checkout-wrapper">
      <div className="checkout-container">
        <div className="checkout-left">
          {/* Section: Login */}
          <div className="checkout-section">
            <div className={`section-header ${activeSection === 1 ? "active" : activeSection > 1 && "inactive"}`}>
              <div className="section-header-content">
                <span className="section-step">1</span>
                <div>
                  <span className="section-title">
                    Login
                    {activeSection > 1 && (<svg height="10" width="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="check-icon"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" stroke="#cdcdcd"></path></svg>)}
                  </span>
                  {activeSection > 1 && (
                    <div className="section-summary">
                      <span className="summary-detail">{userData.firstName} {userData.lastName}</span>
                      <span className="summary-detail">{userData.mobileNumber}</span>
                    </div>
                  )}
                </div>
              </div>
              {activeSection > 1 && (
                <button className="action-btn" onClick={() => toggleSection(1)}>
                  Change
                </button>
              )}
            </div>
            {activeSection === 1 && (
              <div className="section-content">
                <div className="login-section-content">
                  <div className="login-left-content">
                    <div className="mb-12">
                      <span className="user-info-label">Name</span>
                      <span className="user-name">{user.firstName} {user.lastName}</span>
                    </div>
                    <div className="mb-12">
                      <span className="user-info-label">Phone</span>
                      <span className="user-number">{userData.mobileNumber}</span>
                    </div>
                    <div className="mb-12">
                      <span className="logout-option" onClick={logout}>Logout & Sign in to another account</span>
                    </div>
                    <div className="mb-12">
                      <button className="primary-btn" onClick={() => toggleSection(2)}>
                        Continue Checkout
                      </button>
                    </div>
                  </div>
                  <div className="login-right-content">
                    <div className="advantages-title">Advantages of our secure login</div>
                    <div className="advantages-list">
                      <div className="advantage-item">
                        <span className="advantage-icon">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon-track-orders"
                          >
                            <g fill="#cdcdcd" fillRule="evenodd">
                              <path
                                d="M9.466 18.257h4.87c0 1.764 1.42 3.195 3.174 3.195a3.185 3.185 0 0 0 3.175-3.195H22.5c.276 0 .499-.23.499-.496v-5.57l-3.273-4.868h-3.261V4.645a.497.497 0 0 0-.497-.502H1.497A.498.498 0 0 0 1 4.645v13.11c0 .277.219.502.497.502h1.62a3.185 3.185 0 0 0 3.175 3.195 3.185 3.185 0 0 0 3.174-3.195zm6.978-8.381H18.7l2.214 3.057h-4.47V9.876zm2.644 8.381c0 .877-.706 1.588-1.578 1.588a1.583 1.583 0 0 1-1.578-1.588c0-.877.706-1.588 1.578-1.588.872 0 1.578.71 1.578 1.588zm-11.218 0c0 .877-.707 1.588-1.578 1.588a1.583 1.583 0 0 1-1.579-1.588c0-.877.707-1.588 1.579-1.588.871 0 1.578.71 1.578 1.588z"
                                fill="#cdcdcd"
                              ></path>
                            </g>
                          </svg>
                        </span>
                        <span className="advantage-text">Easily Track Orders, Hassle-free Returns</span>
                      </div>
                      <div className="advantage-item">
                        <span className="advantage-icon">
                          <svg
                            className="icon-alerts"
                            width="18"
                            height="18"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g fill="#cdcdcd" fillRule="evenodd">
                              <path
                                className="icon-alerts"
                                d="M8.037 17.546c1.487 0 2.417-.93 2.417-2.417H5.62c0 1.486.93 2.415 2.417 2.415m5.315-6.463v-2.97h-.005c-.044-3.266-1.67-5.46-4.337-5.98v-.81C9.01.622 8.436.05 7.735.05 7.033.05 6.46.624 6.46 1.325v.808c-2.667.52-4.294 2.716-4.338 5.98h-.005v2.972l-1.843 1.42v1.376h14.92v-1.375l-1.842-1.42z"
                              ></path>
                            </g>
                          </svg>
                        </span>
                        <span className="advantage-text">Get Relevant Alerts and Recommendations</span>
                      </div>
                      <div className="advantage-item">
                        <span className="advantage-icon">★</span>
                        <span className="advantage-text">Wishlist, Reviews, Ratings, and more.</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="login-note">
                  Please note that upon clicking "Logout" you will lose all items in the cart and will be redirected to the Flipkart home page.
                </div>
              </div>
            )}
          </div>

          {/* Section: Delivery Address */}
          <div className="checkout-section">
            <div className={`section-header ${activeSection === 2 ? "active" : activeSection > 2 && "inactive mh-90"}`}>
              <div className="section-header-content">
                <span className="section-step">2</span>
                <div>
                  <span className="section-title">
                    Delivery Address
                    {activeSection > 2 && (
                      <svg height="10" width="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="check-icon">
                        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" stroke="#cdcdcd"></path>
                      </svg>
                    )}
                  </span>
                  {activeSection > 2 && (
                    <div className="section-summary">
                      <span className="summary-detail">
                        <span className="address-name">{selectedAddress.name}</span>
                        {selectedAddress.street}, {selectedAddress.locality}, {selectedAddress.city}, {selectedAddress.state} -
                        <span className="address-zip"> {selectedAddress.pinCode}</span>
                      </span>
                    </div>
                  )}
                </div>
              </div>
              {activeSection > 2 && (
                <button className="action-btn" onClick={() => {
                  setSelectedAddress(selectedAddress);
                  toggleSection(2);
                  setAddNewAddress(false);
                }}>
                  Change
                </button>
              )}
            </div>
            {activeSection === 2 && (
              <div className="section-content address-section">
                <div className="address-radio-group">
                  {userData.deliveryAddresses !== undefined && userData.deliveryAddresses.map((address, index) => (
                    <React.Fragment key={index}>
                      {editingAddressIndex === index ? (
                        <div className="address-form">
                          <div className="address-item d-block">
                            <div className="d-flex">
                              <input
                                type="radio"
                                id={`address${index}`}
                                name="selectedAddress"
                                value={`address${index}`}
                                checked={selectedAddress === address}
                                onChange={() => handleAddressSelect(address)}
                              />
                              <label htmlFor={`address${index}`} className="address-btn"></label>
                              <div className="address-form-title">
                                Edit Address</div>
                            </div>
                            <div className="p-16">
                              <div className="form-column">
                                <div className="w-100">
                                  <label>Name</label>
                                  <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    className={errors.name ? "" : "error-input"}
                                    value={clientDetails.name || address.name}
                                    onChange={(e) => setClientDetails({ ...clientDetails, name: e.target.value })}
                                  />
                                </div>
                                <div className="w-100">
                                  <label>Mobile Number</label>
                                  <input
                                    type="text"
                                    name="mobile"
                                    className={errors.mobile ? "" : "error-input"}
                                    value={clientDetails.mobile || address.number}
                                    onChange={(e) => setClientDetails({ ...clientDetails, mobile: e.target.value })}
                                  />
                                </div>
                              </div>
                              <div className="form-column">
                                <div className="w-100">
                                  <label>Pin Code</label>
                                  <input
                                    placeholder="Pin Code"
                                    type="text"
                                    name="zip"
                                    className={errors.zip ? "" : "error-input"}
                                    value={clientDetails.zip || address.pinCode}
                                    onChange={(e) => setClientDetails({ ...clientDetails, zip: e.target.value })}
                                  />
                                </div>
                                <div className="w-100">
                                  <label>Locality</label>
                                  <input
                                    placeholder="Locality"
                                    type="text"
                                    name="locality"
                                    className={errors.locality ? "" : "error-input"}
                                    value={clientDetails.locality || address.locality}
                                    onChange={(e) => setClientDetails({ ...clientDetails, locality: e.target.value })}
                                  />
                                </div>
                              </div>
                              <div className="form-column">
                                <div className="w-100">
                                  <label>Street Address</label>
                                  <input
                                    type="text"
                                    name="streetAddress"
                                    className={errors.streetAddress ? "" : "error-input"}
                                    value={clientDetails.streetAddress || address.street}
                                    onChange={(e) => setClientDetails({ ...clientDetails, streetAddress: e.target.value })}
                                  />
                                </div>
                              </div>
                              <div className="form-column">
                                <div className="w-100">
                                  <label>City</label>
                                  <input
                                    placeholder="City"
                                    type="text"
                                    name="city"
                                    className={errors.city ? "" : "error-input"}
                                    id="mr"
                                    value={clientDetails.city || address.city}
                                    onChange={(e) => setClientDetails({ ...clientDetails, city: e.target.value })}
                                  />
                                </div>
                                <div className="w-100">
                                  <label>State</label>
                                  <input
                                    placeholder="State"

                                    list="state-list"
                                    name="state"
                                    className={errors.state ? "" : "error-input"}
                                    value={clientDetails.state || address.state}
                                    onChange={(e) => setClientDetails({ ...clientDetails, state: e.target.value })}
                                  />
                                </div>
                              </div>
                              <div className="address-type-btn">
                                <label>Address Type:</label>
                                <div className="address-options">
                                  <div className="address-btn-wrapper">
                                    <input
                                      type="radio"
                                      id="type-home"
                                      name="addressType"
                                      value="home"
                                      checked={clientDetails.type === "home"}
                                      onChange={(e) => handleTypeChange(e, "update")}
                                    />
                                    <label htmlFor="type-home" className="address-btn"></label>
                                    <span className="address-label">Home (All day delivery)</span>
                                  </div>
                                  <div className="address-btn-wrapper">
                                    <input
                                      type="radio"
                                      id="type-work"
                                      name="addressType"
                                      value="work"
                                      checked={clientDetails.type === "work"}
                                      onChange={(e) => handleTypeChange(e, "update")}
                                    />
                                    <label htmlFor="type-work" className="address-btn"></label>
                                    <span className="address-label">Work (Delivery between 10 AM - 5 PM)</span>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <button className="save-and-here-btn" onClick={() => saveAndHereAddress("update")}>Save and Here</button>
                                <button className="cancel-btn" onClick={() => setEditingAddressIndex(null)}>Cancel</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div key={index} className="address-item">
                          <input
                            type="radio"
                            id={`address${index}`}
                            name="selectedAddress"
                            value={`address${index}`}
                            checked={selectedAddress === address}
                            onChange={() => handleAddressSelect(address)}
                          />
                          <label htmlFor={`address${index}`} className="address-btn"></label>
                          <div className="address-label">
                            <div className="address-details">
                              <div className="address-header">
                                <div>
                                  <span className="address-name">{address.name}</span>
                                  <span className="address-type">{address.type}</span>
                                  <span className="address-phone">{address.number}</span>
                                </div>
                              </div>
                              <div className="address-body">
                                {address.street}, {address.locality}, {address.city}, {address.state} -
                                <span className="address-zip"> {address.pinCode}</span>
                                {selectedAddress === address && (
                                  <button className="deliver-here-btn" onClick={() => toggleSection(3)}>
                                    Deliver Here
                                  </button>
                                )}
                              </div>
                            </div>
                            <div className="edit-btn" onClick={() => handleAddressFormChange(index, address)}>
                              Edit
                            </div>
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <div className="add-new-address-section">
                  {addNewAddress ? (
                    <div className="add-new-address-from address-item">
                      <input
                        type="radio"
                        id="addressNew"
                        name="selectedAddress"
                        value="addressNew"
                        checked={selectedAddress === "addressNew"}
                        onChange={() => handleAddressSelect("addressNew")}
                      />
                      <label htmlFor="addressNew" className="address-btn"></label>
                      <div className="address-form">
                        <div className="address-form-title">Add a new Address</div>
                        {/* Form fields for new address */}
                        <div className="p-16">
                          <div className="form-column">
                            <div className="w-100">
                              <label>Name</label>
                              <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                className={errors.name ? "" : "error-input"}
                                value={addNewDeliveryAddress.name}
                                onChange={(e) => setAddNewDeliveryAddress({ ...addNewDeliveryAddress, name: e.target.value })}
                              />
                            </div>
                            <div className="w-100">
                              <label>Mobile Number</label>
                              <input
                                type="text"
                                placeholder="Mobile Number"
                                name="mobile"
                                maxLength={10} pattern="\d{10}"
                                className={errors.mobile ? "" : "error-input"}
                                value={addNewDeliveryAddress.mobile}
                                onChange={(e) => setAddNewDeliveryAddress({ ...addNewDeliveryAddress, mobile: e.target.value })}
                              />
                            </div>
                          </div>
                          <div className="form-column">
                            <div className="w-100">
                              <label>Pin Code</label>
                              <input
                                placeholder="Pin Code"
                                type="text"
                                name="zip"
                                maxLength={6} pattern="\d{6}"
                                className={errors.zip ? "" : "error-input"}
                                value={addNewDeliveryAddress.zip}
                                onChange={(e) => setAddNewDeliveryAddress({ ...addNewDeliveryAddress, zip: e.target.value })}
                              />
                            </div>
                            <div className="w-100">
                              <label>Locality</label>
                              <input
                                placeholder="Locality"
                                type="text"
                                name="locality"
                                className={errors.locality ? "" : "error-input"}
                                value={addNewDeliveryAddress.locality}
                                onChange={(e) => setAddNewDeliveryAddress({ ...addNewDeliveryAddress, locality: e.target.value })}
                              />
                            </div>
                          </div>
                          <div className="form-column">
                            <div className="w-100">
                              <label>Street Address</label>
                              <input
                                type="text"
                                name="streetAddress"
                                className={errors.streetAddress ? "" : "error-input"}
                                value={addNewDeliveryAddress.streetAddress}
                                onChange={(e) => setAddNewDeliveryAddress({ ...addNewDeliveryAddress, streetAddress: e.target.value })}
                              />
                            </div>
                          </div>
                          <div className="form-column">
                            <div className="w-100">
                              <label>City</label>
                              <input
                                placeholder="City"
                                type="text"
                                name="city"
                                className={errors.city ? "" : "error-input"}
                                id="mr"
                                value={addNewDeliveryAddress.city}
                                onChange={(e) => setAddNewDeliveryAddress({ ...addNewDeliveryAddress, city: e.target.value })}
                              />
                            </div>
                            <div className="w-100">
                              <label>State</label>
                              <input
                                placeholder="State"
                                name="state"
                                className={errors.state ? "" : "error-input"}
                                value={addNewDeliveryAddress.state}
                                onChange={(e) => setAddNewDeliveryAddress({ ...addNewDeliveryAddress, state: e.target.value })}
                              />
                            </div>
                          </div>
                          <div className="address-type-btn">
                            <label>Address Type:</label>
                            <div className="address-options">
                              <div className="address-btn-wrapper">
                                <input
                                  type="radio"
                                  id="type-home"
                                  name="addressType"
                                  value="home"
                                  checked={addNewDeliveryAddress.type === "home"}
                                  onChange={(e) => handleTypeChange(e, "add")}
                                />
                                <label htmlFor="type-home" className="address-btn"></label>
                                <span className="address-label">Home (All day delivery)</span>
                              </div>
                              <div className="address-btn-wrapper">
                                <input
                                  type="radio"
                                  id="type-work"
                                  name="addressType"
                                  value="work"
                                  checked={addNewDeliveryAddress.type === "work"}
                                  onChange={(e) => handleTypeChange(e, "add")}
                                />
                                <label htmlFor="type-work" className="address-btn"></label>
                                <span className="address-label">Work (Delivery between 10 AM - 5 PM)</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <button className="save-and-here-btn" onClick={() => saveAndHereAddress("add")}>Save and Here</button>
                            <button className="cancel-btn" onClick={() => setAddNewAddress(false)}>Cancel</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <span className="add-new-address-box" onClick={handleAddNewAddressFormChange}>
                      <img src={AddIcon} className="mr-12" alt="add" />
                      Add a new address
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Section: Order Summary */}
          <div className="checkout-section">
            <div className={`section-header ${activeSection === 3 ? "active" : activeSection > 3 && "inactive"}`}>
              <div className="section-header-content">
                <span className="section-step">3</span>
                <div>
                  <span className="section-title">
                    Order Summary
                    {activeSection > 3 && (<svg height="10" width="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="check-icon"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" stroke="#cdcdcd"></path></svg>)}
                  </span>
                  {activeSection > 3 && (
                    <div className="section-summary">
                      <span className="summary-detail">
                        <span className="address-name">Item {cartCount}</span>
                      </span>
                    </div>
                  )}
                </div>
              </div>
              {activeSection > 3 && (
                <button className="action-btn" onClick={() => toggleSection(3)}>
                  Change
                </button>
              )}
            </div>
            {activeSection === 3 && (
              <div className="section-content">
                <div className="order-summary-section">
                  {cartItems.length > 0 && cartItems.map((item, index) => (
                    <div className="order-summary-product-card" key={index + 1}>
                      <div className="product-card-details">
                        <img className="product-img" src={item.image} alt={item.name} />
                        <div className="product-details">
                          <div className="horizontal-align">
                            <h3>{item.name}</h3>
                            <img className="products-delete-img" src={deleteImg} onClick={() => handleRemoveFromCart(item.product_id)} />
                          </div>
                          <div>
                            <p>{item.size}</p>
                          </div>
                          <div className="horizontal-align">
                            <p>${item.price * item.quantity}</p>
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
                      </div>
                    </div>
                  ))}
                </div>
                <div className="order-summary-confirm-section">
                  <span>Order confirmation email will be sent to <b>{userData.email}</b></span>
                  <button className="confirm-btn" onClick={() => toggleSection(4)}>
                    Continue
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Section: Payment Options */}
          <div className="checkout-section">
            <div className={`section-header ${activeSection === 4 ? "active" : ""}`}>
              <div className="section-header-content">
                <span className="section-step">4</span>
                <span className="section-title">Payment Options</span>
              </div>
            </div>
            {activeSection === 4 && (
              <div className="section-content">
                <div className="payment-options-section">
                  <div className="timer-section">
                    Complete payment in
                    <img className="time-icon" src={ClockIcon} alt="clock" />
                    <span>
                      {timeLeft > 0 ? `00 : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}` : 'Expired'}
                    </span>
                  </div>
                  <div className="payment-methods">
                    {/* UPI Section */}
                    <div className={`upi-section ${selectedPaymentMethod === "upi" ? "section-active" : ""}`}>
                      <input
                        type="radio"
                        id="upi"
                        name="paymentMethod"
                        value="upi"
                        checked={selectedPaymentMethod === "upi"}
                        onChange={() => handlePaymentMethodChange("upi")}
                      />
                      <label htmlFor="upi" className="address-btn"></label>
                      <div className="upi-content">
                        <label htmlFor="upi">UPI</label>
                        {selectedPaymentMethod === "upi" && (
                          <div className="payment-content">
                            <div className="content-align">
                              <input type="text" value={upiValue} placeholder="number@upi" onChange={(e) => setUpiValue(e.target.value)} />
                              <button className="verify-btn" onClick={validateUPI}>Verify</button>
                              <button className="upi-pay-btn" onClick={() => handlePlaceOrder("UPI")} disabled={upiButton}>Pay ${totalAmount}</button>
                            </div>
                            <div className="mt-8">
                              Pay by any UPI app
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Section */}
                    <div className={`card-section ${selectedPaymentMethod === "card" ? "section-active" : ""}`}>
                      <input
                        type="radio"
                        id="card"
                        name="paymentMethod"
                        value="card"
                        checked={selectedPaymentMethod === "card"}
                        onChange={() => handlePaymentMethodChange("card")}
                      />
                      <label htmlFor="card" className="address-btn"></label>
                      <div className="card-content">
                        <label htmlFor="card">Card / Debit / ATM Card</label>
                        {selectedPaymentMethod === "card" && (
                          <>
                            <div className="payment-content">
                              <div className="content-align">
                                <input
                                  type="text"
                                  placeholder="1234 1234 1234 1234"
                                  maxLength={19}
                                  value={cardDetails.cardNumber}
                                  onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                                />
                              </div>
                              <div className="content-align mt-8">
                                <input
                                  type="text"
                                  placeholder="Expiry Date (MM/YY)"
                                  className="expiry-date"
                                  value={cardDetails.expiryDate}
                                  onChange={(e) => setCardDetails({ ...cardDetails, expiryDate: e.target.value })}
                                />
                                <input
                                  type="password"
                                  placeholder="***"
                                  className="cvv"
                                  maxLength={3}
                                  value={cardDetails.cvv}
                                  onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                                />
                              </div>
                              <button className="upi-pay-btn mt-8" onClick={() => handlePlaceOrder("CARD")}>Pay ${totalAmount}</button>
                            </div>
                            <div className="mt-8">
                              Add and secure cards as per RBI guidelines
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* COD Section */}
                    <div className={`cod-section ${selectedPaymentMethod === "cod" ? "section-active" : ""}`}>
                      {/* Radio Button for COD */}
                      <input
                        type="radio"
                        id="cod"
                        name="paymentMethod"
                        value="cod"
                        checked={selectedPaymentMethod === "cod"}
                        onChange={() => handlePaymentMethodChange("cod")}
                      />
                      <label htmlFor="cod" className="address-btn"></label>
                      <div className="cod-content">
                        <label htmlFor="cod">Cash on Delivery (COD)</label>
                        {selectedPaymentMethod === "cod" && (
                          <>
                            <div className="charged-note">
                              Due to handling costs, a nominal fee of $10 will be charged
                            </div>
                            <div className="cod-form">
                              {/* CAPTCHA Wrapper */}
                              <div className="captcha-wrapper">
                                <canvas ref={canvasRef} className="captcha-canvas" width="130" height="50" />
                                <img
                                  src={ReloadIcon}
                                  alt="Reload CAPTCHA"
                                  className="captcha-reload"
                                  onClick={handleReload}
                                />
                              </div>

                              {/* Input for CAPTCHA */}
                              <input
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                className="captcha-input"
                                placeholder="Enter the characters"
                              />

                              {/* Submit Button */}
                              <button className="captcha-submit" onClick={() => handlePlaceOrder("COD")}>
                                Confirm Order
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Section: Order Summary */}
        <div className="checkout-right">
          <div className="order-summary">
            <div className="p-16">
              <div className="order-summary-item">
                <span>Price ({cartCount} item)</span>
                <span>${totalAmount}</span>
              </div>
              <div className="order-summary-item">
                <span>Delivery Charges</span>
                <span>
                  <span style={{ textDecorationLine: "line-through", paddingRight: "8px" }}>$40</span>
                  <span style={{ color: "#3fc43a", textTransform: "uppercase" }}>Free</span>
                </span>
              </div>
              <div className="order-summary-item">
                <span>Platform Fee</span>
                <span>${platformCharge}</span>
              </div>
              <div className="order-summary-item last">
                <span>Total Payable</span>
                <span>${totalAmount + platformCharge}</span>
              </div>
            </div>
            <div className="order-summary-item total">
              <span>Your Total Savings on this order ${totalAmount * 2}</span>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default NewCheckout;
