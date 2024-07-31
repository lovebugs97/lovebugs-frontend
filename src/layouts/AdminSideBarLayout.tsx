import { FC, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminSideBarLayout: FC = () => {
  const [selectedMenu, setSelectedMenu] = useState('member');

  return (
    <div className="flex gap-10">
      <div className="drawer lg:drawer-open flex-1">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-gray-200/50 text-base-content min-h-full w-60 p-4">
            {AdminSideBarNavMenu.map(({ name, src, key }) => (
              <li key={key} className={`text-[16px] my-1 ${selectedMenu === key ? 'bg-gray-300/40 rounded-xl' : ''}`}>
                <Link to={src} onClick={() => setSelectedMenu(key)}>
                  {name}
                </Link>
              </li>
            ))}
            <hr className="my-4 border-2 border-gray-300 mx-2" />

            {AdminSideBarLinkMenu.map(({ name, src }) => (
              <li key={name} className="text-[16px] my-1 underline underline-offset-4">
                <a target="_blank" href={src}>
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex-5 mt-10">
        <Outlet />
      </div>
    </div>
  );
};

const AdminSideBarNavMenu = [
  {
    key: 'member',
    name: '회원 관리',
    src: '/admin/member',
  },
  {
    key: 'endpoint',
    name: '엔드포인트 관리',
    src: '/admin/endpoint',
  },
  {
    key: 'blacklist',
    name: '블랙리스트 관리',
    src: '/admin/blacklist',
  },
];

const AdminSideBarLinkMenu = [
  {
    name: 'Eureka Server',
    src: 'http://61.109.238.66',
  },
  {
    name: 'Vault',
    src: 'http://61.109.238.66:3000',
  },
  {
    name: 'Jenkins',
    src: 'http://61.109.238.66:8000',
  },
];

export default AdminSideBarLayout;
