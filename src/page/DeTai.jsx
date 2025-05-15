import { useNavigate } from 'react-router-dom';
import { useDeTai } from '../features/QuanLyDeTai/useDeTai';
import FormEditDeTai from '../features/QuanLyDeTai/FormEditDeTai';
import Spinner from '../ui/Spinner';
import Button from '../ui/Button';
import MemberInformation from '../features/QuanLyDeTai/MemberInformation';
import FormCreateAttendant from './../features/QuanLyDeTai/FormCreateAttendant';
import { DeTaiProvider } from '../features/QuanLyDeTai/DeTaiProvider';
import { useQueryClient } from '@tanstack/react-query';
import Unauthorized from './Unauthorized';

function DeTai() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, isPending, isError, error } = useDeTai();
  if (isPending) return <Spinner />;
  if (isError) return <p>{error}</p>;
  const { deTai } = data;
  const accountData = queryClient.getQueryData(['account']);
  const { acc } = accountData;
  if (
    acc?.vaiTro === 'Sinh viên' &&
    deTai?.sinhVien?.find((sv) => sv.vaiTro !== 'Trưởng nhóm')?.sinhVienId
      ._id === acc?.nguoiDung
  ) {
    return <Unauthorized />;
  }
  return (
    <DeTaiProvider>
      <div className="flex flex-col p-4">
        <p className="font-poppins mb-4 text-xl font-semibold">
          Thông tin chi tiết đề tài
        </p>
        <div className="font-poppins flex flex-row gap-4">
          {/* Khối thông tin đề tài */}
          <div className="h-4/5 w-3/5 rounded-lg border border-gray-300 shadow-lg">
            <div className="flex items-center justify-between bg-gray-200 px-4 py-2">
              <div className="flex items-center gap-2">
                <span>Thông tin đề tài:</span>

                <span
                  className={`font-montserrat max-w-[160px] min-w-[80px] rounded-lg px-2 py-1 text-center text-[14px] font-medium ${
                    deTai.trangThaiDuyet === 'Đã duyệt'
                      ? 'bg-green-600 text-green-100'
                      : deTai.trangThaiDuyet === 'Từ chối'
                        ? 'bg-red-500 text-red-100'
                        : 'bg-blue-500 text-blue-100'
                  }`}
                >
                  {deTai.trangThaiDuyet}
                </span>
                <span
                  className={`font-montserrat max-w-[160px] min-w-[80px] rounded-lg px-2 py-1 text-center text-[14px] font-medium ${
                    deTai.trangThai === 'Hoàn thành'
                      ? 'bg-green-600 text-green-100'
                      : deTai.trangThai === 'Hủy bỏ'
                        ? 'bg-red-600 text-red-100'
                        : deTai.trangThai === 'Chưa triển khai'
                          ? 'bg-amber-600 text-amber-100'
                          : 'bg-blue-600 text-blue-100'
                  }`}
                >
                  {deTai.trangThai}
                </span>
              </div>
              <Button
                variant="secondary"
                onClick={() => navigate(-1)}
                className="text-[13.5px]"
              >
                ← Trở về
              </Button>
            </div>
            <FormEditDeTai deTai={deTai} />
          </div>

          {/* Khối thông tin thành viên */}
          <div className="w-3/7">
            <MemberInformation acc={acc} />
          </div>
        </div>

        <div className="mt-6">
          <FormCreateAttendant />
        </div>
      </div>
    </DeTaiProvider>
  );
}

export default DeTai;
