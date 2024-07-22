import { FC } from 'react';
import useAuthStore from '../../store/Store.tsx';
import useLogin from '../../hooks/useLogin.ts';
import { useNavigate } from 'react-router-dom';

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const loginMutation = useLogin();
  const navigate = useNavigate();

  const handleLogin = async () => {
    await loginMutation.mutateAsync({ email: '1234', password: '1234' });
    navigate('/');
  };

  const token = useAuthStore((state) => state.token);

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <p>{token}</p>
    </div>
  );
};

export default Home;
