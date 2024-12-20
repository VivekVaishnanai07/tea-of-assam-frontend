import { Link, useLocation } from "react-router-dom";
import "./order-place.css";

function OrderPlace() {
  const location = useLocation();
  const { orderId } = location.state || {};

  return (
    <div className="thank-you-container">
      <h2>Thank You!</h2>
      <p>Your order has been placed successfully. {orderId && (`Order ID :- ${orderId}`)}</p>
      <Link to="/">
        <button className="go-to-home">Go to Home</button>
      </Link>
    </div>
  );
}

export default OrderPlace;