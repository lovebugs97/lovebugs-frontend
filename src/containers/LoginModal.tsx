import { FC, useState } from 'react';
import { Modal, ModalAction, ModalContent } from '../components/common/Modal.tsx';
import useAuth from '../hooks/useAuth.ts';
import * as React from 'react';

type LoginModalProps = {
  modalOpen: boolean;
  setModalOpen: (modalOpen: boolean) => void;
};

const LoginModal: FC<LoginModalProps> = ({ modalOpen, setModalOpen }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const { loginMutation } = useAuth();

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, email: e.currentTarget.value });
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, password: e.currentTarget.value });
  };

  const handleLoginBtn = async () => {
    loginMutation
      .mutateAsync(credentials)
      .then(() => setModalOpen(false))
      .catch((err) => console.log(err));
  };

  return (
    <Modal open={modalOpen}>
      <ModalContent onClose={() => setModalOpen(false)}>
        <p className="text-center font-semibold text-[24px]">로그인</p>
        <ModalAction>
          <section className="flex flex-col justify-center gap-5 m-auto">
            <input
              type="text"
              onChange={handleEmailInput}
              placeholder="Email"
              className="input input-bordered w-[300px]"
            />
            <input
              type="password"
              onChange={handlePasswordInput}
              placeholder="Password"
              className="input input-bordered w-[300px]"
            />
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
