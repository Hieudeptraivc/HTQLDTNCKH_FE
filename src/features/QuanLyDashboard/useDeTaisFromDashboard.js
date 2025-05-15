import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { buildSingleFilter } from '../../utils/buildSingleFilter';
import { getAllDeTaiByUser } from '../../services/apiDeTai';

export function useDeTaisFromDashboard() {
  const [searchParams] = useSearchParams();

  // console.log(searchParams.toString());
  const { sort: sortParam, ...filterParams } = Object.fromEntries([
    ...searchParams,
  ]);

  const filter = buildSingleFilter(filterParams);
  // Sắp xếp
  const sort = sortParam;

  // QUERY
  const {
    isPending,
    data: { allDeTai } = {},
    error,
  } = useQuery({
    queryKey: ['detais', filter, sort],
    queryFn: () => getAllDeTaiByUser({ filter, sort }),
  });

  return {
    isPending,
    error,
    allDeTai,
  };
}
