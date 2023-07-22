import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const Privateroute = () => {
  const navigate = useNavigate();
  const [ok, setOk] = useState(false);

  const checkIsUser = () => {
    if (localStorage.getItem("userid")) {
      setOk(true);
    } else {
      navigate("/login");
    }
  };
  useEffect(() => {
    checkIsUser();
  }, []);

  return ok && <Outlet />;
};
