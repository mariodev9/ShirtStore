import React from "react";
import { Footer } from "../Footer";
import { HeaderNavbar } from "../Nav";

export const Layout = ({ children }) => {
  return (
    <>
      <HeaderNavbar />
      {children}
      <Footer />
    </>
  );
};
