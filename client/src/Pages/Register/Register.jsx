import React from "react";
import { Layout } from "../../components/Layout/Layout";
import { Animate } from "../../Animate/Animate";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useFormik } from "formik";
import { registerSchema } from "../../Formvalidation/index";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmpassword: "",
};

export const Register = () => {
  const navigate = useNavigate();
  const { values, handleChange, handleSubmit, errors, touched, handleBlur } =
    useFormik({
      initialValues,
      validationSchema: registerSchema,
      onSubmit: async () => {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
            name: values.password,
            confirmpassword: values.confirmpassword,
          }),
        });
        const data = await res.json();
        console.log(data);
        if (data.success) {
          alert(data.message);
          navigate("/login");
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
          <img src={logo} alt="" width={"100%"} />
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
            Welcome To Digi Sidekick
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
          <form onSubmit={handleSubmit} method="post">
            <div style={{ textAlign: "center" }}>
              <input
                type="text"
                name="name"
                placeholder="enter your name"
                onChange={handleChange}
                value={values.name}
                className="input-area"
                onBlur={handleBlur}
              />
              {errors.name && touched.name ? (
                <p
                  style={{
                    color: "red",
                    fontSize: "1.2rem",
                    marginTop: "0.6rem",
                  }}
                >
                  *{errors.name}
                </p>
              ) : (
                ""
              )}
            </div>
            <div style={{ textAlign: "center" }}>
              <input
                type="text"
                name="email"
                placeholder="enter your email"
                onChange={handleChange}
                value={values.email}
                className="input-area"
                onBlur={handleBlur}
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
                type="text"
                name="password"
                placeholder="enter your password"
                onChange={handleChange}
                value={values.password}
                className="input-area"
                onBlur={handleBlur}
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
            <div style={{ textAlign: "center" }}>
              <input
                type="consfirm password"
                name="confirmpassword"
                placeholder="enter your confirm password"
                onChange={handleChange}
                value={values.confirmpassword}
                className="input-area"
                onBlur={handleBlur}
              />
              {errors.confirmpassword && touched.confirmpassword ? (
                <p
                  style={{
                    color: "red",
                    fontSize: "1.2rem",
                    marginTop: "0.6rem",
                  }}
                >
                  *{errors.confirmpassword}
                </p>
              ) : (
                ""
              )}
            </div>

            <div style={{ textAlign: "center" }}>
              <button className="btn" type="submit">
                Register
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
            Already have an account? <NavLink to="/login">Sign in</NavLink>
          </p>
        </div>
      </div>
    </Layout>
  );
};
