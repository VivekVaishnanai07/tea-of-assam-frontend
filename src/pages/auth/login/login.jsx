import React, { useEffect, useRef, useState } from 'react';
import './login.css';
import api from "../../../utils/util";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const [canResend, setCanResend] = useState(true);
  const [showOTP, setShowOTP] = useState(false); // To control form visibility
  const inputsRef = useRef([]);
  const timerIdRef = useRef(null);

  useEffect(() => {
    if (showOTP) startTimer(); // Start timer only when OTP box is shown

    // Clean up the timer on unmount
    return () => clearInterval(timerIdRef.current);
  }, [showOTP]);

  const startTimer = () => {
    setCanResend(false); // Disable resend while timer is running
    timerIdRef.current = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 1) {
          clearInterval(timerIdRef.current);
          setCanResend(true); // Allow resend once timer expires
          return 0;
        }
        return prevTimeLeft - 1;
      });
    }, 1000);
  };

  const resendOTP = () => {
    if (canResend) {
      toast.success('New OTP sent!');
      setTimeLeft(120); // Reset the timer to 30 seconds
      setCanResend(false); // Disable resend until timer finishes
      inputsRef.current.forEach((input) => {
        input.value = ''; // Clear previous input
        input.disabled = false;
      });
      inputsRef.current[0].focus();
      clearInterval(timerIdRef.current); // Reset any ongoing timer
      startTimer(); // Restart the timer
      handleSignIn();
    } else {
      toast.error('Please wait until the timer expires to resend the code.');
    }
  };

  const verifyOTP = () => {
    const otp = inputsRef.current.map((input) => input.value).join('');
    if (otp.length === 6) {
      if (timeLeft > 0) {
        api.post("verify-otp", { email, otp }).then((res) => {
          if (res.data && res.data.token) {
            localStorage.setItem("clientToken", res.data.token);
            toast.success('OTP verified successfully!');
            navigate("/dashboard");
          }
        }).catch((error) => {
          toast.error('OTP verification failed. Please try again!');
        })
      } else {
        toast.error('OTP has expired. Please request a new one.');
      }
    } else {
      toast.error('Please enter a 6-digit OTP');
    }
  };

  const handleInput = (e, index) => {
    if (e.target.value.length > 1) {
      e.target.value = e.target.value.slice(0, 1);
    }
    if (e.target.value.length === 1 && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      inputsRef.current[index - 1].focus();
    }
    if (e.key === 'e') {
      e.preventDefault(); // Prevent entering 'e' in the input
    }
  };

  const handleSignIn = () => {
    if (email && password) {
      axios.post("http://localhost:3300/api/login", { email, password }).then((res) => {
        if (res.data) {
          toast.success(res.data.message)
          setShowOTP(true);
        }
      }).catch((error) => {
        toast.error(error.response.data);
      });
    } else {
      toast.error("Email and password is invalid");
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="login-wrapper">
      <div className="container">
        <div className="left-panel"></div>
        <div className="right-panel">
          {!showOTP ? (
            <div className="login-box">
              <h2>Welcome Back, Please login to your account</h2>
              <label>Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required />

              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required />

              <input type="button" value="Sign In" onClick={handleSignIn} />
            </div>
          ) : (
            <div className="otp-verification-box">
              <h1>OTP Verification</h1>
              <p>Enter the OTP you received to <span id="email">{email}</span></p>
              <div className="otp-input">
                {[...Array(6)].map((_, index) => (
                  <input
                    key={index}
                    type="number"
                    min="0"
                    max="9"
                    required
                    ref={(el) => (inputsRef.current[index] = el)}
                    onInput={(e) => handleInput(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    disabled={timeLeft <= 0}
                  />
                ))}
              </div>
              <button onClick={verifyOTP}>Verify</button>
              <div className="resend-text">
                Didn't receive the code?{' '}
                <span className="resend-link" onClick={resendOTP}>
                  Resend Code
                </span>
                <span id="timer" className={timeLeft === 0 ? "expired" : ""}>
                  {timeLeft > 0 ? `(${minutes}:${seconds.toString().padStart(2, '0')})` : 'Code expired'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
