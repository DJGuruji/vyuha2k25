import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import useEventStore from "../store/eventStore"; 

const allCards = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  image: `https://picsum.photos/300/200?random=${i}`,
  title: `Event ${i + 1}`,
  type: i % 2 === 0 ? "Workshop" : "Exhibition",
  RegistrationLink: `vkjnls.com`
}));

const Vega = () => {
  const [cards, setCards] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const { setSelectedEvent } = useEventStore(); 

  useEffect(() => {
    AOS.init({ duration: 600 });
  }, []);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const filtered = filter === "All" ? allCards : allCards.filter((c) => c.type === filter);
      setCards(filtered);
      setLoading(false);
    }, 500);
  }, [filter]);

  return (
    <div className="min-h-screen text-white flex flex-col items-center p-5">
      <div className="w-full flex justify-end mb-6">
        <select
          className="p-2 bg-gray-800 text-white rounded-md cursor-pointer hover:bg-gray-700 transition"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Workshop">Workshop</option>
          <option value="Exhibition">Exhibition</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {cards.map((card) => (
          <div
            key={card.id}
            data-aos="zoom-in"
            className="backdrop-blur-lg rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <img src={card.image} alt={card.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-bold">{card.title}</h3>
              <p className="text-sm text-white">{card.type}</p>
              <Link to="/eventdetails">
                <button
                  className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md transition"
                  onClick={() => setSelectedEvent(card)}
                >
                  View
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <div className="mt-6 text-gray-400 flex items-center">
          <FaSpinner className="animate-spin mr-2" /> Loading...
        </div>
      )}
    </div>
  );
};

export default Vega;
