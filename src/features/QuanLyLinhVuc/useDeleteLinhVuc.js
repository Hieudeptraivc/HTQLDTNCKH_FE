import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useNavigate } from 'react-router-dom';
import { deleteLinhVucById } from '../../services/apiLinhvuc';
import toast from 'react-hot-toast';

export function useDeleteLinhVuc() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: deleteLinhVuc,
    isPending: isDeleting,
    error,
    isError,
  } = useMutation({
    mutationFn: ({ linhVucId }) => deleteLinhVucById({ linhVucId }),
    onSuccess: () => {
      queryClient.invalidateQueries(['linhvucs']);
      toast.success('Xóa thành công lĩnh vực');
      navigate('/admin/quan-ly-linh-vuc');
    },
    onError: (err) => toast.error(err.message),
  });
  return {
    isDeleting,
    deleteLinhVuc,
    DeleteError: error,
    isDeleteError: isError,
  };
}
