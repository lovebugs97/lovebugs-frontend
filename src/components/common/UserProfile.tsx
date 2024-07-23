import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/Store.tsx';
import useAuth from '../../hooks/useAuth.ts';

const DropdownItems = [{ name: '마이 페이지', href: '/my-page' }];

const UserProfile: FC = () => {
  const user = useAuthStore((state) => state.user);
  const { logoutMutation } = useAuth();
  console.log(user)
  const handleLogoutBtn = () => {
    if (!user) return
    logoutMutation.mutate(user.id)
  };

  return (
    <div className="dropdown dropdown-hover dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn m-auto w-12 h-12 rounded-full p-4 border-2 border-gray-300"
        style={{
          background:
            user && user.profileImage ? "url('" + user.profileImage + "')" : `url('./src/assets/images/user.png')`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
        {DropdownItems.map(({ name, href }, index) => (
          <li key={index}>
            <Link to={href}>{name}</Link>
          </li>
        ))}
        <li>
          <button onClick={handleLogoutBtn}>로그아웃</button>
        </li>
      </ul>
    </div>
  );
};

export default UserProfile;
