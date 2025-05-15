import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNewKhoa } from '../../services/apiKhoa';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useCreateKhoa() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: createKhoa,
    isPending: isCreating,
    error,
    isError,
  } = useMutation({
    mutationFn: ({ newData }) => createNewKhoa({ newData }),
    onSuccess: () => {
      queryClient.invalidateQueries(['khoas']);
      toast.success('Tạo mới thành công khoa');
      navigate('/admin/quan-ly-khoa');
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    isCreating,
    createKhoa,
    createError: error,
    isCreateError: isError,
  };
}
