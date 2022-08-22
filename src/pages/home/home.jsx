import CumRap from "modules/cum-rap/cum-rap";
import React from "react";
import Carousels from "../../modules/carousel/carousel";
import MovieList from "../../modules/movie-list/movie-list";

// page chứa giao diện không xử lý chức năng
export default function Home() {
  //render nội dung trang Outlet
  return (
    <div>
      <Carousels />
      <MovieList />
      <CumRap />
    </div>
  );
}
