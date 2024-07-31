import { FC } from 'react';
import useUsers from '../../../../hooks/useUsers.ts';
import UserTableList from '../components/UserTableList.tsx';

const AdminMemberContainer: FC = () => {
  const { page, handlePageChange, findUserData } = useUsers();

  if (!findUserData) {
    return <div>Loading...</div>;
  }

  const { content: users, totalElements, totalPages, numberOfElements } = findUserData;

  return (
    <div className="flex flex-col gap-20">
      <section>
        <p className="text-[28px] font-bold">{`전체 ${totalElements}명의 회원`}</p>
      </section>

      <UserTableList
        users={users}
        page={page}
        totalPages={totalPages}
        numberOfElements={numberOfElements}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default AdminMemberContainer;
