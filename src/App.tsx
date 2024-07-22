import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home.tsx';
import Layout from './components/layout/Layout.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useAuthStore from './store/Store.tsx';

export const queryClient = new QueryClient();

const token = localStorage.getItem('token');
if (token) {
  useAuthStore.getState().setToken(token);
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
