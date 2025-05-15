import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getKhoaById } from '../../services/apiKhoa';

export function useKhoa() {
  const { KhoaId } = useParams();
  // console.log(sinhVienId);
  const { isPending, data, isError, error } = useQuery({
    queryKey: ['khoa', KhoaId],
    queryFn: () => getKhoaById(KhoaId),
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
