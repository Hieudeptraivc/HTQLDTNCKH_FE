import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { editSinhVienByMe } from '../../services/apiSinhVien';
import { getCurrentUser } from '../../services/apiAuth';

export function useEditSinhVienMe() {
  const queryClient = useQueryClient();
  const {
    mutate: editSinhVienMe,
    isPending: isEditing,
    error,
    isError,
  } = useMutation({
    mutationFn: ({ payload }) => editSinhVienByMe({ payload }),
    onSuccess: async (sinhVien) => {
      queryClient.invalidateQueries(['sinhvien', sinhVien._id]);
      queryClient.invalidateQueries(['account']);
      toast.success('Cập nhật thành công');
    },
    onError: (err) => toast.error(err.message),
  });
  return { isEditing, editSinhVienMe, editError: error, isEditError: isError };
}
