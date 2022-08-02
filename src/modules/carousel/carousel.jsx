import React, { useEffect, useState } from "react";
import { fetchBannerApi } from "../../services/movie";
import { Carousel } from 'antd';



export default function Carousels() {
  let [bannerList, setBannerList] = useState([]);

  useEffect(() => {
    fetchBannerList();
  }, []);

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


  const onChange = (currentSlide) => {
    // console.log(currentSlide);
  };
  return <Carousel autoplay afterChange={onChange}>{renderBanner()}</Carousel>;
}
