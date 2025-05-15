import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editGiangVienById } from '../../services/apiGiangVien';
import { useCreateThongBao } from '../QuanLyThongBao/useCreateThongBao';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useEditGiangVien() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { createThongBao } = useCreateThongBao();
  const accountData = queryClient.getQueryData(['account']);
  const { user, acc } = accountData;
  const {
    mutate: editGiangVien,
    isPending: isEditing,
    error,
    isError,
  } = useMutation({
    mutationFn: ({ giangVienId, editData }) =>
      editGiangVienById({ giangVienId, editData }),
    onSuccess: (giangVien) => {
      // console.log(giangVien);
      createThongBao({
        message: `${acc.vaiTro} ${user.ten} vừa chỉnh sửa thông tin của bạn.`,
        giangViens: [giangVien._id],
      });
      queryClient.invalidateQueries(['giangvien', giangVien._id]);
      toast.success('Cập nhật thành công giảng viên');

      navigate('/can-bo-khoa/quan-ly-giang-vien');
    },
    onError: (err) => toast.error(err.message),
  });
  return { isEditing, editGiangVien, editError: error, isEditError: isError };
}
