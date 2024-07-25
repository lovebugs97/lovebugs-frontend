import { ChangeEvent, MouseEvent, FC, FormEvent } from 'react';
import { isValidEmail, isValidPassword } from '../../../utils/validationUtils.ts';
import useAuth from '../../../hooks/useAuth.ts';
import SelectRadioButtonGroup from '../components/SelectRadioButtonGroup.tsx';
import useSignup from '../../../hooks/useSignup.ts';
import PasswordInputGroup from '../components/PasswordInputGroup.tsx';

const SignupFormContainer: FC = () => {
  const {
    signupInput,
    handleSignupInput,
    validationCheck,
    handleValidationCheck,
    signupMutation,
    emailDuplicationCheckMutation,
  } = useSignup();

  const { name, email, password, passwordCheck, gender } = signupInput;

  const { loginMutation } = useAuth();

  const submitBtnDisabled = Object.values(validationCheck).includes(false);

  /* 라디오 버튼 변경 핸들러 */
  const handleGenderChange = (e: ChangeEvent<HTMLInputElement>) => {
    // e.preventDefault(); -> 기본 이벤트 금지시 label 기능 작동 안함
    handleSignupInput('gender', e.target.name === 'man' ? 1 : 0);
  };

  /* 이름 변경 핸들러 */
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    handleSignupInput('name', e.target.value);
  };

  /* 이메일 변경 핸들러 */
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    handleSignupInput('email', e.target.value);
  };

  /* 비밀번호 입력 핸들러 */
  const handlePasswordInputChange = (e: ChangeEvent<HTMLInputElement>, key: 'password' | 'passwordCheck') => {
    e.preventDefault();
    handleSignupInput(key, e.target.value);
  };

  /* 이메일 중복 체크 핸들러 */
  const handleEmailDuplicationCheck = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    emailDuplicationCheckMutation
      .mutateAsync(email)
      .then(() => handleValidationCheck('emailNotDuplicated', true))
      .catch(() => handleValidationCheck('emailNotDuplicated', false));
  };

  /* 회원가입 완료 폼 핸들러: 모든 조건을 만족하면 가입완료 버튼 활성화 -> 버튼 클릭 -> 이벤트가 폼으로 전파 -> 핸들러 실행 */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 예상치 못한 잘못된 이벤트 전파로 실행될 때를 대비한 방어 로직
    if (!Object.values(validationCheck).every((check) => check)) {
      return;
    }

    if (name.length <= 0 || !isValidEmail(email) || !isValidPassword(password) || password !== passwordCheck) {
      return;
    }

    signupMutation.mutateAsync({ name, email, password, gender }).then(() => loginMutation.mutate({ email, password }));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5">
      <SelectRadioButtonGroup gender={gender} onChange={handleGenderChange} />
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        className="w-[400px] h-16 input input-bordered"
        onChange={handleNameChange}
      />
      <div className="flex ml-[160px] gap-16 items-center">
        <input
          type="text"
          name="email"
          placeholder="Email Address"
          disabled={validationCheck.emailNotDuplicated}
          className="w-[400px] h-16 input input-bordered"
          onChange={handleEmailChange}
        />
        <button className="btn btn-primary" onClick={handleEmailDuplicationCheck} disabled={!isValidEmail(email)}>
          중복 확인
        </button>
      </div>

      <div className="flex flex-col gap-5 ml-[100px]">
        <PasswordInputGroup onChange={handlePasswordInputChange} />
      </div>

      <div className="h-28 flex flex-col justify-center items-center mt-5">
        <button disabled={submitBtnDisabled} className="btn btn-primary mt-3 w-[160px]">
          가입하기
        </button>
      </div>
    </form>
  );
};

export default SignupFormContainer;
