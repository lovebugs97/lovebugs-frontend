import { test, test2 } from '../services/auth/authService.ts';

const MyPage = () => {
  const testBtn = async () => {
    await test();
  };

  const test2Btn = async () => {
    await test2();
  };

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
