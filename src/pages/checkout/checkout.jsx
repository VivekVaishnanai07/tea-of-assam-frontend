import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import amex from "../../assets/img/amex.png";
import disc from "../../assets/img/disc.png";
import mastercard from "../../assets/img/master.png";
import visa from "../../assets/img/visa.png";
import pasteIcon from "../../assets/svg/paste.svg";
import { getCartProductsList } from "../../store/features/cart/thunk";
import { clientsThunk } from "../../store/features/clients/thunk";
import "./checkout.css";

function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartProducts);
  const clientData = useSelector((state) => state.clients.client);
  const isToken = localStorage.getItem("clientToken");

  const [clientDetails, setClientDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    streetAddress: "",
    city: "",
    zip: "",
    country: "India",
    state: "",
    mobile: "",
    cardHolderName: "",
  })

  const [paymentDetails, setPaymentDetails] = useState({
    subtotal: 0,
    shipAmount: 40,
    discount: 18,
    taxes: 10,
    totalAmount: 0,
    paidAmount: 0,
    cardNumber: "1234 5678 9012 3456",
    cvc: 9999,
    cardExpiryDate: "05/33"
  })

  const [errors, setErrors] = useState({
    firstName: true,
    lastName: true,
    email: true,
    streetAddress: true,
    city: true,
    zip: true,
    state: true,
    mobile: true,
    cardHolderName: true,
  });

  useEffect(() => {
    if (isToken) {
      dispatch(getCartProductsList(jwtDecode(isToken).id));
      dispatch(clientsThunk({ clientId: jwtDecode(isToken).id }));
    }
  }, [dispatch, isToken])

  useEffect(() => {
    const subtotal = cartItems.reduce((total, item) => {
      const itemPrice = item.price ? item.price : 0;
      return total + item.quantity * itemPrice;
    }, 0);

    const totalAmount = subtotal + paymentDetails.shipAmount + paymentDetails.taxes;
    const paidAmount = totalAmount - paymentDetails.discount;

    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      subtotal,
      totalAmount: totalAmount.toFixed(2),
      paidAmount: paidAmount.toFixed(2),
    }));
  }, [cartItems]);

  const sameAsAccountDetails = () => {
    setClientDetails({
      ...clientDetails,
      firstName: clientData.firstName,
      lastName: clientData.lastName,
      email: clientData.email,
      streetAddress: clientData.address,
      state: clientData.state,
      city: clientData.city,
      zip: clientData.pinCode,
      mobile: clientData.mobileNumber,
      cardHolderName: clientData.firstName + " " + clientData.lastName,
    });
  };

  function placeOrder() {
    let isValid = true;

    if (!/^[A-Za-z\s]+$/.test(clientDetails.firstName)) {
      errors.firstName = false;
      toast.error("Invalid First Name", { position: "bottom-center" });
      isValid = false;
    }

    if (!/^[A-Za-z\s]+$/.test(clientDetails.lastName)) {
      errors.lastName = false;
      toast.error("Invalid Last Name", { position: "bottom-center" });
      isValid = false;
    }

    if (!clientDetails.email.includes("@")) {
      errors.email = false;
      toast.error("Invalid Email", { position: "bottom-center" });
      isValid = false;
    }

    if (!clientDetails.streetAddress.trim()) {
      errors.streetAddress = false;
      toast.error("Invalid Address", { position: "bottom-center" });
      isValid = false;
    }

    if (!clientDetails.city.trim()) {
      errors.city = false;
      toast.error("Invalid City", { position: "bottom-center" });
      isValid = false;
    }

    if (!/^\d{6}(-\d{5})?$/.test(clientDetails.zip)) {
      errors.zip = false;
      toast.error("Invalid ZipCode", { position: "bottom-center" });
      isValid = false;
    }

    if (!clientDetails.state) {
      errors.state = false;
      toast.error("Invalid State", { position: "bottom-center" });
      isValid = false;
    }

    if (!/^\d+$/.test(clientDetails.mobile)) {
      errors.mobile = false;
      toast.error("Invalid Mobile Number", { position: "bottom-center" });
      isValid = false;
    }

    if (!/^[A-Za-z\s]+$/.test(clientDetails.cardHolderName)) {
      errors.cardHolderName = false;
      toast.error("Invalid Cardholder Name", { position: "bottom-center" });
      isValid = false;
    }

    setErrors(errors);
    if (isValid) {
      console.log("clientDetails----->", clientDetails);
      console.log("paymentDetails----->", paymentDetails);

      const products = [];
      cartItems.map((element) => {
        products.push({
          "id": element.product_id,
          "name": element.name,
          "quantity": element.quantity,
          "total-price": (element.price * element.quantity)
        })
      })
      console.log("cartItems----->", products);
      // navigate("/order-place");
    }
  }

  return (
    <div className="checkout-page">
      <div className="checkout-main-container">
        <div className="checkout-form">
          <div className="checkout-left">
            <div className="demo-details" onClick={sameAsAccountDetails}>
              <img src={pasteIcon} className="paste-image" />
              <p>Same As Account Details</p>
            </div>
            <label>Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="firstName"
              className={errors.firstName ? "" : "error-input"}
              value={clientDetails.firstName}
              onChange={(e) => setClientDetails({ ...clientDetails, firstName: e.target.value })}
            />
            <input
              type="text"
              name="lastName"
              placeholder="lastName"
              className={errors.lastName ? "" : "error-input"}
              value={clientDetails.lastName}
              onChange={(e) => setClientDetails({ ...clientDetails, lastName: e.target.value })}
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              className={errors.email ? "" : "error-input"}
              value={clientDetails.email}
              onChange={(e) => setClientDetails({ ...clientDetails, email: e.target.value })}
            />

            <label>Street Address</label>
            <input
              type="text"
              name="streetAddress"
              className={errors.streetAddress ? "" : "error-input"}
              value={clientDetails.streetAddress}
              onChange={(e) => setClientDetails({ ...clientDetails, streetAddress: e.target.value })}
            />
            <div className="city-zip">
              <input
                placeholder="City"
                type="text"
                name="city"
                className={errors.city ? "" : "error-input"}
                id="mr"
                value={clientDetails.city}
                onChange={(e) => setClientDetails({ ...clientDetails, city: e.target.value })}
              />

              <input
                placeholder="Zip Code"
                type="text"
                name="zip"
                id="ml"
                className={errors.zip ? "" : "error-input"}
                value={clientDetails.zip}
                onChange={(e) => setClientDetails({ ...clientDetails, zip: e.target.value })}
              />
            </div>

            <div className="country-state">
              <input
                type="text"
                name="country"
                id="mr2"
                value={clientDetails.country}
                readOnly
              />

              <input
                placeholder="State"
                id="ml2"
                list="state-list"
                name="state"
                className={errors.state ? "" : "error-input"}
                value={clientDetails.state}
                onChange={(e) => setClientDetails({ ...clientDetails, state: e.target.value })}
              />
            </div>

            <label>Mobile Number</label>
            <input
              type="tel"
              name="mobile"
              className={errors.mobile ? "" : "error-input"}
              value={clientDetails.mobile}
              onChange={(e) => setClientDetails({ ...clientDetails, mobile: e.target.value })}
            />
          </div>

          <div className="checkout-right">
            <div className="order-summary">
              <div className="order-summary-products">
                {cartItems.map((item, index) => (
                  <div key={index} className="order-item">
                    <img
                      className="checkout-product-image"
                      src={item.image}
                      alt={item.name}
                    />
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>
                      ${item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="order-totals">
                <div className="order-item">
                  <span>Subtotal</span>
                  <span>${paymentDetails.subtotal}</span>
                </div>
                <div className="order-item">
                  <span>Ship Amount</span>
                  <span>$40.00</span>
                </div>
                <div className="order-item">
                  <span>Discount</span>
                  <span>$18.00</span>
                </div>
                <div className="order-item">
                  <span>Taxes</span>
                  <span>$10.00</span>
                </div>
                <div className="order-item">
                  <span>Total Amount</span>
                  <span>${paymentDetails.totalAmount}</span>
                </div>
                <div className="order-item total">
                  <span>Paid Amount</span>
                  <span>${paymentDetails.paidAmount}</span>
                </div>
              </div>
            </div>

            <div className="card-information">
              <div className="test-mode">Test Mode</div>
              <label htmlFor="card-number">Card Number</label>
              <input
                type="text"
                id="card-number"
                value={paymentDetails.cardNumber}
                onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
                readOnly
              />
              <div className="card-icons">
                <img src={visa} alt="Visa" />
                <img src={mastercard} alt="MasterCard" />
                <img src={amex} alt="American Express" />
                <img src={disc} alt="Discover" />
              </div>

              <div className="expiry-cvc">
                <input
                  type="text"
                  id="expiry"
                  placeholder="MM / YY"
                  value={paymentDetails.cardExpiryDate}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, cardExpiryDate: e.target.value })}
                  readOnly
                />
                <input
                  type="password"
                  id="cvc"
                  placeholder="CVV/CVC"
                  value={paymentDetails.cvc}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, cvc: e.target.value })}
                  readOnly
                />
              </div>

              <label htmlFor="cardholder-name">Cardholder Name</label>
              <input
                type="text"
                id="cardholder-name"
                placeholder="Full name on card"
                value={clientDetails.cardHolderName}
                onChange={(e) => setClientDetails({ ...clientDetails, cardHolderName: e.target.value })}
                className={errors.cardHolderName ? "" : "error-input"}
              />
            </div>

            <input type="button" onClick={placeOrder} value="Place Order" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;