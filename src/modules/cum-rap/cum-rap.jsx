import { GROUP_ID, maHeThongRap } from "constans/common";
import React, { useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchInfomationShowTimeApi } from "services/cinema";
import { format } from "utils/common";
import "./cum-rap.scss";

export default function MovieShowTime() {
  // chuyển trang
  const navigate = useNavigate();

  // dùng để lấy event.target trong form
  const formRef = useRef();

  // lấy thông tin url
  const params = useParams();

  // đặt state
  const [cumRap, setCumRap] = useState();

  const handleSelect = async (maHeThongRap) => {
    const result = await fetchInfomationShowTimeApi(maHeThongRap, GROUP_ID);
    setCumRap(result.data.content);
  };

  //render logo hệ thống rạp
  const renderTabs = () => {
    return maHeThongRap.map((ele, index) => {
      return (
        <a
          key={ele}
          className={`nav-link text-capitalize text-dark ${
            index === 0 && "active"
          }`}
          data-toggle="pill"
          role="tab"
          aria-selected="true"
          onClick={() => handleSelect(ele)}
        >
          {ele}
        </a>
      );
    });
  };

  // dựa vào hệ thống rạp render cụm rạp chiếu
  const renderContent = () => {
    return cumRap?.map((ele, index) => {
      return (
        <div
          className={`tab-pane fade show ${index === 0 && "active"}`}
          role="tabpanel"
          key={ele.maHeThongRap}
        >
          {ele.lstCumRap.map((ele, index) => {
            return (
              <div className="row pt-3 " key={ele.maCumRap}>
                <div className="col-lg-5 col-12">
                  <div className="row mb-3">
                    <div className="col-4">
                      <img className="img-fluid rounded" src={ele.hinhAnh} />
                    </div>
                    <div className="col-8 pl-0">
                      <h4
                        className="text-dark m-0"
                        style={{ fontWeight: "bold" }}
                      >
                        {ele.tenCumRap}
                      </h4>
                      <span>Địa chỉ: {ele.diaChi}</span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-7 col-12">
                  <div className="row">
                    {ele.danhSachPhim.map((ele) => {
                      return (
                        <div
                          className="col-12 text-light mb-5"
                          key={ele.maPhim}
                        >
                          <div className="row">
                            <div className="col-lg-4 col-12">
                              <img
                                src={ele.hinhAnh}
                                alt={ele.hinhAnh}
                                width={200}
                                height={150}
                              />
                            </div>
                            <div className="col-lg-8 col-12 px-5">
                              <h4
                                className="text-dark m-0"
                                style={{ fontWeight: "bold" }}
                              >
                                {ele.tenPhim}
                              </h4>
                              <p className="text-dark mt-2 mb-3">
                                Thời gian:{" "}
                                <span>{format(ele.ngayChieuGioChieu)}</span>
                              </p>

                              <Link
                                to={`/movie/${ele.maPhim}`}
                                className="btn"
                                style={{ backgroundColor: "aqua" }}
                              >
                                Xem thêm
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    });
  };

  //style background
  const styleBgCinema = {
    backgroundImage: `url(./lichChieu5.jpg)`,
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    width: "100%",
    height: "100%",
  };

  const styleTitle = {
    backgroundColor: "white",
    background:
      "linear-gradient(to right,#673ab7 0,#e91e63 36%,#e91e63 65%,#673ab7 100%)",
    fontWeight: "700",
    color: "white",
    animation: "development 6s infinite linear",
  };

  return (
    <div style={styleBgCinema}>
      <div
        className="container-fluid p-5"
        style={{ fontWeight: "bold"}}
      >
        <div className="row">
          <div className="col-lg-3 col-12 px-5">
            <h2 className="text-center p-3" style={styleTitle}>
              Cụm rạp
            </h2>
            <div
              className="nav flex-column nav-pills"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              {renderTabs()}
            </div>
          </div>
          <div className="col-lg-9 col-12 px-5">
            <h2 className="text-center p-3" style={styleTitle}>
              Thông tin lịch chiếu
            </h2>

            <div className="tab-content" id="v-pills-tabContent">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
