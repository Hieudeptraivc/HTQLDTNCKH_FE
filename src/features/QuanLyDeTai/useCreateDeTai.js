import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useCreateThongBao } from '../QuanLyThongBao/useCreateThongBao';
import { useNavigate } from 'react-router-dom';
import { createNewDeTai } from '../../services/apiDeTai';
import toast from 'react-hot-toast';
import { useDsCanBoKhoa } from '../QuanLyCanBoKhoa/useDsCanBoKhoa';

export function useCreateDeTai() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { dsCanBoKhoaId } = useDsCanBoKhoa();
  const { createThongBao } = useCreateThongBao();
  const accountData = queryClient.getQueryData(['account']);
  const { user, acc } = accountData;
  const {
    mutate: createDeTai,
    isPending: isCreating,
    error,
    isError,
  } = useMutation({
    mutationFn: ({ newData }) => createNewDeTai({ newData }),
    onSuccess: (deTai) => {
      const svId = deTai?.sinhVien?.map((sv) => sv.sinhVienId) || [];
      const gvId = deTai?.giangVien?.map((sv) => sv.giangVienId) || [];
      createThongBao({
        message: `${acc.vaiTro} ${user.ten} vừa tạo mới một đề tài ${deTai?.ten}.`,
        sinhViens: svId,
        giangViens: gvId,
        canBoKhoas: dsCanBoKhoaId,
      });
      queryClient.invalidateQueries(['detais']);
      queryClient.invalidateQueries(['detai', deTai._id]);
      toast.success('Bạn vừa tạo mới đề tài thành công');
      if (acc?.vaiTro === 'Cán bộ khoa') {
        navigate('/can-bo-khoa/quan-ly-de-tai');
      } else if (acc?.vaiTro === 'Sinh viên')
        navigate('/sinh-vien/quan-ly-de-tai');
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    isCreating,
    createDeTai,
    createError: error,
    isCreateError: isError,
  };
}
