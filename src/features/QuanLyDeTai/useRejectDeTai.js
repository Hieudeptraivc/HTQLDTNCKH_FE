import { useMutation, useQueryClient } from '@tanstack/react-query';
import { rejectDeTaiById } from '../../services/apiDeTai';
import toast from 'react-hot-toast';
import { useCreateThongBao } from '../QuanLyThongBao/useCreateThongBao';
import { useDsCanBoKhoa } from '../QuanLyCanBoKhoa/useDsCanBoKhoa';
export function useRejectDeTai() {
  const queryClient = useQueryClient();
  //   const navigate = useNavigate();
  const { createThongBao } = useCreateThongBao();
  const { dsCanBoKhoaId } = useDsCanBoKhoa();

  const accountData = queryClient.getQueryData(['account']);
  const { user, acc } = accountData;
  const {
    mutate: rejectDeTai,
    isPending: isRejecting,
    error,
    isError,
  } = useMutation({
    mutationFn: ({ deTaiId }) => rejectDeTaiById({ deTaiId }),
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
      //   navigate('/can-bo-khoa/quan-ly-de-tai');
    },

    onError: (err) => toast.error(err.message),
  });
  return {
    isRejecting,
    rejectDeTai,
    DeleteError: error,
    isDeleteError: isError,
  };
}
