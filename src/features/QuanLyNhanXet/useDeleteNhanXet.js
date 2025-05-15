import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNhanXetById } from '../../services/apiNhanXet';
import toast from 'react-hot-toast';

export function useDeleteNhanXet() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteNhanXet,
    isPending: isDeleting,
    error,
  } = useMutation({
    mutationFn: ({ nhanXetId }) => deleteNhanXetById({ nhanXetId }),
    onSuccess: (nhanXet) => {
      // console.log(nhanXet);
      queryClient.invalidateQueries(['nhanxets']);
      toast.success('Xóa thành công nhận xét');
    },
    onError: (err) => toast.error(err.message),
  });
  return {
    isDeleting,
    deleteNhanXet,
    thongBaoError: error,
  };
}
