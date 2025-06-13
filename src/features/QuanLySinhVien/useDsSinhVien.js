import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { buildSingleFilter } from '../../utils/buildSingleFilter';
import { getDsSinhVien } from '../../services/apiSinhVien';
const PAGE_SIZE = import.meta.env.VITE_PAGE_SIZE;

export function useDsSinhVien() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const page = Number(searchParams.get('pageSv')) || 1;
  const keyword = searchParams.get('keywordSv') || '';

  // Bỏ các param không liên quan đến filter ra
  const filterParams = Object.fromEntries(
    [...searchParams].filter(
      ([key]) =>
        ![
          'sort',
          'pageGv',
          'pageSv',
          'keywordGv',
          'keywordSv',
          'page',
        ].includes(key),
    ),
  );

  const filter = buildSingleFilter({ keyword, ...filterParams });

  const {
    isPending,
    data: { dsSinhVien, totalCount } = {},
    error,
  } = useQuery({
    queryKey: ['dssinhvien', filter, sort, page],
    queryFn: () => getDsSinhVien({ filter, sort, page }),
  });

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
