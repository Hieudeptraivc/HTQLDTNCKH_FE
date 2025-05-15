import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getBaoCaoTienDoId } from '../../services/apiBaoCaoTienDo';

export function useBaoCaoTienDo() {
  const { baoCaoTienDoId } = useParams();
  const { isPending, data, isError, error } = useQuery({
    queryKey: ['baocaotiendo', baoCaoTienDoId],
    queryFn: () => getBaoCaoTienDoId(baoCaoTienDoId),
    retry: false,
  });
  // console.log(data);
  return {
    isPending,
    data,
    isError,
    error,
  };
}
