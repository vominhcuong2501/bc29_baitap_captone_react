import React from "react";
import Detail from "../../modules/detail/detail";
import ShowTimes from "../../modules/show-times/show-times";

export default function MovieDetail() {
  const styleBg2 = {
    backgroundImage: `url(./../hinhNen1.jpg)`,
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
    width: "100%",
    height: "100%",
  };

  // render nôi dung phim và hệ thống rạp chiếu của bộ phim
  return (
    <div style={styleBg2}>
      <div className="py-5 container">
      <div className="row">
        <div
          className="col-12 px-5 py-3 "
          style={{ border: "2px dashed white", backgroundColor: 'black'}}
        >
          <h2 className=" text-light mb-3">Chi tiết phim</h2>
          <Detail />
        </div>
        <div
          className="col-12 mt-5 px-5 py-3 "
          style={{ border: "2px dashed white", backgroundColor: 'black'}}
        >
          <h2 className=" text-light mb-3">Rạp chiếu</h2>
          <ShowTimes />
        </div>
      </div>
    </div>
    </div>
  );
}
