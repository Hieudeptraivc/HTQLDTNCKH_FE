import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { deleteBaoCaoById } from '../../services/apiBaoCao';

export function useDeleteBaoCao() {
  const queryClient = useQueryClient();
  const location = useLocation();
  const navigate = useNavigate();
  const accountData = queryClient.getQueryData(['account']);
  const { acc } = accountData;
  const {
    mutate: deleteBaoCao,
    isPending: isDeleting,
    error,
    isError,
  } = useMutation({
    mutationFn: ({ baoCaoId }) => deleteBaoCaoById({ baoCaoId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['baocaos'] });
      queryClient.invalidateQueries({ queryKey: ['baocaotiendos'] });
      queryClient.invalidateQueries({ queryKey: ['baocaotiendo'] });

      toast.success('Xóa thành công báo cáo');
      if (!location.pathname.includes('/quan-ly-bao-cao')) {
        navigate(-1); // Quay lại trang trước đó
      } else {
        // Điều hướng dựa vào vai trò
        if (acc?.vaiTro === 'Cán bộ khoa') {
          navigate('/can-bo-khoa/quan-ly-bao-cao');
        } else if (acc?.vaiTro === 'Sinh viên') {
          navigate('/sinh-vien/quan-ly-bao-cao');
        }
      }
    },
    onError: (err) => toast.error(err.message),
  });
  return {
    isDeleting,
    deleteBaoCao,
    DeleteError: error,
    isDeleteError: isError,
  };
}
