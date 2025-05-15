import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useAccount() {
  const navigate = useNavigate();
  const { isPending, data } = useQuery({
    queryKey: ['account'],
    queryFn: getCurrentUser,
    retry: false,
    refetchOnWindowFocus: true,
    onError: (err) => {
      toast.error(err.message);
      if (err.message === 'UNAUTHORIZED') navigate('/login');
    },
  });
  return {
    isPending,
    data,
    isAuthenticated: data?.acc.vaiTro !== undefined,
  };
}
