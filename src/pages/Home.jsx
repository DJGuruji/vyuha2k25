import React, { useEffect } from "react";
import fireVideo from "../assets/fire.mp4";
import AOS from "aos";
import "aos/dist/aos.css";
import Carousel from "../components/Carousel";

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 2000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <div className="min-h-screen overflow-hidden flex flex-col">
      <div className="flex justify-center items-center h-screen">
        <svg viewBox="0 0 1200 500" className="w-full h-auto">
          <defs>
            <mask id="text-mask">
              <rect width="100%" height="100%" fill="black" />
             
              <text
                x="50%"
                y="30%"
                textAnchor="middle"
                className="font-black fill-white text-[16rem] md:text-[8rem] "
                data-aos="zoom-out"
              >
                VYUHA
              </text>
              <text
                x="50%"
                y="70%"
            
                textAnchor="middle"
                className="font-black  fill-white text-[16rem] md:text-[8rem]"
                data-aos="zoom-out"
              >
                2K25
              </text>
            </mask>
          </defs>
          <g mask="url(#text-mask)">
            <foreignObject width="1200" height="500">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src={fireVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </foreignObject>
          </g>
        </svg>
     
      </div>
      <div className="flex justify-center">
      <span className="text-4xl text-white border-4 border-yellow-400 p-10 backdrop-blur-md font-bold w-3/4 md:w-1/2 lg:w-1/2 xl:w-1/2 rounded-full hover:rounded-2xl text-center "> 20, 21 February 2025</span><br />
      {/* <span className="text-4xl text-white border-4 border-yellow-400 p-5 w-3/4 md:w-1/2 lg:w-1/2 xl:w-1/2 hover:rounded-full rounded-2xl text-center "> MARK YOUR CALENDER A DAY FILLED WITH FUN LAUGHTER AND MEMORIES TO CHERISH</span>
     */}  </div>
      <Carousel />
    </div>
  );
};

export default Home;
