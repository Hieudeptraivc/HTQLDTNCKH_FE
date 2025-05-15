import { AlertTriangle } from 'lucide-react';
import Button from './Button';
import { useMoveBack } from '../hooks/useMoveBack';

function ErrorFallback({ error }) {
  const moveBack = useMoveBack();
  return (
    <main className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="w-full max-w-2xl rounded-xl border border-indigo-100 bg-white p-10 shadow-xl">
        <div className="flex flex-col items-center">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-100 shadow-inner">
            <AlertTriangle className="h-12 w-12 text-red-600" />
          </div>

          <h1 className="mb-3 text-3xl font-bold text-gray-800">
            Đã xảy ra lỗi
          </h1>

          <div className="mb-8 w-full">
            <p className="mb-5 text-center text-lg text-gray-600">
              Chúng tôi gặp vấn đề khi xử lý yêu cầu của bạn. Vui lòng thử lại
              hoặc liên hệ bộ phận hỗ trợ.
            </p>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-5 shadow-inner">
              <p className="font-mono text-sm break-words text-gray-800">
                {error.message || 'Không xác định được lỗi'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="large"
              onClick={moveBack}
              className="rounded-lg bg-blue-600 px-8 py-3 text-lg font-medium text-white shadow-md transition-all hover:bg-indigo-700 hover:shadow-lg"
            >
              Quay lại
            </Button>

            <Button
              onClick={() => (window.location.href = '/login')}
              className="rounded-lg border-2 border-indigo-300 bg-white px-8 py-3 text-lg font-medium text-indigo-700 shadow-md transition-all hover:bg-indigo-50 hover:shadow-lg"
            >
              Về trang chủ
            </Button>
          </div>

          <p className="mt-8 text-sm text-gray-500">
            Nếu lỗi vẫn tiếp tục xảy ra, vui lòng liên hệ{' '}
            <a
              href="mailto:support@example.com"
              className="text-indigo-600 hover:underline"
            >
              bộ phận hỗ trợ
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}

export default ErrorFallback;
