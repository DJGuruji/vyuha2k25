import React from 'react';
import '../css/Bgvideo.css';
import videoSource from '../video/firee.mp4'
const BgVideo = () => {
  return (
    <div className="background-video h-screen backdrop-blur-sm">
      <video autoPlay muted loop className="video">
        <source src={videoSource} type="video/mp4" />
    
      </video>

    </div>
  );
}

export default BgVideo;
