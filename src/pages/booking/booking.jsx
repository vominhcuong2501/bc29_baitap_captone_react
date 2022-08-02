import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Chair from "../../modules/chair/chair";
import {
  fetchBookingTicketApi,
  fetchRoomListApi,
} from "../../services/booking";
import "./booking.scss";

export default function Booking() {
  // chuyển trang khi đặt xong
  const navigate = useNavigate();

  //lấy id của url
  const params = useParams();

  // đặt state
  const [roomList, setRoomList] = useState();
  const [danhSachGhe, setDanhSachGhe] = useState([]);

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
    let index = data.findIndex((ele) => ele.tenGhe === selecTedChair.tenGhe);
    if (index !== -1) {
      data.splice(index, 1);
    } else {
      data.push(selecTedChair);
    }
    setDanhSachGhe(data);
  };

  // booking
  const handleBookingTicket = async () => {
    const danhSachVe = danhSachGhe.map((ele) => {
      return {
        maGhe: ele.maGhe,
        giaVe: ele.giaVe,
      };
    });
    const submitData = {
      maLichChieu: params.maLichChieu,
      danhSachVe,
    };
    await fetchBookingTicketApi(submitData);
    alert('Chúc mừng bạn đã đặt vé thành công !!!')
    navigate("/");
  };

  // nếu roomList tồn tại xuất nội dung còn không thì chạy loading
  return roomList ? (
    <div className="container-fluid ">
      <div className="row m-5 text-center">
        <div className="col-8 ">
          <div className="booking-top">
            <div className="mb-3 text-left" style={{ fontSize: "20px" }}>
              <button className="ghe"></button> <span style={{marginRight: '50px'}}>Ghế trống</span>
              <button className="gheVip"></button> <span style={{marginRight: '50px'}}>Ghế vip</span>
              <button className="daDat"></button> <span style={{marginRight: '50px'}}>Ghế đã đặt</span>
              <button className="dangDat my-1"></button>
              <span>Ghế đang đặt</span>
            </div>
            <div className="screen mt-5 mx-auto">
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
                  <b>{roomList.thongTinPhim.tenPhim}</b>
                </th>
              </tr>
              <tr>
                <td className="text-left">Tên rạp</td>
                <td className="text-right">
                  {roomList.thongTinPhim.tenCumRap}
                </td>
              </tr>
              <tr>
                <td className="text-left">Địa chỉ:</td>
                <td className="text-right">{roomList.thongTinPhim.diaChi}</td>
              </tr>
              <tr>
                <td className="text-left">Ngày - giờ chiếu:</td>
                <td className="text-right">
                  {roomList.thongTinPhim.ngayChieu} -{" "}
                  <b>{roomList.thongTinPhim.gioChieu}</b>
                </td>
              </tr>
              <tr>
                <td className="text-left">Rạp</td>
                <td className="text-right">
                  <b>{roomList.thongTinPhim.tenRap}</b>
                </td>
              </tr>
              <tr>
                <td className="text-left">Số ghế:</td>
                <td className="text-right h-25">
                  {danhSachGhe.map((ele) => {
                    return (
                      <span
                        className="badge badge-primary m-1"
                        style={{ fontSize: 15 }}
                        key={ele.maGhe}
                      >
                        <b>{ele.tenGhe}</b> - {ele.giaVe.toLocaleString()}
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
              onClick={handleBookingTicket}
              className="btn btn-warning w-100 text-secondary"
              style={{fontSize: '25px', fontWeight: 'bold'}}
            >
              <i className="fa-solid fa-film mr-2"></i>
              ĐẶT VÉ
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
