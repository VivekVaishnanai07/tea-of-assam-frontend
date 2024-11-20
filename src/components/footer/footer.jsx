import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer-main">
      <ul className="footer-elements">
        <li>
          <Link to="/about">About Us</Link>
        </li>
        <li>
          <Link to="/contact">Contact Us</Link>
        </li>
        <li>
          <Link to="/policies">Our Policies</Link>
        </li>
        <li>
          <Link to="/faqs">FAQs</Link>
        </li>
      </ul>
    </div>
  )
};

export default Footer;