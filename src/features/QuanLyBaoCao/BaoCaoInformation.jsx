import { LuCloudDownload, LuEye } from 'react-icons/lu';
import Button from '../../ui/Button';
import ReadOnlyInput from '../../ui/ReadOnlyInput';
import SpinnerMini from '../../ui/SpinnerMini';
import { useDownloadBaoCao } from './useDownloadBaoCao';
import { useViewBaoCaoFile } from './useViewBaoCaoFile';
import Label from '../../ui/Label';

function BaoCaoInformation({ baoCao, fileInfo }) {
  const { viewBaoCao, isLoading } = useViewBaoCaoFile();
  const { downloadBaoCao, isDownloading } = useDownloadBaoCao();
  if (!baoCao) return <p>Không có dữ liệu báo cáo.</p>;
  const { sinhVien, baoCaoTienDo, ngayTao, _id } = baoCao;

  const handleViewBaoCao = () => {
    viewBaoCao(
      { baoCaoId: _id },
      {
        onSuccess: ({ blob }) => {
          const url = URL.createObjectURL(blob);
          window.open(url);
        },
      },
    );
  };

  const handleDownload = () => {
    downloadBaoCao(
      { baoCaoId: _id },
      {
        onSuccess: ({ blob, filename }) => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = filename;
          a.click();
          URL.revokeObjectURL(url);
        },
      },
    );
  };

  return (
    <div className="grid grid-cols-1 gap-4 px-6 py-4 md:grid-cols-2">
      <ReadOnlyInput label="Tên sinh viên" value={sinhVien?.ten} />
      <ReadOnlyInput label="MSSV" value={sinhVien?.mssv} />
      <ReadOnlyInput label="Lớp" value={sinhVien?.lop} />
      <ReadOnlyInput
        label="Ngày tạo"
        value={new Date(ngayTao).toLocaleString('vi-VN')}
      />

      <ReadOnlyInput label="Tên báo cáo" value={baoCao?.ten} />
      <ReadOnlyInput label="Tên báo cáo tiến độ" value={baoCaoTienDo?.ten} />
      <ReadOnlyInput
        label="Trạng thái báo cáo"
        value={baoCaoTienDo?.trangThai}
      />
      <ReadOnlyInput label="Loại báo cáo" value={baoCaoTienDo?.loaiBaoCao} />
      <ReadOnlyInput label="Lần thứ" value={baoCaoTienDo?.lanThu} />
      <div className="flex flex-col gap-1">
        <Label>File báo cáo</Label>
        <div className="font-poppins flex-col gap-1 overflow-y-auto rounded-xl border-1 border-gray-200 bg-gray-50 px-2 py-1.5 text-[14px] font-[400px] break-words whitespace-pre-wrap shadow-lg ring-1 ring-blue-100 outline-none invalid:border-2 invalid:border-pink-500 focus:ring-2 focus:ring-blue-300">
          <div className="flex items-center justify-between gap-2">
            <p className="font-poppins max-h-48 overflow-y-auto rounded-xl px-3 py-1.5 text-[14px] font-[400px] break-words whitespace-pre-wrap">
              {fileInfo.filename || 'Chưa có dữ liệu'}
            </p>
            <div className="flex items-center justify-end gap-2">
              <Button
                className="h-8 items-center bg-gray-400 text-xs hover:bg-gray-500"
                onClick={handleDownload}
              >
                {isDownloading ? (
                  <SpinnerMini />
                ) : (
                  <LuCloudDownload size={19} />
                )}
              </Button>
              <Button
                className="h-8 items-center bg-gray-400 text-xs hover:bg-gray-500"
                onClick={handleViewBaoCao}
              >
                {isLoading ? <SpinnerMini /> : <LuEye size={19} />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BaoCaoInformation;
