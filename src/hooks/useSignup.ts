import { useMutation } from '@tanstack/react-query';
import { ErrorResponse } from 'global-types';
import { SendVerificationCodeRequest, SignupRequest, VerifyCodeRequest } from 'auth-types';
import { emailDuplicationCheck, sendVerificationCode, signup, verifyCode } from '../services/auth/authService.ts';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { isValidEmail, isValidPassword } from '../utils/validationUtils.ts';

export type SignupInputType = SignupRequest & {
  passwordCheck: string;
  verificationCode: string;
};

type ValidationCheckType = {
  emailValidation: boolean;
  emailNotDuplicated: boolean;
  emailVerified: boolean;
  passwordValidation: boolean;
  passwordMatch: boolean;
};

const useSignup = () => {
  const navigate = useNavigate();

  const [signupInput, setSignupInput] = useState<SignupInputType>({
    name: '',
    email: '',
    password: '',
    passwordCheck: '',
    verificationCode: '',
    gender: 1,
  });

  const { email, password, passwordCheck } = signupInput;

  const [validationCheck, setValidationCheck] = useState<ValidationCheckType>({
    emailValidation: false,
    emailNotDuplicated: false, // 이메일이 유니크한지 검사
    emailVerified: false, // 이메일 인증이 완료되었는지 검사
    passwordValidation: false, // 패스워드가 정규식을 만족하는지 검사
    passwordMatch: false, // password === passwordCheck
  });

  /* signupInput과 validation 상태를 동기화하기 위해 useEffect 훅 사용 */
  useEffect(() => {
    setValidationCheck((prev) => ({
      ...prev,
      emailValidation: isValidEmail(email),
      passwordValidation: isValidPassword(password),
      passwordMatch: password.length > 0 && password === passwordCheck,
    }));
  }, [email, password, passwordCheck]);

  const handleValidationCheck = (key: keyof ValidationCheckType, value: boolean) => {
    setValidationCheck((prev) => ({ ...prev, [key]: value }));
  };

  const handleSignupInput = (key: keyof SignupInputType, value: string | number) => {
    setSignupInput((prev) => ({ ...prev, [key]: value }));
  };

  const signupMutation = useMutation<void, ErrorResponse, SignupRequest>({
    mutationFn: async (signupRequest) => await signup(signupRequest),
    onSuccess: () => {
      console.log('Successfully Signup');
      navigate('/');
    },
    onError: (error) => {
      console.log('Error Signup', error);
    },
  });

  const emailDuplicationCheckMutation = useMutation<void, ErrorResponse, string>({
    mutationFn: async (email: string) => await emailDuplicationCheck(email),
    onSuccess: () => {
      console.log('Valid Email');
    },
    onError: (error) => {
      console.log('Duplicated Email', error);
    },
  });

  const sendVerificationCodeMutation = useMutation<void, ErrorResponse, SendVerificationCodeRequest>({
    mutationFn: async (sendVerificationCodeRequest) => await sendVerificationCode(sendVerificationCodeRequest),
    onSuccess: () => {
      console.log('Successfully Send Verification Code');
    },
    onError: (error) => {
      console.log('Failed to send Verification Code', error);
    },
  });

  const emailVerificationCheckMutation = useMutation<void, ErrorResponse, VerifyCodeRequest>({
    mutationFn: async (verificationCode) => await verifyCode(verificationCode),
    onSuccess: () => {
      console.log('Successfully Verified Verification Code');
    },
    onError: (error) => {
      console.log('Failed to verify Verification Code', error);
    },
  });

  return {
    signupInput,
    handleSignupInput,
    validationCheck,
    handleValidationCheck,
    signupMutation,
    emailDuplicationCheckMutation,
    sendVerificationCodeMutation,
    emailVerificationCheckMutation,
  };
};

export default useSignup;
