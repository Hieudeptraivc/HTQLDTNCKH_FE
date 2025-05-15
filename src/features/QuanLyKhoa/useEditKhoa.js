import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateThongBao } from '../QuanLyThongBao/useCreateThongBao';
import { editKhoaById } from '../../services/apiKhoa';
import toast from 'react-hot-toast';

export function useEditKhoa() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { khoaId: id } = useParams();
  const { createThongBao } = useCreateThongBao();
  const accountData = queryClient.getQueryData(['account']);
  const { user, acc } = accountData;
  const {
    mutate: editKhoa,
    isPending: isEditing,
    error,
    isError,
  } = useMutation({
    mutationFn: ({ khoaId, editData }) => editKhoaById({ khoaId, editData }),
    onSuccess: (khoa) => {
      // console.log(khoa);
      const giangViensId = khoa.giangVien.map((gv) => gv._id);
      const sinhViensId = khoa.sinhVien.map((sv) => sv._id);
      const canBoKhoasId = khoa.canBoKhoa.map((cbk) => cbk._id);
      // console.log(canBoKhoasId);
      createThongBao({
        message: `${acc.vaiTro} ${user.ten} vừa chỉnh sửa thông tin của khoa.`,
        giangViens: giangViensId,
        canBoKhoas: canBoKhoasId,
        sinhViens: sinhViensId,
      });
      queryClient.invalidateQueries(['khoas']);
      queryClient.invalidateQueries(['khoa', id]);
      toast.success('Cập nhật mới thành công khoa');
      navigate('/admin/quan-ly-khoa');
    },
    onError: (err) => toast.error(err.message),
  });
  return { isEditing, editKhoa, editError: error, isEditError: isError };
}
