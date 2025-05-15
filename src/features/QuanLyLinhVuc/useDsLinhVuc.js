import { useQuery } from '@tanstack/react-query';
import { getDsLinhVucByUser } from '../../services/apiLinhvuc';

export function useDsLinhVuc() {
  const { isPending, data, isError, error } = useQuery({
    queryKey: ['dslinhvuc'],
    queryFn: () => getDsLinhVucByUser(),
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
