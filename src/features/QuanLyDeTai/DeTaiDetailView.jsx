import Spinner from '../../ui/Spinner';
import { useDsLinhVuc } from '../QuanLyLinhVuc/useDsLinhVuc';

import { useDeTaiContext } from './DeTaiProvider';
import { useEffect } from 'react';
import Button from '../../ui/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDeleteDeTai } from './useDeleteDeTai';
import { DeleteDeTai } from './DeleteDeTai';
import { useAcceptDeTai } from './useAcceptDeTai';
import SpinnerMini from '../../ui/SpinnerMini';
import { useRejectDeTai } from './useRejectDeTai';
import LichSuModalWrapper from '../../ui/LichSuModalWrapper';
import { formatDateHour } from '../../utils/formatToVietNamDate';
import { useRestartDeTai } from './useRestartStatusDeTai';

function DeTaiDetailView({ deTai = {}, acc }) {
  // console.log(deTai);
  const navigate = useNavigate();
  const location = useLocation();
  const basePath = location.pathname.split('/').slice(0, 3).join('/');
  const { isAccepting, acceptDeTai } = useAcceptDeTai();
  const { isRejecting, rejectDeTai } = useRejectDeTai();
  const { isRestarting, restartStatusDeTai } = useRestartDeTai();
  const { isDeleting, deleteDeTai } = useDeleteDeTai();
  const { isPending: isLoadingDsLinhVuc, data: dsLinhVuc } = useDsLinhVuc();
  const { setAllSinhViens, setAllGiangViens, setAllGiangVienMongMuons } =
    useDeTaiContext();

  useEffect(() => {
    if (deTai && Object.keys(deTai).length > 0) {
      setAllSinhViens(deTai.sinhVien);
      setAllGiangViens(deTai.giangVien);
      setAllGiangVienMongMuons(deTai.giangVienMongMuon);
    }
  }, [deTai]);

  if (isLoadingDsLinhVuc) return <Spinner />;

  const linhVucTen =
    dsLinhVuc?.find((k) => k._id === deTai?.linhVuc?._id)?.ten ||
    'Không xác định';

  function handleEdit() {
    navigate(`${basePath}/${deTai._id}`);
  }
  return (
    <div className="gap-5 px-4 py-2">
      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-2 flex flex-col gap-2">
          <h3 className="font-montserrat text-[14px] font-semibold">Quy mô</h3>
          <p className="overflow-y-auto rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5 text-[14px] break-words whitespace-pre-wrap shadow-sm">
            {deTai.deTaiCap || 'Chưa có thông tin'}
          </p>
        </div>
        <div className="col-span-2 flex flex-col gap-2">
          <h3 className="font-montserrat text-[14px] font-semibold">
            Tên đề tài
          </h3>
          <p className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5 text-[14px] break-words whitespace-pre-wrap shadow-sm">
            {deTai.ten || 'Chưa có thông tin'}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-montserrat text-[14px] font-semibold">
            Lĩnh vực
          </h3>
          <p className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5 text-[14px] break-words whitespace-pre-wrap shadow-sm">
            {linhVucTen}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-montserrat text-[14px] font-semibold">
            Trạng thái
          </h3>
          <p className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5 text-[14px] break-words whitespace-pre-wrap shadow-sm">
            {deTai.trangThai || 'Chưa có thông tin'}
          </p>
        </div>
        {acc?.vaiTro === 'Admin' && (
          <div className="col-span-2 flex flex-col gap-2">
            <h3 className="font-montserrat text-[14px] font-semibold">Khoa</h3>
            <p className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5 text-[14px] break-words whitespace-pre-wrap shadow-sm">
              {deTai?.khoa.ten || 'Chưa có thông tin'}
            </p>
          </div>
        )}
        <div className="col-span-2 flex flex-col gap-2">
          <h3 className="font-montserrat text-[14px] font-semibold">
            Tính cấp thiết
          </h3>
          <p className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5 text-[14px] break-words whitespace-pre-wrap shadow-sm">
            {deTai.tinhCapThiet || 'Chưa có thông tin'}
          </p>
        </div>
        <div className="col-span-2 flex flex-col gap-2">
          <h3 className="font-montserrat text-[14px] font-semibold">
            Mục tiêu
          </h3>
          <p className="max-h-32 overflow-y-auto rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5 text-[14px] break-words whitespace-pre-wrap shadow-sm">
            {deTai.mucTieu || 'Chưa có thông tin'}
          </p>
        </div>
        <div className="col-span-2 flex flex-col gap-2">
          <h3 className="font-montserrat text-[14px] font-semibold">
            Nội dung chính
          </h3>
          <p className="max-h-48 overflow-y-auto rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5 text-[14px] break-words whitespace-pre-wrap shadow-sm">
            {deTai.noiDungChinh || 'Chưa có thông tin'}
          </p>
        </div>
      </div>
      <div
        className={`my-3 flex ${acc.vaiTro !== 'Cán bộ khoa' ? 'mt-5 justify-end' : 'justify-between'} gap-4`}
      >
        {acc.vaiTro === 'Cán bộ khoa' ? (
          deTai.trangThaiDuyet === 'Đang chờ duyệt' ? (
            <div className="flex gap-2">
              <Button
                onClick={() => rejectDeTai({ deTaiId: deTai._id })}
                disabled={isRejecting}
                variant="danger"
                className="items-end text-xs font-extrabold md:text-[16px]"
              >
                {isRejecting ? <SpinnerMini /> : 'Từ chối'}
              </Button>
              <Button
                onClick={() => acceptDeTai({ deTaiId: deTai._id })}
                disabled={isAccepting}
                variant="primary"
                className="items-end text-xs font-extrabold md:text-[16px]"
              >
                {isAccepting ? <SpinnerMini /> : 'Duyệt'}
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => restartStatusDeTai({ deTaiId: deTai._id })}
              disabled={isRestarting}
              variant="primary"
              className="items-end text-xs font-extrabold md:text-[16px]"
            >
              {isRestarting ? <SpinnerMini /> : 'Khôi phục trạng thái'}
            </Button>
          )
        ) : null}
        <div className="flex gap-2">
          {acc?.vaiTro == 'Cán bộ khoa' ? (
            <DeleteDeTai
              isDeleting={isDeleting}
              deleteDeTai={deleteDeTai}
              deTaiId={deTai._id}
            >
              Xóa đề tài
            </DeleteDeTai>
          ) : null}
          {acc.vaiTro === 'Cán bộ khoa' ||
          (deTai?.sinhVien?.find((sv) => sv.vaiTro === 'Trưởng nhóm').sinhVienId
            ._id === acc?.nguoiDung &&
            deTai.trangThaiDuyet !== 'Đã duyệt') ? (
            <Button
              onClick={handleEdit}
              variant="primary"
              className="items-end text-xs font-extrabold md:text-[16px]"
            >
              Chỉnh sửa
            </Button>
          ) : null}
        </div>
      </div>

      <div className="mt-4 flex justify-between">
        {deTai?.ngayTao ? (
          <div>
            <p className="font-montserrat text-[13px] font-semibold">
              Ngày tạo:{' '}
              <span className="pl-1 text-xs font-medium text-gray-500">
                {formatDateHour(deTai.ngayTao)}
              </span>
            </p>
            {deTai?.ngayChinhSuaCuoi ? (
              <p className="font-montserrat text-[13px] font-semibold">
                Lần chỉnh sửa cuối:{' '}
                <span className="pl-1 text-xs font-medium text-gray-500">
                  {formatDateHour(deTai.ngayChinhSuaCuoi)}
                </span>
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
      <LichSuModalWrapper deTaiId={deTai._id} />
    </div>
  );
}

export default DeTaiDetailView;
