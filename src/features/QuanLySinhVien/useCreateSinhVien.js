import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createNewSinhVien } from '../../services/apiSinhVien';
import { useCreateThongBao } from '../QuanLyThongBao/useCreateThongBao';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useCreateSinhVien() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { createThongBao } = useCreateThongBao();
  const accountData = queryClient.getQueryData(['account']);
  const { user, acc } = accountData;
  const {
    mutate: createSinhVien,
    isPending: isCreating,
    error,
    isError,
  } = useMutation({
    mutationFn: ({ newData }) => createNewSinhVien({ newData }),
    onSuccess: (sinhVien) => {
      // console.log(sinhVien);
      createThongBao({
        message: `${acc.vaiTro} ${user.ten} vừa tạo mới bạn.`,
        sinhViens: [sinhVien._id],
      });
      queryClient.invalidateQueries(['sinhviens']);
      queryClient.invalidateQueries(['sinhvien', sinhVien._id]);
      toast.success('Tạo mới thành công sinh viên');
      navigate('/can-bo-khoa/quan-ly-sinh-vien');
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    isCreating,
    createSinhVien,
    createError: error,
    isCreateError: isError,
  };
}
