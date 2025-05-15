import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForgotPassword } from '../features/QuanLyTaiKhoan/useForgotPassword';
import logo from '../assets/logo.png';
import Button from '../ui/Button';
import SpinnerMini from '../ui/SpinnerMini';
import Label from '../ui/Label';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('');

  const { forgotPassword, isPending } = useForgotPassword();

  const handleSubmit = (e) => {
    e.preventDefault();

    forgotPassword(
      { email },
      {
        onSuccess: (data) => {
          setMessage(
            data.message ||
              'Đã gửi email khôi phục mật khẩu!. Vui lòng kiểm tra hộp thư đến (rác) của bạn.',
          );
          setMessageType('success');
        },
        onError: (err) => {
          setMessage(
            err.response?.data?.message || 'Có lỗi xảy ra khi gửi yêu cầu!',
          );
          setMessageType('error');
        },
      },
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0f2f5] p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="flex flex-col items-center justify-center bg-[#265073] p-8 text-white">
          <img src={logo} alt="DUE Logo" className="mb-6 w-32" />
          <h2 className="mb-2 text-center text-3xl font-bold">Quên mật khẩu</h2>
          <p className="text-center text-sm">
            Vui lòng nhập địa chỉ email của bạn để nhận hướng dẫn đặt lại mật
            khẩu
          </p>
        </div>

        <div className="font-montserrat bg-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label
                className="mb-2 block text-base font-semibold text-gray-700"
                htmlFor="email"
              >
                Email
              </Label>
              <input
                id="email"
                type="email"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border-1 border-gray-200 bg-white px-3 py-2 text-base ring-1 ring-blue-100 outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {message && (
              <div
                className={`rounded-lg p-3 text-sm ${
                  messageType === 'success'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {message}
              </div>
            )}

            <Button
              type="submit"
              disabled={isPending}
              className="w-full rounded-xl bg-blue-500 font-semibold text-white hover:bg-blue-600 disabled:bg-blue-300"
            >
              {isPending ? <SpinnerMini /> : 'Gửi yêu cầu'}
            </Button>

            <div className="text-center">
              <Link
                to="/login"
                className="font-montserrat text-sm font-medium text-blue-600 underline hover:text-blue-800"
              >
                Quay lại trang đăng nhập
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
