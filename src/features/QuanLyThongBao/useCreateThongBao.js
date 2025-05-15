import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNewThongBao } from '../../services/apiThongbao';
import toast from 'react-hot-toast';

export function useCreateThongBao() {
  const queryClient = useQueryClient();
  const {
    mutate: createThongBao,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ message, sinhViens, giangViens, canBoKhoas, admins }) =>
      createNewThongBao({ message, sinhViens, giangViens, canBoKhoas, admins }),
    onSuccess: (data) => {
      // console.log(data?.thongBao);
      queryClient.invalidateQueries(['thongbaos']);
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    isPending,
    createThongBao,
    thongBaoError: error,
  };
}
