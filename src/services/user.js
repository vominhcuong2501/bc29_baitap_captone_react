import { request } from "../configs/axios";

export const loginApi = (data) => {
  return request({
    url: `/QuanLyNguoiDung/DangNhap`,
    method: "POST",
    data: data,
  });
};

export const fetchUserListApi = () => {
  return request({
    url: `/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01`,
    method: "GET",
  });
};

export const fetchAddUserApi = (data) => {
  return request({
    url: `/QuanLyNguoiDung/ThemNguoiDung`,
    method: "POST",
    data,
  });
};
