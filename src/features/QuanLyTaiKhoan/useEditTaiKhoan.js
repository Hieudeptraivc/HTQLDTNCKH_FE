import { useMutation, useQueryClient } from '@tanstack/react-query';

import { editTaiKhoanById } from '../../services/apiTaiKhoan';
import { useCreateThongBao } from '../QuanLyThongBao/useCreateThongBao';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useEditTaiKhoan() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  //   const { canBoKhoaId: id } = useParams();
  const { createThongBao } = useCreateThongBao();
  const accountData = queryClient.getQueryData(['account']);
  const { user, acc } = accountData;
  const {
    mutate: editTaiKhoan,
    isPending: isEditing,
    error,
    isError,
  } = useMutation({
    mutationFn: ({ taiKhoanId, editData }) =>
      editTaiKhoanById({ taiKhoanId, editData }),
    onSuccess: (data) => {
      let field;
      const { taiKhoan, nguoiDung } = data;
      // console.log(taiKhoan, nguoiDung);
      if (taiKhoan.vaiTro === 'Sinh viên') {
        field = {
          message: `${acc.vaiTro} ${user.ten} vừa cập nhật tài khoản của bạn.`,
          sinhViens: [nguoiDung._id],
        };
      } else if (taiKhoan.vaiTro === 'Giảng viên') {
        field = {
          message: `${acc.vaiTro} ${user.ten} vừa cập nhật tài khoản của bạn.`,
          giangViens: [nguoiDung._id],
        };
      } else if (taiKhoan.vaiTro === 'Cán bộ khoa') {
        field = {
          message: `${acc.vaiTro} ${user.ten} vừa cập nhật tài khoản của bạn.`,
          canBoKhoas: [nguoiDung._id],
        };
      }
      createThongBao(field);
      queryClient.invalidateQueries(['taikhoans']);
      queryClient.invalidateQueries(['taikhoan', taiKhoan._id]);
      navigate('/admin/quan-ly-tai-khoan');
    },
    onError: (err) => toast.error(err),
  });
  return { isEditing, editTaiKhoan, editError: error, isEditError: isError };
}
