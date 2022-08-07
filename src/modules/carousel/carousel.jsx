import React, { useEffect, useState } from "react";
import { fetchBannerApi } from "../../services/movie";
import { Carousel } from 'antd';



export default function Carousels() {
  // đặt state
  let [bannerList, setBannerList] = useState([]);

  // gọi hàm khi khởi động trang
  useEffect(() => {
    fetchBannerList();
  }, []);

  // cal api
  const fetchBannerList = async () => {
    const result = await fetchBannerApi();
    setBannerList(result.data.content);
  };

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
