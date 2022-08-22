import { render } from "@testing-library/react";
import { Tabs, Space } from "antd";
import { GROUP_ID } from "constans/common";
import { useAsync } from "hooks/useAsync";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchCinemaApi, fetchInfomationShowTimeApi } from "services/cinema";
import { format } from "utils/common";
import "./cum-rap.scss";
const { TabPane } = Tabs;

export default function MovieShowTime() {
  const { state: cinema } = useAsync({
    service: () => fetchCinemaApi(GROUP_ID),
  });
  console.log(cinema);

  const renderHeThongRap = () => {
    return cinema?.map((ele) => {
      return (
        <TabPane
        className="mb-2"
          tab={
            <div>
              <img
                src={ele.logo}
                className="rounded-full mx-4"
                width={100}
                alt={ele.tenHeThongRap}
              />
            </div>
          }
          key={ele.maHeThongRap}
        >
          <Tabs tabPosition={tabPosition}>
            {ele.lstCumRap?.map((ele) => {
              return (
                <TabPane
                  tab={
                    <div style={{ display: "flex" }} className="mx-auto my-3">
                      <img src={ele.hinhAnh} width={70} />
                      <div className="text-left ml-2">
                        <h5
                          className="text-warning mb-2"
                          style={{ fontWeight: "bold" }}
                        >
                          {ele.tenCumRap}
                        </h5>
                        <p className="text-dark m-0">
                          Địa chỉ:{" "}
                          {ele.diaChi.length > 50
                            ? ele.diaChi.substring(0, 40) + "..."
                            : ele.diaChi}
                        </p>
                      </div>
                    </div>
                  }
                  key={ele.maCumRap}
                >
                  <div className="row">
                    {ele.danhSachPhim?.map((ele) => {
                      return (
                        <div
                          className="py-2 col-lg-4 col-md-6 col-12"
                          key={ele.maPhim}
                          style={{ display: "flex" }}
                        >
                          <div className="row">
                            <div className="col-4">
                              <img
                                src={ele.hinhAnh}
                                style={{ width: "100%", height: "80%" }}
                                alt={ele.hinhAnh}
                              />
                            </div>
                            <div className="pl-3 col-8">
                              <h5
                                className="text-warning"
                                style={{ fontWeight: "bold" }}
                              >
                                {ele.tenPhim}
                              </h5>
                              <Link
                                to={`/movie/${ele.maPhim}`}
                                className="btn btnDatVe"
                                style={{ backgroundColor: "pink" }}
                              >
                                Xem thêm
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </TabPane>
              );
            })}
          </Tabs>
        </TabPane>
      );
    });
  };
  const [tabPosition, setTabPosition] = useState("top");

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
    fontSize: "50px",
  };
  return (
    <div style={styleBgCinema}>
      <div className="container py-5">
        <h2 className="text-center p-3 mb-5" style={styleTitle}>
          Hệ thống rạp phim
        </h2>

        <Tabs tabPosition={tabPosition}>{renderHeThongRap()}</Tabs>
      </div>
    </div>
  );
}
