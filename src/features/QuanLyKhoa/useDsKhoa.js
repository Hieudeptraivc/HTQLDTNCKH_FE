import { useQuery } from '@tanstack/react-query';
import { getDsKhoaByUser } from '../../services/apiKhoa';

export function useDsKhoa() {
  const { isPending, data, isError, error } = useQuery({
    queryKey: ['dskhoa'],
    queryFn: () => getDsKhoaByUser(),
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
