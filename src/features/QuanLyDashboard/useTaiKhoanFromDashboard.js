import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { buildSingleFilter } from '../../utils/buildSingleFilter';
import { getAllTaiKhoanByUser } from '../../services/apiTaiKhoan';

export function useTaiKhoanFromDashboard() {
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

  const {
    isPending,
    data: { allTaiKhoan } = {},
    error,
  } = useQuery({
    queryKey: ['taikhoans', filter],
    queryFn: () => getAllTaiKhoanByUser({ filter }),
  });

  return {
    isPending,
    error,
    allTaiKhoan,
  };
}
