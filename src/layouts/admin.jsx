import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/side-bars/side-bars";
import HeaderAdmin from "../components/header/headerAdmin";

export default function AdminLayout() {
  return (
    <div
      className="container-fluid "
      style={{
        fontFamily: "Times New Roman, Times, serif",
      }}
    >
      <HeaderAdmin />
      <div className="row mt-5">
        <div className="col-3" style={{ borderRight: "1px solid black" }}>
          <SideBar />
        </div>
        <div className="col-9 " style={{ height: "100%" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
