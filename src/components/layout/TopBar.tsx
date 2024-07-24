import { FC } from 'react';
import UserProfile from '../common/UserProfile.tsx';
import { useAuthStore } from '../../store/Store.tsx';
import GetStarted from '../../containers/GetStarted.tsx';
import { Link, useLocation } from 'react-router-dom';

const NavContents = [
  { name: '홈', href: '/' },
  { name: '소셜', href: '/social' },
  { name: '갤러리', href: '/gallery' },
];

const TopBar: FC = () => {
  const isLogin = useAuthStore((state) => state.user);
  const { pathname } = useLocation();
  const itemClassName = (href: string) =>
    ['text-[20px] hover:text-gray-300 hover:text-[25px]', pathname === href ? 'underline underline-offset-4' : ''].join(
      ' ',
    );

  return (
    <nav className="bg-white flex items-center justify-between px-8 py-4 border-b-2">
      <div>
        <Link to="/" className="flex items-center gap-3">
          <img width={35} height={150} src="/favicon.ico" className="h-8 rounded-[5px]" alt="Lovebugs Logo" />
          <span className="text-2xl font-semibold whitespace-nowrap">{import.meta.env.VITE_APP_NAME}</span>
        </Link>
      </div>

      <div>
        <ul className="flex items-center gap-8 text-[18px] font-semibold">
          {NavContents.map(({ name, href }) => (
            <li key={name}>
              <Link to={href} className={itemClassName(href)}>
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {isLogin ? <UserProfile /> : <GetStarted />}
    </nav>
  );
};

export default TopBar;
