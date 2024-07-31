import { Route, Routes } from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout.tsx';
import Home from '../pages/Home.tsx';
import Signup from '../pages/Signup.tsx';
import MyPage from '../pages/MyPage.tsx';
import PrivateRoute from './PrivateRoute.tsx';
import NonPrivateRoute from './NonPrivateRoute.tsx';
import NotFound from '../pages/NotFound.tsx';
import AdminRoute from './AdminRoute.tsx';
import AdminMember from '../pages/admin/AdminMember.tsx';
import AdminSideBarLayout from '../layouts/AdminSideBarLayout.tsx';
import AdminEndpoint from '../pages/admin/AdminEndpoint.tsx';
import AdminBlackList from '../pages/admin/AdminBlackList.tsx';

const Router = () => {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />

        <Route element={<NonPrivateRoute />}>
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/mypage" element={<MyPage />} />

          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminSideBarLayout />}>
              <Route path="member" element={<AdminMember />} />
              <Route path="endpoint" element={<AdminEndpoint />} />
              <Route path="blacklist" element={<AdminBlackList />} />
            </Route>
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
