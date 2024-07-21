import { FC } from 'react';
import useStore from '../../store/Store.tsx';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../App.tsx';
import axios from 'axios';

const Home: FC = () => {
  const { count, inc } = useStore();
  const count2 = useStore((state) => state.count);

  const { mutate } = useMutation({
    mutationFn: async () => {
      const response = await axios.post("http://127.0.0.1:8000/api/auth-service/auth/v1/login", { email: '1234', password: '1234' } )
      console.log(response.data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['test'] })
    },
    onError: () => {},
    onSettled: () => {}
  })

  return (
    <div>
      <p>{count}</p>
      <p>{count2}</p>
      <button onClick={inc}>Click</button>
      <button onClick={() => mutate()}>Click</button>
    </div>
  );
}

export default Home;