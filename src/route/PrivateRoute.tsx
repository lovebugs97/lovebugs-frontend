import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth.ts';

const PrivateRoute = () => {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
