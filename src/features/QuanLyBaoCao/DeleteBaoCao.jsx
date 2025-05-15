import { FaRegTrashAlt, FaTrashAlt } from 'react-icons/fa';
import SpinnerMini from '../../ui/SpinnerMini';
import { useState } from 'react';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Button from '../../ui/Button';
import Window from './../../ui/Window';
export function DeleteBaoCao({ type, isDeleting, deleteBaoCao, baoCaoId }) {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);
  return (
    <>
      {!isOpen ? (
        type !== 'row' ? (
          <Button
            variant="danger"
            className="items-end text-[15px]"
            onClick={open}
          >
            {!isDeleting ? (
              'Xóa báo cáo'
            ) : (
              <span className="mx-auto">
                <SpinnerMini />
              </span>
            )}
          </Button>
        ) : (
          <button
            className="flex w-full items-center gap-2 px-2 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={open}
          >
            {!isDeleting ? (
              <>
                <FaRegTrashAlt />
                Xóa báo cáo
              </>
            ) : (
              <span className="mx-auto">
                <SpinnerMini />
              </span>
            )}
          </button>
        )
      ) : (
        <Window open={isOpen} close={close}>
          <ConfirmDelete
            resourceName="báo cáo"
            isDeleting={isDeleting}
            disabled={isDeleting}
            onConfirm={() => {
              // console.log('Đang gọi deleteGiangVien...');
              deleteBaoCao({ baoCaoId });
            }}
          />
        </Window>
      )}
    </>
  );
}
