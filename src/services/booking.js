import { request } from "../configs/axios";

// lấy danh sách phòng vé
export const fetchRoomListApi = (showTimeId) => {
  return request({
    url: `/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${showTimeId}`,
    method: "GET",
  });
};

// đặt vé
export const fetchBookingTicketApi = (data) => {
  return request({
    url: `/QuanLyDatVe/DatVe`,
    method: 'POST',
    data
  })
}

// tạo lịch chiếu
export const fetchAddShowTimeApi = (data) => {
  return request({
    url: `/QuanLyDatVe/TaoLichChieu`,
    method: "POST",
    data
  })
}
