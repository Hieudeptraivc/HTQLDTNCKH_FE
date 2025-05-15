import { useMutation, useQueryClient } from '@tanstack/react-query';
import { markAsReadById } from '../../services/apiThongbao';
import { useState } from 'react';

export function useMarkAsReadThongBao() {
  const queryClient = useQueryClient();

  const {
    mutate: markThongBao,
    isPending: isMarking,
    error,
  } = useMutation({
    mutationFn: ({ thongBaoId }) => markAsReadById({ thongBaoId }),
    onSuccess: (data) => {
      // console.log(data);
      queryClient.invalidateQueries(['thongbaos']);
    },
    onError: (err) => console.log(err),
  });

  return {
    isMarking,
    markThongBao,
    thongBaoError: error,
  };
}
