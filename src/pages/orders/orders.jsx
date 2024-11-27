import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserContext from "../../context/user-context";
import { getPlaceOrderThunk } from "../../store/features/orders/thunk";
import { getDeliveryStatus } from "../../utils/util";
import "./orders.css";

const Orders = () => {
  const dispatch = useDispatch();
  const orderItem = useSelector((state) => state.orders.orders);
  const { user } = useContext(UserContext)

  useEffect(() => {
    if (user && user._id) {
      dispatch(getPlaceOrderThunk(user._id));
    }
  }, [dispatch, user])

  return (
    <div className="order-list-wrapper">
      {
        orderItem.length > 0 ? (orderItem.map((item, index) => (
          <Link to={`/order/${item._id}`} key={index + 1} className="w-100">
            <div className="order-content" key={index + 1}>
              <div className="img-section">
                <img src={item.products[0].image} alt="tea" />
              </div>
              <div className="title-section">
                {item.products[0].name}
              </div>
              <div className="price-section">
                ${item.amount}
              </div>
              <div className="order-status-section">
                <div>
                  <div className="delivery-date-and-status">
                    <span className={`status ${getDeliveryStatus(item.expected_delivery_date[3].date) === "Delivered" && 'delivered-status'}`}></span>Delivery expected by {getDeliveryStatus(item.expected_delivery_date[3].date)}</div>
                  <div>Your Order has been placed.</div>
                </div>
              </div>
            </div>
          </Link>
        ))) : (
          <div className="no-data-found">
            <p>No Order Place.</p>
          </div>
        )
      }
    </div>
  )
};

export default Orders;