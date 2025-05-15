import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNewNhanXetByBaoCaoId } from '../../services/apiNhanXet';
import toast from 'react-hot-toast';
import { useCreateThongBao } from '../QuanLyThongBao/useCreateThongBao';

export function useCreateNhanXet() {
  const queryClient = useQueryClient();
  const { createThongBao } = useCreateThongBao();
  const accountData = queryClient.getQueryData(['account']);
  const { user, acc } = accountData;
  const {
    mutate: createNhanXet,
    isPending: isCreating,
    error,
  } = useMutation({
    mutationFn: ({ baoCaoId, newData }) =>
      createNewNhanXetByBaoCaoId({ baoCaoId, newData }),
    onSuccess: (nhanXet) => {
      queryClient.invalidateQueries(['nhanxets', nhanXet?.baoCao._id]);
      createThongBao({
        message: `${acc.vaiTro} ${user.ten} vừa thêm mới một nhận xét ở báo cáo ${nhanXet?.baoCao.ten} của bạn.`,
        sinhViens: [nhanXet?.baoCao.sinhVien._id],
      });
      toast.success('Tạo thành công nhận xét');
    },
    onError: (err) => toast.error(err.message),
  });
  return {
    isCreating,
    createNhanXet,
    thongBaoError: error,
  };
}
