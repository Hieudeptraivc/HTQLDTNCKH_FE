import { useState } from 'react';
import { formatToVietnamDate } from '../../utils/formatToVietNamDate';
import MenuRow from '../../ui/MenuRow';
import MenuItemRow from '../../ui/MenuItemRow';
import { FaRegEdit, FaRegEye, FaRegTrashAlt } from 'react-icons/fa';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Window from '../../ui/Window';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

function BaoCaoTienDoRow({ bctd, isDeleting, deleteBaoCaoTienDo }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const accountData = queryClient.getQueryData(['account']);
  const { acc } = accountData;
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  return (
    <>
      <div
        className="w-full min-w-0 overflow-hidden break-words break-all whitespace-normal"
        title={bctd.ten}
      >
        {bctd.ten}
      </div>

      <div
        className={
          bctd.trangThai === 'Đã mở' ? 'text-green-600' : 'text-red-600'
        }
      >
        {bctd.trangThai}
      </div>
      <div
        className={`${bctd.baoCao?.length >= 1 ? 'text-green-600' : 'text-red-600'}`}
      >
        {bctd.baoCao?.length >= 1 ? 'Đã nộp' : 'Chưa nộp'}
      </div>
      <div>{bctd.loaiBaoCao}</div>
      <div>{bctd.lanThu}</div>
      <div>{formatToVietnamDate(bctd.ngayTao)}</div>
      <div>{formatToVietnamDate(bctd.hanNop)}</div>
      <MenuRow>
        <MenuItemRow
          onClick={() => navigate(`bao-cao-tien-do/${bctd._id}/detail`)}
          icon={<FaRegEye />}
        >
          Xem chi tiết
        </MenuItemRow>
        {acc?.vaiTro === 'Cán bộ khoa' ? (
          <>
            <MenuItemRow
              onClick={() => navigate(`bao-cao-tien-do/${bctd._id}`)}
              icon={<FaRegEdit />}
            >
              Chỉnh sửa
            </MenuItemRow>
            <MenuItemRow onClick={open} icon={<FaRegTrashAlt />}>
              Xóa tiến độ
            </MenuItemRow>
          </>
        ) : null}
      </MenuRow>

      {isOpen && (
        <Window close={close}>
          <ConfirmDelete
            resourceName="báo cáo tiến độ"
            disabled={isDeleting}
            onConfirm={() => {
              deleteBaoCaoTienDo({ baoCaoTienDoId: bctd._id });
              close();
            }}
            onCloseModal={close}
          />
        </Window>
      )}
    </>
  );
}
export default BaoCaoTienDoRow;
