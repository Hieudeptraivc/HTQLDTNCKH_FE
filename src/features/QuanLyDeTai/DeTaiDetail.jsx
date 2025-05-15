import { Outlet, useNavigate } from 'react-router-dom';

import { useDeTai } from './useDeTai';
import Spinner from '../../ui/Spinner';
import Button from '../../ui/Button';
import MemberInformation from './MemberInformation';
import { DeTaiProvider } from './DeTaiProvider';
import DeTaiDetailView from './DeTaiDetailView';
import BaoCaoTienDos from '../QuanLyBaoCaoTienDo/BaoCaoTienDos';
import { useQueryClient } from '@tanstack/react-query';
import { FaLocationArrow, FaTimes } from 'react-icons/fa';
import { useDeXuatCapKhoa } from './useDeXuatCapKhoa';
import { useDeXuatCapTruong } from './useDeXuatCapTruong';
import SpinnerMini from '../../ui/SpinnerMini';

function DeTaiDetail() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isUpdating: isUpdatingCapKhoa, updateCapKhoaDeTai } =
    useDeXuatCapKhoa();
  const { isUpdating: isUpdatingCapTruong, updateCapTruongDeTai } =
    useDeXuatCapTruong();
  const { data, isPending, isError, error } = useDeTai();
  const accountData = queryClient.getQueryData(['account']);
  const { acc } = accountData;
  if (isPending) return <Spinner />;
  if (isError) return <p>{error}</p>;

  const { deTai } = data;

  return (
    <DeTaiProvider>
      <div className="flex flex-col p-4">
        <div className="mb-4 flex items-center justify-between">
          <p className="font-poppins text-xl font-semibold">
            Thông tin chi tiết đề tài
          </p>
          {acc?.vaiTro === 'Cán bộ khoa' &&
            deTai.trangThai === 'Hoàn thành' &&
            deTai.trangThaiDuyet === 'Đã duyệt' && (
              <>
                {deTai.deTaiCap === 'Đề tài cấp khoa' && (
                  <Button
                    disabled={isUpdatingCapKhoa}
                    onClick={() => updateCapTruongDeTai({ deTaiId: deTai._id })}
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-700"
                    variant="primary"
                  >
                    {isUpdatingCapTruong ? (
                      <SpinnerMini />
                    ) : (
                      <>
                        Đề xuất <FaLocationArrow />
                      </>
                    )}
                  </Button>
                )}

                {deTai.deTaiCap === 'Đề tài cấp trường' && (
                  <Button
                    disabled={isUpdatingCapKhoa}
                    onClick={() => updateCapKhoaDeTai({ deTaiId: deTai._id })}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-700"
                    variant="danger"
                  >
                    {isUpdatingCapKhoa ? (
                      <SpinnerMini />
                    ) : (
                      <>
                        <FaTimes /> Hủy đề xuất
                      </>
                    )}
                  </Button>
                )}
              </>
            )}
        </div>

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
            <DeTaiDetailView acc={acc} deTai={deTai} />
          </div>

          {/* Khối thông tin thành viên */}
          <div className="w-3/7">
            <MemberInformation acc={acc} type="view" />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          {/* <div className="flex">
            {isOpenBctd ? (
              <Button
                variant="danger"
                className="text-[14px]"
                onClick={() => {
                  setIsOpenBctd(false);
                  navigate(-1);
                }}
              >
                Đóng
              </Button>
            ) : (
              <Button
                className="text-[14px]"
                onClick={() => {
                  setIsOpenBctd(true);
                  navigate('bao-cao-tien-do');
                }}
              >
                Báo cáo tiến độ
              </Button>
            )}
          </div> */}
          <BaoCaoTienDos acc={acc} />
          <Outlet />
        </div>
      </div>
    </DeTaiProvider>
  );
}

export default DeTaiDetail;
