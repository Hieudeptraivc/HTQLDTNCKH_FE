import { useState } from 'react';
import { formatToVietnamDate } from '../../utils/formatToVietNamDate';
import MenuRow from '../../ui/MenuRow';
import MenuItemRow from '../../ui/MenuItemRow';
import { FaRegEdit, FaRegEye, FaRegTrashAlt } from 'react-icons/fa';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Window from '../../ui/Window';
import { useNavigate } from 'react-router-dom';

function SinhVienRow({ sv, isDeleting, deleteSinhVien }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <>
      <div>{sv.ten}</div>
      <div className="truncate">{sv.mssv}</div>
      <div
        className={sv.taiKhoan?.trangThai ? 'text-green-600' : 'text-red-500'}
      >
        {sv.taiKhoan?.trangThai ? 'Đang hoạt động' : 'Vô hiệu hóa'}
      </div>
      <div className="truncate" title={sv.taiKhoan?.email}>
        {sv.taiKhoan?.email}
      </div>
      <div>{sv.lop}</div>
      <div>{formatToVietnamDate(sv.ngayTao)}</div>
      <MenuRow>
        <MenuItemRow
          onClick={() => navigate(`${sv._id}/detail`)}
          icon={<FaRegEye />}
        >
          Xem chi tiết
        </MenuItemRow>
        <MenuItemRow onClick={() => navigate(`${sv._id}`)} icon={<FaRegEdit />}>
          Chỉnh sửa
        </MenuItemRow>
        <MenuItemRow onClick={open} icon={<FaRegTrashAlt />}>
          Xóa sinh viên
        </MenuItemRow>
      </MenuRow>

      {isOpen && (
        <Window close={close}>
          <ConfirmDelete
            resourceName="sinh viên"
            disabled={isDeleting}
            onConfirm={() => {
              deleteSinhVien({ sinhVienId: sv._id });
              close();
            }}
            onCloseModal={close}
          />
        </Window>
      )}
    </>
  );
}
export default SinhVienRow;
