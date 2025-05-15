import { useState } from 'react';
import { formatToVietnamDate } from '../../utils/formatToVietNamDate';
import MenuRow from '../../ui/MenuRow';
import MenuItemRow from '../../ui/MenuItemRow';
import { FaRegEdit, FaRegEye, FaRegTrashAlt } from 'react-icons/fa';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Window from '../../ui/Window';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

function BaoCaoRow({ bc, isDeleting, deletebaoCao }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);
  const accountData = queryClient.getQueryData(['account']);
  const { acc } = accountData;
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  // console.log(bc);
  return (
    <>
      <div
        className="w-full min-w-0 overflow-hidden break-words break-all whitespace-normal"
        title={bc.baoCaoTienDo.deTai.ten}
      >
        {bc.baoCaoTienDo.deTai.ten}
      </div>
      <div></div>
      <div
        className="w-full min-w-0 overflow-hidden break-words break-all whitespace-normal"
        title={bc.ten}
      >
        {bc.ten}
      </div>
      <div></div>

      <div className="w-full min-w-0 overflow-hidden break-words break-all whitespace-normal">
        {bc.sinhVien?.ten}
      </div>
      <div></div>
      <div
        className={
          bc.baoCaoTienDo.trangThai === 'Đã mở'
            ? 'text-green-600'
            : 'text-red-500'
        }
      >
        {bc.baoCaoTienDo.trangThai}
      </div>
      <div className="truncate" title={bc.baoCaoTienDo.loaiBaoCao}>
        {bc.baoCaoTienDo.loaiBaoCao}
      </div>
      <div>{formatToVietnamDate(bc.ngayTao)}</div>

      <MenuRow>
        <MenuItemRow
          onClick={() => navigate(`${bc._id}/detail`)}
          icon={<FaRegEye />}
        >
          Xem chi tiết
        </MenuItemRow>
        {acc?.vaiTro === 'Sinh viên' &&
        acc?.nguoiDung === bc.sinhVien._id &&
        bc?.baoCaoTienDo.trangThai !== 'Đã đóng' ? (
          <>
            <MenuItemRow
              onClick={() => navigate(`${bc._id}`)}
              icon={<FaRegEdit />}
            >
              Chỉnh sửa
            </MenuItemRow>
            <MenuItemRow icon={<FaRegTrashAlt />} onClick={open}>
              Xóa báo cáo
            </MenuItemRow>
          </>
        ) : null}
        {acc?.vaiTro === 'Cán bộ khoa' && (
          <MenuItemRow icon={<FaRegTrashAlt />} onClick={open}>
            Xóa báo cáo
          </MenuItemRow>
        )}
      </MenuRow>

      {isOpen && (
        <Window close={close}>
          <ConfirmDelete
            resourceName="báo cáo"
            disabled={isDeleting}
            onConfirm={() => {
              deletebaoCao({ baoCaoId: bc._id });
              close();
            }}
            onCloseModal={close}
          />
        </Window>
      )}
    </>
  );
}
export default BaoCaoRow;
