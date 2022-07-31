import React, { useEffect, useState } from "react";
import { fetchMovieListApi } from "../../services/movie";

export default function FilmList() {
  const [filmList, setFilmList] = useState([]);
  useEffect(() => {
    fetchFilmList();
  }, []);
  const fetchFilmList = async () => {
    const result = await fetchMovieListApi();
    setFilmList(result.data.content);
    console.log(result.data.content);
  };

  const renderContent = () => {
    return filmList?.map((ele) => {
      return (
        <tr key={ele.maPhim}>
          <td>{ele.maPhim}</td>
          <td>
            <img src={ele.hinhAnh} alt={ele.hinhAnh} height={50} width={100} />
          </td>
          <td>{ele.tenPhim}</td>
          <td>
            <button className="btn btn-warning mr-1">
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
            <button className="btn btn-danger">
              <i className="fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="mx-5">
      <h2>Quản lý phim</h2>
      <div className="row my-3">
        <div className="col-6">
          <input
            className="form-control w-50 mr-sm-2"
            type="text"
            placeholder="Search"
          />
        </div>
        <div className="col-6 text-right">
          <button className="btn btn-primary">Thêm phim</button>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Mã phim</th>
            <th>Hình ảnh</th>
            <th>Tên phim</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{renderContent()}</tbody>
      </table>
    </div>
  );
}
