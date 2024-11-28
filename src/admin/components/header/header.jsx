import { useLocation } from "react-router-dom";
import "./header.css";

const Header = () => {
  const location = useLocation();
  // console.log(location);

  return (
    <div className="admin-header-wrapper">
      <div className="header-content">
        <div className="header-title">Dashboard</div>
      </div>
    </div>
  )
};

export default Header;