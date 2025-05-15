import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getAllSinhVienByUser } from '../../services/apiSinhVien';
import { buildSingleFilter } from '../../utils/buildSingleFilter';
const PAGE_SIZE = import.meta.env.VITE_PAGE_SIZE;

export function useSinhViens() {
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
    data: { allSinhVien, totalCount } = {},
    error,
  } = useQuery({
    queryKey: ['sinhviens', filter, sort, page],
    queryFn: () => getAllSinhVienByUser({ filter, sort, page }),
  });

  // PREFETCH - chuẩn bị sẵn dữ liệu trang trước / sau
  const pageCount = Math.ceil(totalCount / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['sinhviens', filter, sort, page + 1],
      queryFn: () => getAllSinhVienByUser({ filter, sort, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['sinhviens', filter, sort, page - 1],
      queryFn: () => getAllSinhVienByUser({ filter, sort, page: page - 1 }),
    });

  return {
    isPending,
    error,
    allSinhVien,
    count: totalCount,
  };
}
