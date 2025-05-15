import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useResetPassword } from '../features/QuanLyTaiKhoan/useResetPassword';
import logo from '../assets/logo.png';
import Label from '../ui/Label';
import Button from '../ui/Button';
import SpinnerMini from '../ui/SpinnerMini';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('');
  const [countdown, setCountdown] = useState(null);

  const { resetPassword, isPending } = useResetPassword();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      setMessage('Mật khẩu xác nhận không khớp!');
      setMessageType('error');
      return;
    }

    resetPassword(
      {
        token,
        matKhau: password,
        matKhauXacNhan: passwordConfirm,
      },
      {
        onSuccess: () => {
          setMessage('Đặt lại mật khẩu thành công! Đang chuyển hướng...');
          setMessageType('success');
          setCountdown(3);
        },
        onError: (err) => {
          setMessage(
            err.response?.data?.message ||
              'Có lỗi xảy ra khi đặt lại mật khẩu!',
          );
          setMessageType('error');
        },
      },
    );
  };

  useEffect(() => {
    if (countdown === null) return;

    if (countdown <= 0) {
      navigate('/login');
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 2000);

    return () => clearTimeout(timer);
  }, [countdown, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0f2f5] p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="flex flex-col items-center justify-center bg-[#265073] p-8 text-white">
          <img src={logo} alt="DUE Logo" className="mb-6 w-32" />
          <h2 className="mb-2 text-center text-3xl font-bold">
            Đặt lại mật khẩu
          </h2>
          <p className="text-center text-sm">
            Tạo mật khẩu mới cho tài khoản của bạn
          </p>
        </div>

        <div className="font-montserrat bg-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label
                className="mb-2 block text-sm font-medium text-gray-700"
                htmlFor="password"
              >
                Mật khẩu mới
              </Label>
              <input
                id="password"
                type="password"
                placeholder="Nhập mật khẩu mới"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-xl border-1 border-gray-200 bg-white px-3 py-2 text-base ring-1 ring-blue-100 outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <Label
                className="mb-2 block text-sm font-medium text-gray-700"
                htmlFor="passwordConfirm"
              >
                Xác nhận mật khẩu
              </Label>
              <input
                id="passwordConfirm"
                type="password"
                placeholder="Nhập lại mật khẩu mới"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
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
                {countdown !== null && ` (${countdown})`}
              </div>
            )}

            <Button
              type="submit"
              disabled={isPending || countdown !== null}
              className="w-full rounded-xl bg-blue-500 py-1 font-semibold text-white hover:bg-blue-600 disabled:bg-blue-300"
            >
              {isPending ? <SpinnerMini /> : 'Xác nhận'}
            </Button>

            <div className="text-center">
              <Link
                to="/login"
                className="text-sm font-medium text-blue-600 underline hover:text-blue-800"
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

export default ResetPassword;
