import React,{useEffect} from 'react';
import '../css/Button.css';
import { Link } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";

const Button = () => {
  useEffect(() => {
    AOS.init({
      duration: 2000, 
      easing: "ease-in-out",
      once: true, 
    });
  }, []);
  
  return (
    <div className='flex  justify-center mt-8'>

      <Link to="/vyuha">
        <button className="tktbtn m-3 text-white px-6 py-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-pink-700 focus:ring-opacity-50 transition-colors duration-300 transform hover:scale-105 active:scale-95 font-bold hover:rounded-xl" data-aos="fade-up">
          Register Now
        </button>
      </Link>

    </div>
  );
};

export default Button;
