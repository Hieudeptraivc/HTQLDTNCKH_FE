import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getGiangVienById } from '../../services/apiGiangVien';

export function useGiangVien() {
  const { giangVienId } = useParams();

  const { isPending, data, isError, error } = useQuery({
    queryKey: ['giangvien', giangVienId],
    queryFn: () => getGiangVienById(giangVienId),
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
