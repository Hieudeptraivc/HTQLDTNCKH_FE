import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { disableTaiKhoanByMe } from '../../services/apiTaiKhoan';
import toast from 'react-hot-toast';

export function useDisableTaiKhoanByMe() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: disableTaiKhoan, isPending: isDisable } = useMutation({
    mutationFn: () => disableTaiKhoanByMe(),
    onSuccess: () => {
      toast.success('Bạn đã vô hiệu hóa tài khoản thành công.');
      navigate('/login');
      queryClient.clear();
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    isDisable,
    disableTaiKhoan,
  };
}
