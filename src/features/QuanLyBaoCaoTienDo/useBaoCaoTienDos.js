import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'react-router-dom';

import { buildSingleFilter } from '../../utils/buildSingleFilter';
import { getAllBaoCaoTienDoByUser } from '../../services/apiBaoCaoTienDo';
const PAGE_SIZE = import.meta.env.VITE_PAGE_SIZE;

export function useBaoCaoTienDos() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const { deTaiId } = useParams();
  // console.log(deTaiId);
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
    data: { allBaoCaoTienDo, totalCount } = {},
    error,
  } = useQuery({
    queryKey: ['baocaotiendos', deTaiId, filter, sort, page],
    queryFn: () => getAllBaoCaoTienDoByUser({ deTaiId, filter, sort, page }),
  });

  // PREFETCH - chuẩn bị sẵn dữ liệu trang trước / sau
  const pageCount = Math.ceil(totalCount / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['baocaotiendos', deTaiId, filter, sort, page + 1],
      queryFn: () =>
        getAllBaoCaoTienDoByUser({ deTaiId, filter, sort, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['baocaotiendos', deTaiId, filter, sort, page - 1],
      queryFn: () =>
        getAllBaoCaoTienDoByUser({ deTaiId, filter, sort, page: page - 1 }),
    });

  return {
    isPending,
    error,
    allBaoCaoTienDo,
    count: totalCount,
  };
}
