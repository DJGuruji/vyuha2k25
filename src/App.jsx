// App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"; 

import Home from "./pages/Home";
import { useAuthStore } from "./store/authStore";

// Import all background images.
import bg1 from "../src/img/bg1.png";
import bg2 from "../src/img/bg2.png";
import bg3 from "../src/img/bg3.jpeg";
import bg4 from "../src/img/bg4.jpeg";
import bg5 from "../src/img/bg5.jpeg";
import bg6 from "../src/img/bg7.jpeg";
import bg7 from "../src/img/bg9.jpeg";

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

import FallingAnimationOverlay from "./FallingAnimationOverlay";

const App = () => {
  const { user } = useAuthStore();
  const [bgImage, setBgImage] = useState("");
  const [navbarVisible, setNavbarVisible] = useState(false);
  const [loading, setLoading] = useState(true); 
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 2000,
      easing: "ease-in-out",
      once: true,
    });

    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-800">
        <div className="spinner-border animate-spin border-t-4 border-blue-500 border-solid rounded-full w-16 h-16"></div>
      </div>
    );
  }

  return (
    <>
      {showAnimation && (
        <FallingAnimationOverlay 
          images={[bg1, bg2, bg3, bg4, bg5, bg6, bg7]} 
          onAnimationComplete={(selectedImage) => {
          
            setBgImage(selectedImage);
            setShowAnimation(false);
            setNavbarVisible(true);
          }}
        />
      )}
      <div
        className="bg-cover bg-center bg-no-repeat min-h-screen bg-black"
        style={{
        
          backgroundImage: bgImage ? `url(${bgImage})` : "none",
        }}
      >
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
    </>
  );
};

export default App;
