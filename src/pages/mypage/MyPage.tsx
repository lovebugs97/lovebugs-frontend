import { useAuthStore } from '../../store/Store.tsx';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { test, test2 } from '../../services/auth/authService.ts';

const MyPage = () => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const testBtn = async () => {
    await test();
  };

  const test2Btn = async () => {
    await test2();
  };

  useEffect(() => {
    if (!user) navigate('/');
  }, [user]);

  return (
    <ul>
      <li>
        <button onClick={testBtn}>[Test] Token Validation</button>
      </li>
      <li>
        <button onClick={test2Btn}>[Test] Token ReIssue</button>
      </li>
    </ul>
  );
};

export default MyPage;
