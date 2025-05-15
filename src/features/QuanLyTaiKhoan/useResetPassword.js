import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { resetPasswordAPI } from '../../services/apiAuth';

export function useResetPassword() {
  const { mutate: resetPassword, isPending } = useMutation({
    mutationFn: ({ token, matKhau, matKhauXacNhan }) =>
      resetPasswordAPI({ token, matKhau, matKhauXacNhan }),
    onSuccess: (data) => {
      // console.log(data);
      toast.success('Đặt lại mật khẩu thành công. Vui lòng đăng nhập lại!');
    },

    onError: (err) => toast.error(err.message),
  });
  return { isPending, resetPassword };
}
