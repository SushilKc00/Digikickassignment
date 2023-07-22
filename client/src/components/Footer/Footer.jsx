import React from "react";
import "../Footer/Footer.css";
import {
  IoLogoGooglePlaystore,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";
import { TbTruckReturn } from "react-icons/tb";
import { BsRocketTakeoff } from "react-icons/bs";
import { SlSupport } from "react-icons/sl";
import {
  AiFillApple,
  AiFillInstagram,
  AiFillTwitterSquare,
  AiFillFacebook,
  AiFillYoutube,
} from "react-icons/ai";
export const Footer = () => {
  return (
    <footer>
      <hr style={{ marginTop: "3rem" }} />

      <div className="footer-last">
        <p>© 2023, Digi kick Private Limited. All Rights Reserved.</p>
        <div className="social-media">
          <AiFillTwitterSquare
            style={{
              fontSize: "4rem",
              width: "65px",
              padding: "1rem 2rem",
              height: "65px",
              borderRadius: "50%",
              backgroundColor: "rgb(240, 237, 231)",
              color: "black",
            }}
          />
          <AiFillFacebook
            style={{
              fontSize: "4rem",
              width: "65px",
              padding: "1rem 2rem",
              height: "65px",
              borderRadius: "50%",
              backgroundColor: "rgb(240, 237, 231)",
              color: "black",
            }}
          />
          <AiFillInstagram
            style={{
              fontSize: "4rem",
              width: "65px",
              padding: "1rem 2rem",
              height: "65px",
              borderRadius: "50%",
              backgroundColor: "rgb(240, 237, 231)",
              color: "black",
            }}
          />
          <AiFillYoutube
            style={{
              fontSize: "4rem",
              width: "65px",
              padding: "1rem 2rem",
              height: "65px",
              borderRadius: "50%",
              backgroundColor: "rgb(240, 237, 231)",
              color: "black",
            }}
          />
        </div>
      </div>
    </footer>
  );
};
