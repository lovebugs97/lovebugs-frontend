import Avatar from '../../../../components/avatar/Avatar.tsx';
import { formatDateFromISOString } from '../../../../utils/dateUtils.ts';
import { FindUsersResponse } from 'auth-types';
import { FC } from 'react';

type UserTableListProps = {
  users: FindUsersResponse[];
  page: number;
  totalPages: number;
  numberOfElements: number;
  handlePageChange: (page: number) => void;
};

const UserTableList: FC<UserTableListProps> = ({ users, page, totalPages, numberOfElements, handlePageChange }) => {
  return (
    <section>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Profile Image</th>
              <th>Gender</th>
              <th>Role</th>
              <th>Name</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Last Login</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {users.map(({ id, profileImage, gender, roleType, name, email, createdAt, lastLoginDate }, index) => (
              <tr key={index}>
                <td>{id}</td>
                <td>
                  <Avatar
                    className="w-12 h-12"
                    imageSrc={profileImage !== null ? `url${profileImage}` : `url(./src/assets/images/user.png)`}
                  />
                </td>
                <td>{gender}</td>
                <td>{roleType}</td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{formatDateFromISOString(createdAt)}</td>
                <td>{lastLoginDate ? formatDateFromISOString(lastLoginDate) : 'null'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="font-semibold text-gray-500 text-[12px]">
          ({page + 1}/{totalPages}) 현재 페이지에서 {numberOfElements}명의 회원이 조회되었습니다.
        </p>
        <div className="flex justify-center items-center gap-5 my-12">
          {Array.from(new Array(totalPages)).map((_, index) => (
            <button
              key={index}
              className={`btn text-white w-16 ${page === index ? 'btn-active' : 'bg-gray-700'}`}
              disabled={page === index}
              onClick={() => handlePageChange(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserTableList;
