import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editNhanXetById } from '../../services/apiNhanXet';
import toast from 'react-hot-toast';
import { useCreateThongBao } from '../QuanLyThongBao/useCreateThongBao';

export function useEditNhanXet() {
  const queryClient = useQueryClient();
  const { createThongBao } = useCreateThongBao();
  const accountData = queryClient.getQueryData(['account']);
  const { user, acc } = accountData;
  const {
    mutate: editNhanXet,
    isPending: isEditing,
    error,
  } = useMutation({
    mutationFn: ({ nhanXetId, editData }) =>
      editNhanXetById({ nhanXetId, editData }),
    onSuccess: (nhanXet) => {
      queryClient.invalidateQueries(['nhanxets', nhanXet?.baoCao._id]);
      createThongBao({
        message: `${acc.vaiTro} ${user.ten} vừa chỉnh sửa một nhận xét ở báo cáo ${nhanXet?.baoCao.ten} của bạn.`,
        sinhViens: [nhanXet?.baoCao.sinhVien._id],
      });
      toast.success('Chỉnh sửa thành công nhận xét');
    },
    onError: (err) => toast.error(err.message),
  });
  return {
    isEditing,
    editNhanXet,
    thongBaoError: error,
  };
}
