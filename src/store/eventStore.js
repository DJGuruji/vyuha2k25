import { create } from "zustand";

const useEventStore = create((set) => ({
  selectedEvent: null,
  setSelectedEvent: (event) => set({ selectedEvent: event }),
}));

export default useEventStore;
