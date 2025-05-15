import { useMutation, useQueryClient } from '@tanstack/react-query';

import { editSinhVienById } from '../../services/apiSinhVien';
import { useCreateThongBao } from '../QuanLyThongBao/useCreateThongBao';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useEditSinhVien() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { createThongBao } = useCreateThongBao();
  const accountData = queryClient.getQueryData(['account']);
  const { user, acc } = accountData;
  const {
    mutate: editSinhVien,
    isPending: isEditing,
    error,
    isError,
  } = useMutation({
    mutationFn: ({ sinhVienId, editData }) =>
      editSinhVienById({ sinhVienId, editData }),
    onSuccess: (sinhVien) => {
      createThongBao({
        message: `${acc.vaiTro} ${user.ten} vừa chỉnh sửa thông tin của bạn.`,
        sinhViens: [sinhVien._id],
      });
      queryClient.invalidateQueries(['sinhviens']);
      queryClient.invalidateQueries(['sinhvien', sinhVien._id]);
      toast.success('Cập nhật thành công sinh viên');
      navigate('/can-bo-khoa/quan-ly-sinh-vien');
    },
    onError: (err) => toast.error(err.message),
  });
  return { isEditing, editSinhVien, editError: error, isEditError: isError };
}
