import { useQuery } from '@tanstack/react-query';
import { getAllNhanXetByBaoCaoId } from '../../services/apiNhanXet';

export function useNhanXets({ baoCaoId = undefined }) {
  const {
    isPending,
    data: nhanXet,
    isError,
    error,
  } = useQuery({
    queryKey: ['nhanxets', baoCaoId],
    queryFn: () => getAllNhanXetByBaoCaoId({ baoCaoId }),
    enabled: !!baoCaoId, // để tránh gọi API nếu chưa có ID
    retry: false,
  });

  return {
    isPending,
    nhanXet,
    isError,
    error,
  };
}
