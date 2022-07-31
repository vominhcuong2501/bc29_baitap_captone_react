import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/footer";
import Header from "../components/header/header";

export default function HomeLayout() {
  return (
    <div
      className="bg-dark"
      style={{
        fontFamily: "Times New Roman, Times, serif",
      }}
    >
      <div className="container-fluid p-0">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
