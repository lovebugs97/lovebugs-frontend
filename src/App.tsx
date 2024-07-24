import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home.tsx';
import Layout from './components/layout/Layout.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from './store/Store.tsx';
import Signup from './pages/signup/Signup.tsx';
import { useEffect } from 'react';
import { decryptData } from './utils/cryptoUtils.ts';
import { LoginResponse } from 'auth-types';
import MyPage from './pages/mypage/MyPage.tsx';

const queryClient = new QueryClient();

function App() {
  const userExist = localStorage.getItem('user');
  const setUser = useAuthStore((state) => state.setUser);

  /* TODO: 토큰 유효성 검사 기능 -> 유효할 때만 자동 로그인 */
  useEffect(() => {
    if (userExist) {
      const user = decryptData<LoginResponse>(userExist);
      setUser(user);
    } else setUser(null);
  }, [userExist, setUser]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/mypage" element={<MyPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
