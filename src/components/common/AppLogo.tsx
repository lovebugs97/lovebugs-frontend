import { FC } from 'react';
import { Link } from 'react-router-dom';

const AppLogo: FC = () => {
  return (
    <Link to="/" className="flex items-center gap-3">
      <img width={35} height={150} src="/favicon.ico" className="h-8 rounded-[5px]" alt="Lovebugs Logo" />
      <span className="text-2xl font-semibold whitespace-nowrap">{import.meta.env.VITE_APP_NAME}</span>
    </Link>
  );
};

export default AppLogo;
