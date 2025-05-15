import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getLinhVucById } from '../../services/apiLinhvuc';

export function useLinhVuc() {
  const { linhVucId } = useParams();
  // console.log(linhVucId);
  // console.log(sinhVienId);
  const { isPending, data, isError, error } = useQuery({
    queryKey: ['linhvuc', linhVucId],
    queryFn: () => getLinhVucById(linhVucId),
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
