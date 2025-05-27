import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCreateThongBao } from '../QuanLyThongBao/useCreateThongBao';
import { useNavigate } from 'react-router-dom';
import { editDeTaiById } from '../../services/apiDeTai';
import toast from 'react-hot-toast';
import { useDsCanBoKhoa } from '../QuanLyCanBoKhoa/useDsCanBoKhoa';
import CanBoKhoa from '../../page/CanBoKhoa';
import Spinner from '../../ui/Spinner';

export function useEditDeTai() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { dsCanBoKhoaId } = useDsCanBoKhoa();
  const { createThongBao } = useCreateThongBao();
  const accountData = queryClient.getQueryData(['account']);
  const { user, acc } = accountData;
  const {
    mutate: editDeTai,
    isPending: isEditing,
    error,
    isError,
  } = useMutation({
    mutationFn: ({ deTaiId, editData }) => editDeTaiById({ deTaiId, editData }),
    onSuccess: (deTai) => {
      const svId = deTai?.sinhVien?.map((sv) => sv.sinhVienId) || [];
      const gvId = deTai?.giangVien?.map((sv) => sv.giangVienId) || [];
      createThongBao({
        message: `${acc.vaiTro} ${user.ten} vừa chỉnh sửa thông tin của đề tài ${deTai?.ten}.`,
        sinhViens: svId,
        giangViens: gvId,
        canBoKhoas: dsCanBoKhoaId,
      });
      queryClient.invalidateQueries(['detais']);
      queryClient.invalidateQueries(['detai', deTai._id]);
      toast.success('Bạn vừa chỉnh sửa đề tài thành công');
      if (acc?.vaiTro === 'Cán bộ khoa') {
        navigate(`/can-bo-khoa/quan-ly-de-tai/${deTai._id}/detail`);
      } else if (acc?.vaiTro === 'Sinh viên') {
        navigate(`/sinh-vien/quan-ly-de-tai/${deTai._id}/detail`);
      }
    },
    onError: (err) => toast.error(err.message),
  });
  return { isEditing, editDeTai, editError: error, isEditError: isError };
}
