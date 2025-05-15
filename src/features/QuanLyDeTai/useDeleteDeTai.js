import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { deleteDeTaiById } from '../../services/apiDeTai';
import toast from 'react-hot-toast';
export function useDeleteDeTai() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const accountData = queryClient.getQueryData(['account']);
  const { acc } = accountData;
  const {
    mutate: deleteDeTai,
    isPending: isDeleting,
    error,
    isError,
  } = useMutation({
    mutationFn: ({ deTaiId }) => deleteDeTaiById({ deTaiId }),
    onSuccess: () => {
      queryClient.invalidateQueries(['detais']);
      toast.success('Bạn đã xóa đề tài thành công');
      if (acc?.vaiTro === 'Cán bộ khoa') {
        navigate('/can-bo-khoa/quan-ly-de-tai');
      } else if (acc?.vaiTro === 'Sinh viên')
        navigate('/sinh-vien/quan-ly-de-tai');
    },

    onError: (err) => toast.error(err.message),
  });
  return {
    isDeleting,
    deleteDeTai,
    DeleteError: error,
    isDeleteError: isError,
  };
}
