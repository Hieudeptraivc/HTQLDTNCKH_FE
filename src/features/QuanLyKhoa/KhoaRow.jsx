import { useState } from 'react';
import MenuRow from '../../ui/MenuRow';
import MenuItemRow from '../../ui/MenuItemRow';
import { FaRegEdit, FaRegEye, FaRegTrashAlt } from 'react-icons/fa';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Window from '../../ui/Window';
import { useNavigate } from 'react-router-dom';

function KhoaRow({ khoa, isDeleting, deleteKhoa }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <>
      <div>{khoa.ten}</div>
      <div>{khoa.moTa}</div>

      <MenuRow>
        <MenuItemRow
          onClick={() => navigate(`${khoa._id}/detail`)}
          icon={<FaRegEye />}
        >
          Xem chi tiết
        </MenuItemRow>
        <MenuItemRow
          onClick={() => navigate(`${khoa._id}`)}
          icon={<FaRegEdit />}
        >
          Chỉnh sửa
        </MenuItemRow>
        <MenuItemRow onClick={open} icon={<FaRegTrashAlt />}>
          Xóa khoa
        </MenuItemRow>
      </MenuRow>

      {isOpen && (
        <Window close={close}>
          <ConfirmDelete
            resourceName="khoa"
            disabled={isDeleting}
            onConfirm={() => {
              deleteKhoa({ khoaId: khoa._id });
              close();
            }}
            onCloseModal={close}
          />
        </Window>
      )}
    </>
  );
}
export default KhoaRow;
