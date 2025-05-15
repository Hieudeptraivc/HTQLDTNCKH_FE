import { useState } from 'react';
import MenuRow from '../../ui/MenuRow';
import MenuItemRow from '../../ui/MenuItemRow';
import { FaRegEdit, FaRegEye, FaRegTrashAlt } from 'react-icons/fa';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Window from '../../ui/Window';
import { useNavigate } from 'react-router-dom';

function LinhVucRow({ linhVuc, isDeleting, deleteLinhVuc }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <>
      <div className="truncate">{linhVuc.ten}</div>
      <div>{linhVuc.moTa}</div>

      <MenuRow>
        <MenuItemRow
          onClick={() => navigate(`${linhVuc._id}/detail`)}
          icon={<FaRegEye />}
        >
          Xem chi tiết
        </MenuItemRow>
        <MenuItemRow
          onClick={() => navigate(`${linhVuc._id}`)}
          icon={<FaRegEdit />}
        >
          Chỉnh sửa
        </MenuItemRow>
        <MenuItemRow onClick={open} icon={<FaRegTrashAlt />}>
          Xóa lĩnh vực
        </MenuItemRow>
      </MenuRow>

      {isOpen && (
        <Window close={close}>
          <ConfirmDelete
            resourceName="lĩnh vực"
            disabled={isDeleting}
            onConfirm={() => {
              deleteLinhVuc({ linhVucId: linhVuc._id });
              close();
            }}
            onCloseModal={close}
          />
        </Window>
      )}
    </>
  );
}
export default LinhVucRow;
