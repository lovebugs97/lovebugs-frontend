import { FC } from 'react';
import { adminTest } from '../services/admin/adminService.ts';

const Admin: FC = () => {
  const handleTestBtn = async () => {
    const res = await adminTest();
    console.log(res);
  };

  return (
    <div>
      <p>Admin</p>
      <button onClick={handleTestBtn}>Test</button>
    </div>
  );
};

export default Admin;
