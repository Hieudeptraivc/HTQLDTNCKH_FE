import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNewCanBoKhoa } from '../../services/apiCanBoKhoa';
import { useCreateThongBao } from '../QuanLyThongBao/useCreateThongBao';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useCreateCanBoKhoa() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { createThongBao } = useCreateThongBao();
  const accountData = queryClient.getQueryData(['account']);
  const { user, acc } = accountData;

  const {
    mutate: createCanBoKhoa,
    isPending: isCreating,
    error,
    isError,
  } = useMutation({
    mutationFn: ({ newData }) => createNewCanBoKhoa({ newData }),
    onSuccess: (canBoKhoa) => {
      // Gửi thông báo tạo cán bộ khoa mới
      createThongBao({
        message: `${acc.vaiTro} ${user.ten} vừa tạo mới bạn`,
        canBoKhoas: [canBoKhoa?._id],
      });
      // Làm mới lại dữ liệu liên quan
      queryClient.invalidateQueries(['canbokhoas']);
      queryClient.invalidateQueries(['canbokhoa', canBoKhoa._id]);
      toast.success('Tạo mới thành công cán bộ khoa');
      navigate('/admin/quan-ly-can-bo-khoa');
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    isCreating,
    createCanBoKhoa,
    createError: error,
    isCreateError: isError,
  };
}
