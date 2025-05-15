import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { deleteBaoCaoTienDoById } from '../../services/apiBaoCaoTienDo';
export function useDeleteBaoCaoTienDo() {
  const { baoCaoTienDoId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: deleteBaoCaoTienDo,
    isPending: isDeleting,
    error,
    isError,
  } = useMutation({
    mutationFn: ({ baoCaoTienDoId }) =>
      deleteBaoCaoTienDoById({ baoCaoTienDoId }),
    onSuccess: () => {
      queryClient.invalidateQueries(['baocaotiendos']);
      toast.success('Bạn đã xóa báo cáo tiến độ thành công');
      if (baoCaoTienDoId) {
        navigate(-1);
      }
    },

    onError: (err) => toast.error(err.message),
  });
  return {
    isDeleting,
    deleteBaoCaoTienDo,
    DeleteError: error,
    isDeleteError: isError,
  };
}
