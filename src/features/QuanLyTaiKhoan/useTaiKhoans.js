import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { buildSingleFilter } from '../../utils/buildSingleFilter';
import { getAllTaiKhoanByUser } from '../../services/apiTaiKhoan';

const PAGE_SIZE = import.meta.env.VITE_PAGE_SIZE;

export function useTaiKhoans() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const {
    sort: sortParam,
    page: pageParam,
    ...filterParams
  } = Object.fromEntries([...searchParams]);

  // Xây dựng filter
  const filter = buildSingleFilter(filterParams).filter(
    (f) =>
      !(
        (f.field === 'vaiTro' && f.value === 'all') ||
        (f.field === 'khoa' && f.value === 'all')
      ),
  );

  const sort = sortParam || '-ngayTao';
  const page = !pageParam ? 1 : Number(pageParam);

  const {
    isPending,
    data: { allTaiKhoan, totalCount } = {},
    error,
  } = useQuery({
    queryKey: ['taikhoans', filter, sort, page],
    queryFn: () => getAllTaiKhoanByUser({ filter, sort, page }),
  });

  const pageCount = Math.ceil(totalCount / PAGE_SIZE);

  // Prefetch trang tiếp theo
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['taikhoans', filter, sort, page + 1],
      queryFn: () => getAllTaiKhoanByUser({ filter, sort, page: page + 1 }),
    });

  // Prefetch trang trước
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['taikhoans', filter, sort, page - 1],
      queryFn: () => getAllTaiKhoanByUser({ filter, sort, page: page - 1 }),
    });

  return {
    isPending,
    error,
    allTaiKhoan,
    count: totalCount,
  };
}
