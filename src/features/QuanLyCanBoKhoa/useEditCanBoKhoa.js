import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useNavigate } from 'react-router-dom';
import { useCreateThongBao } from '../QuanLyThongBao/useCreateThongBao';
import { editCanBoKhoaById } from '../../services/apiCanBoKhoa';
import toast from 'react-hot-toast';

export function useEditCanBoKhoa() {
  const queryClient = useQueryClient();
  //   const { canBoKhoaId: id } = useParams();
  const navigate = useNavigate();
  const { createThongBao } = useCreateThongBao();
  const accountData = queryClient.getQueryData(['account']);
  const { user, acc } = accountData;
  const {
    mutate: editCanBoKhoa,
    isPending: isEditing,
    error,
    isError,
  } = useMutation({
    mutationFn: ({ canBoKhoaId, editData }) =>
      editCanBoKhoaById({ canBoKhoaId, editData }),
    onSuccess: (canBoKhoa) => {
      // console.log(canBoKhoa);
      if (user._id === canBoKhoa._id) {
        createThongBao({
          message: `Bạn vừa chỉnh sửa thông tin cá nhân.`,
          canBoKhoas: [canBoKhoa._id],
        });
      } else {
        createThongBao({
          message: `${acc.vaiTro} ${user.ten} vừa chỉnh sửa thông tin của cán bộ khoa ${canBoKhoa.ten}.`,
          canBoKhoas: [canBoKhoa._id],
          admins: [user._id],
        });
        queryClient.invalidateQueries(['canbokhoas']);
        queryClient.invalidateQueries(['canbokhoa', canBoKhoa._id]);
        toast.success('Cập nhật thành công cán bộ khoa');
        navigate('/admin/quan-ly-can-bo-khoa');
      }
    },
    onError: (err) => toast.error(err.message),
  });
  return { isEditing, editCanBoKhoa, editError: error, isEditError: isError };
}
