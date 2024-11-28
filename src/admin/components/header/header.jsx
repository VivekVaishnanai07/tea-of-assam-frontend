import { useLocation } from "react-router-dom";
import "./header.css";
import { useEffect, useState } from "react";

const titleName = [{ name: "Overview", pathname: "dashboard" },
{ name: "Orders Details", pathname: "orders" },
{ name: "Analytics Dashboard", pathname: "analytics" },
{ name: "Products", pathname: "products" },
{ name: "Sales Dashboard", pathname: "sales" },
{ name: "Settings", pathname: "settings" },
{ name: "Users", pathname: "users" }]

const Header = () => {
  const location = useLocation();
  const pathname = location.pathname.replace("/admin/", "");

  const [title, setTitle] = useState("");

  useEffect(() => {
    titleName.map((item) => {
      if (item.pathname === pathname) {
        setTitle(item.name);
      }
    })
  }, [title, pathname]);

  return (
    <div className="admin-header-wrapper">
      <div className="header-content">
        <div className="header-title">{title}</div>
      </div>
    </div>
  )
};

export default Header;