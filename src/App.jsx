import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"; 
import Home from "./pages/Home";
import { useAuthStore } from "./store/authStore";

import Navbar from "./components/NavBar";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Vyuha from "./pages/Vyuha";
import Vega from "./pages/Vega";
import Hackathon from "./pages/Hackathon";
import TicketAlumni from "./pages/TicketAlumni";
import TicketOthers from "./pages/TicketOthers";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

import bg1 from "../src/img/bg6.jpeg";
import bg2 from "../src/img/bg2.jpeg";
import bg3 from "../src/img/bg1.jpeg";
//import bg4 from "../src/img/bg2.jpeg";
import bg5 from "../src/img/bg3.jpeg";
import bg6 from "../src/img/bg4.jpeg";
import bg7 from "../src/img/bg5.jpeg";




const bgImages = [bg1, bg2,bg3, bg5,bg6,bg7];

const App = () => {
  const { user } = useAuthStore();
  const [bgImage, setBgImage] = useState(bg1);
  const [navbarVisible, setNavbarVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [zoomOut, setZoomOut] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 2000, easing: "ease-in-out", once: true });
  

    const randomIndex = Math.floor(Math.random() * bgImages.length);
  
    localStorage.setItem("lastBgIndex", randomIndex);
    setBgImage(bgImages[randomIndex]);
  
    const img = new Image();
    img.src = bgImages[randomIndex];
    img.onload = () => {
      setLoading(false);
      setTimeout(() => setZoomOut(true), 100);
      setTimeout(() => setNavbarVisible(true), 2000);
    };
    img.onerror = () => {
      console.error(`Failed to load image: ${bgImages[randomIndex]}`);
      setLoading(false);
    };
  }, []);
  

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-800">
        <div className="spinner-border animate-spin border-t-4 border-blue-500 border-solid rounded-full w-16 h-16"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black">
      <div
        className={`absolute inset-0 bg-cover bg-center transition-transform duration-[2s] ease-out-in ${
          zoomOut ? "scale-[1]" : "scale-[1.5]"
        }`}
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      ></div>

      <div className="relative z-10">
        <Router>
          {navbarVisible && <Navbar />}
          <Routes>
            <Route path="/login" element={user ? <Home /> : <Login />} />
            <Route path="/signup" element={user ? <Home /> : <Signup />} />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/vega" element={<Vega />} />
            <Route path="/vyuha" element={<Vyuha />} />
            <Route path="/hackathon" element={<Hackathon />} />
            <Route path="/alumni" element={<TicketAlumni />} />
            <Route path="/other" element={<TicketOthers />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
};

export default App;
