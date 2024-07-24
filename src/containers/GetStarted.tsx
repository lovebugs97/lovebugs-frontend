import { useLoginModal } from '../store/Store.tsx';
import LoginModal from './LoginModal.tsx';

const GetStarted = () => {
  const { modalOpen, setModalOpen } = useLoginModal((state) => state);

  return (
    <div>
      <button
        className="btn btn-primary text-[18px] font-semibold hover:text-gray-300"
        onClick={() => setModalOpen(true)}
      >
        Get Started
      </button>
      <LoginModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
};

export default GetStarted;
