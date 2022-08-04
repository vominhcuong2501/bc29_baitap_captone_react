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
         background: 'linear-gradient(to right, #ACB6E5, #74ebd5)'
      }}
    >
      <HeaderAdmin />
      <div className="row ">
        <div className="col-2"  style={{backgroundColor: 'black'}}>
          <SideBar />
        </div>
        <div className="col-10 px-5" >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
