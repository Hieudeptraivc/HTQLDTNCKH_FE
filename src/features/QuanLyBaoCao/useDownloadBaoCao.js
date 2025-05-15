import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { downloadBaoCaoById } from '../../services/apiBaoCao';

export function useDownloadBaoCao() {
  const { mutate: downloadBaoCao, isPending: isDownloading } = useMutation({
    mutationFn: ({ baoCaoId }) => downloadBaoCaoById({ baoCaoId }),
    onError: (err) => toast.error(err.message),
  });

  return { downloadBaoCao, isDownloading };
}
