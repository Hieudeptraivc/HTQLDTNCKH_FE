import { useMutation, useQueryClient } from '@tanstack/react-query';

import toast from 'react-hot-toast';
import { editBaoCaoById } from '../../services/apiBaoCao';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCreateThongBao } from '../QuanLyThongBao/useCreateThongBao';
import { useDsCanBoKhoa } from '../QuanLyCanBoKhoa/useDsCanBoKhoa';

export function useUpdateBaoCao() {
  const queryClient = useQueryClient();
  const { dsCanBoKhoaId } = useDsCanBoKhoa();
  const { createThongBao } = useCreateThongBao();
  const accountData = queryClient.getQueryData(['account']);
  const { user, acc } = accountData;
  const { mutate: updateBaoCao, isPending: isUpdating } = useMutation({
    mutationFn: ({ baoCaoId, form }) => editBaoCaoById({ baoCaoId, form }),
    onSuccess: (data) => {
      const svId = data?.thanhVien.sinhVien?.map((sv) => sv.sinhVienId) || [];
      const gvId = data?.thanhVien.giangVien?.map((sv) => sv.giangVienId) || [];
      createThongBao({
        message: `${acc.vaiTro} ${user.ten} vừa chỉnh sửa một báo cáo trong tiến độ ${data?.updateBaoCao.baoCaoTienDo.loaiBaoCao} lần thứ ${data?.updateBaoCao.baoCaoTienDo.lanThu} đề tài ${data?.thanhVien.ten}.`,
        sinhViens: svId,
        giangViens: gvId,
        canBoKhoas: dsCanBoKhoaId,
      });
      queryClient.invalidateQueries({ queryKey: ['baocaotiendos'] });
      queryClient.invalidateQueries({ queryKey: ['baocaotiendo'] });
      queryClient.invalidateQueries({ queryKey: ['baocaos'] });
      toast.success('Cập nhật báo cáo thành công!');
    },
    onError: (err) => {
      toast.error(err.message || 'Cập nhật báo cáo thất bại!');
    },
  });

  return { updateBaoCao, isUpdating };
}
