import { useState } from 'react';
import { formatToVietnamDate } from '../../utils/formatToVietNamDate';
import MenuRow from '../../ui/MenuRow';
import MenuItemRow from '../../ui/MenuItemRow';
import { FaRegEdit, FaRegEye, FaRegTrashAlt } from 'react-icons/fa';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Window from '../../ui/Window';
import { useNavigate } from 'react-router-dom';

function CanBoKhoaRow({ cbk, isDeleting, deleteCanBoKhoa }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <>
      <div className="w-full min-w-0 overflow-hidden break-words break-all whitespace-normal">
        {cbk.ten}
      </div>
      <div></div>
      <div
        className={cbk.taiKhoan?.trangThai ? 'text-green-600' : 'text-red-500'}
      >
        {cbk.taiKhoan?.trangThai ? 'Đang hoạt động' : 'Vô hiệu hóa'}
      </div>
      <div className="w-full min-w-0 overflow-hidden break-words break-all whitespace-normal">
        {cbk.khoa?.ten}
      </div>
      <div></div>

      <div
        className="w-full min-w-0 overflow-hidden break-words break-all whitespace-normal"
        title={cbk.taiKhoan?.email}
      >
        {cbk.taiKhoan?.email}
      </div>
      <div></div>

      <div>{cbk.soDienThoai}</div>
      <div>{formatToVietnamDate(cbk.ngayTao)}</div>

      <MenuRow>
        <MenuItemRow
          onClick={() => navigate(`${cbk._id}/detail`)}
          icon={<FaRegEye />}
        >
          Xem chi tiết
        </MenuItemRow>
        <MenuItemRow
          onClick={() => navigate(`${cbk._id}`)}
          icon={<FaRegEdit />}
        >
          Chỉnh sửa
        </MenuItemRow>
        <MenuItemRow icon={<FaRegTrashAlt />} onClick={open}>
          Xóa cán bộ
        </MenuItemRow>
      </MenuRow>

      {isOpen && (
        <Window close={close}>
          <ConfirmDelete
            resourceName="cán bộ khoa"
            disabled={isDeleting}
            onConfirm={() => {
              deleteCanBoKhoa({ canBoKhoaId: cbk._id });
              close();
            }}
            onCloseModal={close}
          />
        </Window>
      )}
    </>
  );
}

export default CanBoKhoaRow;
