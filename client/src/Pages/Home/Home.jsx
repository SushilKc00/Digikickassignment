import React from "react";
import { Layout } from "../../components/Layout/Layout";
import "./Home.css";
import { NavLink } from "react-router-dom";
// import logo from "../../assets/stringminds.png";

export const Home = () => {
  const handleChange = (e) => {};
  return (
    <Layout>
      <div className="home-container">
        <h2>WELCOME TO HELIVERSE </h2>
        <p>Click Start Button to create CURD operation</p>
        <NavLink to="/user/create">
          <button>START</button>
        </NavLink>
      </div>
    </Layout>
  );
};
