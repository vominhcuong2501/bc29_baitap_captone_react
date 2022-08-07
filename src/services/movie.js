import { request } from "../configs/axios";

// file constants chứa các nội dung không thay đổi như biến của api

// lấy danh sách phim
export const fetchMovieListApi = () => {
    return request({
        url: `/QuanLyPhim/LayDanhSachPhim?maNhom=GP02`,
        method: 'GET',
    })
}

// lấy thông tin phim
export const fetchMovieDetailApi = (movieId) => {
    return request({
        url: `/QuanLyPhim/LayThongTinPhim?MaPhim=${movieId}`,
        method: 'GET',
    })
}

// lấy banner
export const fetchBannerApi =() => {
    return request({
        url: `/QuanLyPhim/LayDanhSachBanner`,
        method: 'GET'
    })
}

// xóa phim
export const fetchDeleteMovieApi = (data) => {
    return request({
        url:`/QuanLyPhim/XoaPhim?MaPhim=${data}`,
        method: "DELETE",
    })
}