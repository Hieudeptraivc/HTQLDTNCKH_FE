import { useQuery } from '@tanstack/react-query';
import { getDsCanBoKhoa } from '../../services/apiCanBoKhoa';

export function useDsCanBoKhoa() {
  const { isPending, data, isError, error } = useQuery({
    queryKey: ['dscanbokhoa'],
    queryFn: () => getDsCanBoKhoa(),
    retry: false,
  });
  return {
    isPending,
    dsCanBoKhoaId: data,
    isError,
    error,
  };
}
