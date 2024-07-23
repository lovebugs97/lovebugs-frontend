import { FC, useEffect, useState } from 'react';
import { Modal, ModalAction, ModalContent } from '../components/common/Modal.tsx';
import useAuth from '../hooks/useAuth.ts';
import * as React from 'react';
import { Link } from 'react-router-dom';

type LoginModalProps = {
  modalOpen: boolean;
  setModalOpen: (modalOpen: boolean) => void;
};

const LoginModal: FC<LoginModalProps> = ({ modalOpen, setModalOpen }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [invalidCredentials, setInvalidCredentials] = useState(false)

  const { loginMutation } = useAuth();

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, email: e.currentTarget.value });
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, password: e.currentTarget.value });
  };

  const handleLoginBtn = () => {
    loginMutation
      .mutateAsync(credentials)
      .then(() => setModalOpen(false))
      .catch(() => setInvalidCredentials(true))

    setTimeout(() => setInvalidCredentials(false), 3000)
  };

  const inputClassName = [
    'input input-bordered w-[300px]',
    invalidCredentials ? 'input-error' : ''
  ].join(' ')

  useEffect(() => {
    return () => setModalOpen(false)
  }, [])

  return (
    <Modal open={modalOpen}>
      <ModalContent onClose={() => setModalOpen(false)}>
        <p className="text-center font-semibold text-[24px]">로그인</p>
        {invalidCredentials && (
          <p className="text-center text-red-400 mt-5">아이디 혹은 비밀번호를 확인하세요.</p>
        )}
        <ModalAction>
          <section className="flex flex-col justify-center gap-5 m-auto">
            <input
              type="text"
              onChange={handleEmailInput}
              placeholder="Email"
              className={inputClassName}
            />
            <input
              type="password"
              onChange={handlePasswordInput}
              placeholder="Password"
              className={inputClassName}
            />
            <Link className="text-center underline underline-offset-2 hover:text-gray-300" to={'/signup'}>
              아직 회원이 아니신가요?
            </Link>
            <button className="btn btn-primary" onClick={handleLoginBtn}>
              Login
            </button>
          </section>
        </ModalAction>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
