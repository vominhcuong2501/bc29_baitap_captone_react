import React, { useEffect, useState } from "react";
import { fetchMovieShowTimesApi } from "../../services/cinema";
import { Link, useParams } from "react-router-dom";
import { format } from "../../utils/common";
import { useAsync } from "../../hooks/useAsync";
import "./show-time.scss"
export default function ShowTimes() {
  // dùng để lấy địa chỉ url
  let params = useParams();

  // cách 1:
  // // đặt state
  // const [movieShowTimes, setMovieShowTimes] = useState([]);

  // // gọi hàm khi khởi động trang
  // useEffect(() => {
  //   fetcMovieShowTimes();
  // }, []);

  // // call api
  // const fetcMovieShowTimes = async () => {
  //   const result = await fetchMovieShowTimesApi(params.movieId);
  //   setMovieShowTimes(result.data.content);
  //   console.log(result.data.content);
  // };

  // cách 2: dùng useAsync tự tạo, lấy lịch chiếu film
  const { state: movieShowTimes = [] } = useAsync({
    dependencies: [],
    service: () => fetchMovieShowTimesApi(params.movieId),
  });
  console.log(movieShowTimes);

  //render logo hệ thống rạp
  const renderTabs = () => {
    return movieShowTimes?.heThongRapChieu?.map((ele, index) => {
      return (
        <a
          key={ele.maHeThongRap}
          className={`nav-link text-capitalize ${index === 0 && "active"}`}
          data-toggle="pill"
          href={`#${ele.maHeThongRap}`}
          role="tab"
          aria-selected="true"
        >
          <img src={ele.logo} alt={ele.tenHeThongRap} width={70} height={70} />
          <span className="ml-3">{ele.tenHeThongRap}</span>
        </a>
      );
    });
  };

  // dựa vào hệ thống rạp render cụm rạp chiếu
  const renderContent = () => {
    return movieShowTimes?.heThongRapChieu?.map((ele, index) => {
      return (
        <div
          className={`tab-pane fade show ${index === 0 && "active"}`}
          id={ele.maHeThongRap}
          role="tabpanel"
          key={ele.maHeThongRap}
        >
          {ele.cumRapChieu.map((ele) => {
            return (
              <div className="row mb-5" key={ele.maCumRap}>
                <div className="col-lg-3 col-12 pr-0">
                  <img
                    className="rounded"
                    src={ele.hinhAnh}
                    width={150}
                    height={150}
                  />
                </div>
                <div className="col-lg-9 col-12 text-light pl-0">
                  <h3 className="text-warning m-0">{ele.tenCumRap}</h3>
                  <span>Địa chỉ: {ele.diaChi}</span>
                  <p>Chọn giờ chiếu:</p>
                  <div className="row">
                    {ele.lichChieuPhim.map((ele) => {
                      return (
                        <div
                          className="col-12 col-md-3 text-light p-1"
                          key={ele.maLichChieu}
                        >
                          <Link
                            to={`/booking/${ele.maLichChieu}`}
                            className="btn"
                            style={{ border: "2px solid pink", color: "white", }}
                          >
                            {format(ele.ngayChieuGioChieu)}
                          </Link>
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

  return (
    <div className="row">
      <div className="col-sm- 3col-12">
        <div
          className="nav flex-column nav-pills"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          {renderTabs()}
        </div>
      </div>
      <div className="col-sm-9 col-12">
        <div className="tab-content" id="v-pills-tabContent">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
