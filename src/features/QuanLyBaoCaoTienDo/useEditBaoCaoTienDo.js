import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCreateThongBao } from '../QuanLyThongBao/useCreateThongBao';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDsCanBoKhoa } from '../QuanLyCanBoKhoa/useDsCanBoKhoa';
import CanBoKhoa from '../../page/CanBoKhoa';
import Spinner from '../../ui/Spinner';
import { editBaoCaoTienDoById } from '../../services/apiBaoCaoTienDo';

export function useEditBaoCaoTienDo() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { dsCanBoKhoaId } = useDsCanBoKhoa();
  const { createThongBao } = useCreateThongBao();
  const accountData = queryClient.getQueryData(['account']);
  const { user, acc } = accountData;
  const {
    mutate: editBaoCaoTienDo,
    isPending: isEditing,
    error,
    isError,
  } = useMutation({
    mutationFn: ({ baoCaoTienDoId, editData }) =>
      editBaoCaoTienDoById({ baoCaoTienDoId, editData }),
    onSuccess: (baoCaoTienDo) => {
      // console.log(baoCaoTienDo);
      const svId =
        baoCaoTienDo?.deTai.sinhVien?.map((sv) => sv.sinhVienId) || [];
      const gvId =
        baoCaoTienDo?.deTai.giangVien?.map((sv) => sv.giangVienId) || [];
      createThongBao({
        message: `${acc.vaiTro} ${user.ten} vừa chỉnh sửa một báo cáo tiến độ ${baoCaoTienDo?.loaiBaoCao} lần thứ ${baoCaoTienDo.lanThu} đề tài ${baoCaoTienDo?.deTai.ten}.`,
        sinhViens: svId,
        giangViens: gvId,
        canBoKhoas: dsCanBoKhoaId,
      });
      queryClient.invalidateQueries(['baocaotiendos']);
      queryClient.invalidateQueries(['baocaotiendo', baoCaoTienDo._id]);
      toast.success('Bạn vừa chỉnh sửa báo cáo tiến độ thành công');
    },
    onError: (err) => toast.error(err.message),
  });
  return {
    isEditing,
    editBaoCaoTienDo,
    editError: error,
    isEditError: isError,
  };
}
