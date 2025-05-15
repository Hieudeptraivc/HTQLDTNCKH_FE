import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { buildSingleFilter } from '../../utils/buildSingleFilter';
import { getDsSinhVien } from '../../services/apiSinhVien';
const PAGE_SIZE = import.meta.env.VITE_PAGE_SIZE;

export function useDsSinhVien() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // console.log(searchParams.toString());
  const {
    sort: sortParam,
    pageSv: pageParam,
    pageGv,
    keywordSv,
    keywordGv,
    ...filterParams
  } = Object.fromEntries([...searchParams]);

  // console.log(sortParam, pageParam, filterParams);

  const filter = buildSingleFilter({ keyword: keywordSv, ...filterParams });

  // Sắp xếp
  const sort = sortParam || '';
  // Phân trang
  const page = !pageParam ? 1 : Number(pageParam);

  // QUERY
  const {
    isPending,
    data: { dsSinhVien, totalCount } = {},
    error,
  } = useQuery({
    queryKey: ['dssinhvien', filter, sort, page],
    queryFn: () => getDsSinhVien({ filter, sort, page }),
  });

  // PREFETCH - chuẩn bị sẵn dữ liệu trang trước / sau
  const pageCount = Math.ceil(totalCount / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['dssinhvien', filter, sort, page + 1],
      queryFn: () => getDsSinhVien({ filter, sort, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['dssinhvien', filter, sort, page - 1],
      queryFn: () => getDsSinhVien({ filter, sort, page: page - 1 }),
    });

  return {
    isPending,
    error,
    dsSinhVien,
    countSinhVien: totalCount,
  };
}
