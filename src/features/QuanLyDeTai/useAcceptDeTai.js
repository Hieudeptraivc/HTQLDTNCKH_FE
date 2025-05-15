import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { acceptDeTaiById } from '../../services/apiDeTai';
import toast from 'react-hot-toast';
import { useCreateThongBao } from '../QuanLyThongBao/useCreateThongBao';
import { useDsCanBoKhoa } from '../QuanLyCanBoKhoa/useDsCanBoKhoa';
export function useAcceptDeTai() {
  const queryClient = useQueryClient();
  //   const navigate = useNavigate();
  const { createThongBao } = useCreateThongBao();
  const { dsCanBoKhoaId } = useDsCanBoKhoa();
  const accountData = queryClient.getQueryData(['account']);
  const { user, acc } = accountData;
  const {
    mutate: acceptDeTai,
    isPending: isAccepting,
    error,
    isError,
  } = useMutation({
    mutationFn: ({ deTaiId }) => acceptDeTaiById({ deTaiId }),
    onSuccess: (deTai) => {
      const svId = deTai?.sinhVien?.map((sv) => sv.sinhVienId) || [];
      const gvId = deTai?.giangVien?.map((sv) => sv.giangVienId) || [];
      createThongBao({
        message: `${acc.vaiTro} ${user.ten} vừa duyệt một đề tài ${deTai?.ten} mà bạn có tham gia.`,
        sinhViens: svId,
        giangViens: gvId,
        canBoKhoas: dsCanBoKhoaId,
      });
      queryClient.invalidateQueries(['detais']);
      queryClient.invalidateQueries(['detai', deTai._id]);
      toast.success('Bạn đã duyệt đề tài thành công');
      //   navigate('/can-bo-khoa/quan-ly-de-tai');
    },

    onError: (err) => toast.error(err.message),
  });
  return {
    isAccepting,
    acceptDeTai,
    DeleteError: error,
    isDeleteError: isError,
  };
}
