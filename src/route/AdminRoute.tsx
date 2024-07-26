import useAuth from '../hooks/useAuth.ts';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
  const { user } = useAuth();
  return user?.roleType !== 'ROLE_ADMIN' ? <Navigate to="/" /> : <Outlet />;
};

export default AdminRoute;
