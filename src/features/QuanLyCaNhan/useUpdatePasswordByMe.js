import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updatePasswordByMe } from '../../services/apiTaiKhoan';

export function useUpdatePasswordByMe() {
  const queryClient = useQueryClient();
  const {
    mutate: updateMyPassword,
    isPending: isUpdating,
    error,
    isError,
  } = useMutation({
    mutationFn: ({ editData }) => updatePasswordByMe({ editData }),
    onSuccess: () => {
      queryClient.invalidateQueries(['account']);
      toast.success('Cập nhật thành công');
    },
    onError: (err) => toast.error(err.message),
  });
  return {
    isUpdating,
    updateMyPassword,
    editError: error,
    isEditError: isError,
  };
}
