import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaSpinner } from "react-icons/fa";
import axios from "../axios";
import {toast} from "sonner";

const Vega = () => {
  const [cards, setCards] = useState([]);
  const [filter, setFilter] = useState("All");
  const [visibleCards, setVisibleCards] = useState(10);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 600 });
  }, []);

  useEffect(() => {
    fetchCards();
  }, [filter, visibleCards]);

  const fetchCards = async () => {
    setLoading(true);
    try {
      const response = await axios.get("event/event"); 
      const events = response.data; 

      const filteredEvents =
        filter === "All" ? events : events.filter((event) => event.type === filter);

      setCards(filteredEvents.slice(0, visibleCards));
    } catch (error) {
      console.error("Error fetching data: ", error);
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !loading) {
      setVisibleCards((prev) => prev + 10);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen text-white flex flex-col items-center p-5">
      <div className="w-full flex justify-end mb-6">
        <select
          className="p-2 backdrop-blur-md font-bold text-white rounded-md cursor-pointer transition"
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
            className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={card.image || "https://via.placeholder.com/300x200"} // Fallback image
              alt={card.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold">{card.title}</h3>
              <p className="text-sm text-gray-400">{card.type}</p>
              <button className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md transition">
                View
              </button>
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








import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    axios.get(/event/${id})
      .then(response => setEvent(response.data))
      .catch(error => console.error("Error fetching event details:", error));
  }, [id]);

  if (!event) {
    return <div className="text-white text-center p-10">Loading event details...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row text-white min-h-screen p-10">
      <div className="md:w-1/2 bg-pink-700 flex flex-col items-center justify-center p-6">
        <h2 className="text-3xl font-bold text-white text-center">{event.title}</h2>
        <h3 className="text-xl font-semibold mt-2">{event.date}</h3>
        <div className="relative mt-6">
          <img src={event.image || "/cloud-computing.png"} alt={event.title} className="w-64 h-64" />
          <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center">
            <span className="text-lg font-bold bg-white text-black px-2 rounded">{event.category}</span>
          </div>
        </div>
        <p className="text-lg font-semibold mt-4">Reg Fee: ₹{event.price}</p>
        <p className="text-sm">{event.points} KTU POINTS</p>
      </div>
      <div className="md:w-1/2 flex flex-col justify-center p-8 backdrop-blur-lg">
        <h3 className="text-xl font-semibold mb-4">About the event</h3>
        <p className="text-gray-300 mb-6">{event.description}</p>
        <div className="text-lg">
          <p><strong>Venue:</strong> {event.venue}</p>
          <p><strong>Date:</strong> {event.date}</p>
          <p><strong>Price:</strong> ₹ {event.price}</p>
          
        </div>
        <button className="mt-6 bg-yellow-500 text-black px-6 py-2 rounded-lg font-bold hover:bg-yellow-600">
          Register Now
        </button>
      </div>
    </div>
  );
};

export default EventDetails;