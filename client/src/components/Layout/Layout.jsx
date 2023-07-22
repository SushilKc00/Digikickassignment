import React from "react";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";

export const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main style={{ minHeight: "80vh" }}>{children}</main>
      <Footer />
    </>
  );
};
