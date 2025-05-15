import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useNavigate } from 'react-router-dom';
import { deleteKhoaById } from '../../services/apiKhoa';
import toast from 'react-hot-toast';

export function useDeleteKhoa() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: deleteKhoa,
    isPending: isDeleting,
    error,
    isError,
  } = useMutation({
    mutationFn: ({ khoaId }) => deleteKhoaById({ khoaId }),
    onSuccess: () => {
      queryClient.invalidateQueries(['khoas']);
      toast.success('Xóa thành công khoa');
      navigate('/admin/quan-ly-khoa');
    },
    onError: (err) => toast.error(err.message),
  });
  return {
    isDeleting,
    deleteKhoa,
    DeleteError: error,
    isDeleteError: isError,
  };
}
