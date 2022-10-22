import { Navigate } from 'react-router-dom';

type ProtectedPageProps = {
  isLoggedIn: boolean;
  children: JSX.Element;
};

function ProtectedPage({ isLoggedIn, children }: ProtectedPageProps) {
  return isLoggedIn ? children : <Navigate to="/login" />;
}

export default ProtectedPage;
