import { FC, useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import DropdownAvatar from '../components/avatar/DropdownAvatar.tsx';
import LoginModal from '../components/modal/LoginModal.tsx';
import useAuth from '../hooks/useAuth.ts';

const DefaultLayout: FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { pathname } = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    return () => setModalOpen(false);
  }, [setModalOpen]);

  const itemClassName = (href: string) =>
    ['text-[20px] hover:text-gray-300 hover:text-[22px]', pathname === href ? 'underline underline-offset-4' : ''].join(
      ' ',
    );

  return (
    <>
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

        <LoginModal modalOpen={modalOpen} setModalOpen={setModalOpen} />

        {user ? (
          <DropdownAvatar user={user} />
        ) : (
          <div>
            <button
              className="btn btn-primary text-[18px] font-semibold hover:text-gray-300"
              onClick={() => setModalOpen(true)}
            >
              Get Started
            </button>
          </div>
        )}
      </nav>

      <main id="main">
        <Outlet />
      </main>

      <footer className="footer flex gap-32 justify-center items-center h-24">
        <aside>
          <p className="text-[20px] font-bold">{import.meta.env.VITE_APP_NAME}</p>
          <p>Copyright ©{new Date().getFullYear()} - All right reserved</p>
        </aside>
        <nav className="flex gap-4 underline-offset-2 font-semibold">
          <a
            target="_blank"
            href={`${import.meta.env.VITE_GITHUB_URL}`}
            className="underline text-[16px] hover:text-gray-300"
          >
            Github
          </a>
          <a
            target="_blank"
            href={`mailto:${import.meta.env.VITE_AUTHOR_EMAIL}`}
            className="underline text-[16px] hover:text-gray-300"
          >
            Email
          </a>
        </nav>
      </footer>
    </>
  );
};

const NavContents = [
  { name: '홈', href: '/' },
  { name: '소셜', href: '/social' },
  { name: '갤러리', href: '/gallery' },
];

export default DefaultLayout;
