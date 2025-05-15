import Button from '../ui/Button';
import { useMoveBack } from './../hooks/useMoveBack';
import { SearchX, ArrowLeft, Home } from 'lucide-react';

function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <main className="flex min-h-screen items-center justify-center bg-blue-50 p-4 md:p-12">
      <div className="w-full max-w-2xl rounded-lg border border-blue-100 bg-white p-8 shadow-lg md:p-12">
        <div className="flex flex-col items-center text-center">
          {/* Icon */}
          <div className="mb-6 rounded-full bg-blue-100 p-5">
            <SearchX size={48} className="text-blue-600" />
          </div>

          {/* Error code */}
          <h2 className="mb-3 font-mono text-lg text-gray-400">404 ERROR</h2>

          {/* Title */}
          <h1 className="mb-4 text-2xl font-bold text-gray-800 md:text-3xl">
            Không tìm thấy trang
          </h1>

          {/* Description */}
          <p className="mb-8 max-w-md text-gray-600">
            Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển. Vui lòng
            kiểm tra lại đường dẫn hoặc quay lại trang trước.
          </p>

          {/* Actions */}
          <div className="flex w-full max-w-xs flex-col items-center justify-center gap-4 md:flex-row">
            <Button
              onClick={moveBack}
              className="font-montserrat flex items-center justify-center gap-2 rounded-md bg-blue-600 px-5 py-2 font-medium font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
            >
              <ArrowLeft size={18} /> Quay lại
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PageNotFound;
