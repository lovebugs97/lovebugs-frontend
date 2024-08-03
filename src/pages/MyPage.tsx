import { FC } from 'react';
import MyPageContainer from '../features/myPage/container/MyPageContainer.tsx';

const MyPage: FC = () => {
  return (
    <div className="w-full h-full min-w-[1450px] min-h-full">
      <MyPageContainer />
    </div>
  );
};

export default MyPage;
