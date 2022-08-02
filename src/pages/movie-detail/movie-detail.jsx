import React from "react";
import Detail from "../../modules/detail/detail";
import ShowTimes from "../../modules/show-times/show-times";

export default function MovieDetail() {
  return (
    <div className="py-5 container">
      <div className="row">
        <div className="col-12 px-5 py-3" style={{border: '2px dashed white'}}>
          <h2 className=" text-danger mb-3">Chi tiết phim</h2>
          <Detail />
        </div>
        <div className="col-12 mt-5 px-5 py-3"  style={{border: '2px dashed white'}}>
          <h2 className=" text-danger mb-3">Rạp chiếu</h2>
          <ShowTimes />
        </div>
      </div>
    </div>
  );
}
