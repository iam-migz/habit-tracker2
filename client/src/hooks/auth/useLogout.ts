import { useUserToken } from '../../stores/userToken';

export const useLogout = () => {
  const setUserToken = useUserToken((state) => state.setUserToken);
  const logout = () => {
    setUserToken(null);
  };
  return { logout };
};
