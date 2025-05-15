import { useState } from 'react';
import { formatToVietnamDate } from '../../utils/formatToVietNamDate';
import MenuRow from '../../ui/MenuRow';
import MenuItemRow from '../../ui/MenuItemRow';
import { FaRegEdit, FaRegEye, FaRegTrashAlt } from 'react-icons/fa';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Window from '../../ui/Window';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

function DeTaiRow({ dt, isDeleting, deleteDeTai }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const accountData = queryClient.getQueryData(['account']);
  const { acc } = accountData;
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const isTruongNhom =
    dt?.sinhVien?.find((sv) => sv.vaiTro === 'Trưởng nhóm')?.sinhVienId?._id ===
    acc?.nguoiDung;
  const canEdit =
    acc?.vaiTro === 'Cán bộ khoa' ||
    (acc?.vaiTro === 'Sinh viên' &&
      isTruongNhom &&
      dt.trangThaiDuyet !== 'Đã duyệt');

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
          onClick={() => navigate(`${dt._id}/detail`)}
          icon={<FaRegEye />}
        >
          Xem chi tiết
        </MenuItemRow>
        {canEdit ? (
          <MenuItemRow
            onClick={() => navigate(`${dt._id}`)}
            icon={<FaRegEdit />}
          >
            Chỉnh sửa
          </MenuItemRow>
        ) : null}

        {acc?.vaiTro === 'Cán bộ khoa' ? (
          <MenuItemRow onClick={open} icon={<FaRegTrashAlt />}>
            Xóa đề tài
          </MenuItemRow>
        ) : null}
      </MenuRow>

      {isOpen && (
        <Window close={close}>
          <ConfirmDelete
            resourceName="đề tài"
            disabled={isDeleting}
            onConfirm={() => {
              deleteDeTai({ deTaiId: dt._id });
              close();
            }}
            onCloseModal={close}
          />
        </Window>
      )}
    </>
  );
}
export default DeTaiRow;
