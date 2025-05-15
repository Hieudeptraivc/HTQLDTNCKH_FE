import { useMutation, useQueryClient } from '@tanstack/react-query';

import { activeTaiKhoanById } from '../../services/apiTaiKhoan';
import { useCreateThongBao } from './../QuanLyThongBao/useCreateThongBao';
import toast from 'react-hot-toast';

export function useActiveTaiKhoan() {
  const queryClient = useQueryClient();
  //   const { canBoKhoaId: id } = useParams();
  const { createThongBao } = useCreateThongBao();
  const accountData = queryClient.getQueryData(['account']);
  const { user, acc } = accountData;
  const {
    mutate: activeTaiKhoan,
    isPending: isActive,
    error,
    isError,
  } = useMutation({
    mutationFn: ({ taiKhoanId }) => activeTaiKhoanById({ taiKhoanId }),
    onSuccess: (data) => {
      // console.log(data);
      let field;
      const { taiKhoan, nguoiDung } = data;
      if (taiKhoan.vaiTro === 'Sinh viên') {
        field = {
          message: `${acc.vaiTro} ${user.ten} vừa kích hoạt tài khoản của bạn.`,
          sinhViens: [nguoiDung._id],
        };
      } else if (taiKhoan.vaiTro === 'Giảng viên') {
        field = {
          message: `${acc.vaiTro} ${user.ten} vừa kích hoạt tài khoản của bạn.`,
          giangViens: [nguoiDung._id],
        };
      } else if (taiKhoan.vaiTro === 'Cán bộ khoa') {
        field = {
          message: `${acc.vaiTro} ${user.ten} vừa kích hoạt tài khoản của bạn.`,
          canBoKhoas: [nguoiDung._id],
        };
      }
      createThongBao(field);
      toast.success('Kích hoạt tài khoản thành công');
      queryClient.invalidateQueries(['taikhoans']);
      queryClient.invalidateQueries(['taikhoan', taiKhoan._id]);
    },
    onError: (err) => toast.error(err.message),
  });
  return {
    isActive,
    activeTaiKhoan,
    activeError: error,
    isActiveError: isError,
  };
}
