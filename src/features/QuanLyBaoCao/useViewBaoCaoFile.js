import toast from 'react-hot-toast';
import { viewBaoCaoById } from '../../services/apiBaoCao';
import { useMutation } from '@tanstack/react-query';

export function useViewBaoCaoFile() {
  const { mutate: viewBaoCao, isPending: isLoading } = useMutation({
    mutationFn: ({ baoCaoId }) => viewBaoCaoById({ baoCaoId }),
    onSuccess: () => {},
    onError: (err) => toast.error(err.message),
  });
  return {
    isLoading,
    viewBaoCao,
  };
}
