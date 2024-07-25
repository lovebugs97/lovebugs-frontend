import useAuth from '../hooks/useAuth.ts';
import { Navigate, Outlet } from 'react-router-dom';

/* 회원가입 페이지와 같이 로그인 상태가 아닐 때만 접근 할수 있는 페이지를 위한 라우터 */
const NonPrivateRoute = () => {
  const { user } = useAuth();
  return user ? <Navigate to="/" /> : <Outlet />;
};

export default NonPrivateRoute;
