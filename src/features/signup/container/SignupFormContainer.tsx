import { ChangeEvent, MouseEvent, FC, FormEvent } from 'react';
import { isValidEmail, isValidPassword } from '../../../utils/validationUtils.ts';
import useAuth from '../../../hooks/useAuth.ts';
import SelectRadioButtonGroup from '../components/SelectRadioButtonGroup.tsx';
import useSignup, { SignupInputType } from '../hooks/useSignup.ts';
import PasswordInputGroup from '../components/PasswordInputGroup.tsx';
import { SignupErrorMsg } from '../../../constants/constant.ts';

const SignupFormContainer: FC = () => {
  const { loginMutation } = useAuth();

  const {
    signupInput,
    handleSignupInput,
    validationCheck,
    handleValidationCheck,
    signupMutation,
    emailDuplicationCheckMutation,
    sendVerificationCodeMutation,
    emailVerificationCheckMutation,
  } = useSignup();

  const { name, email, password, passwordCheck, gender, verificationCode } = signupInput;
  const { emailValidation, emailNotDuplicated, emailVerified, passwordValidation, passwordMatch } = validationCheck;
  const submitBtnDisabled = Object.values(validationCheck).includes(false);

  const handleChange = (key: keyof SignupInputType) => (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    handleSignupInput(key, e.target.value);
  };

  const handlePasswordChange = (key: 'password' | 'passwordCheck') => (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    handleSignupInput(key, e.target.value);
  };

  const handleEmailDuplicationCheck = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    emailDuplicationCheckMutation
      .mutateAsync(email)
      .then(() => sendVerificationCodeMutation.mutate({ name, email }))
      .then(() => handleValidationCheck('emailNotDuplicated', true))
      .catch(() => handleValidationCheck('emailNotDuplicated', false));
  };

  const handleEmailVerificationCheck = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    emailVerificationCheckMutation
      .mutateAsync({ verificationCode })
      .then(() => handleValidationCheck('emailVerified', true))
      .catch(() => handleValidationCheck('emailVerified', false));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!Object.values(validationCheck).every((val) => val)) return;
    if (name.length <= 0 || !isValidEmail(email) || !isValidPassword(password) || password !== passwordCheck) return;
    signupMutation.mutateAsync({ name, email, password, gender }).then(() => loginMutation.mutate({ email, password }));
  };

  const handleErrorMessage = () => {
    const { emailNotValidated, emailDuplicated, emailNotVerified, passwordNotValidated, passwordNotMatched, DONE } =
      SignupErrorMsg;

    if (!emailValidation) return emailNotValidated;
    if (!emailNotDuplicated) return emailDuplicated;
    if (!emailVerified) return emailNotVerified;
    if (!passwordValidation) return passwordNotValidated;
    if (!passwordMatch) return passwordNotMatched;
    return DONE;
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5">
      <SelectRadioButtonGroup
        gender={gender}
        onChange={(e) => handleSignupInput('gender', e.target.name === 'man' ? 1 : 0)}
      />
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        className="w-[400px] h-16 input input-bordered"
        autoComplete="off"
        onChange={handleChange('name')}
      />
      <div className="flex ml-[165px] gap-16 items-center">
        <input
          type="text"
          name="email"
          placeholder="Email Address"
          disabled={emailNotDuplicated}
          className={`w-[400px] h-16 input input-bordered`}
          autoComplete="off"
          onChange={handleChange('email')}
        />
        <button
          className="btn btn-primary w-[100px]"
          onClick={handleEmailDuplicationCheck}
          disabled={!isValidEmail(email) || emailNotDuplicated}
          tabIndex={-1}
        >
          메일 인증
        </button>
      </div>
      {emailNotDuplicated && (
        <div className="flex ml-[165px] gap-16 items-center">
          <input
            type="text"
            name="verification_code"
            placeholder="Verification Code"
            className="w-[400px] h-16 input input-bordered"
            disabled={emailVerified}
            autoComplete="off"
            onChange={handleChange('verificationCode')}
          />
          <button
            className="btn btn-primary w-[100px]"
            onClick={handleEmailVerificationCheck}
            disabled={emailVerified}
            tabIndex={-1}
          >
            인증
          </button>
        </div>
      )}
      <div className="flex flex-col gap-5 ml-[100px]">
        <PasswordInputGroup onChange={handlePasswordChange} />
      </div>
      <div className="h-28 flex flex-col justify-center items-center mt-5">
        <p className="text-red-500">{handleErrorMessage()}</p>
        <button disabled={submitBtnDisabled} className="btn btn-primary mt-3 w-[160px]">
          가입하기
        </button>
      </div>
    </form>
  );
};

export default SignupFormContainer;
