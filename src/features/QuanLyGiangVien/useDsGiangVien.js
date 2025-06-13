import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { buildSingleFilter } from '../../utils/buildSingleFilter';
import { getDsGiangVien } from '../../services/apiGiangVien';
const PAGE_SIZE = import.meta.env.VITE_PAGE_SIZE;

export function useDsGiangVien() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const page = Number(searchParams.get('pageGv')) || 1;
  const keyword = searchParams.get('keywordGv') || '';

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
    data: { dsGiangVien, totalCount } = {},
    error,
  } = useQuery({
    queryKey: ['dsgiangvien', filter, sort, page],
    queryFn: () => getDsGiangVien({ filter, sort, page }),
  });

  const pageCount = Math.ceil(totalCount / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['dsgiangvien', filter, sort, page + 1],
      queryFn: () => getDsGiangVien({ filter, sort, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['dsgiangvien', filter, sort, page - 1],
      queryFn: () => getDsGiangVien({ filter, sort, page: page - 1 }),
    });

  return {
    isPending,
    error,
    dsGiangVien,
    countGiangVien: totalCount,
  };
}
