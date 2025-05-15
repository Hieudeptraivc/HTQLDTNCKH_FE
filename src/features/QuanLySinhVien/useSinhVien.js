import { useQuery } from '@tanstack/react-query';
import { getSinhVienById } from '../../services/apiSinhVien';
import { useParams } from 'react-router-dom';

export function useSinhVien() {
  const { sinhVienId } = useParams();
  // console.log(sinhVienId);
  const { isPending, data, isError, error } = useQuery({
    queryKey: ['sinhvien', sinhVienId],
    queryFn: () => getSinhVienById(sinhVienId),
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
