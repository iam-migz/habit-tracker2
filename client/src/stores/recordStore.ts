import create from 'zustand';
import { devtools } from 'zustand/middleware';

type RecordStore = {
  recordId: string;
  setRecordId: (recordId: string) => void;
  formattedDate: string;
  setFormattedDate: (formattedDate: string) => void;
};

export const useRecordStore = create(
  devtools<RecordStore>((set) => ({
    recordId: '',
    setRecordId: (recordId) => set({ recordId }),
    formattedDate: '',
    setFormattedDate: (formattedDate) => set({ formattedDate }),
  })),
);
