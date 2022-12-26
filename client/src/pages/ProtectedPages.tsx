import { Outlet, Navigate } from 'react-router-dom';
import { useUser } from '../hooks/user/useUser';

function ProtectedPages() {
  const { isLoading, isSuccess } = useUser({ retry: false });
  if (!isLoading) {
    if (isSuccess) {
      return <Outlet />;
    }
    return <Navigate to="/login" />;
  } else {
    return null;
  }
}

export default ProtectedPages;
