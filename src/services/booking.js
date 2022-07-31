import { request } from "../configs/axios";

export const fetchRoomListApi = (showTimeId) => {
  return request({
    url: `/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${showTimeId}`,
    method: "GET",
  });
};
