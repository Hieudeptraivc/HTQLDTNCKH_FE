import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import loginBg from '../assets/loginBg.png';
import { Link, useNavigate } from 'react-router-dom';

import { useLogin } from '../auth/useLogin';
import SpinnerMini from '../ui/SpinnerMini';
import Label from '../ui/Label';
import { useAccount } from '../auth/useAccount';

const Login = function () {
  const [checkedLogin, setCheckedLogin] = useState(false);
  const [username, setUsername] = useState('testsystem@gmail.com');
  const [password, setPassword] = useState('29062003');
  const { login, isPending } = useLogin();
  const navigate = useNavigate();
  function handleLogin(e) {
    e.preventDefault();
    // console.log(username, password);
    if (!username || !password) return;
    login({ username, password });
  }
  const { data, isAuthenticated } = useAccount({ enabled: !checkedLogin });
  const acc = data?.acc;
  useEffect(() => {
    if (isAuthenticated && acc.vaiTro) {
      switch (acc.vaiTro) {
        case 'Admin':
          navigate('/admin/dashboard');
          break;
        case 'Cán bộ khoa':
          navigate('/can-bo-khoa/dashboard');
          break;
        case 'Giảng viên':
          navigate('/giang-vien/quan-ly-de-tai');
          break;
        case 'Sinh viên':
          navigate('/sinh-vien/quan-ly-de-tai');
          break;
        default:
          navigate('/login');
      }
    }
    if (!checkedLogin) setCheckedLogin(true); // đảm bảo không gọi lại nữa
  }, [isAuthenticated, acc, checkedLogin, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0f2f5] p-4">
      <div className="flex w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="flex w-1/2 flex-col items-center justify-center bg-white p-6">
          <img src={logo} alt="DUE Logo" className="mt-2 mb-4 w-48" />
          <img src={loginBg} alt="loginBG" className="w-full max-w-3xl" />
        </div>

        <div className="font-poppins w-1/2 rounded-r-2xl bg-[#265073] p-10 text-white">
          <h2 className="mb-6 text-center text-4xl font-bold">Đăng nhập</h2>
          <p className="mb-6 text-base font-medium">
            Nhập tên tài khoản và mật khẩu
          </p>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <Label className="mb-3 block text-sm" htmlFor="username">
                Tài khoản
              </Label>
              <input
                id="username"
                type="username"
                disabled={isPending}
            
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nhập tên tài khoản"
                className="w-full rounded-xl bg-white px-4 py-2 text-black outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div className="mb-4">
              <Label className="mb-3 block text-sm" htmlFor="password">
                Mật khẩu
              </Label>
              <input
                id="password"
                disabled={isPending}
                
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
                className="w-full rounded-xl bg-white px-4 py-2 text-black outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div className="mr-2 mb-6 flex items-center justify-end">
              <Link
                to="/forgot-password"
                className="text-sm underline hover:text-blue-300"
              >
                Quên mật khẩu
              </Link>
            </div>

            <button
              type="submit"
              className="mb-4 flex w-full items-center justify-center rounded-xl bg-blue-500 py-2 font-semibold text-white hover:bg-blue-600"
            >
              {!isPending ? 'Đăng nhập' : <SpinnerMini />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
