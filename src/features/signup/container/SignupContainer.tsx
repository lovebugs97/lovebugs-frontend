import { FC } from 'react';
import SignupFormContainer from './SignupFormContainer.tsx';

const SignupContainer: FC = () => {
  return (
    <div>
      <section className="flex flex-col justify-center items-center mt-16">
        <h1 className="text-[48px] font-bold">안녕하세요.</h1>
        <p className="text-[16px]">간단한 절차를 통해 회원가입을 진행합니다.</p>
      </section>

      <section className="border-2 border-gray-300 rounded-[48px] mx-72 py-16 my-16">
        <SignupFormContainer />
      </section>
    </div>
  );
};

export default SignupContainer;
