import { useMutation, useQueryClient } from '@tanstack/react-query';
import { restartDeTaiById } from '../../services/apiDeTai';
import toast from 'react-hot-toast';
import { useCreateThongBao } from '../QuanLyThongBao/useCreateThongBao';
import { useDsCanBoKhoa } from '../QuanLyCanBoKhoa/useDsCanBoKhoa';
export function useRestartDeTai() {
  const queryClient = useQueryClient();
  //   const navigate = useNavigate();
  const { createThongBao } = useCreateThongBao();
  const { dsCanBoKhoaId } = useDsCanBoKhoa();

  const accountData = queryClient.getQueryData(['account']);
  const { user, acc } = accountData;
  const {
    mutate: restartStatusDeTai,
    isPending: isRestarting,
    error,
    isError,
  } = useMutation({
    mutationFn: ({ deTaiId }) => restartDeTaiById({ deTaiId }),
    onSuccess: (deTai) => {
      // console.log(deTai);
      const svId = deTai?.sinhVien?.map((sv) => sv.sinhVienId) || [];
      const gvId = deTai?.giangVien?.map((sv) => sv.giangVienId) || [];
      createThongBao({
        message: `${acc.vaiTro} ${user.ten} vừa chỉnh trạng thái đề tài ${deTai?.ten} mà bạn có tham gia thành "Đang chờ duyệt".`,
        sinhViens: svId,
        giangViens: gvId,
        canBoKhoas: dsCanBoKhoaId,
      });
      queryClient.invalidateQueries(['detais']);
      queryClient.invalidateQueries(['detai', deTai._id]);
      toast.success('Bạn đã cập nhật trạng thái đề tài thành công');
      //   navigate('/can-bo-khoa/quan-ly-de-tai');
    },

    onError: (err) => toast.error(err.message),
  });
  return {
    isRestarting,
    restartStatusDeTai,
    DeleteError: error,
    isDeleteError: isError,
  };
}
