import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { Record } from '../types/record.types';

type RecordStore = {
  record: Record;
  setRecord: (record: Record) => void;
  formattedDate: string;
  setFormattedDate: (formattedDate: string) => void;
};

export const useRecordStore = create(
  devtools<RecordStore>((set) => ({
    record: {
      _id: '',
      habitId: '',
      date: new Date(),
      image: '',
      note: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    setRecord: (record) => set({ record }),
    formattedDate: '',
    setFormattedDate: (formattedDate) => set({ formattedDate }),
  })),
);
