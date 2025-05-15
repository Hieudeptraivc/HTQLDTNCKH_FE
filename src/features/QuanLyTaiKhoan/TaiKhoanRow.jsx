import { useState } from 'react';
import { formatToVietnamDate } from '../../utils/formatToVietNamDate';
import MenuRow from '../../ui/MenuRow';
import MenuItemRow from '../../ui/MenuItemRow';
import { FaRegEdit, FaRegEye, FaRegTrashAlt } from 'react-icons/fa';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Window from '../../ui/Window';
import { useNavigate } from 'react-router-dom';

function TaiKhoanRow({ tk, isDeleting, deleteTaiKhoan }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <>
      <div className="truncate" title={tk.tenDangNhap}>
        {tk.tenDangNhap}
      </div>
      <div className={tk.trangThai ? 'text-green-600' : 'text-red-500'}>
        {tk.trangThai ? 'Đang hoạt động' : 'Vô hiệu hóa'}
      </div>
      <div className="w-full min-w-0 overflow-hidden break-words break-all whitespace-normal">
        {tk.nguoiDung?.khoa?.ten}
      </div>
      <div></div>
      <div
        className="w-full min-w-0 overflow-hidden break-words break-all whitespace-normal"
        title={tk.vaiTro}
      >
        {tk.vaiTro}
      </div>
      <div>{tk.nguoiDung?.soDienThoai}</div>
      <div>{formatToVietnamDate(tk.ngayTao)}</div>

      <MenuRow>
        <MenuItemRow
          onClick={() => navigate(`${tk._id}/detail`)}
          icon={<FaRegEye />}
        >
          Xem chi tiết
        </MenuItemRow>
        <MenuItemRow onClick={() => navigate(`${tk._id}`)} icon={<FaRegEdit />}>
          Chỉnh sửa
        </MenuItemRow>
        <MenuItemRow icon={<FaRegTrashAlt />} onClick={open}>
          Xóa tài khoản
        </MenuItemRow>
      </MenuRow>

      {isOpen && (
        <Window close={close}>
          <ConfirmDelete
            resourceName="tài khoản"
            disabled={isDeleting}
            onConfirm={() => {
              deleteTaiKhoan({ taiKhoanId: tk._id });
              close();
            }}
            onCloseModal={close}
          />
        </Window>
      )}
    </>
  );
}

export default TaiKhoanRow;
