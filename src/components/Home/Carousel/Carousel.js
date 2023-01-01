import React from "react";
import Carousel from "react-bootstrap/Carousel";

import "./Carousel.css";

import bannerLogo from "../../../assets/images/mainBanner_logo.png";

const HomeCarousel = (props) => {
  return (
    <Carousel
      controls={false}
      version={4}
      pause={false}
      autoPlay={true}
      direction={"next"}
    >
      <Carousel.Item>
        <div className="mainCarousel mainCarousel_1 position-relative">
          <div className="d-flex align-items-center py-3 justify-content-between mx-xl-5 mx-sm-3">
            <div className="text-left pl-3">
              <h3 className="mainHeading text-uppercase">
                Play with Numbers & Win in numbers
              </h3>
              <span className="d-block text-white subHeading mb-lg-4 mb-2">
                Tease your mind and be the Winner
              </span>
              <button className="playNow bg-white">Play Now</button>
            </div>
            <div className="text-right">
              <img
                src={bannerLogo}
                className="mainBanner_1"
                alt="main banner"
              ></img>
            </div>
          </div>
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div className="mainCarousel mainCarousel_1 position-relative">
          <div className="d-flex align-items-center py-3 justify-content-between mx-xl-5 mx-sm-3">
            <div className="text-left pl-3">
              <h3 className="mainHeading text-uppercase">
                Play with Numbers & Win in numbers
              </h3>
              <span className="d-block text-white subHeading mb-lg-4 mb-2">
                Tease your mind and be the Winner
              </span>
              <button className="playNow bg-white">Play Now</button>
            </div>
            <div className="text-right">
              <img
                src={bannerLogo}
                className="mainBanner_1"
                alt="main banner"
              ></img>
            </div>
          </div>
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div className="mainCarousel mainCarousel_1 position-relative">
          <div className="d-flex align-items-center py-3 justify-content-between mx-xl-5 mx-sm-3">
            <div className="text-left pl-3">
              <h3 className="mainHeading text-uppercase">
                Play with Numbers & Win in numbers
              </h3>
              <span className="d-block text-white subHeading mb-lg-4 mb-2">
                Tease your mind and be the Winner
              </span>
              <button className="playNow bg-white">Play Now</button>
            </div>
            <div className="text-right">
              <img
                src={bannerLogo}
                className="mainBanner_1"
                alt="main banner"
              ></img>
            </div>
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
};

export default HomeCarousel;
