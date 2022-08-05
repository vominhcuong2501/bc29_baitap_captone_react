import { request } from "../configs/axios";

// đăng nhập
export const loginApi = (data) => {
  return request({
    url: `/QuanLyNguoiDung/DangNhap`,
    method: "POST",
    data: data,
  });
};

// đăng ký
export const registerApi = (data) => {
  return request({
    url: `/QuanLyNguoiDung/DangKy`,
    method: "POST",
    data: data,
  });
};

// lấy danh sách người dùng
export const fetchUserListApi = () => {
  return request({
    url: `/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP02`,
    method: "GET",
  });
};

// thêm người dùng
export const fetchAddUserApi = (data) => {
  return request({
    url: `/QuanLyNguoiDung/ThemNguoiDung`,
    method: "POST",
    data,
  });
};

// xóa người dùng
export const fetchDeleteUserApi = (data) => {
  return request({
    url: `/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${data}`,
    method: "DELETE",
  });
};

// sừa thông tin dành cho admin
export const fetchEditAdminApi = (data) => {
  return request({
    url: `/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
    method: 'POST',
    data
  })
}

// gọi lấy thông tin tài khoản
export const fetchInfomationApi = (taiKhoan) => {
  return request({
    url: `/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${taiKhoan}`,
    method: "POST",
  })
}

// sửa thông tin của người dùng
export const fetchEditUserApi = (data) => {
  return request({
    url: `/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
    method: 'PUT',
    data
  })
}

// tìm kiếm người dùng
export const fetchSearchUserApi = (keyword) => {
  return request({
    url: `/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP02&tuKhoa=${keyword}`,
    method: 'POST'
  })
}