import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./SignUp.module.css";
import Logo from "../../images/web-logo-3.png";
import googleImage from "../../images/google-logo-NePEveMl.svg";
import microsoftImage from "../../images/microsoft-logo-BUXxQnXH.svg";
import { Link } from "react-router-dom";

const SignIn = () => {
  const ScrollUp = () => {
    window.scroll(0, 0);
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error when user types
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Get stored user data
    const storedUser = JSON.parse(localStorage.getItem("userData"));

    // Check if credentials match
    if (
      !storedUser ||
      storedUser.email !== formData.email ||
      storedUser.password !== formData.password
    ) {
      setErrors({ password: "Invalid email or password" }); // Show error below password field
      return;
    }

    // Show success message
    setIsSubmitted(true);

    // Redirect to home page after 3 seconds
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className={style.pDiv}>
      {isSubmitted ? (
        <div className={style.successMessage}>Login successful</div>
      ) : (
        <>
          <img src={Logo} alt="Maganlal Logo" className={style.logo} />
          <div className={style.mDiv}>
            <h2>Welcome Back</h2>
            <form onSubmit={handleSubmit}>
              <label>Your Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <span className={style.error}>{errors.email}</span>
              )}

              <label>Your Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter Your Password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <span className={style.error}>{errors.password}</span>
              )}

              <button type="submit" className={style.button} onClick={ScrollUp}>
                Continue
              </button>
            </form>

            <p>
              Don't have an account?{" "}
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <span style={{ color: "#ff395c" }} onClick={ScrollUp}>
                  Sign Up
                </span>
              </Link>
            </p>

            <div className={style.directLink}>
              <span>
                <img src={googleImage} alt="Google Logo" />
              </span>
              Continue With Google
            </div>

            <div className={style.directLink}>
              <span>
                <img src={microsoftImage} alt="Microsoft Logo" />
              </span>
              Continue With Microsoft Account
            </div>

            <Link to="/" style={{textDecoration:"none"}}>
              {" "}
              <p className={style.backShop}>Back To Shop ?</p>{" "}
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default SignIn;
