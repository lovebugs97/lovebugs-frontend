import { Modal, ModalAction, ModalContent } from './Modal.tsx';
import { Link } from 'react-router-dom';
import { FC, useState } from 'react';
import useAuth from '../../hooks/useAuth.ts';

type LoginModalProps = {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
};

const LoginModal: FC<LoginModalProps> = ({ modalOpen, setModalOpen }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const { loginMutation } = useAuth();

  const handleInputChange = (field: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prevState) => ({
      ...prevState,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    loginMutation
      .mutateAsync(credentials)
      .then(() => setModalOpen(false))
      .catch(() => setInvalidCredentials(true));

    setTimeout(() => setInvalidCredentials(false), 3000);
  };

  const inputClassName = ['input input-bordered w-[300px]', invalidCredentials ? 'input-error' : ''].join(' ');

  return (
    <Modal open={modalOpen}>
      <ModalContent className="w-[480px] h-fit" onClose={() => setModalOpen(false)}>
        <h1 className="text-center font-semibold text-[42px]">Login</h1>
        <div className="h-32 mt-10 text-center">
          <img src="/favicon.ico" alt="logo" className="scale-150 m-auto" />
          <p className="mt-16 font-semibold text-[18px]">로그인하고 여러 소식 받아보기</p>
        </div>

        <div className="h-4 mt-[120px]">
          {invalidCredentials && <p className="text-center text-red-400">아이디 혹은 비밀번호를 확인하세요.</p>}
        </div>
        <ModalAction className="mb-5">
          <form onSubmit={handleSubmit} className="flex flex-col justify-center m-auto gap-3">
            <input
              type="text"
              onChange={(e) => handleInputChange('email', e)}
              placeholder="Email"
              className={inputClassName}
              autoComplete="username"
            />
            <input
              type="password"
              onChange={(e) => handleInputChange('password', e)}
              placeholder="Password"
              className={inputClassName}
              autoComplete="current-password"
            />
            <Link
              onClick={() => setModalOpen(false)}
              className="text-center underline underline-offset-4 hover:text-gray-400 hover:scale-105 mt-5"
              to={'/signup'}
            >
              아직 회원이 아니신가요?
            </Link>
            <button className="btn btn-primary mt-3">Login</button>
          </form>
        </ModalAction>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
