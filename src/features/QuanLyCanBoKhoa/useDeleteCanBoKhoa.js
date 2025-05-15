import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCanBoKhoaById } from '../../services/apiCanBoKhoa'; // Đảm bảo đúng đường dẫn
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useDeleteCanBoKhoa() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: deleteCanBoKhoa,
    isPending: isDeleting,
    error,
    isError,
  } = useMutation({
    mutationFn: ({ canBoKhoaId }) => deleteCanBoKhoaById({ canBoKhoaId }),
    onSuccess: () => {
      queryClient.invalidateQueries(['canbokhoas']);
      toast.success('Xóa thành công cán bộ khoa');
      navigate('/admin/quan-ly-can-bo-khoa');
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    isDeleting,
    deleteCanBoKhoa,
    DeleteError: error,
    isDeleteError: isError,
  };
}
