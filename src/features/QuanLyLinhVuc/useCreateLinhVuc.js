import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNewLinhVuc } from '../../services/apiLinhvuc';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useCreateThongBao } from '../QuanLyThongBao/useCreateThongBao';
import { useDsCanBoKhoa } from '../QuanLyCanBoKhoa/useDsCanBoKhoa';

export function useCreateLinhVuc() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { createThongBao } = useCreateThongBao();
  const { dsCanBoKhoaId } = useDsCanBoKhoa();
  const accountData = queryClient.getQueryData(['account']);
  const { user, acc } = accountData;
  const {
    mutate: createLinhVuc,
    isPending: isCreating,
    error,
    isError,
  } = useMutation({
    mutationFn: ({ newData }) => createNewLinhVuc({ newData }),
    onSuccess: (linhVuc) => {
      createThongBao({
        message: `${acc.vaiTro} ${user.ten} vừa tạo mới lĩnh vực ${linhVuc?.ten}.`,
        canBoKhoas: dsCanBoKhoaId,
      });
      queryClient.invalidateQueries(['linhvucs']);
      queryClient.invalidateQueries(['linhvuc', linhVuc?._id]);
      toast.success('Tạo mới lĩnh vực thành công');
      navigate('/admin/quan-ly-linh-vuc');
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    isCreating,
    createLinhVuc,
    createError: error,
    isCreateError: isError,
  };
}
