import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { buildSingleFilter } from '../../utils/buildSingleFilter';
import { getDsGiangVien } from '../../services/apiGiangVien';
const PAGE_SIZE = import.meta.env.VITE_PAGE_SIZE;

export function useDsGiangVien() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // console.log(searchParams.toString());
  const {
    sort: sortParam,
    pageGv: pageParam,
    pageSv,
    keywordGv,
    keywordSv,
    ...filterParams
  } = Object.fromEntries([...searchParams]);

  const filter = buildSingleFilter({ keyword: keywordGv, ...filterParams });

  // Sắp xếp
  const sort = sortParam || '';
  // Phân trang
  const page = !pageParam ? 1 : Number(pageParam);

  // QUERY
  const {
    isPending,
    data: { dsGiangVien, totalCount } = {},
    error,
  } = useQuery({
    queryKey: ['dsgiangvien', filter, sort, page],
    queryFn: () => getDsGiangVien({ filter, sort, page }),
  });

  // PREFETCH - chuẩn bị sẵn dữ liệu trang trước / sau
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
