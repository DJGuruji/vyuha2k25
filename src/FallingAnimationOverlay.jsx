import React, { useEffect, useState } from "react";

const ZoomOutImage = ({
  imgSrc,
  initialLeft,
  initialTop,
  initialWidth,
  initialHeight,
  onZoomComplete,
}) => {
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setZoomed(true);
    }, 50);

    const completeTimer = setTimeout(() => {
      onZoomComplete();
    }, 1050);

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onZoomComplete]);

  return (
    <img
      src={imgSrc}
      alt="zooming background"
      style={{
        position: "absolute",
        left: zoomed ? 0 : initialLeft,
        top: zoomed ? 0 : initialTop,
        width: zoomed ? "100vw" : initialWidth,
        height: zoomed ? "100vh" : initialHeight,
        transition: "all 1s ease-in-out",
        objectFit: "cover",
        zIndex: 10000,
      }}
    />
  );
};

const FallingAnimationOverlay = ({ images, onAnimationComplete }) => {
  const margin = 20;
  const imageWidth = 300;
  const imageHeight = 300;

  const gridWidth = 3 * imageWidth + 4 * margin;
  const centerOffset =
    typeof window !== "undefined" ? (window.innerWidth - gridWidth) / 2 : 0;

  const [selectedIndex] = useState(() =>
    Math.floor(Math.random() * images.length)
  );

  const [phase, setPhase] = useState("grid");

  useEffect(() => {
    if (phase === "grid") {
      const timer = setTimeout(() => {
        setPhase("zoom");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  const handleZoomComplete = () => {
    onAnimationComplete(images[selectedIndex]);
  };

  return (
    <>
      <style>
        {`
          @keyframes fallAndSpin {
            0% {
              transform: translateY(0) rotate(0deg);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            100% {
              transform: translateY(110vh) rotate(360deg);
              opacity: 0;
            }
          }
        `}
      </style>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 9999,
          overflow: "hidden",
          background: "black",
        }}
      >
        {phase === "grid" &&
          images.map((imgSrc, index) => {
            const row = Math.floor(index / 3);
            const col = index % 3;
            const leftPosition =
              centerOffset + margin + col * (imageWidth + margin);
            const topPosition = -100 - row * (imageHeight + margin);

            const delay = index * 0.3;
            return (
              <img
                key={index}
                src={imgSrc}
                alt={`falling bg ${index}`}
                className="rounded-full"
                style={{
                  position: "absolute",
                  top: `${topPosition}px`,
                  left: `${leftPosition}px`,
                  width: `${imageWidth}px`,
                  height: `${imageHeight}px`,
                  animation: `fallAndSpin 3s ease-in ${delay}s forwards`,
                }}
              />
            );
          })}

        {phase === "zoom" && (
          <ZoomOutImage
            imgSrc={images[selectedIndex]}
            initialLeft={
              centerOffset +
              margin +
              (selectedIndex % 3) * (imageWidth + margin)
            }
            initialTop={
              -100 - Math.floor(selectedIndex / 3) * (imageHeight + margin)
            }
            initialWidth={`${imageWidth}px`}
            initialHeight={`${imageHeight}px`}
            onZoomComplete={handleZoomComplete}
          />
        )}
      </div>
    </>
  );
};

export default FallingAnimationOverlay;
