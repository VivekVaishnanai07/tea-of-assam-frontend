import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  useEffect(() => {
    const isToken = localStorage.getItem("adminToken");
    if (isToken) {
      navigate("/admin/dashboard")
    }
  }, [navigate])

  const handleSignIn = () => {
    if (email && password) {
      axios
        .post("http://localhost:3300/api/admin/login", { email, password })
        .then((res) => {
          if (res.data) {
            localStorage.setItem("adminToken", res.data.token);
            toast.success('Login successfully!');
            navigate("/admin/dashboard");
          }
        })
        .catch((error) => {
          const errorMessage = error.response?.data;
          toast.error(errorMessage);
        });
    } else {
      toast.error("Email and password are required");
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <div className="admin-login-content">
        <h3>Login Here</h3>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          placeholder="Email or Phone"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-btn" onClick={handleSignIn}>
          Log In
        </button>
      </div>
    </div>
  );
};

export default Login;
