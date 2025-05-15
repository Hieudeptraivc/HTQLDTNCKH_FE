import Spinner from '../../ui/Spinner';
import { useBaoCaoTienDo } from './useBaoCaoTienDo';
import BaoCaoTienDo_BaoCaoInformation from './BaoCaoTienDo_BaoCaoInformation';
import BaoCaoTienDoDetailView from './BaoCaoTienDoDetailView';
import { useQueryClient } from '@tanstack/react-query';
import NhanXetInformation from '../QuanLyNhanXet/NhanXetInformation';

function BaoCaoTienDoDetail() {
  const queryClient = useQueryClient();
  const { data, isPending, isError, error } = useBaoCaoTienDo();
  const accountData = queryClient.getQueryData(['account']);
  const { acc } = accountData;
  if (isPending) return <Spinner />;
  if (isError) return <p>{error}</p>;

  const { baoCaoTienDo, fileInfo } = data;
  // console.log(baoCaoTienDo);
  const truongNhom = baoCaoTienDo?.deTai.sinhVien.find(
    (sv) => sv.vaiTro === 'Trưởng nhóm',
  ).sinhVienId._id;
  const trangThaiNop = baoCaoTienDo.baoCao?.length >= 1 ? 'Đã nộp' : 'Chưa nộp';
  return (
    <div className="flex flex-col">
      <p className="font-poppins mb-4 text-xl font-semibold">
        Thông tin chi tiết báo cáo tiến độ
      </p>
      <div className="font-poppins flex flex-row gap-4">
        {/* Khối thông tin đề tài */}
        <div className="flex h-full w-4/6 flex-col gap-4">
          <div className="rounded-lg border border-gray-300 shadow-lg">
            <div className="flex items-center justify-between rounded-t-lg bg-gray-200 px-4 py-2">
              <div className="flex items-center gap-2">
                <span className="font-montserrat py-1.5 font-semibold">
                  Thông tin báo cáo tiến độ
                </span>

                <span
                  className={`font-montserrat max-w-[160px] min-w-[80px] rounded-lg px-2 py-1 text-center text-[14px] font-medium ${
                    baoCaoTienDo.trangThai === 'Đã mở'
                      ? 'bg-green-600 text-green-100'
                      : 'bg-red-600 text-red-100'
                  }`}
                >
                  {baoCaoTienDo.trangThai}
                </span>
                {trangThaiNop === 'Chưa nộp' ? (
                  <span className="font-montserrat max-w-[160px] min-w-[80px] rounded-lg bg-red-600 px-2 py-1 text-center text-[14px] font-medium text-red-100">
                    {trangThaiNop}
                  </span>
                ) : null}
              </div>
            </div>
            <BaoCaoTienDoDetailView baoCaoTienDo={baoCaoTienDo} acc={acc} />
          </div>
          {acc?.vaiTro !== 'Admin' && (
            <NhanXetInformation
              trangThaiBc={baoCaoTienDo.baoCao.length > 0}
              baoCaoId={baoCaoTienDo?.baoCao[0]?._id}
              fileInfo={fileInfo}
              acc={acc}
            />
          )}
        </div>
        {
          <BaoCaoTienDo_BaoCaoInformation
            trangThai={baoCaoTienDo.trangThai}
            truongNhom={truongNhom}
            baoCao={baoCaoTienDo?.baoCao}
            fileInfo={fileInfo}
            acc={acc}
          />
        }
      </div>
    </div>
  );
}

export default BaoCaoTienDoDetail;
