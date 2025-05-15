import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { deleteTaiKhoanById } from '../../services/apiTaiKhoan';
import toast from 'react-hot-toast';

export function useDeleteTaiKhoan() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: deleteTaiKhoan,
    isPending: isDeleting,
    error,
    isError,
  } = useMutation({
    mutationFn: ({ taiKhoanId }) => deleteTaiKhoanById({ taiKhoanId }),
    onSuccess: () => {
      navigate('/admin/quan-ly-tai-khoan');
      toast.success('Xóa tài khoản thành công.');
      queryClient.invalidateQueries(['taikhoans']);
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    isDeleting,
    deleteTaiKhoan,
    DeleteError: error,
    isDeleteError: isError,
  };
}
