import React, { useEffect, useState } from "react";
import { fetchBannerApi } from "../../services/movie";
import { Carousel } from 'antd';
import { useAsync } from "../../hooks/useAsync";



export default function Carousels() {
  // cách 1 :
  // // đặt state
  // let [bannerList, setBannerList] = useState([]);

  // // gọi hàm khi khởi động trang
  // useEffect(() => {
  //   fetchBannerList();
  // }, []);

  // // cal api
  // const fetchBannerList = async () => {
  //   const result = await fetchBannerApi();
  //   setBannerList(result.data.content);
  // };

  // cách 2: dùng useAsync tự tạo, lấy danh sách banner về
  const {state: bannerList = []} = useAsync({
    dependencies: [],
    service: () => fetchBannerApi()
  })

  const renderBanner = () => {
    return bannerList.map((ele, index) => {
      return (
        <div className={`carousel-item ${index === 0 && "active"}`} key={index}>
          <img
            src={ele.hinhAnh}
            data-src="holder.js/900x500/auto/#777:#555/text:First slide"
            alt={ele.maBanner}
            style={{ width: "100%", height: "100vh" }}
          />
        </div>
      );
    });
  };

  return <Carousel autoplay>{renderBanner()}</Carousel>;
}
