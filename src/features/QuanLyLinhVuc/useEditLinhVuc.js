import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCreateThongBao } from '../QuanLyThongBao/useCreateThongBao';
import { editLinhVucById } from '../../services/apiLinhvuc';
import { useDsCanBoKhoa } from '../QuanLyCanBoKhoa/useDsCanBoKhoa';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useEditLinhVuc() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { dsCanBoKhoaId } = useDsCanBoKhoa();
  const { createThongBao } = useCreateThongBao();
  const accountData = queryClient.getQueryData(['account']);
  const { user, acc } = accountData;
  const {
    mutate: editLinhVuc,
    isPending: isEditing,
    error,
    isError,
  } = useMutation({
    mutationFn: ({ linhVucId, editData }) =>
      editLinhVucById({ linhVucId, editData }),
    onSuccess: (linhVuc) => {
      createThongBao({
        message: `${acc.vaiTro} ${user.ten} vừa chỉnh sửa thông tin lĩnh vực ${linhVuc?.ten}.`,
        canBoKhoas: dsCanBoKhoaId,
      });
      queryClient.invalidateQueries(['linhvucs']);
      queryClient.invalidateQueries(['linhvuc', linhVuc._id]);
      toast.success('Cập nhật lĩnh vực thành công');
      navigate('/admin/quan-ly-linh-vuc');
    },
    onError: (err) => toast.error(err.message),
  });
  return { isEditing, editLinhVuc, editError: error, isEditError: isError };
}
