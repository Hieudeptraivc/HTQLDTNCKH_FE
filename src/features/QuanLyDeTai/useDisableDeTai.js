import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useCreateThongBao } from './../QuanLyThongBao/useCreateThongBao';
import { disableDeTaiById } from '../../services/apiDeTai';
import { useDsCanBoKhoa } from '../QuanLyCanBoKhoa/useDsCanBoKhoa';
import toast from 'react-hot-toast';

export function useDisableDeTai() {
  const queryClient = useQueryClient();
  const { createThongBao } = useCreateThongBao();
  const { dsCanBoKhoaId } = useDsCanBoKhoa();

  const accountData = queryClient.getQueryData(['account']);
  const { user, acc } = accountData;
  const {
    mutate: disableDeTai,
    isPending: isDisable,
    error,
    isError,
  } = useMutation({
    mutationFn: ({ deTaiId }) => disableDeTaiById({ deTaiId }),
    onSuccess: (deTai) => {
      // console.log(deTai);
      const svId = deTai?.sinhVien?.map((sv) => sv.sinhVienId) || [];
      const gvId = deTai?.giangVien?.map((sv) => sv.giangVienId) || [];
      createThongBao({
        message: `${acc.vaiTro} ${user.ten} vừa từ chối một đề tài ${deTai?.ten} mà bạn có tham gia.`,
        sinhViens: svId,
        giangViens: gvId,
        canBoKhoas: dsCanBoKhoaId,
      });
      queryClient.invalidateQueries(['detais']);
      queryClient.invalidateQueries(['detai', deTai._id]);
      toast.success('Bạn đã từ chối đề tài thành công');
    },
    onError: (err) => toast.error(err.message),
  });
  return {
    isDisable,
    disableDeTai,
    disableError: error,
    isDisableError: isError,
  };
}
