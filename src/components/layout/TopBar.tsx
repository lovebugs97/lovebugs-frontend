import AppLogo from '../common/AppLogo.tsx';
import TopBarNavigation from './TopBarNavigation.tsx';
import { FC } from 'react';
import UserProfile from '../common/UserProfile.tsx';
import { useAuthStore } from '../../store/Store.tsx';
import GetStarted from '../../containers/GetStarted.tsx';

const NavContents = [
  { name: '홈', href: '/' },
  { name: '소셜', href: '/social' },
  { name: '히스토리', href: '/history' },
];

const TopBar: FC = () => {
  const isLogin = useAuthStore((state) => state.token);

  return (
    <nav className="bg-white flex items-center justify-between p-8 border-b-2">
      <AppLogo />
      <TopBarNavigation navContents={NavContents} />
      {isLogin !== null ? <UserProfile /> : <GetStarted />}
    </nav>
  );
};

export default TopBar;
