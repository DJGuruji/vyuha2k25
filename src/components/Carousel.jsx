import { motion } from "framer-motion";
import { useState } from "react";
import img1 from "../img/bg6.jpeg";
import img2 from "../img/bg1.jpeg";
import img3 from "../img/bg2.jpeg";
import img4 from "../img/bg3.jpeg";

const carouselItems = [
  {
    id: 1,
    number: "03",
    title: "Ragam Carnival",
    image: img1,
  },
  {
    id: 2,
    number: "04",
    title: "I-ink",
    image: img2,
  },
  {
    id: 3,
    number: "05",
    title: "Sports",
    image: img3,
  },
  {
    id: 4,
    number: "06",
    title: "Music",
    image: img4,
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + carouselItems.length) % carouselItems.length
    );
  };

  return (
    <div className="mt-20 relative w-full flex items-center justify-center py-10 min-h-screen backdrop-blur-md">
 
      <button
        onClick={prevSlide}
        className="absolute left-4 text-white text-3xl z-10"
      >
        &#10094;
      </button>

 
      <div className="hidden md:flex gap-6 overflow-hidden w-[80%]">
        {carouselItems.map((item, index) => {
          const offset = index - currentIndex;
          return (
            <motion.div
              key={item.id}
              className="relative w-[250px] h-[400px] bg-black text-white rounded-xl shadow-lg overflow-hidden transition-transform transform"
              style={{
                transform: `perspective(1000px) rotateY(${offset * 20}deg) translateX(${offset * 40}px) scale(${offset === 0 ? 1 : 0.8})`,
                opacity: offset === 0 ? 1 : 0.6,
              }}
            >
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-4">
                <h2 className="text-4xl font-bold">{item.number}</h2>
                <p className="text-lg">{item.title}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

 
      <div className="md:hidden flex justify-center w-full overflow-hidden">
        <motion.div
          key={carouselItems[currentIndex].id}
          className="relative w-3/4 h-[400px] bg-black text-white rounded-xl shadow-lg overflow-hidden transition-transform"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={carouselItems[currentIndex].image}
            alt={carouselItems[currentIndex].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-6">
            <h2 className="text-4xl font-bold">{carouselItems[currentIndex].number}</h2>
            <p className="text-lg">{carouselItems[currentIndex].title}</p>
          </div>
        </motion.div>
      </div>

      {/* Right Button */}
      <button
        onClick={nextSlide}
        className="absolute right-4 text-white text-3xl z-10"
      >
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;
