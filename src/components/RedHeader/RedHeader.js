import style from "./RedHeader.module.css";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";

<link
  href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
  rel="stylesheet"
></link>;
const RedHeader = () => {
  // isVisible (State Variable) Holds true initially, meaning the header is visible by default. setIsVisible (State Setter Function) Used to update the value of isVisible.

  const [isVisible, setIsVisible] = useState(true);

  // When the close button (<RxCross2 />) is clicked, setIsVisible(false) sets isVisible to false, which hides the header.
  const handleClick = () => {
    setIsVisible(false); // Hides the component
  };
  return (
    <>
      {/* {isVisible && (...)} The header is only shown if isVisible is true. If isVisible is false, nothing is rendered. */}
      {isVisible && (
        <header className={style.redheader}>
          <div className={style.flex1}>
            <p className={style.special}>[ Special Offers ]</p>
            <div className={style.flex2}>
              <p className={style.p1}>
                Sign up to receive the latest Top deal exclusives discounts
              </p>
              <a className={style.learn} href="">
                Learn more
              </a>
            </div>
            <button onClick={handleClick} className={style.btn}>
              <RxCross2 />
            </button>
          </div>
        </header>
      )}
    </>
  );
};

export default RedHeader;
