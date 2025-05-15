// import { useNavigate } from 'react-router-dom';
// import Spinner from '../../ui/Spinner';
// import { useAccount } from '../../auth/useAccount';
import {
  formatDateHour,
  formatToVietnamDate,
} from './../../utils/formatToVietNamDate';
import ReadOnlyInput from '../../ui/ReadOnlyInput';
import { DeleteBaoCaoTienDo } from './DeleteBaoCaoTienDo';
import { useDeleteBaoCaoTienDo } from './useDeleteBaoCaoTienDo';

function BaoCaoTienDoDetailView({ baoCaoTienDo = {}, acc }) {
  //   const navigate = useNavigate();

  const { isDeleting, deleteBaoCaoTienDo } = useDeleteBaoCaoTienDo();

  return (
    <div className="gap-5">
      <div className="grid grid-cols-2 gap-4 px-4 py-2">
        <div className="col-span-2">
          <ReadOnlyInput
            label="Tên báo cáo tiến độ"
            value={baoCaoTienDo?.ten}
          />
        </div>
        <ReadOnlyInput label="Trạng thái" value={baoCaoTienDo?.trangThai} />
        <ReadOnlyInput label="Loại báo cáo" value={baoCaoTienDo?.loaiBaoCao} />
        <ReadOnlyInput
          label="Lần thứ"
          value={baoCaoTienDo?.lanThu?.toString()}
        />
        <div className="col-span-2">
          <ReadOnlyInput
            label="Ghi chú"
            value={baoCaoTienDo?.ghiChu || 'Chưa có thông tin'}
          />
        </div>
        <div className="col-span-2">
          <ReadOnlyInput
            label="Nội dung chính"
            value={baoCaoTienDo?.noiDungChinh || 'Chưa có thông tin'}
          />
        </div>
        <ReadOnlyInput
          label="Hạn nộp"
          value={
            baoCaoTienDo?.hanNop ? formatToVietnamDate(baoCaoTienDo.hanNop) : ''
          }
        />
      </div>

      {acc?.vaiTro === 'Cán bộ khoa' ? (
        <DeleteBaoCaoTienDo
          isDeleting={isDeleting}
          deleteBaoCaoTienDo={deleteBaoCaoTienDo}
          baoCaoTienDoId={baoCaoTienDo._id}
        >
          Xóa báo cáo tiến độ
        </DeleteBaoCaoTienDo>
      ) : null}

      <div className="flex flex-col justify-between px-4 py-2">
        <p className="font-montserrat text-[13px] font-semibold">
          Ngày tạo:
          <span className="pl-1 text-xs font-medium text-gray-500">
            {formatDateHour(baoCaoTienDo?.ngayTao)}
          </span>
        </p>
        {baoCaoTienDo?.ngayChinhSuaCuoi ? (
          <p className="font-montserrat text-[13px] font-semibold">
            Lần chỉnh sửa cuối:{' '}
            <span className="pl-1 text-xs font-medium text-gray-500">
              {formatDateHour(baoCaoTienDo.ngayChinhSuaCuoi)}
            </span>
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default BaoCaoTienDoDetailView;
