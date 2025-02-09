import React from "react";
import useEventStore from "../store/eventStore";

const EventDetails = () => {
  const { selectedEvent } = useEventStore();

  if (!selectedEvent) {
    return (
      <div className="text-white text-center p-10">No event selected.</div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row  text-white min-h-screen p-10">
      <div className="md:w-1/2 bg-pink-700 flex flex-col items-center justify-center p-6">
        <h2 className="text-3xl font-bold text-white text-center">
          {selectedEvent.title}
        </h2>
        <div className="relative mt-6">
          <img
            src={selectedEvent.image}
            alt={selectedEvent.title}
            className="w-96 h-96"
            style={{
              
            }}
          />
        </div>
      </div>
      <div className="md:w-1/2 flex flex-col justify-center p-8 backdrop-blur-lg">
        <h2 className="text-3xl font-bold text-white text-center">
          {selectedEvent.title}
        </h2>
        <h3 className="text-xl font-semibold mb-4">About the event</h3>
        <p className="text-gray-300 mb-6">
          This is a placeholder description for {selectedEvent.title}.
        </p>
        <a href={selectedEvent.RegistrationLink} target="_blank" className="flex justify-center">
          <button className="mt-6 bg-yellow-500 w-1/2 text-black px-6 py-4 rounded-lg font-bold hover:bg-yellow-600 hover:rounded-xl">
            Register Now
          </button>
        </a>
      </div>
    </div>
  );
};

export default EventDetails;
