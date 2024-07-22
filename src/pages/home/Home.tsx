import { FC } from 'react';
import { useAuthStore } from '../../store/Store.tsx';

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  console.log(useAuthStore((state) => state.user));

  return <div></div>;
};

export default Home;
