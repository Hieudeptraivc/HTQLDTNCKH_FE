import { Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const YearlyActivity = ({ allDeTai }) => {
  const navigate = useNavigate();
  const deTaiDangChoDuyet = allDeTai?.filter(
    (dt) => dt.trangThaiDuyet === 'Đang chờ duyệt',
  );

  return (
    <div className="font-montserrat relative col-span-2 flex h-[437px] flex-col rounded-lg bg-gray-50 shadow-lg">
      <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-lg bg-gray-100 px-4 py-3 text-white shadow-md">
        <div className="flex items-center text-gray-800">
          <Clock className="mr-2" size={20} />
          <h2 className="text-xl font-semibold">Đề tài đang chờ duyệt</h2>
        </div>
        <span className="rounded-full bg-white px-2 py-1 text-xs font-semibold text-blue-700">
          {deTaiDangChoDuyet.length} đề tài
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 py-5">
        {deTaiDangChoDuyet.length === 0 ? (
          <div className="font-montserrat py-6 text-center font-semibold text-gray-500">
            Không có đề tài nào đang chờ duyệt
          </div>
        ) : (
          <div className="space-y-3">
            {deTaiDangChoDuyet.map((dt) => (
              <div
                key={dt._id}
                className="rounded-md border border-gray-200 p-3 shadow-xs transition-colors hover:bg-blue-50"
              >
                <div className="flex items-start justify-between">
                  <div className="mr-2 min-w-0 flex-1">
                    <h3 className="truncate font-semibold text-blue-600">
                      {dt.ten}
                    </h3>
                    <div className="mt-1 truncate text-sm font-semibold text-gray-500">
                      <span>
                        Trưởng nhóm:{' '}
                        {
                          dt?.sinhVien.find((sv) => sv.vaiTro === 'Trưởng nhóm')
                            ?.sinhVienId.ten
                        }
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold whitespace-nowrap text-blue-700">
                    {dt.trangThaiDuyet}
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="max-w-full truncate rounded bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-800">
                    Trạng thái: {dt.trangThai}
                  </span>
                  <span className="max-w-full truncate rounded bg-red-100 px-2 py-1 text-xs font-semibold text-red-800">
                    Mức độ: {dt.tinhCapThiet}
                  </span>
                </div>
                <div className="flex items-end justify-end">
                  <button
                    onClick={() =>
                      navigate(`/can-bo-khoa/quan-ly-de-tai/${dt._id}/detail`)
                    }
                    className="rounded-xl bg-green-600 px-4 py-0.5 text-sm font-semibold text-green-50 hover:bg-green-800"
                  >
                    Duyệt đề tài{' '}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default YearlyActivity;
