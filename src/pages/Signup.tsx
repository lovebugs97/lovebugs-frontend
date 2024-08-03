import { FC } from 'react';
import SignupContainer from '../features/signup/container/SignupContainer.tsx';

const Signup: FC = () => {
  return (
    <div className="w-full h-full min-w-[1450px] min-h-full">
      <SignupContainer />
    </div>
  );
};

export default Signup;
