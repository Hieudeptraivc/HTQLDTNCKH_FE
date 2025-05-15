import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { editAdminMe } from '../../services/apiAuth';

export function useEditAdminMe() {
  const queryClient = useQueryClient();
  const {
    mutate: editAdmin,
    isPending: isEditing,
    error,
    isError,
  } = useMutation({
    mutationFn: ({ payload }) => editAdminMe({ payload }),
    onSuccess: () => {
      queryClient.invalidateQueries(['account']);

      toast.success('Cập nhật thành công');
    },
    onError: (err) => toast.error(err.message),
  });
  return { isEditing, editAdmin, editError: error, isEditError: isError };
}
