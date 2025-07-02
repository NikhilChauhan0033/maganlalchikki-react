import React, { useEffect, useState } from "react";
import style from "./MyAccountDetails.module.css";
import PathComponent from "../PathComponent/PathComponent";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const MyAccountDetails = () => {
  const [userData, setUserData] = useState({
    name: "Not Available",
    email: "Not Available",
    password: "Not Available",
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Get user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem("userData"));

    if (storedUser) {
      setUserData(storedUser);
    }
  }, []);

  return (
    <div className={style.mDiv}>
      <PathComponent text="My Account Details" />
      <div className={style.detailsDiv}>
        <p className={style.userIcon}><FaRegUserCircle /></p>
        <p><strong>Your Name :</strong> {userData.name}</p>
        <p><strong>Your Email :</strong> {userData.email}</p>

        {/* Password field with eye icon */}
        <p className={style.passwordContainer}>
          <strong>Your Password :</strong> 
          <input 
            type={showPassword ? "text" : "password"} 
            value={userData.password} 
            readOnly 
            className={style.passwordInput}
          />
          <span 
            className={style.eyeIcon} 
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </p>
        <div className={style.btnsDiv}>
       <Link to="/wishlist">
       <button className={style.button}>My Wishlist</button>
       </Link>
       <Link to="/cart">
       <button className={style.button}>My Cart</button>
       </Link>
        </div>
      </div>
    </div>
  );
};

export default MyAccountDetails;
