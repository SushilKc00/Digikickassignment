import React, { useEffect, useState } from "react";
import { Layout } from "../../components/Layout/Layout";
import { useFormik } from "formik";
import { userSchema } from "../../Formvalidation/userschema";
import { useNavigate, useParams } from "react-router-dom";

export const Edit = () => {
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    address: "",
    mobile: "",
    gender: "",
  });
  const params = useParams();

  const getUser = async () => {
    const res = await fetch(`/api/user/${params.id}`);
    const data = await res.json();
    console.log(data);
    setInitialValues({
      ...data.User,
    });
  };

  const { values, handleChange, handleBlur, handleSubmit, touched, errors } =
    useFormik({
      initialValues,
      validationSchema: userSchema,
      onSubmit: async (values) => {
        console.log(values);
        console.log(initialValues);
        console.log(values);
        const { name, email, address, mobile, gender } = values;
        const res = await fetch(`/api/user/update/${params.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            address,
            mobile,
            gender,
          }),
        });
        const data = await res.json();
        console.log(data);
        if (data.success) {
          alert(data.message);
          navigate("/user/create");
        } else {
          alert(data.message);
        }
      },
    });
  console.log(values);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Layout>
      <div className={"modal"}>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            padding: "0.4rem 1rem",
          }}
        >
          <button
            onClick={() => {
              navigate("/user/create");
            }}
            style={{ padding: "0.5rem", border: "none", cursor: "pointer" }}
          >
            X
          </button>
        </div>
        <form method="post" onSubmit={handleSubmit}>
          <h2>Edit User</h2>
          <input
            type="text"
            placeholder="enter your name"
            onChange={handleChange}
            value={values.name}
            name="name"
            onBlur={handleBlur}
          />
          {errors.name && touched.name && (
            <p style={{ fontSize: "1.2rem", color: "red" }}>{errors.name}</p>
          )}
          <input
            type="email"
            placeholder="enter your email"
            onChange={handleChange}
            value={values.eamil}
            name="email"
            onBlur={handleBlur}
          />
          {errors.email && touched.email && (
            <p style={{ fontSize: "1.2rem", color: "red" }}>{errors.email}</p>
          )}
          <input
            type="text"
            placeholder="enter your address"
            onChange={handleChange}
            value={values.address}
            name="address"
            onBlur={handleBlur}
          />
          {errors.address && touched.address && (
            <p style={{ fontSize: "1.2rem", color: "red" }}>{errors.address}</p>
          )}
          <input
            type="number"
            placeholder="enter your mobile"
            onChange={handleChange}
            value={values.mobile}
            name="mobile"
            onBlur={handleBlur}
          />
          {errors.mobile && touched.mobile && (
            <p style={{ fontSize: "1.2rem", color: "red" }}>{errors.mobile}</p>
          )}
          <div style={{ display: "flex", gap: "1.4rem" }}>
            <label
              htmlFor="male"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                fontSize: "1.3rem",
                fontWeight: "400",
                fontFamily: "sans-serif",
              }}
            >
              MALE
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </label>
            <label
              htmlFor="female"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                fontSize: "1.3rem",
                fontWeight: "400",
                fontFamily: "sans-serif",
              }}
            >
              FEMALE
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </label>
            <label
              htmlFor="others"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                fontSize: "1.3rem",
                fontWeight: "400",
                fontFamily: "sans-serif",
              }}
            >
              OTHERS
              <input
                type="radio"
                id="others"
                name="gender"
                value="others"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </label>
          </div>
          {errors.gender && touched.gender && (
            <p style={{ fontSize: "1.2rem", color: "red" }}>{errors.gender}</p>
          )}

          <button>Update</button>
        </form>
      </div>
    </Layout>
  );
};
