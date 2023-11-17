import React from "react";
import "../Login/Login.css";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../components/Layout/Layout";
import { Animate } from "../../Animate/Animate";
import { NavLink } from "react-router-dom";

import { loginSchema } from "../../Formvalidation/Loginschmea";
import { useFormik } from "formik";
const initialValues = {
  email: "",
  password: "",
};
export const Login = () => {
  const navigate = useNavigate();
  const { values, errors, handleBlur, handleSubmit, touched, handleChange } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: async () => {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        });
        const data = await res.json();
        if (data.success) {
          localStorage.setItem("userid", data.userid);
          navigate("/user/create");
          alert(data.message);
        } else {
          alert(data.message);
        }
      },
    });
  return (
    <Layout>
      <Animate />
      <div className="form-container">
        <div className="left-container">
          <h2>yolo</h2>
        </div>
        <div className="right-container">
          <h2
            style={{
              fontSize: "2.6rem",
              fontFamily: "sans-serif",
              textAlign: "center",
              letterSpacing: "0.1rem",
            }}
          >
            Welcome To Yolo
          </h2>
          <p
            style={{
              fontFamily: "sans-serif",
              fontSize: "1.4rem",
              textAlign: "center",
              marginTop: "0.6rem",
            }}
          >
            Glad to see you again
          </p>
          <form method="post" onSubmit={handleSubmit}>
            <div style={{ textAlign: "center" }}>
              <input
                type="email"
                name="email"
                placeholder="enter your email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className="input-area"
              />
              {errors.email && touched.email ? (
                <p
                  style={{
                    color: "red",
                    fontSize: "1.2rem",
                    marginTop: "0.6rem",
                  }}
                >
                  *{errors.email}
                </p>
              ) : (
                ""
              )}
            </div>
            <div style={{ textAlign: "center" }}>
              <input
                type="password"
                name="password"
                placeholder="enter your password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className="input-area"
              />
              {errors.password && touched.password ? (
                <p
                  style={{
                    color: "red",
                    fontSize: "1.2rem",
                    marginTop: "0.6rem",
                  }}
                >
                  *{errors.password}
                </p>
              ) : (
                ""
              )}
            </div>
            <div
              style={{
                width: "63%",
                margin: "auto",
                marginTop: "0.4rem",
                fontSize: "1.2rem",
              }}
            >
              <NavLink>forgott password</NavLink>
            </div>
            <div style={{ textAlign: "center" }}>
              <button className="btn" type="submit">
                Login
              </button>
            </div>
          </form>
          <p
            style={{
              textAlign: "center",
              marginTop: "1rem",
              fontSize: "1.2rem",
              color: "gray",
              fontFamily: "sans-serif",
            }}
          >
            Dont have any account yet? <NavLink to="/register">Sign up</NavLink>
          </p>
        </div>
      </div>
    </Layout>
  );
};
