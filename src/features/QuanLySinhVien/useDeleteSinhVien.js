import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteGiangVienById } from '../../services/apiGiangVien';
import { useNavigate } from 'react-router-dom';
import { deleteSinhVienById } from '../../services/apiSinhVien';
import toast from 'react-hot-toast';

export function useDeleteSinhVien() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: deleteSinhVien,
    isPending: isDeleting,
    error,
    isError,
  } = useMutation({
    mutationFn: ({ sinhVienId }) => deleteSinhVienById({ sinhVienId }),
    onSuccess: () => {
      queryClient.invalidateQueries(['sinhviens']);
      toast.success('Bạn đã xóa sinh viên thành công');
      navigate('/can-bo-khoa/quan-ly-sinh-vien');
    },
    onError: (err) => toast.error(err.message),
  });
  return {
    isDeleting,
    deleteSinhVien,
    DeleteError: error,
    isDeleteError: isError,
  };
}
