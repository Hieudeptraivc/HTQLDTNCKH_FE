import { useNavigate } from 'react-router-dom';

export default function Unauthorized() {
  const navigate = useNavigate();

  // Hàm xử lý quay lại trang trước đó
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
        <div className="mb-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-10 w-10 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-12V2m0 0v2m0-2h2m-2 0H9m12 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        <h1 className="mb-3 text-2xl font-bold text-gray-800">
          Không có quyền truy cập
        </h1>

        <div className="mx-auto mb-4 h-1 w-16 bg-red-500"></div>

        <p className="mb-6 text-gray-600">
          Bạn không được phép truy cập trang này. Vui lòng liên hệ quản trị viên
          nếu bạn cho rằng đây là lỗi.
        </p>

        <div className="mt-6">
          <button
            onClick={handleGoBack}
            className="rounded-md bg-blue-600 px-6 py-3 text-white transition-colors duration-200 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
          >
            <div className="flex items-center justify-center">
              <svg
                className="mr-2 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Quay lại trang trước
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
