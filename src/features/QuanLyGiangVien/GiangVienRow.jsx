import { useState } from 'react';
import { formatToVietnamDate } from '../../utils/formatToVietNamDate';
import MenuRow from '../../ui/MenuRow';
import MenuItemRow from '../../ui/MenuItemRow';
import { FaRegEdit, FaRegEye, FaRegTrashAlt } from 'react-icons/fa';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Window from '../../ui/Window';
import { useNavigate } from 'react-router-dom';

function GiangVienRow({ gv, isDeleting, deleteGiangVien }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <>
      <div
        className="w-full min-w-0 overflow-hidden break-words break-all whitespace-normal"
        title={gv.ten}
      >
        {gv.ten}
      </div>
      <div>{gv.hocVi}</div>
      <div
        className={gv.taiKhoan?.trangThai ? 'text-green-600' : 'text-red-500'}
      >
        {gv.taiKhoan?.trangThai ? 'Đang hoạt động' : 'Vô hiệu hóa'}
      </div>
      <div
        className="w-full min-w-0 overflow-hidden break-words break-all whitespace-normal"
        title={gv.taiKhoan?.email}
      >
        {gv.taiKhoan?.email}
      </div>
      <div></div>
      <div>{gv.soDienThoai}</div>
      <div>{formatToVietnamDate(gv.ngayTao)}</div>

      <MenuRow>
        <MenuItemRow
          onClick={() => navigate(`${gv._id}/detail`)}
          icon={<FaRegEye />}
        >
          Xem chi tiết
        </MenuItemRow>
        <MenuItemRow onClick={() => navigate(`${gv._id}`)} icon={<FaRegEdit />}>
          Chỉnh sửa
        </MenuItemRow>
        <MenuItemRow icon={<FaRegTrashAlt />} onClick={open}>
          Xóa giảng viên
        </MenuItemRow>
      </MenuRow>

      {isOpen && (
        <Window close={close}>
          <ConfirmDelete
            resourceName="giảng viên"
            disabled={isDeleting}
            onConfirm={() => {
              deleteGiangVien({ giangVienId: gv._id });
              close();
            }}
            onCloseModal={close}
          />
        </Window>
      )}
    </>
  );
}
export default GiangVienRow;
