import { Route, Routes } from 'react-router-dom';
import DefaultLayout from '../layouts/default/DefaultLayout.tsx';
import Home from '../pages/Home.tsx';
import Signup from '../pages/Signup.tsx';
import MyPage from '../pages/MyPage.tsx';
import PrivateRoute from './PrivateRoute.tsx';
import NonPrivateRoute from './NonPrivateRoute.tsx';
import NotFound from '../pages/NotFound.tsx';

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
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
