import { FC } from 'react';
import TopBar from './TopBar.tsx';
import Footer from './Footer.tsx';
import { Outlet } from 'react-router-dom';

const Layout: FC = () => {
  return (
    <>
      <TopBar />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
