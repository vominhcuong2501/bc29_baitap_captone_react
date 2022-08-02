import React from "react";
import Carousels from "../../modules/carousel/carousel";
import MovieList from "../../modules/movie-list/movie-list";

// page chứa giao diện không xử lý chức năng
export default function Home() {
  const styleBg = {
    backgroundImage : `url(./hinhnen.jpg)`,
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    width: '100%',
    height: '500px'
  }
  return (
    <div className="py-2">
      <Carousels />
      <MovieList />
      <div style={styleBg}></div>
    </div>
  );
}
