import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import CardIcon from "../../assets/img/card.png";
import UpiIcon from "../../assets/svg/upi.svg";
import { getOrderDataThunk, orderPaymentThunk } from "../../store/features/orders/thunk";
import "./payment-modal.css";

const PaymentModal = ({ isOpen, setIsOpen, orderDetails, currentStatus }) => {
  const dispatch = useDispatch();
  const [upiValue, setUpiValue] = useState("");
  const [upiButtonDisabled, setUpiButtonDisabled] = useState(true);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [paymentStep, setPaymentStep] = useState("options"); // 'options', 'UPI', 'CARD'

  const resetForm = () => {
    setUpiValue("");
    setUpiButtonDisabled(true);
    setCardDetails({ cardNumber: "", expiryDate: "", cvv: "" });
  };

  const closeModal = () => {
    setIsOpen(false);
    setPaymentStep("options");
    resetForm();
  };

  const navigateToStep = (step) => {
    setPaymentStep(step);
    if (step === "options") {
      resetForm();
    }
  };

  const validateUPI = () => {
    const upiPattern = /^[0-9]{10}@[a-zA-Z0-9]+$/;
    if (upiPattern.test(upiValue)) {
      toast.success("Valid UPI ID format.");
      setUpiButtonDisabled(false);
    } else {
      toast.error("Invalid UPI ID.");
      setUpiButtonDisabled(true);
    }
  };

  const validateCardDetails = () => {
    const { cardNumber, expiryDate, cvv } = cardDetails;
    let valid = true;

    const cleanCardNumber = cardNumber.replace(/\s+/g, "");
    const cardNumberPattern = /^[0-9]{16}$/;
    if (!cardNumberPattern.test(cleanCardNumber)) {
      toast.error("Card number must be 16 digits.");
      valid = false;
    }

    const expiryDatePattern = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!expiryDatePattern.test(expiryDate)) {
      toast.error("Expiry date must be in MM/YY format.");
      valid = false;
    } else {
      const [month, year] = expiryDate.split("/").map(Number);
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;

      if (year < currentYear || (year === currentYear && month < currentMonth)) {
        toast.error("Your card has expired.");
        valid = false;
      }
    }

    const cvvPattern = /^[0-9]{3,4}$/;
    if (!cvvPattern.test(cvv)) {
      toast.error("CVV must be 3 or 4 digits.");
      valid = false;
    }

    return valid;
  };

  const handlePlaceOrder = (paymentMethod) => {
    if (paymentMethod === "CARD") {
      if (validateCardDetails()) {
        const orderData = {
          orderId: orderDetails._id,
          clientId: orderDetails.client_id,
          orderStatus: currentStatus,
          paymentMethod: paymentMethod,
          cardNumber: cardDetails.cardNumber,
          cardExpiryDate: cardDetails.expiryDate,
          cvv: cardDetails.cvv
        };
        dispatch(orderPaymentThunk(orderData)).unwrap()
          .then((response) => {
            if (response.message) {
              dispatch(getOrderDataThunk({ orderId: orderDetails._id }))
              setIsOpen(false);
            }
          })
          .catch((error) => {
            toast.error("Order payment failed. Please try again.");
            console.error(error);
          });
      }
    } else if (paymentMethod === "UPI") {
      const orderData = {
        orderId: orderDetails._id,
        clientId: orderDetails.client_id,
        orderStatus: currentStatus,
        paymentMethod: paymentMethod,
        upiId: upiValue
      };
      dispatch(orderPaymentThunk(orderData)).unwrap()
        .then((response) => {
          if (response.message) {
            dispatch(getOrderDataThunk({ orderId: orderDetails._id }))
            setIsOpen(false);
          }
        })
        .catch((error) => {
          toast.error("Order payment failed. Please try again.");
          console.error(error);
        });
    }
  };

  return isOpen ? (
    <div className="payment-modal-wrapper">
      <div className="modal-content">
        <div className="modal-header-section">
          <h2>Select Payment Method</h2>
          <span className="close-btn" onClick={closeModal}>
            ×
          </span>
        </div>

        {paymentStep === "options" && (
          <div className="payment-option">
            <button className="upi-btn" onClick={() => navigateToStep("UPI")}>
              <img src={UpiIcon} alt="upi" className="upi-icon" />
            </button>
            <button className="card-btn" onClick={() => navigateToStep("CARD")}>
              <img src={CardIcon} alt="card" className="card-icon" />
            </button>
          </div>
        )}

        {paymentStep === "UPI" && (
          <div className="payment-content">
            <div className="content-align">
              <input
                type="text"
                value={upiValue}
                placeholder="number@upi"
                onChange={(e) => setUpiValue(e.target.value)}
              />
              <button className="verify-btn" onClick={validateUPI}>
                Verify
              </button>
            </div>
            <button
              className="upi-pay-btn"
              onClick={() => handlePlaceOrder("UPI")}
              disabled={upiButtonDisabled}
            >
              Pay ${orderDetails?.amount}
            </button>
            <button className="upi-pay-btn ml-8" onClick={() => navigateToStep("options")}>
              Back
            </button>
            <div>Pay by any UPI app</div>
          </div>
        )}

        {paymentStep === "CARD" && (
          <div className="payment-content">
            <div className="content-align">
              <input
                type="text"
                placeholder="1234 1234 1234 1234"
                maxLength={19}
                value={cardDetails.cardNumber}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, cardNumber: e.target.value })
                }
              />
            </div>
            <div className="content-align mt-8">
              <input
                type="text"
                placeholder="Expiry Date (MM/YY)"
                value={cardDetails.expiryDate}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, expiryDate: e.target.value })
                }
              />
              <input
                type="password"
                placeholder="CVV"
                maxLength={4}
                value={cardDetails.cvv}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, cvv: e.target.value })
                }
              />
            </div>
            <button
              className="upi-pay-btn mt-8"
              onClick={() => handlePlaceOrder("CARD")}
            >
              Pay ${orderDetails?.amount}
            </button>
            <button className="upi-pay-btn ml-8" onClick={() => navigateToStep("options")}>
              Back
            </button>
            <div className="mt-8">Add and secure cards as per RBI guidelines</div>
          </div>
        )}
      </div>
    </div>
  ) : null;
};

export default PaymentModal;