import { useQuery } from '@tanstack/react-query';
import { getAllThongBaoForUser } from '../../services/apiThongbao';

export function useThongBaos() {
  const { isPending, data } = useQuery({
    queryKey: ['thongbaos'],
    queryFn: getAllThongBaoForUser,
  });
  //   console.log(data);
  return {
    isPending,
    data,
  };
}
