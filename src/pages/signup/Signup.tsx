import { useEffect } from 'react';
import { useAuthStore } from '../../store/Store.tsx';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      alert('잘못된 접근입니다.');
      navigate('/');
    }
  }, []);

  return <div>signup</div>;
};

export default Signup;
