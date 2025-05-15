import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteGiangVienById } from '../../services/apiGiangVien';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useDeleteGiangVien() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: deleteGiangVien,
    isPending: isDeleting,
    error,
    isError,
  } = useMutation({
    mutationFn: ({ giangVienId }) => deleteGiangVienById({ giangVienId }),
    onSuccess: () => {
      toast.success('Xóa thành công giảng viên');
      navigate('/can-bo-khoa/quan-ly-giang-vien');
      queryClient.invalidateQueries(['giangviens']);
    },
    onError: (err) => toast.error(err.message),
  });
  return {
    isDeleting,
    deleteGiangVien,
    DeleteError: error,
    isDeleteError: isError,
  };
}
