import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { getDatesInMonth } from '../utils/dateHelper';

type SliderStore = {
  dates: Date[];
  setDates: (dates: Date[]) => void;
};

const today = new Date('2022-06-22');
export const useSliderStore = create(
  devtools<SliderStore>((set) => ({
    dates: getDatesInMonth(
      today.getMonth(),
      today.getFullYear(),
      today.getDate(),
    ),
    setDates: (dates) =>
      set((state) => ({ dates: [...state.dates, ...dates] })),
  })),
);
