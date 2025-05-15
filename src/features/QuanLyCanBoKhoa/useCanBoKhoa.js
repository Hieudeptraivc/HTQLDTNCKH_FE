import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getCanBoKhoaById } from '../../services/apiCanBoKhoa';

export function useCanBoKhoa() {
  const { canBoKhoaId } = useParams();

  const { isPending, data, isError, error } = useQuery({
    queryKey: ['canbokhoa', canBoKhoaId],
    queryFn: () => getCanBoKhoaById(canBoKhoaId),
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
