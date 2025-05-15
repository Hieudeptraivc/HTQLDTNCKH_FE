import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginApi } from '../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: login,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: ({ username, password }) => loginApi({ username, password }),
    onSuccess: (acc) => {
      // console.log(acc?.taiKhoan);
      queryClient.invalidateQueries({ queryKey: ['account'] });
      switch (acc?.taiKhoan.vaiTro) {
        case 'Admin': {
          navigate('/admin/dashboard');
          break;
        }
        case 'Cán bộ khoa': {
          navigate('/can-bo-khoa/dashboard');
          break;
        }
        case 'Sinh viên': {
          navigate('/sinh-vien/quan-ly-de-tai');
          break;
        }
        case 'Giảng viên': {
          navigate('/giang-vien/quan-ly-de-tai');
          break;
        }
      }
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });
  return { login, isPending, isError, error };
}
