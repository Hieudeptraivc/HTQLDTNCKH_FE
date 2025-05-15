import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getDeTaiById } from '../../services/apiDeTai';

export function useDeTai() {
  const { deTaiId } = useParams();
  const { isPending, data, isError, error } = useQuery({
    queryKey: ['detai', deTaiId],
    queryFn: () => getDeTaiById(deTaiId),
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
