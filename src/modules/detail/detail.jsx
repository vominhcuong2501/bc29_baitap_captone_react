import React, { useEffect, useState } from "react";
import { fetchMovieDetailApi } from "../../services/movie";
import {useParams} from 'react-router-dom'
import '../css/detail.css'

export default function Detail() {
    const params = useParams()

    let [movieDetail, setMovieDetail] = useState([]);

    useEffect(() => {
        fetchMovieDetail()
    }, [])
    const fetchMovieDetail = async () => {
        // params là một object cần chấm tới movieId đặt tên giống với tên path trong router
        const result = await fetchMovieDetailApi(params.movieId)
        setMovieDetail(result.data.content)

    }

    const styleButtonTrailer = {
      textDecoration: 'none',
      fontSize: '20px',
      color: '#fff'
    }
 
  return (
    <div className="row text-light">
      <div className="col-3">
        <img
          className="w-100"
          src={movieDetail.hinhAnh}
        />
      </div>
      <div className="col-9">
        <h4>{movieDetail.tenPhim}</h4>
        <p className="text-secondary">
          {movieDetail.moTa}
        </p>
        <p>Ngày khởi chiếu: {movieDetail.ngayKhoiChieu}</p>
        <div>
          <button className="btn btn-info mr-2"><a style={styleButtonTrailer} href={movieDetail.trailer} target='_blank'>Trailer</a></button>
        </div>
      </div>
    </div>
  );
}
