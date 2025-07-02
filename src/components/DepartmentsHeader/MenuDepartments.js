import style from "./MenuDepartments.module.css";
import { NavLink } from "react-router-dom";

const MenuDepartments = ({onHide}) => {
  return (
    <>
      <div>
        <p className={style.pp}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? style.activeLink : style.inactiveLink
            }
            style={{textDecoration:"none"}}
            onClick={onHide}
          >
            Home
          </NavLink>
        </p>
        <p className={style.pp}>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? style.activeLink : style.inactiveLink
            }
            style={{textDecoration:"none"}}
            onClick={onHide}
          >
            About Us
          </NavLink>
        </p>
        <p className={style.pp}>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? style.activeLink : style.inactiveLink
            }
            style={{textDecoration:"none"}}
            onClick={onHide}
          >
            Contact Us
          </NavLink>
        </p>
        <p className={style.pp}>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              isActive ? style.activeLink : style.inactiveLink
            }
            style={{textDecoration:"none"}}
            onClick={onHide}
          >
            Shop
          </NavLink>
        </p>
      </div>
    </>
  );
};

export default MenuDepartments;
