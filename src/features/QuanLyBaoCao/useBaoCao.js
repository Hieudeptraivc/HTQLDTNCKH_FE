import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getBaoCaoById } from '../../services/apiBaoCao';

export function useBaoCao() {
  let { baoCaoId } = useParams();
  const { isPending, data, isError, error } = useQuery({
    queryKey: ['baocao', baoCaoId],
    queryFn: () => getBaoCaoById(baoCaoId),
    retry: false,
  });

  return {
    isPending,
    data,
    isError,
    error,
  };
}
