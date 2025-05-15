import { useMutation, useQueryClient } from '@tanstack/react-query';

import toast from 'react-hot-toast';
import { createNewBaoCao } from '../../services/apiBaoCao';
import { useNavigate } from 'react-router-dom';
import { useDsCanBoKhoa } from '../QuanLyCanBoKhoa/useDsCanBoKhoa';
import { useCreateThongBao } from '../QuanLyThongBao/useCreateThongBao';

export function useCreateBaoCao() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { dsCanBoKhoaId } = useDsCanBoKhoa();
  const { createThongBao } = useCreateThongBao();
  const accountData = queryClient.getQueryData(['account']);
  const { user, acc } = accountData;
  const { mutate: createBaoCao, isPending: isCreating } = useMutation({
    mutationFn: createNewBaoCao,
    onSuccess: (data) => {
      const svId =
        data?.baoCaoTienDo.deTai.sinhVien?.map((sv) => sv.sinhVienId) || [];
      const gvId =
        data?.baoCaoTienDo.deTai.giangVien?.map((sv) => sv.giangVienId) || [];
      createThongBao({
        message: `${acc.vaiTro} ${user.ten} vừa tạo mới một báo cáo trong tiến độ ${data?.baoCaoTienDo.loaiBaoCao} lần thứ ${data?.baoCaoTienDo.lanThu} đề tài ${data?.baoCaoTienDo.deTai.ten}.`,
        sinhViens: svId,
        giangViens: gvId,
        canBoKhoas: dsCanBoKhoaId,
      });
      toast.success('Nộp báo cáo thành công!');
      // Cập nhật lại danh sách báo cáo nếu cần
      queryClient.invalidateQueries({ queryKey: ['baocaotiendos'] });
      queryClient.invalidateQueries({ queryKey: ['baocaotiendo'] });
      queryClient.invalidateQueries({ queryKey: ['baocaos'] });
      navigate(-1);
    },
    onError: (err) => {
      toast.error(err.message || 'Nộp báo cáo thất bại!');
    },
  });

  return { createBaoCao, isCreating };
}
