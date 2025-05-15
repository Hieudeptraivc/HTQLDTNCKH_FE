import { useQuery } from '@tanstack/react-query';
import { getSinhVienById } from '../../services/apiSinhVien';
import { useParams } from 'react-router-dom';
import { getTaiKhoanById } from '../../services/apiTaiKhoan';

export function useTaiKhoan() {
  const { taiKhoanId } = useParams();
  // console.log(sinhVienId);
  const { isPending, data, isError, error } = useQuery({
    queryKey: ['taikhoan', taiKhoanId],
    queryFn: () => getTaiKhoanById({ taiKhoanId }),
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
