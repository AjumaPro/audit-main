import React, { useState, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


// OTP Input Component
const OTPInput = ({ length = 6, otp, setOtp }) => {
  const inputs = useRef([]);

  const handleChange = (e, index) => {
    const { value } = e.target;

    // Only allow single digit input
    if (value.match(/^\d$/)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to the next input
      if (index < length - 1) {
        inputs.current[index + 1].focus();
      }
    }

    // Move focus to previous input on backspace
    if (value === '' && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '') {
      // Move focus to previous input on backspace if current input is empty
      if (index > 0) {
        inputs.current[index - 1].focus();
      }
    }
  };

  return (
    <div className="d-flex justify-content-center">
      {otp.map((_, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          value={otp[index]}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => (inputs.current[index] = el)}
          className="form-control mx-1"
          style={{
            width: '40px',
            height: '40px',
            textAlign: 'center',
            fontSize: '18px',
            borderRadius: '4px',
          }}
        />
      ))}
    </div>
  );
};

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formErrors, setFormErrors] = useState({ email: '', password: '' });

  // Send OTP to mobile number
  const sendOtp = async () => {
    try {
      const response = await axios.post('http://localhost:5000/send-otp', { mobileNumber });
      console.log(response.data);
    } catch (error) {
      console.error(error);
      setErrorMessage('Error sending OTP');
    }
  };

  // Verify OTP
  const verifyOtp = async () => {
    try {
      const otpString = otp.join('');
      const response = await axios.post('http://localhost:5000/verify-otp', {
        mobileNumber,
        otp: otpString,
      });
      console.log(response.data);
      setIsOtpVerified(true);
      setShowLoginForm(true);
    } catch (error) {
      setErrorMessage('Invalid OTP. Please try again.');
    }
  };

  // Handle Signup form submission
  const handleSignup = (e) => {
    e.preventDefault();

    let errors = { email: '', password: '' };
    let isValid = true;

    // Basic email validation
    if (!email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      errors.email = 'Invalid email format.';
      isValid = false;
    }

    // Basic password validation
    if (!password) {
      errors.password = 'Password is required.';
      isValid = false;
    }

    // Check if mobile number is provided
    if (!mobileNumber) {
      setErrorMessage('Mobile number is required.');
      isValid = false;
    }

    // Update form errors
    setFormErrors(errors);

    if (isValid) {
      sendOtp(); // Send OTP on signup (API call)
      setShowOtpInput(true);
    }
  };

  // Handle Login form submission
  const handleLogin = (e) => {
    e.preventDefault();

    if (isOtpVerified) {
      // Here, you'd send login details to the backend for validation
      setErrorMessage('Login successful!');
    } else {
      setErrorMessage('Please verify your OTP first.');
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      {!showLoginForm && !showOtpInput ? (
        // Signup Form
        <form onSubmit={handleSignup} className="text-center">
          <h3>Sign Up</h3>
          <div className="form-group">
            <input
              type="text"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="Mobile Number"
              className="form-control mb-3"
            />
            {formErrors.email && <div className="text-danger">{formErrors.email}</div>}
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="form-control mb-3"
            />
            {formErrors.password && <div className="text-danger">{formErrors.password}</div>}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="form-control mb-3"
            />
            <button type="submit" className="btn btn-success btn-block mb-3">
              Send OTP
            </button>
            {errorMessage && <div className="text-danger">{errorMessage}</div>}
          </div>
        </form>
      ) : showOtpInput ? (
        // OTP Input Form
        <form onSubmit={verifyOtp} className="text-center">
          <h3>Enter OTP</h3>
          <OTPInput otp={otp} setOtp={setOtp} />
          <button type="submit" className="btn btn-success btn-block mt-3">
            Verify OTP
          </button>
          {errorMessage && <div className="text-danger">{errorMessage}</div>}
        </form>
      ) : (
        // Login Form
        <form onSubmit={handleLogin} className="text-center">
          <h3>Login</h3>
          <div className="form-group">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="form-control mb-3"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="form-control mb-3"
            />
            <button type="submit" className="btn btn-primary btn-block mt-3">
              Login
            </button>
            {errorMessage && <div className="text-danger">{errorMessage}</div>}
          </div>
        </form>
      )}
    </div>
  );
};

export default App;
