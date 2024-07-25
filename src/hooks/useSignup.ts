import { useMutation } from '@tanstack/react-query';
import { ErrorResponse } from 'global-types';
import { SignupRequest } from 'auth-types';
import { emailDuplicationCheck, signup } from '../services/auth/authService.ts';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { isValidEmail, isValidPassword } from '../utils/validationUtils.ts';

type SignupInputType = SignupRequest & {
  passwordCheck: string;
  emailVerifiedNumber: string;
};

type ValidationCheckType = {
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
    gender: 1,
    emailVerifiedNumber: '',
  });

  const { email, password, passwordCheck } = signupInput;

  const [validationCheck, setValidationCheck] = useState<ValidationCheckType>({
    emailNotDuplicated: false, // 이메일이 유니크한지 검사
    emailVerified: false, // 이메일 인증이 완료되었는지 검사
    passwordValidation: false, // 패스워드가 정규식을 만족하는지 검사
    passwordMatch: false, // password === passwordCheck
  });

  const handleValidationCheck = (key: keyof ValidationCheckType, value: boolean) => {
    setValidationCheck((prev) => ({ ...prev, [key]: value }));
  };

  const handleSignupInput = (key: keyof SignupInputType, value: string | number) => {
    setSignupInput((prev) => ({ ...prev, [key]: value }));

    switch (key) {
      case 'email':
        setValidationCheck((prev) => ({ ...prev, emailValidated: isValidEmail(email) }));
        break;
      case 'password':
        setValidationCheck((prev) => ({
          ...prev,
          passwordValidation: isValidPassword(value as string),
          passwordMatch: password.length > 0 && password === passwordCheck,
        }));
        break;
      default:
        break;
    }
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

  const emailDuplicationCheckMutation = useMutation({
    mutationFn: async (email: string) => await emailDuplicationCheck(email),
    onSuccess: () => {
      console.log('Valid Email');
    },
    onError: (error) => {
      console.log('Invalid Email', error);
    },
  });

  return {
    signupInput,
    handleSignupInput,
    validationCheck,
    handleValidationCheck,
    signupMutation,
    emailDuplicationCheckMutation,
  };
};

export default useSignup;
