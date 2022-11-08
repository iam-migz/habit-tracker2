import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { getDatesInMonth } from '../utils/dateHelper';

type HabitStore = {
  dates: Date[];
  setDates: (dates: Date[]) => void;
};

const today = new Date();
export const useHabitStore = create(
  devtools<HabitStore>((set) => ({
    dates: getDatesInMonth(
      today.getMonth(),
      today.getFullYear(),
      today.getDate(),
    ),
    setDates: (dates) =>
      set((state) => ({ dates: [...state.dates, ...dates] })),
  })),
);
