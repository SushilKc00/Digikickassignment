import React, { useEffect, useState } from "react";
import "./Create.css";
import ReactPaginate from "react-paginate";
import { Layout } from "../../components/Layout/Layout";
import { useFormik } from "formik";
import { userSchema } from "../../Formvalidation/userschema";
import { NavLink } from "react-router-dom";
let initialValues = {
  name: "",
  email: "",
  address: "",
  mobile: "",
  gender: "",
};

export const Create = () => {
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  // const [page, setPage] = useState(1);
  const [Users, setAllUsers] = useState([]);
  const [pageCount, setPageCount] = useState(1);

  const { values, handleChange, handleBlur, handleSubmit, touched, errors } =
    useFormik({
      initialValues,
      validationSchema: userSchema,
      onSubmit: async (values) => {
        const { name, email, address, mobile, gender } = values;
        const res = await fetch("/api/user", {
          method: "POST",
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
        if (data.success) {
          setOpen(false);
          window.location.reload();
          alert(data.message);
        } else {
          alert(data.message);
        }
      },
    });

  const changePage = async ({ selected }) => {
    console.log(selected);
    const res = await fetch(`/api/user?limit=${10}&page=${selected + 1}`);
    const data = await res.json();
    if (data.success) {
      setPageCount(data.pageCount);
      setAllUsers([...data.allUsers]);
    }
  };

  const getUsers = async () => {
    const res = await fetch(`/api/user?limit=${10}&page=${1}`);
    const data = await res.json();
    if (data.success) {
      setPageCount(data.pageCount);
      setAllUsers([...data.allUsers]);
    }
  };

  const deleteUser = async (id) => {
    const confrim = window.confirm("Are you sure");
    if (confrim) {
      const res = await fetch(`/api/user/delete/${id}`, {
        method: "delete",
      });
      const data = await res.json();
      if (data.success) {
        window.location.reload();
        alert(data.message);
      }
    }
  };

  const deleteAllUsers = async (id) => {
    const confrim = window.confirm("Are you sure");
    if (confrim) {
      const res = await fetch(`/api/user/delete`, {
        method: "delete",
      });
      const data = await res.json();
      if (data.success) {
        window.location.reload();
        alert(data.message);
      }
    }
  };

  const search = () => {
    if (keyword === "") {
      window.location.reload();
    }
    const filterData = Users.filter((user) => {
      if (user.name.toLowerCase().includes(keyword.toLowerCase())) {
        return user;
      }
      if (user.address.toLowerCase().includes(keyword.toLowerCase())) {
        return user;
      }
      if (user.mobile.toLowerCase().includes(keyword.toLowerCase())) {
        return user;
      }
      if (user.gender.toLowerCase().includes(keyword.toLowerCase())) {
        return user;
      }
    });
    setAllUsers(filterData);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Layout>
      {/* Modal section  */}
      <div className={open ? "modal show" : "modal hide"}>
        <form method="post" onSubmit={handleSubmit}>
          <button
            onClick={() => {
              window.document.body.classList.remove("bg-blur");
              setOpen(false);
            }}
            style={{ padding: "0.5rem", border: "none", cursor: "pointer" }}
          >
            X
          </button>

          <h2>Create User</h2>
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

          <button>Create</button>
        </form>
      </div>

      {/* user-content table */}
      <div className="user-wrapper">
        <div
          className="search-input"
          style={{ padding: "2rem 0", width: "70%", margin: "auto" }}
        >
          {/* <TbSearch className="search-icon" /> */}
          <input
            onKeyUp={search}
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
            type="search"
            placeholder="Search user by name,email,mobile etc"
            className="search-bar"
          />
        </div>

        <div className="create-btn">
          <button
            onClick={() => {
              deleteAllUsers();
            }}
          >
            Delete All
          </button>
          <button
            onClick={() => {
              window.document.body.classList.add("bg-blur");
              setOpen(true);
            }}
          >
            Create
          </button>
        </div>

        <div className="user-content">
          <table>
            <thead>
              <tr>
                <th>Sr No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Mobile Number</th>
                <th>Gender</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Users.length > 0 &&
                Users.map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.address}</td>
                      <td>{user.mobile}</td>
                      <td>{user.gender}</td>
                      <div className="action-btn">
                        <button
                          onClick={() => {
                            deleteUser(user._id);
                          }}
                        >
                          Delte
                        </button>
                        <NavLink to={`/user/edit/${user._id}`}>
                          <button>Edit</button>
                        </NavLink>
                      </div>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {Users.length < 0 && (
            <h2
              style={{
                textAlign: "center",
                fontSize: "5rem",
                color: "gray",
                fontFamily: "sans-serif",
                marginTop: "4rem",
              }}
            >
              No Data Aavilabe
            </h2>
          )}
        </div>
      </div>

      {/* paginat ion-sectiom */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "4rem",
        }}
      >
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={changePage}
          pageRangeDisplayed={pageCount}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          activeClassName="active"
          pageCount={pageCount}
          marginPagesDisplayed={2}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
      </div>
    </Layout>
  );
};
