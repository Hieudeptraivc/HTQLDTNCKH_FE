import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getAllKhoaByUser } from '../../services/apiKhoa';
const PAGE_SIZE = import.meta.env.VITE_PAGE_SIZE;

export function useKhoas() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const { page: pageParam } = searchParams;
  const page = !pageParam ? 1 : Number(pageParam);
  // QUERY
  const {
    isPending,
    data: { all: allKhoa, total: count } = {},
    error,
  } = useQuery({
    queryKey: ['khoas', page],
    queryFn: () => getAllKhoaByUser({ page }),
  });

  // PREFETCH - chuẩn bị sẵn dữ liệu trang trước / sau
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['khoas', page + 1],
      queryFn: () => getAllKhoaByUser({ page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['khoas', page - 1],
      queryFn: () => getAllKhoaByUser({ page: page - 1 }),
    });

  return {
    isPending,
    error,
    allKhoa,
    count,
  };
}
