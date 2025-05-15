import { formatToVietnamDate } from '../../utils/formatToVietNamDate';
import MenuRow from '../../ui/MenuRow';
import MenuItemRow from '../../ui/MenuItemRow';
import { FaRegEdit, FaRegEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

function DeTaiCapTruongRow({ dt }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const accountData = queryClient.getQueryData(['account']);
  const { acc } = accountData;
  const canEdit = acc?.vaiTro === 'Cán bộ khoa';

  return (
    <>
      <div title={dt.ten}>{dt?.ten}</div>
      <div></div>
      <div
        className={
          dt.trangThaiDuyet === 'Đã duyệt'
            ? 'text-green-600'
            : dt.trangThaiDuyet === 'Từ chối'
              ? 'text-red-500'
              : 'text-blue-500'
        }
      >
        {dt?.trangThaiDuyet === 'Đã duyệt'
          ? 'Đã duyệt'
          : dt.trangThaiDuyet === 'Từ chối'
            ? 'Từ chối'
            : 'Đang chờ duyệt'}
      </div>
      <div
        className={
          dt?.trangThai === 'Hoàn thành'
            ? 'text-green-600'
            : dt.trangThai === 'Hủy bỏ'
              ? 'text-red-500'
              : dt.trangThai === 'Chưa triển khai'
                ? 'text-amber-500'
                : 'text-blue-500'
        }
      >
        {dt.trangThai}
      </div>
      {acc?.vaiTro !== 'Admin' ? (
        <div className="truncate" title={dt.taiKhoan?.email}>
          {
            dt?.sinhVien.find((sv) => sv.vaiTro === 'Trưởng nhóm').sinhVienId
              ?.ten
          }
        </div>
      ) : (
        <div className="truncate" title={dt?.khoa.ten}>
          {dt?.khoa.ten}
        </div>
      )}

      <div>{dt?.linhVuc.ten}</div>
      <div></div>
      <div>{formatToVietnamDate(dt?.ngayTao)}</div>
      <MenuRow>
        <MenuItemRow
          onClick={() =>
            navigate(
              `/${acc?.vaiTro === 'Admin' ? 'admin' : 'can-bo-khoa'}/quan-ly-de-tai/${dt._id}/detail`,
            )
          }
          icon={<FaRegEye />}
        >
          Xem chi tiết
        </MenuItemRow>
        {canEdit ? (
          <MenuItemRow
            onClick={() => navigate(`/can-bo-khoa/quan-ly-de-tai/${dt._id}`)}
            icon={<FaRegEdit />}
          >
            Chỉnh sửa
          </MenuItemRow>
        ) : null}
      </MenuRow>
    </>
  );
}
export default DeTaiCapTruongRow;
