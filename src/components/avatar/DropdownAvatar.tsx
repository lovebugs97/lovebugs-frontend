import { FC, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import Avatar from './Avatar.tsx';
import { User } from 'global-types';
import useAuth from '../../hooks/useAuth.ts';

type UserDropdownAvatarProps = {
  user: User;
};

const DropdownAvatar: FC<UserDropdownAvatarProps> = ({ user }) => {
  const { id, accessToken, profileImage } = user;
  const { logoutMutation } = useAuth();

  const handleLogout = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await logoutMutation.mutateAsync({ id, accessToken });
  };

  return (
    <div className="dropdown dropdown-hover dropdown-end">
      <Avatar
        role="button"
        imageSrc={profileImage}
        className="btn m-auto w-12 h-12 rounded-full p-4 border-2 border-gray-200 hover:border-gray-700 hover:scale-110"
      />
      <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
        {DropdownItems.map(({ name, href }, index) => (
          <li key={index}>
            <Link to={href}>{name}</Link>
          </li>
        ))}
        <li>
          <button onClick={handleLogout}>로그아웃</button>
        </li>
      </ul>
    </div>
  );
};

const DropdownItems = [{ name: '내 정보', href: '/mypage' }];

export default DropdownAvatar;
