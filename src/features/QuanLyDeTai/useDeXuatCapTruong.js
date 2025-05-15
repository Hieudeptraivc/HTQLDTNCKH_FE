import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCapTruongDeTaiById } from '../../services/apiDeTai';
import toast from 'react-hot-toast';
import { useCreateThongBao } from '../QuanLyThongBao/useCreateThongBao';
import { useDsCanBoKhoa } from '../QuanLyCanBoKhoa/useDsCanBoKhoa';
export function useDeXuatCapTruong() {
  const queryClient = useQueryClient();
  //   const navigate = useNavigate();
  const { createThongBao } = useCreateThongBao();
  const { dsCanBoKhoaId } = useDsCanBoKhoa();

  const accountData = queryClient.getQueryData(['account']);
  const { user, acc } = accountData;
  const { mutate: updateCapTruongDeTai, isPending: isUpdating } = useMutation({
    mutationFn: ({ deTaiId }) => updateCapTruongDeTaiById({ deTaiId }),
    onSuccess: (deTai) => {
      // console.log(deTai);
      const svId = deTai?.sinhVien?.map((sv) => sv.sinhVienId) || [];
      const gvId = deTai?.giangVien?.map((sv) => sv.giangVienId) || [];
      createThongBao({
        message: `${acc.vaiTro} ${user.ten} vừa đề xuất đề tài ${deTai?.ten} lên đề tài cấp trường.`,
        sinhViens: svId,
        giangViens: gvId,
        canBoKhoas: dsCanBoKhoaId,
      });
      queryClient.invalidateQueries(['detais']);
      queryClient.invalidateQueries(['detaicaptruongs']);
      queryClient.invalidateQueries(['detai', deTai._id]);
      toast.success('Bạn đã đề xuất đề tài cấp trường thành công');
      //   navigate('/can-bo-khoa/quan-ly-de-tai');
    },

    onError: (err) => toast.error(err.message),
  });
  return {
    isUpdating,
    updateCapTruongDeTai,
  };
}
