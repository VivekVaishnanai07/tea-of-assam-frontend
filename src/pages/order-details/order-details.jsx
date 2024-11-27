import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AddUserIcon from "../../assets/svg/add-user.svg";
import CancelIcon from "../../assets/svg/cancel.svg";
import ChatIcon from "../../assets/svg/chat.svg";
import RupeeSignIcon from "../../assets/svg/rupee-sign.svg";
import { getOrderDataThunk } from "../../store/features/orders/thunk";
import { formatPrice } from "../../utils/util";
import "./order-details.css";
import PaymentModal from "../../components/payment-modal/payment-modal";

const OrderDetails = () => {
  const params = useParams() ;
  const dispatch = useDispatch();

  const [currentStatus, setCurrentStatus] = useState("");
  const [orderData, setOrderData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const orderDetails = useSelector((state) => state.orders.orderDetails);

  useEffect(() => {
    if (params.id) {
      dispatch(getOrderDataThunk({ orderId: params.id }));
    }
  }, [params.id, dispatch]);

  useEffect(() => {
    if (orderDetails) {
      setOrderData(orderDetails);
    }
  }, [orderDetails])

  useEffect(() => {
    // Function to add the appropriate day suffix (st, nd, rd, th)
    function getDaySuffix(day) {
      const j = day % 10;
      const k = day % 100;
      if (j === 1 && k !== 11) {
        return `${day}st`;
      }
      if (j === 2 && k !== 12) {
        return `${day}nd`;
      }
      if (j === 3 && k !== 13) {
        return `${day}rd`;
      }
      return `${day}th`;
    }

    // Get the current date
    const currentDate = new Date();

    // Format the date to "Tue, 19th Nov"
    const formattedDate = format(currentDate, 'EEE, dd MMM');
    const dayWithSuffix = formattedDate.replace(/(\d+)/, (match) => getDaySuffix(match));

    if (orderData && orderData.expected_delivery_date) {
      orderData.expected_delivery_date.map((item) => {
        if (item.date === dayWithSuffix) {
          setCurrentStatus(item.label);
        }
      });
    }
  }, [orderData]);

  const getCurrentStepIndex = () => {
    return orderData && orderData.expected_delivery_date.findIndex((step) => step.label === currentStatus);
  };

  const handlePay = () => {
    setIsOpen(true);
  }

  const currentStepIndex = getCurrentStepIndex();

  return (
    <>
      <div className="order-details-wrapper">
        <div className="top-section">
          <div className="address-content">
            <div className="header-title">Delivery Address</div>
            <div className="client-name">{orderData && orderData.shipping_address.name}</div>
            <div className="address">
              {orderData &&
                `${orderData.shipping_address.street}, ${orderData.shipping_address.locality}, ${orderData.shipping_address.city} - ${orderData.shipping_address.pinCode}, ${orderData.shipping_address.state}`}
            </div>
            <div>
              <b>Phone Number :</b> {orderData && orderData.shipping_address.number}
            </div>
          </div>
          <div className="reward-content">
            <div className="header-title">Tour Rewards</div>
            <div className="reward">
              <img
                src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/lockinEarlyAccess_e0bd6e.png"
                className="reward-icon"
                alt="Reward Icon"
              />
              <div>
                <div>Early Access to this Sale</div>
                <div>For Flipkart Plus Members</div>
              </div>
            </div>
          </div>
          <div className="action-content">
            <div className="header-title">More Actions</div>
            {orderData && orderData.payment_method === "COD" && (
              <div className="pay-content">
                <div className="icon-text-align">
                  <img src={RupeeSignIcon} className="pay-icon" alt="Rupee Sign" />
                  <div>Prefer contactless delivery?</div>
                </div>
                <button className="action-btn" onClick={handlePay}>Pay Now</button>
              </div>
            )}
            <div className="share-user-content">
              <div className="icon-text-align">
                <img
                  src={AddUserIcon}
                  className="share-user-icon"
                  alt="Add User Icon"
                />
                <div>Share order details</div>
              </div>
              <button className="action-btn">Share Order</button>
            </div>
          </div>
        </div>
        <div className="bottom-section">
          <div className="product-details-section">
            {orderData && orderData.products && orderData.products[0] && (
              <>
                <img
                  className="product-img"
                  src={orderData.products[0].image}
                  alt={orderData.products[0].name}
                />
                <div>
                  <div className="product-title">
                    {orderData.products[0].name}
                  </div>
                  <div className="seller-name">
                    {orderData.products[0].name}
                  </div>
                  <div className="price">
                    ${formatPrice(orderData.amount)}
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="tracking-section">
            {orderData && orderData.expected_delivery_date && orderData.expected_delivery_date.map((step, index) => {
              const stepClass =
                index < currentStepIndex
                  ? "completed"
                  : index === currentStepIndex
                    ? currentStepIndex === orderData.expected_delivery_date.length - 1
                      ? "completed"
                      : "active"
                    : "";
              return (
                <div className={`line ${stepClass}`} key={index}>
                  <div className="inner-line"></div>
                  <div className="dot"></div>
                  <div className={`status ${stepClass}`}>{step.label}</div>
                  <div className="dates">{step.date}</div>
                </div>
              );
            })}
          </div>
          <div className="order-query-section">
            <div className="align-btn-and-text">
              <img src={CancelIcon} alt="Cancel Icon" className="cancel-btn" /> Cancel
            </div>
            <div className="align-btn-and-text">
              <img src={ChatIcon} alt="Chat Icon" className="chat-icon" /> Chat with us
            </div>
          </div>
        </div>
      </div>
      <PaymentModal isOpen={isOpen} setIsOpen={setIsOpen} orderDetails={orderDetails} currentStatus={currentStatus} />
    </>
  );
};

export default OrderDetails