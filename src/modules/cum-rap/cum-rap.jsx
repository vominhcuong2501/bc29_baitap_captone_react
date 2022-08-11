import { maHeThongRap } from "constans/common";
import { useAsync } from "hooks/useAsync";
import React, { useEffect, useState } from "react";
import { fetchCumRapApi, fetchHeThongRapApi } from "services/cinema";

export default function CumRap() {
//   const [heThongRap, setHeThongRap] = useState();

const danhSach = []
  useEffect(() => {
    renderHeThongRap();
  }, []);
  const renderHeThongRap = async () => {
    for (let key in maHeThongRap) {
      const result = await fetchHeThongRapApi(maHeThongRap[key]);
    //   setHeThongRap(result.data.content);
    danhSach.push(result.data.content)
    }
  };
  const danhSachNew = _.flattenDeep(danhSach)
  console.log(danhSachNew);
  console.log(danhSach);
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          {/* {danhSach.map((ele, index) => {
            return (<img key={index} src={ele.logo} alt={ele.logo} />);
          })} */}
          123
        </div>
      </div>
    </div>
  );
}
