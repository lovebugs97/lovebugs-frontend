import { FC } from 'react';
import { useAuthStore } from '../../store/Store.tsx';

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div>
      <img src={user?.profileImage ? user?.profileImage : ''} />
    </div>
  );
};

export default Home;
