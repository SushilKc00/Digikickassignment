import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaArrowCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";
import { VscAccount } from "react-icons/vsc";
import { AiOutlineShoppingCart, AiOutlineClose } from "react-icons/ai";
import { TbPhone, TbSearch } from "react-icons/tb";
import { RxHamburgerMenu } from "react-icons/rx";
import "./Header.css";
import Logo from "../../assets/logo.png";
export const Header = () => {
  const [sticky, addSticky] = useState(false);
  const [toogle, setToggle] = useState(false);
  const navigate = useNavigate();

  const handleTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 250) {
        addSticky(true);
      } else {
        addSticky(false);
      }
    });
  }, []);
  return (
    <>
      <header className={sticky ? "sticky" : ""}>
        <nav className="nav-bar">
          {/* logo section  */}
          <div className="left-nav">
            <div
              className="menu"
              onClick={() => {
                setToggle(!toogle);
              }}
            >
              {toogle ? <AiOutlineClose /> : <RxHamburgerMenu />}
            </div>
            <figure>
              <NavLink to="/">
                <img src={Logo} alt="logo" className="image-logo" />
              </NavLink>
            </figure>
          </div>

          {/* navlink-section  */}
          {localStorage.getItem("userid") ? (
            <div className="nav-bar-links">
              <button
                className="links"
                onClick={() => {
                  localStorage.clear();
                  navigate("/login");
                }}
              >
                <IoIosLogIn className="icons" /> Logout
              </button>
            </div>
          ) : (
            <div className="nav-bar-links">
              <NavLink className="links" to="/login">
                <IoIosLogIn className="icons" /> Login
              </NavLink>
              <NavLink className="links" to="/register">
                <IoIosLogIn className="icons" /> Register
              </NavLink>
            </div>
          )}
        </nav>
        <div className={toogle ? "nav-list show" : "nav-list"}></div>
      </header>
      <div
        className={sticky ? "top-slider show-slide" : "top-slider"}
        onClick={handleTop}
      >
        <FaArrowAltCircleUp style={{ fontSize: "2.4rem", color: "white" }} />
      </div>
    </>
  );
};
