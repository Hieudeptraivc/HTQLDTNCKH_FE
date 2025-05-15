import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { forgotPasswordAPI } from '../../services/apiAuth';

export function useForgotPassword() {
  const { mutate: forgotPassword, isPending } = useMutation({
    mutationFn: ({ email }) => forgotPasswordAPI({ email }),
    onSuccess: (data) => {
      // console.log(data);
      toast.success(data?.message);
    },

    onError: (err) => toast.error(err.message),
  });
  return { isPending, forgotPassword };
}
