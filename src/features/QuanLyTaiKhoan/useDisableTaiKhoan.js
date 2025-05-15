import { useMutation, useQueryClient } from '@tanstack/react-query';

import { disableTaiKhoanById } from '../../services/apiTaiKhoan';
import { useCreateThongBao } from './../QuanLyThongBao/useCreateThongBao';
import toast from 'react-hot-toast';

export function useDisableTaiKhoan() {
  const queryClient = useQueryClient();
  //   const { canBoKhoaId: id } = useParams();
  const { createThongBao } = useCreateThongBao();
  const accountData = queryClient.getQueryData(['account']);
  const { user, acc } = accountData;
  const {
    mutate: disableTaiKhoan,
    isPending: isDisable,
    error,
    isError,
  } = useMutation({
    mutationFn: ({ taiKhoanId }) => disableTaiKhoanById({ taiKhoanId }),
    onSuccess: (data) => {
      // console.log(data);
      let field;
      const { taiKhoan, nguoiDung } = data;
      if (taiKhoan.vaiTro === 'Sinh viên') {
        field = {
          message: `${acc.vaiTro} ${user.ten} vừa vô hiệu hóa tài khoản của bạn.`,
          sinhViens: [nguoiDung._id],
        };
      } else if (taiKhoan.vaiTro === 'Giảng viên') {
        field = {
          message: `${acc.vaiTro} ${user.ten} vừa vô hiệu hóa tài khoản của bạn.`,
          giangViens: [nguoiDung._id],
        };
      } else if (taiKhoan.vaiTro === 'Cán bộ khoa') {
        field = {
          message: `${acc.vaiTro} ${user.ten} vừa vô hiệu hóa tài khoản của bạn.`,
          canBoKhoas: [nguoiDung._id],
        };
      }
      createThongBao(field);
      toast.success('Vô hiệu hóa tài khoản thành công');
      queryClient.invalidateQueries(['taikhoans']);
      queryClient.invalidateQueries(['taikhoan', taiKhoan._id]);
    },
    onError: (err) => toast.error(err.message),
  });
  return {
    isDisable,
    disableTaiKhoan,
    disableError: error,
    isDisableError: isError,
  };
}
