import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { useSearchParams } from 'react-router-dom';

const PAGE_SIZE = import.meta.env.VITE_PAGE_SIZE;

function Pagination({ count, pageSize = PAGE_SIZE, filterField = 'page' }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get(filterField)) || 1;

  const pageCount = Math.ceil(count / pageSize);
  if (pageCount <= 1) return null;

  const nextPage = () => {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set(filterField, next);
    setSearchParams(searchParams);
  };

  const prevPage = () => {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set(filterField, prev);
    setSearchParams(searchParams);
  };

  return (
    <div className="mt-1 flex w-full flex-col items-center justify-between gap-4 bg-gray-200 font-sans md:flex-row">
      <p className="px-5 text-sm text-gray-600 md:text-[15px]">
        Hiển thị{' '}
        <span className="font-semibold">
          {(currentPage - 1) * pageSize + 1}
        </span>{' '}
        đến{' '}
        <span className="font-semibold">
          {currentPage === pageCount ? count : currentPage * pageSize}
        </span>{' '}
        trên tổng số <span className="font-semibold">{count}</span> kết quả
      </p>

      <div className="flex gap-2">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition ${
            currentPage === 1
              ? 'cursor-not-allowed bg-gray-200 text-gray-400'
              : 'bg-gray-100 text-gray-700 hover:bg-blue-600 hover:text-white'
          }`}
        >
          <HiChevronLeft className="h-5 w-5" />
          <span>Trước</span>
        </button>

        <button
          onClick={nextPage}
          disabled={currentPage === pageCount}
          className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition ${
            currentPage === pageCount
              ? 'cursor-not-allowed bg-gray-200 text-gray-400'
              : 'bg-gray-100 text-gray-700 hover:bg-blue-600 hover:text-white'
          }`}
        >
          <span>Tiếp</span>
          <HiChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
