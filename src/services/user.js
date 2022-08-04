import { request } from "../configs/axios";

export const loginApi = (data) => {
  return request({
    url: `/QuanLyNguoiDung/DangNhap`,
    method: "POST",
    data: data,
  });
};

export const registerApi = (data) => {
  return request({
    url: `/QuanLyNguoiDung/DangKy`,
    method: "POST",
    data: data,
  });
};

export const fetchUserListApi = () => {
  return request({
    url: `/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP02`,
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

export const fetchDeleteUserApi = (data) => {
  return request({
    url: `/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${data}`,
    method: "DELETE",
  });
};
