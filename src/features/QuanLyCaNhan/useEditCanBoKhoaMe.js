import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { editCanBoKhoaByMe } from '../../services/apiCanBoKhoa';

export function useEditCanBoKhoaMe() {
  const queryClient = useQueryClient();
  const {
    mutate: editCanBoKhoaMe,
    isPending: isEditing,
    error,
    isError,
  } = useMutation({
    mutationFn: ({ payload }) => editCanBoKhoaByMe({ payload }),
    onSuccess: (canBoKhoa) => {
      queryClient.invalidateQueries(['canbokhoa', canBoKhoa._id]);
      queryClient.invalidateQueries(['account']);

      toast.success('Cập nhật thành công');
    },
    onError: (err) => toast.error(err.message),
  });
  return { isEditing, editCanBoKhoaMe, editError: error, isEditError: isError };
}
