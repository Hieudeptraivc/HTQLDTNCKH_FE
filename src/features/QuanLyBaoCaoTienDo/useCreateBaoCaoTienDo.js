import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useCreateThongBao } from '../QuanLyThongBao/useCreateThongBao';
import { useNavigate } from 'react-router-dom';
import { createNewDeTai } from '../../services/apiDeTai';
import toast from 'react-hot-toast';
import { useDsCanBoKhoa } from '../QuanLyCanBoKhoa/useDsCanBoKhoa';
import { createNewBaoCaoTienDo } from '../../services/apiBaoCaoTienDo';

export function useCreateBaoCaoTienDo() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { dsCanBoKhoaId } = useDsCanBoKhoa();
  const { createThongBao } = useCreateThongBao();
  const accountData = queryClient.getQueryData(['account']);
  const { user, acc } = accountData;
  const {
    mutate: createBaoCaoTienDo,
    isPending: isCreating,
    error,
    isError,
  } = useMutation({
    mutationFn: ({ newData }) => createNewBaoCaoTienDo({ newData }),
    onSuccess: (data) => {
      const { baoCaoTienDo, deTai } = data;
      const svId = deTai?.sinhVien?.map((sv) => sv.sinhVienId) || [];
      const gvId = deTai?.giangVien?.map((sv) => sv.giangVienId) || [];
      createThongBao({
        message: `${acc.vaiTro} ${user.ten} vừa tạo mới một báo cáo tiến độ ${baoCaoTienDo?.loaiBaoCao} lần thứ ${baoCaoTienDo.lanThu} đề tài ${deTai?.ten}.`,
        sinhViens: svId,
        giangViens: gvId,
        canBoKhoas: dsCanBoKhoaId,
      });
      queryClient.invalidateQueries(['baocaotiendos']);
      queryClient.invalidateQueries(['baocaotiendo', baoCaoTienDo._id]);
      toast.success('Bạn vừa tạo mới báo cáo tiến độ thành công');
      navigate(-1);
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    isCreating,
    createBaoCaoTienDo,
    createError: error,
    isCreateError: isError,
  };
}
