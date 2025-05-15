import { useNavigate } from 'react-router-dom';
import Spinner from '../ui/Spinner';
import Button from '../ui/Button';
import { useBaoCao } from '../features/QuanLyBaoCao/useBaoCao';
import BaoCaoInformation from '../features/QuanLyBaoCao/BaoCaoInformation';
import { useDeleteBaoCao } from '../features/QuanLyBaoCao/useDeleteBaoCao';
import { DeleteBaoCao } from '../features/QuanLyBaoCao/DeleteBaoCao';
import { useQueryClient } from '@tanstack/react-query';
import NhanXetInformation from '../features/QuanLyNhanXet/NhanXetInformation';
import { formatDateHour } from '../utils/formatToVietNamDate';

function BaoCaoDetail() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, isPending, isError, error } = useBaoCao();
  const { isDeleting, deleteBaoCao } = useDeleteBaoCao();
  const accountData = queryClient.getQueryData(['account']);
  const { acc } = accountData;
  if (isPending) return <Spinner />;
  if (isError) return <p>{error}</p>;
  const { baoCao, fileInfo } = data;
  // console.log(baoCao, fileInfo);
  return (
    <div className="flex flex-col">
      <div className="flex flex-col p-4">
        <p className="font-poppins mb-4 text-xl font-semibold">
          Thông tin chi tiết báo cáo
        </p>

        {/* Khối thông tin đề tài */}
        <div className="h-4/5 rounded-lg border border-gray-300 shadow-lg">
          <div className="flex items-center justify-between bg-gray-200 px-4 py-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Thông tin báo cáo:</span>
              <div className="flex items-center gap-2">
                <p>Trạng thái báo cáo tiến độ</p>

                <span
                  className={`font-montserrat max-w-[160px] min-w-[80px] rounded-lg px-2 py-1 text-center text-[14px] font-medium ${
                    baoCao.baoCaoTienDo.trangThai === 'Đã mở'
                      ? 'bg-green-600 text-green-100'
                      : 'bg-red-600 text-red-100'
                  }`}
                >
                  {baoCao.baoCaoTienDo.trangThai}
                </span>
              </div>
            </div>
            <Button
              variant="secondary"
              onClick={() => navigate(-1)}
              className="text-[13.5px]"
            >
              ← Trở về
            </Button>
          </div>
          <BaoCaoInformation baoCao={baoCao} fileInfo={fileInfo} />
          <div className="mx-6 mt-2 mb-6 flex items-end justify-end">
            {acc?.vaiTro === 'Cán bộ khoa' ||
            (baoCao?.sinhVien._id === acc.nguoiDung &&
              baoCao?.baoCaoTienDo.trangThai !== 'Đã đóng') ? (
              <div className="flex gap-4">
                <DeleteBaoCao
                  isDeleting={isDeleting}
                  deleteBaoCao={deleteBaoCao}
                  baoCaoId={baoCao._id}
                >
                  Xóa đề tài
                </DeleteBaoCao>
                {acc?.vaiTro === 'Sinh viên' && (
                  <Button
                    onClick={() =>
                      navigate(`/sinh-vien/quan-ly-bao-cao/${baoCao._id}`)
                    }
                    className="text-[15px]"
                  >
                    Chỉnh sửa
                  </Button>
                )}
              </div>
            ) : null}
          </div>
          {baoCao?.ngayChinhSuaCuoi ? (
            <div className="flex justify-between px-3 pb-1">
              <p className="font-montserrat text-[13px] font-semibold">
                Lần chỉnh sửa cuối:
                <span className="pl-1 text-xs font-medium text-gray-500">
                  {formatDateHour(baoCao?.ngayChinhSuaCuoi)}
                </span>
              </p>
            </div>
          ) : null}
        </div>
      </div>

      {acc?.vaiTro !== 'Cán bộ khoa' && (
        <div className="px-4">
          <NhanXetInformation
            trangThaiBc={baoCao}
            baoCaoId={baoCao._id}
            fileInfo={fileInfo}
            acc={acc}
          />
        </div>
      )}
    </div>
  );
}

export default BaoCaoDetail;
