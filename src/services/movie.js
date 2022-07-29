import { request } from "../configs/axios";

// file constants chứa các nội dung không thay đổi như biến
export const fetchMovieListApi = () => {
    return request({
        url: `/QuanLyPhim/LayDanhSachPhim?maNhom=GP01`,
        method: 'GET',
    })
}

export const fetchMovieDetailApi = (movieId) => {
    return request({
        url: `/QuanLyPhim/LayThongTinPhim?MaPhim=${movieId}`,
        method: 'GET',
    })
}

export const fetchBannerApi =() => {
    return request({
        url: `/QuanLyPhim/LayDanhSachBanner`,
        method: 'GET'
    })
}