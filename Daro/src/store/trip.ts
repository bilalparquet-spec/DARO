import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import storageAdapter from './storageAdapter';

export interface GuestNumber {
  adultNumber: number;
  childrenNumber: number;
  infantNumber: number;
}

interface TripState {
  dateRange: string[];
  location: string;
  guestNumber: GuestNumber;
}

interface Actions {
  setDateRange: (dateRange: string[]) => void;
  cleanDateRange: () => void;
  setGuestNumber: (guestNumber: GuestNumber) => void;
  setLocation: (location: string) => void;
}

const defaultState = {
  dateRange: [],
  location: '',
  guestNumber: {
    adultNumber: 0,
    childrenNumber: 0,
    infantNumber: 0
  }
};

export const useTrip = create(
  persist<TripState & Actions>(
    set => ({
      ...defaultState,
      setDateRange: (dateRange: string[]) => set({ dateRange }),
      cleanDateRange: () => set({ dateRange: [] }),
      setGuestNumber: (guestNumber: GuestNumber) => set({ guestNumber }),
      setLocation: (location: string) => set({ location })
    }),
    {
      name: 'trip-storage',
      storage: createJSONStorage(() => storageAdapter)
    }
  )
);

export const useGuestCount = () => {
  const { guestNumber } = useTrip();

  return guestNumber.adultNumber + guestNumber.childrenNumber + guestNumber.infantNumber;
};
