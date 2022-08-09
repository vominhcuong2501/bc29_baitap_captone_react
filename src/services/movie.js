import { GROUP_ID } from "constans/common";
import { request } from "../configs/axios";

// file constants chứa các nội dung không thay đổi như biến của api

// lấy danh sách phim
export const fetchMovieListApi = () => {
    return request({
        url: `/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}`,
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
export const fetchBannerApi = () => {
    return request({
        url: `/QuanLyPhim/LayDanhSachBanner`,
        method: 'GET'
    })
}

// xóa phim
export const fetchDeleteMovieApi = (data) => {
    return request({
        url: `/QuanLyPhim/XoaPhim?MaPhim=${data}`,
        method: "DELETE",
    })
}

// thêm phim
export const fetchAddMovieUploadImageApi = (data) => {
    return request({
        url: `/QuanLyPhim/ThemPhimUploadHinh`,
        method: "POST",
        data
    })
}

// update phim 
export const fetchUpdateMovieApi = (data) => {
    return request({
        url: `/QuanLyPhim/CapNhatPhimUpload`,
        method: "POST",
        data
    })
}