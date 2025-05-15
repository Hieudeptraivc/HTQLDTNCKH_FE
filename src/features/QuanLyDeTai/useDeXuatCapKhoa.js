import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCapKhoaDeTaiById } from '../../services/apiDeTai';
import toast from 'react-hot-toast';
import { useCreateThongBao } from '../QuanLyThongBao/useCreateThongBao';
import { useDsCanBoKhoa } from '../QuanLyCanBoKhoa/useDsCanBoKhoa';
export function useDeXuatCapKhoa() {
  const queryClient = useQueryClient();
  //   const navigate = useNavigate();
  const { createThongBao } = useCreateThongBao();
  const { dsCanBoKhoaId } = useDsCanBoKhoa();

  const accountData = queryClient.getQueryData(['account']);
  const { user, acc } = accountData;
  const { mutate: updateCapKhoaDeTai, isPending: isUpdating } = useMutation({
    mutationFn: ({ deTaiId }) => updateCapKhoaDeTaiById({ deTaiId }),
    onSuccess: (deTai) => {
      // console.log(deTai);
      const svId = deTai?.sinhVien?.map((sv) => sv.sinhVienId) || [];
      const gvId = deTai?.giangVien?.map((sv) => sv.giangVienId) || [];
      createThongBao({
        message: `${acc.vaiTro} ${user.ten} vừa cập nhật cấp đề tài ${deTai?.ten} từ đề tài cấp trường thành đề tài cấp khoa.`,
        sinhViens: svId,
        giangViens: gvId,
        canBoKhoas: dsCanBoKhoaId,
      });
      queryClient.invalidateQueries(['detais']);
      queryClient.invalidateQueries(['detaicaptruongs']);
      queryClient.invalidateQueries(['detai', deTai._id]);
      toast.success('Bạn đã hủy đề xuất đề tài cấp trường thành công');
      //   navigate('/can-bo-khoa/quan-ly-de-tai');
    },

    onError: (err) => toast.error(err.message),
  });
  return {
    isUpdating,
    updateCapKhoaDeTai,
  };
}
