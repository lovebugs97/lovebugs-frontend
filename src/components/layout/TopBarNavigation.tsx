import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

type NavContent = {
  name: string;
  href: string;
};

type TobBarNavigationProps = {
  navContents: NavContent[];
};

const TopBarNavigation: FC<TobBarNavigationProps> = ({ navContents }) => {
  const { pathname } = useLocation();
  console.log(pathname)

  const itemClassName = (href: string) =>
    ['hover:text-gray-300', pathname === href ? 'underline underline-offset-4' : ''].join(' ');

  return (
    <ul className="flex items-center gap-6 text-[18px] font-semibold">
      {navContents.map(({ name, href }) => (
        <li key={name}>
          <Link to={href} className={itemClassName(href)}>
            {name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default TopBarNavigation;
