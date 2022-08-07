import { request } from "../configs/axios"

// lấy thông tin chiếu phim
export const fetchMovieShowTimesApi = (movieId) => {
    return request({
        url: `/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${movieId}`,
        method: 'GET'
    })
}
