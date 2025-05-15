import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { buildSingleFilter } from '../../utils/buildSingleFilter';
import { getAllDeTaiByUser } from '../../services/apiDeTai';
const PAGE_SIZE = import.meta.env.VITE_PAGE_SIZE;

export function useDeTais() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // console.log(searchParams.toString());
  const {
    sort: sortParam,
    page: pageParam,
    ...filterParams
  } = Object.fromEntries([...searchParams]);
  // console.log(sortParam, pageParam, filterParams);

  const filter = buildSingleFilter(filterParams);
  // Sắp xếp
  const sort = sortParam || '-ngayTao';
  // Phân trang
  const page = !pageParam ? 1 : Number(pageParam);

  // QUERY
  const {
    isPending,
    data: { allDeTai, totalCount } = {},
    error,
  } = useQuery({
    queryKey: ['detais', filter, sort, page],
    queryFn: () => getAllDeTaiByUser({ filter, sort, page }),
  });

  // PREFETCH - chuẩn bị sẵn dữ liệu trang trước / sau
  const pageCount = Math.ceil(totalCount / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['detais', filter, sort, page + 1],
      queryFn: () => getAllDeTaiByUser({ filter, sort, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['detais', filter, sort, page - 1],
      queryFn: () => getAllDeTaiByUser({ filter, sort, page: page - 1 }),
    });

  return {
    isPending,
    error,
    allDeTai,
    count: totalCount,
  };
}
