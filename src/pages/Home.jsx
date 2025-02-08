import React from "react";
import fireVideo from "../assets/fire.mp4"; 

const Home = () => {
  return (
    <div className="flex justify-center items-center min-h-screen overflow-hidden ">
    
      <svg viewBox="0 0 1200 500" className="w-full h-auto">
        <defs>
          <mask id="text-mask">
         
            <rect width="100%" height="100%" fill="black" />
          
            <text
              x="50%"
              y="40%"
              textAnchor="middle"
              className="font-black fill-white text-[16rem] md:text-[8rem]"
            >
              VYUHA
            </text>
      
            <text
              x="50%"
              y="85%"
              textAnchor="middle"
              className="font-black fill-white text-[16rem] md:text-[8rem]"
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
  );
};

export default Home;
