import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logoutApi } from '../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: logout,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: () => {
      queryClient.clear();
      navigate('/login');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { logout, isPending, isError, error };
}
