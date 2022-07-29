import React from "react";
import BannerCarousel from "../../modules/banner-carousel/banner-carousel";

export default function Banner() {
  return (
    <div>
      <div id="carouselId" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#carouselId" data-slide-to={0} className="active" />
          <li data-target="#carouselId" data-slide-to={1} />
          <li data-target="#carouselId" data-slide-to={2} />
        </ol>
        <div className="carousel-inner" role="listbox">
            <BannerCarousel />
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselId"
          role="button"
          data-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselId"
          role="button"
          data-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
}
