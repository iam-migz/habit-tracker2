import create from 'zustand';
import { persist } from 'zustand/middleware';

interface UserTokenState {
  userToken: string | null;
  setUserToken: (userToken: string | null) => void;
}

export const useUserToken = create(
  persist<UserTokenState>(
    (set) => ({
      userToken: null,
      setUserToken: (userToken) => {
        set({ userToken });
        // TODO: invalidate queries
      },
    }),
    {
      name: 'auth_token',
      getStorage: () => localStorage,
    },
  ),
);
