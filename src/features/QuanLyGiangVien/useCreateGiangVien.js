import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNewGiangVien } from '../../services/apiGiangVien';
import { useCreateThongBao } from '../QuanLyThongBao/useCreateThongBao';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useCreateGiangVien() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { createThongBao } = useCreateThongBao();
  const accountData = queryClient.getQueryData(['account']);
  const { user, acc } = accountData;
  const {
    mutate: createGiangVien,
    isPending: isCreating,
    error,
    isError,
  } = useMutation({
    mutationFn: ({ newData }) => createNewGiangVien({ newData }),
    onSuccess: (giangVien) => {
      // console.log(giangVien);
      createThongBao({
        message: `${acc.vaiTro} ${user.ten} vừa tạo mới bạn.`,
        giangViens: [giangVien._id],
      });
      queryClient.invalidateQueries(['giangvien', giangVien._id]);
      queryClient.invalidateQueries(['giangviens']);

      toast.success('Tạo mới thành công giảng viên');

      navigate('/can-bo-khoa/quan-ly-giang-vien');
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    isCreating,
    createGiangVien,
    createError: error,
    isCreateError: isError,
  };
}
