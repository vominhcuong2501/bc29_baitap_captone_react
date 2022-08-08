import { request } from "../configs/axios"

// lấy thông tin chiếu phim
export const fetchMovieShowTimesApi = (movieId) => {
    return request({
        url: `/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${movieId}`,
        method: 'GET'
    })
}

// lấy thông tin hệ thống rap
export const fetchHeThongRapApi = (maHeThongRap) => {
    return request({
        url: `/QuanLyRap/LayThongTinHeThongRap?maHeThongRap=${maHeThongRap}`,
        method: "GET"
    })
}

// lấy thông tin rap theo hệ thống
export const fetchCumRapApi = (maHeThongRap) => {
    return request({
        url: `/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`,
        method: "GET"
    })
}