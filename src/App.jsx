import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './page/Login';
import DeTai from './page/DeTai';
import BaoCaos from './page/BaoCaos';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ProtectedRoute from './ui/ProtectedRoute';
import CanBoKhoaLayout from './layouts/CanBoKhoaLayout';
import AdminLayout from './layouts/AdminLayout';
import GiangVienLayout from './layouts/GiangVienLayout';
import SinhVienLayout from './layouts/SinhVienLayout';
import SinhVien from './page/SinhVien';
import GiangViens from './page/GiangViens';
import Unauthorized from './page/Unauthorized';
import SinhViens from './page/SinhViens';

import CreateSinhVien from './features/QuanLySinhVien/CreateSinhVien';
import GiangVien from './page/GiangVien';
import CreateGiangVien from './features/QuanLyGiangVien/CreateGiangVien';
import GiangVienDetail from './features/QuanLyGiangVien/GiangVienDetail';
import SinhVienDetail from './features/QuanLySinhVien/SinhVienDetail';

import CanBoKhoas from './page/CanBoKhoas';
import CreateCanBoKhoa from './features/QuanLyCanBoKhoa/CreateCanBoKhoa';
import CanBoKhoa from './page/CanBoKhoa';
import Khoas from './page/Khoas';
import Khoa from './page/Khoa';
import CreateKhoa from './features/QuanLyKhoa/CreateKhoa';
import CanBoKhoaDetail from './features/QuanLyCanBoKhoa/CanBoKhoaDetail';

import KhoaDetail from './features/QuanLyKhoa/KhoaDetail';
import TaiKhoans from './page/TaiKhoans';
import TaiKhoanDetail from './features/QuanLyTaiKhoan/TaiKhoanDetail';
import TaiKhoan from './page/TaiKhoan';
import LinhVucs from './page/LinhVucs';
import LinhVuc from './page/LinhVuc';
import CreateLinhVuc from './features/QuanLyLinhVuc/CreateLinhVuc';
import LinhVucDetail from './features/QuanLyLinhVuc/LinhVucDetail';
import DeTais from './page/DeTais';
import CreateDeTai from './features/QuanLyDeTai/CreateDeTai';
import { Toaster } from 'react-hot-toast';
import DeTaiDetail from './features/QuanLyDeTai/DeTaiDetail';
import ModalCreateBaoCaoTienDo from './features/QuanLyBaoCaoTienDo/ModalCreateBaoCaoTienDo';
import ModalBaoCaoTienDo from './features/QuanLyBaoCaoTienDo/ModalBaoCaoTienDo';
import ModalBaoCaoTienDoDetail from './features/QuanLyBaoCaoTienDo/ModalBaoCaoTienDoDetail';
import BaoCaoDetail from './page/BaoCaoDetail';
import BaoCao from './page/BaoCao';
import GiangVienMe from './features/QuanLyCaNhan/GiangVienMe';
import SinhVienMe from './features/QuanLyCaNhan/SinhVienMe';

import AdminMe from './features/QuanLyCaNhan/AdminMe';
import CanBoKhoaDashboard from './features/QuanLyDashboard/CanBoKhoaDashboard';
import AdminDashboard from './features/QuanLyDashboard/AdminDashboard';
import ForgotPassword from './page/ForgotPassword';
import ResetPassword from './page/ResetPassword';
import PageNotFound from './page/PageNotFound';
import CanBoKhoaMe from './features/QuanLyCaNhan/CanBoKhoaMe';
import ErrorFallback from './ui/ErrorFallBack';
import { ErrorBoundary } from 'react-error-boundary';
import DeTaiCapTruong from './page/DeTaiCapTruong';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});
const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/reset-password/:token',
    element: <ResetPassword />,
  },
  {
    path: '/unauthorized',
    element: <Unauthorized />,
  },

  {
    path: '/can-bo-khoa',
    errorElement: <PageNotFound />,
    element: (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ProtectedRoute allowedRoles={['Cán bộ khoa']}>
          <CanBoKhoaLayout />
        </ProtectedRoute>
      </ErrorBoundary>
    ),
    children: [
      { path: 'dashboard', element: <CanBoKhoaDashboard /> },
      { path: 'quan-ly-de-tai', element: <DeTais /> },
      { path: 'quan-ly-de-tai/:deTaiId', element: <DeTai /> },
      { path: 'quan-ly-de-tai-cap-truong', element: <DeTaiCapTruong /> },

      {
        path: 'quan-ly-de-tai/:deTaiId/detail',
        element: (
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <DeTaiDetail />
          </ErrorBoundary>
        ),
        children: [
          {
            path: 'bao-cao-tien-do/:baoCaoTienDoId',
            element: <ModalBaoCaoTienDo />,
          },
          {
            path: 'bao-cao-tien-do/:baoCaoTienDoId/detail',
            element: <ModalBaoCaoTienDoDetail />,
          },
          {
            path: 'bao-cao-tien-do/new',
            element: <ModalCreateBaoCaoTienDo />,
          },
        ],
      },
      { path: 'quan-ly-de-tai/new', element: <CreateDeTai /> },
      { path: 'quan-ly-bao-cao', element: <BaoCaos /> },
      { path: 'quan-ly-bao-cao/:baoCaoId/detail', element: <BaoCaoDetail /> },
      // { path: 'bao-cao-tien-do', element: <BaoCaoTienDo /> },
      { path: 'quan-ly-sinh-vien', element: <SinhViens /> },
      { path: 'quan-ly-sinh-vien/new', element: <CreateSinhVien /> },
      { path: 'quan-ly-sinh-vien/:sinhVienId', element: <SinhVien /> },
      { path: 'me', element: <CanBoKhoaMe /> },

      {
        path: 'quan-ly-sinh-vien/:sinhVienId/detail',
        element: <SinhVienDetail />,
      },
      { path: 'quan-ly-giang-vien', element: <GiangViens /> },
      { path: 'quan-ly-giang-vien/new', element: <CreateGiangVien /> },
      { path: 'quan-ly-giang-vien/:giangVienId', element: <GiangVien /> },
      {
        path: 'quan-ly-giang-vien/:giangVienId/detail',
        element: <GiangVienDetail />,
      },
    ],
  },
  {
    path: '/admin',
    element: (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ProtectedRoute allowedRoles={['Admin']}>
          <AdminLayout />
        </ProtectedRoute>
      </ErrorBoundary>
    ),
    errorElement: <PageNotFound />,

    children: [
      { path: 'dashboard', element: <AdminDashboard /> },
      { path: 'me', element: <AdminMe /> },
      { path: 'quan-ly-de-tai', element: <DeTais /> },
      { path: 'quan-ly-de-tai-cap-truong', element: <DeTaiCapTruong /> },
      {
        path: 'quan-ly-de-tai/:deTaiId/detail',
        element: (
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <DeTaiDetail />
          </ErrorBoundary>
        ),
        children: [
          {
            path: 'bao-cao-tien-do/:baoCaoTienDoId/detail',
            element: <ModalBaoCaoTienDoDetail />,
          },
        ],
      },
      { path: 'quan-ly-can-bo-khoa', element: <CanBoKhoas /> },
      { path: 'quan-ly-can-bo-khoa/new', element: <CreateCanBoKhoa /> },
      { path: 'quan-ly-can-bo-khoa/:canBoKhoaId', element: <CanBoKhoa /> },
      {
        path: 'quan-ly-can-bo-khoa/:canBoKhoaId/detail',
        element: <CanBoKhoaDetail />,
      },
      { path: 'quan-ly-linh-vuc', element: <LinhVucs /> },
      { path: 'quan-ly-linh-vuc/new', element: <CreateLinhVuc /> },
      { path: 'quan-ly-linh-vuc/:linhVucId', element: <LinhVuc /> },
      {
        path: 'quan-ly-linh-vuc/:linhVucId/detail',
        element: <LinhVucDetail />,
      },
      { path: 'quan-ly-khoa', element: <Khoas /> },
      { path: 'quan-ly-khoa/new', element: <CreateKhoa /> },
      { path: 'quan-ly-khoa/:KhoaId', element: <Khoa /> },
      { path: 'quan-ly-khoa/:KhoaId/detail', element: <KhoaDetail /> },
      { path: 'quan-ly-tai-khoan', element: <TaiKhoans /> },
      {
        path: 'quan-ly-tai-khoan/:taiKhoanId/detail',
        element: <TaiKhoanDetail />,
      },
      {
        path: 'quan-ly-tai-khoan/:taiKhoanId',
        element: <TaiKhoan />,
      },
    ],
  },
  {
    path: '/giang-vien',
    errorElement: <PageNotFound />,

    element: (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ProtectedRoute allowedRoles={['Giảng viên']}>
          <GiangVienLayout />
        </ProtectedRoute>
      </ErrorBoundary>
    ),
    children: [
      // { path: 'dashboard', element: <Dashboard /> },
      { path: 'me', element: <GiangVienMe /> },
      { path: 'quan-ly-de-tai', element: <DeTais /> },
      {
        path: 'quan-ly-de-tai/:deTaiId/detail',
        element: (
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <DeTaiDetail />
          </ErrorBoundary>
        ),
        children: [
          {
            path: 'bao-cao-tien-do/:baoCaoTienDoId/detail',
            element: <ModalBaoCaoTienDoDetail />,
          },
        ],
      },
      { path: 'quan-ly-bao-cao', element: <BaoCaos /> },
      { path: 'quan-ly-bao-cao/:baoCaoId/detail', element: <BaoCaoDetail /> },
    ],
  },
  {
    path: '/sinh-vien',
    errorElement: <PageNotFound />,

    element: (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ProtectedRoute allowedRoles={['Sinh viên']}>
          <SinhVienLayout />
        </ProtectedRoute>
      </ErrorBoundary>
    ),
    children: [
      // { path: 'dashboard', element: <Dashboard /> },
      { path: 'me', element: <SinhVienMe /> },
      { path: 'quan-ly-de-tai', element: <DeTais /> },
      { path: 'quan-ly-de-tai/:deTaiId', element: <DeTai /> },
      {
        path: 'quan-ly-de-tai/:deTaiId/detail',
        element: (
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <DeTaiDetail />
          </ErrorBoundary>
        ),
        children: [
          {
            path: 'bao-cao-tien-do/:baoCaoTienDoId/detail',
            element: <ModalBaoCaoTienDoDetail />,
          },
        ],
      },
      { path: 'quan-ly-de-tai/new', element: <CreateDeTai /> },
      { path: 'quan-ly-bao-cao', element: <BaoCaos /> },
      { path: 'quan-ly-bao-cao/:baoCaoId', element: <BaoCao /> },
      { path: 'quan-ly-bao-cao/:baoCaoId/detail', element: <BaoCaoDetail /> },
    ],
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 2000,
            icon: '✅',
          },
          error: {
            duration: 3000,
            icon: '❌',
          },
          style: {
            fontSize: '15px',
            maxWidth: '320px',
            padding: '14px 20px',
            backgroundColor: '#e7e4e4',
            fontFamily: 'var(--font-monserrat)',
            fontWeight: 'bold',
            color: '#4e4e4e',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
