import { createContext, ReactNode, useState, useContext } from 'react';
import { getStoredToken } from '../utils/localStorage';

type TokenContextType = {
  userToken: string;
  setUserToken: (userToken: string) => void;
};

const defaultValues: TokenContextType = {
  userToken: '',
  setUserToken: () => undefined,
};

export const TokenContext = createContext<TokenContextType>(defaultValues);

export const TokenContextProvider = ({ children }: { children: ReactNode }) => {
  const storedToken = getStoredToken();
  const [userToken, setUserToken] = useState(storedToken ? storedToken : '');
  return (
    <TokenContext.Provider value={{ userToken, setUserToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useTokenContext = () => useContext(TokenContext);
