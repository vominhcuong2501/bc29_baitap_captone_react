import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Chair from "../../modules/chair/chair";
import { fetchRoomListApi } from "../../services/booking";
import "./booking.scss";
export default function Booking() {
  //lấy id của url
  const params = useParams();

  // đặt state
  const [roomList, setRoomList] = useState();
  const [danhSachGhe, setDanhSachGhe] = useState([]);

  console.log(danhSachGhe);
  // gọi hàm để call api
  useEffect(() => {
    fetchRoomList();
  }, []);

  //hàm call api
  const fetchRoomList = async () => {
    const result = await fetchRoomListApi(params.maLichChieu);
    console.log(result.data.content);
    setRoomList(result.data.content);
  };

  // thao tác click kiểm tra ghế dc chọn đã có trong mảng chưa
  const handleSelect = (selecTedChair) => {
    const data = [...danhSachGhe];
    let index = data.findIndex((ele) => ele.tenGhe === selecTedChair);
    if (index !== -1) {
      data.splice(index, 1);
    } else {
      data.push(selecTedChair);
    }
    setDanhSachGhe(data);
  };

  const booking = (danhSachGhe) => {
    const dataNew = danhSachGhe;
    for (let i = 0; i < dataNew.length; i++) {
      if (!dataNew[i].daDat) {
        dataNew[i].daDat = true;
      }
    }
    setDanhSachGhe([]);
    danhSachGhe = dataNew;
  };

  // nếu roomList tồn tại xuất nội dung còn không thì chạy loading
  return roomList ? (
    <div className="container-fluid ">
      <div className="row m-5 text-center">
        <div className="col-8 ">
          <div className="booking-top">
            <div className="mb-3" style={{ fontSize: "20px" }}>
              <button className="ghe"></button> <span>Ghế trống</span>
              <button className="gheVip"></button> <span>Ghế vip</span>
              <button className="daDat"></button> <span>Ghế đã đặt</span>
              <button className="dangDat my-1"></button>{" "}
              <span>Ghế đang đặt</span>
            </div>
            <div className="screen mt-3 mx-auto">
              <p
                className="text-center"
                style={{
                  position: "absolute",
                  right: "50%",
                  transform: "translatex(50%)",
                }}
              >
                Màn hình
              </p>
            </div>
          </div>
          <div className="booking-btn">
            {roomList?.danhSachGhe?.map((ele, index) => {
              return (
                <Fragment key={ele.tenGhe}>
                  {/* tách button sang component mới nên truyền props */}
                  <Chair item={ele} handleSelect={handleSelect} />
                  {/* set nếu 1 dòng đủ 16 ghế thì xuống hàng */}
                  {(index + 1) % 16 === 0 && <br />}
                </Fragment>
              );
            })}
          </div>
        </div>
        <div className="col-4 text-light">
          <h2 className="text-warning mb-3">Thông tin vé</h2>
          <table
            className="table p-5 text-light"
            style={{ border: "2px dashed white" }}
          >
            <tbody>
              <tr className="my-2 text-center">
                <th className="text-left">Tên phim:</th>
                <th className="text-right" style={{ fontSize: 30 }}>
                  <b>{roomList?.thongTinPhim?.tenPhim}</b>
                </th>
              </tr>
              <tr>
                <td className="text-left">Tên rạp</td>
                <td className="text-right">
                  {roomList?.thongTinPhim?.tenCumRap}
                </td>
              </tr>
              <tr>
                <td className="text-left">Địa chỉ:</td>
                <td className="text-right">{roomList?.thongTinPhim?.diaChi}</td>
              </tr>
              <tr>
                <td className="text-left">Ngày - giờ chiếu:</td>
                <td className="text-right">
                  {roomList?.thongTinPhim?.ngayChieu} -{" "}
                  <b>{roomList?.thongTinPhim?.gioChieu}</b>
                </td>
              </tr>
              <tr>
                <td className="text-left">Rạp</td>
                <td className="text-right">
                  <b>{roomList?.thongTinPhim?.tenRap}</b>
                </td>
              </tr>
              <tr>
                <td className="text-left">Số ghế:</td>
                <td className="text-right h-25">
                  {danhSachGhe.map((ele) => {
                    return (
                      <span key={ele.maGhe}>
                        <b>{ele.tenGhe}</b> - {ele.giaVe} VNĐ,{" "}
                      </span>
                    );
                  })}
                </td>
              </tr>
              <tr>
                <td className="text-left">Ưu đãi:</td>
                <td className="text-right">0%</td>
              </tr>
              <tr>
                <td className="text-left">Tổng tiền:</td>
                <td className="text-right">
                  <b className="mr-1">
                    {danhSachGhe
                      .reduce((preValue, currentValue) => {
                        return (preValue += currentValue.giaVe);
                      }, 0)
                      .toLocaleString()}
                  </b>
                  VNĐ
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <button
              onClick={() => {
                alert('Bạn đã đặt thành công!!!');
                booking(danhSachGhe);
              }}
              className="btn btn-warning w-100"
            >
              BOOKING TICKETS
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        position: "fixed",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        zIndex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src="../loading.gif" />
    </div>
  );
}
