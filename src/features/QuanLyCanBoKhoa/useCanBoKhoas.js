import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { buildSingleFilter } from '../../utils/buildSingleFilter';
import { getAllCanBoKhoaUser } from '../../services/apiCanBoKhoa';

const PAGE_SIZE = import.meta.env.VITE_PAGE_SIZE;

export function useCanBoKhoas() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const {
    sort: sortParam,
    page: pageParam,
    ...filterParams
  } = Object.fromEntries([...searchParams]);

  // Xây dựng filter
  const filter = buildSingleFilter(filterParams);
  const sort = sortParam || '-ngayTao';
  const page = !pageParam ? 1 : Number(pageParam);

  const {
    isPending,
    data: { allCanBoKhoa, totalCount } = {},
    error,
  } = useQuery({
    queryKey: ['canbokhoas', filter, sort, page],
    queryFn: () => getAllCanBoKhoaUser({ filter, sort, page }),
  });

  const pageCount = Math.ceil(totalCount / PAGE_SIZE);

  // Prefetch trang tiếp theo
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['canbokhoas', filter, sort, page + 1],
      queryFn: () => getAllCanBoKhoaUser({ filter, sort, page: page + 1 }),
    });

  // Prefetch trang trước
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['canbokhoas', filter, sort, page - 1],
      queryFn: () => getAllCanBoKhoaUser({ filter, sort, page: page - 1 }),
    });

  return {
    isPending,
    error,
    allCanBoKhoa,
    count: totalCount,
  };
}
