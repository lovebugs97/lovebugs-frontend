import AppLogo from '../common/AppLogo.tsx';
import TopBarNavigation from './TopBarNavigation.tsx';
import { FC } from 'react';
import UserProfile from '../common/UserProfile.tsx';

const NavContents = [
  { name: '홈', href: '/' },
  { name: '소셜', href: '/social' },
  { name: '히스토리', href: '/history' },
];

const TopBar: FC = () => {
  const isLogin = true

  return (
    <nav className="bg-white flex items-center justify-between p-4">
      <AppLogo />
      <TopBarNavigation navContents={NavContents} />
      {isLogin ? <UserProfile /> : <p>Get Started</p> }
    </nav>
  );
}

export default TopBar;