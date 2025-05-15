import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getAllLinhVucByUser } from '../../services/apiLinhvuc';
const PAGE_SIZE = import.meta.env.VITE_PAGE_SIZE;

export function useLinhVucs() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const { page: pageParam } = searchParams;
  const page = !pageParam ? 1 : Number(pageParam);
  // QUERY
  const {
    isPending,
    data: { all: allLinhVuc, total: count } = {},
    error,
  } = useQuery({
    queryKey: ['linhvucs', page],
    queryFn: () => getAllLinhVucByUser({ page }),
  });

  // PREFETCH - chuẩn bị sẵn dữ liệu trang trước / sau
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['linhvucs', page + 1],
      queryFn: () => getAllLinhVucByUser({ page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['linhvucs', page - 1],
      queryFn: () => getAllLinhVucByUser({ page: page - 1 }),
    });

  return {
    isPending,
    error,
    allLinhVuc,
    count,
  };
}
