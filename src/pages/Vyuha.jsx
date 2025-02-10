import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/Button.css";
import AOS from "aos";
import "aos/dist/aos.css";
import bgImage from "../img/bg2.jpeg"; // Update the import path if needed

const Vyuha = () => {
  const [zoomOut, setZoomOut] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 2000,
      easing: "ease-in-out",
      once: true,
    });

    // Background zoom-out effect
    setTimeout(() => setZoomOut(true), 100);
  }, []);

  return (
    <div className="relative min-h-screen flex justify-center  items-center">
      

      {/* Content Box */}
      <div className="relative z-10 w-full max-w-md p-8 backdrop-blur-lg rounded-xl shadow-lg" data-aos="fade-up">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Are you an alumnus or from another college?
        </h2>
        <div className="flex justify-center">
          <Link to="/alumni">
            <button className="btn bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-2 px-4 rounded mr-4 transition duration-300 ease-in-out">
              Alumni
            </button>
          </Link>
          <Link to="/other">
            <button className="btn bg-gradient-to-r from-green-500 to-green-700 hover:from-green-700 hover:to-green-900 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
              Other College
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Vyuha;
