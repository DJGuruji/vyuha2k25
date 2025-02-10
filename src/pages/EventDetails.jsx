import React, { useEffect, useState, useMemo } from "react";
import useEventStore from "../store/eventStore";
import bgImage from "../img/bg2.jpeg"; // Update this import as needed

const EventDetails = () => {
  const { selectedEvent } = useEventStore();
  const [zoomOut, setZoomOut] = useState(false);

  // Memoize the event details:
  const memoizedEvent = useMemo(() => {
    if (selectedEvent) {
      // If there's an event from the store, cache it
      localStorage.setItem("selectedEvent", JSON.stringify(selectedEvent));
      return selectedEvent;
    }
    // Otherwise, try to retrieve it from local storage
    const storedEvent = localStorage.getItem("selectedEvent");
    return storedEvent ? JSON.parse(storedEvent) : null;
  }, [selectedEvent]);

  useEffect(() => {
    // Trigger the background zoom-out animation shortly after mount.
    setTimeout(() => setZoomOut(true), 100);
  }, []);

  if (!memoizedEvent) {
    return (
      <div className="text-white text-center p-10">
        No event selected.
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      {/* Background Image with Radial Gradient & Animation */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] ease-out ${
          zoomOut ? "scale-100" : "scale-150"
        }`}
        style={{
          backgroundImage: `radial-gradient(circle at center, transparent 50%, rgba(0,0,0,0.8) 100%), url(${bgImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div>

      {/* Event Details Content */}
      <div className="relative z-10 flex flex-col md:flex-row text-white p-10">
        <div className="md:w-1/2 bg-pink-700 flex flex-col items-center justify-center p-6">
          <h2 className="text-3xl font-bold text-white text-center">
            {memoizedEvent.title}
          </h2>
          <div className="relative mt-6">
            <img
              src={memoizedEvent.image}
              alt={memoizedEvent.title}
              className="w-96 h-96"
            />
          </div>
        </div>
        <div className="md:w-1/2 flex flex-col justify-center p-8 backdrop-blur-lg">
          <h2 className="text-3xl font-bold text-white text-center">
            {memoizedEvent.title}
          </h2>
          <h3 className="text-xl font-semibold mb-4">About the event</h3>
          <p className="text-gray-300 mb-6">
            This is a placeholder description for {memoizedEvent.title}.
          </p>
          <a
            href={memoizedEvent.RegistrationLink}
            target="_blank"
            rel="noreferrer"
            className="flex justify-center"
          >
            <button className="mt-6 bg-yellow-500 w-1/2 text-black px-6 py-4 rounded-lg font-bold hover:bg-yellow-600 hover:rounded-xl">
              Register Now
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
