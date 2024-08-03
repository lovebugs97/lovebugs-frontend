import { FC } from 'react';
import useAuth from '../../../hooks/useAuth.ts';
import UserProfile from '../components/UserProfile.tsx';

const MyPageContainer: FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading..</div>;
  }

  return (
    <div>
      <section className="flex justify-center items-center">
        <UserProfile user={user} />
      </section>
    </div>
  );
};

export default MyPageContainer;
