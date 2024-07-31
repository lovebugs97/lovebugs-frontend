import { FC, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import Avatar from './Avatar.tsx';
import { User } from 'global-types';
import useAuth from '../../hooks/useAuth.ts';
import { isAuthenticated } from '../../utils/validationUtils.ts';
import { RoleType } from 'auth-types';

type UserDropdownAvatarProps = {
  user: User;
};

const DropdownAvatar: FC<UserDropdownAvatarProps> = ({ user }) => {
  const { id, accessToken, profileImage, roleType: currentRole } = user;
  const { logoutMutation } = useAuth();

  const handleLogout = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await logoutMutation.mutateAsync({ id, accessToken });
  };

  return (
    <div className="dropdown dropdown-hover dropdown-end">
      <Avatar
        role="button"
        imageSrc={profileImage !== null ? `url${profileImage}` : `url(./src/assets/images/user.png)`}
        className="btn m-auto w-12 h-12 p-4"
      />
      <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
        {DropdownItems.map(
          ({ name, href, neededRole }, index) =>
            isAuthenticated(currentRole, neededRole) && (
              <li key={index}>
                <Link to={href}>{name}</Link>
              </li>
            ),
        )}
        <li>
          <button onClick={handleLogout}>로그아웃</button>
        </li>
      </ul>
    </div>
  );
};

const DropdownItems: { name: string; href: string; neededRole: RoleType }[] = [
  { name: '내 정보', href: '/mypage', neededRole: 'ROLE_USER' },
  { name: '관리자', href: '/admin/member', neededRole: 'ROLE_ADMIN' },
];

export default DropdownAvatar;
