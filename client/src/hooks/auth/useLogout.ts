import { useTokenContext } from '../../contexts/TokenContext';
import { clearStoredToken } from '../../utils/localStorage';

export const useLogout = () => {
  const { setUserToken } = useTokenContext();
  const logout = () => {
    clearStoredToken();
    setUserToken('');
  };
  return { logout };
};
