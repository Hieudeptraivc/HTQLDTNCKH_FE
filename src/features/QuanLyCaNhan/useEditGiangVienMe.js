import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editGiangVienByMe } from '../../services/apiGiangVien';
import toast from 'react-hot-toast';

export function useEditGiangVienMe() {
  const queryClient = useQueryClient();
  const {
    mutate: editGiangVienMe,
    isPending: isEditing,
    error,
    isError,
  } = useMutation({
    mutationFn: ({ payload }) => editGiangVienByMe({ payload }),
    onSuccess: (giangVien) => {
      queryClient.invalidateQueries(['giangvien', giangVien._id]);
      queryClient.invalidateQueries(['account']);
      toast.success('Cập nhật thành công');
    },
    onError: (err) => toast.error(err.message),
  });
  return { isEditing, editGiangVienMe, editError: error, isEditError: isError };
}
