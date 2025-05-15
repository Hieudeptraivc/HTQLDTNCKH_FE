import { FaRegTrashAlt, FaTrashAlt } from 'react-icons/fa';
import SpinnerMini from '../../ui/SpinnerMini';
import { useState } from 'react';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Window from '../../ui/Window';
import Button from '../../ui/Button';
export function DeleteTaiKhoan({
  type,
  isDeleting,
  deleteTaiKhoan,
  taiKhoanId,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);
  return (
    <>
      {!isOpen ? (
        type !== 'row' ? (
          <Button
            variant="danger"
            className={`items-end text-xs font-extrabold md:text-[16px]`}
            onClick={open}
          >
            {!isDeleting ? (
              <span className="mt-1">Xóa tài khoản</span>
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
                Xóa tài khoản
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
            resourceName="tài khoản"
            disabled={isDeleting}
            onConfirm={() => {
              deleteTaiKhoan({ taiKhoanId });
            }}
          />
        </Window>
      )}
    </>
  );
}
