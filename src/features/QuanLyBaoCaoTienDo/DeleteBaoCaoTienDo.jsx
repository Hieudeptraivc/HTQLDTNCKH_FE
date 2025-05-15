import { FaRegTrashAlt, FaTrashAlt } from 'react-icons/fa';
import SpinnerMini from '../../ui/SpinnerMini';
import { useState } from 'react';
import Button from '../../ui/Button';

export function DeleteBaoCaoTienDo({
  type,
  isDeleting,
  deleteBaoCaoTienDo,
  baoCaoTienDoId,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);
  return (
    <div className="flex justify-end px-4 py-2">
      {!isOpen ? (
        type !== 'row' ? (
          <Button
            variant="danger"
            className={`items-end text-xs font-extrabold md:text-[15px]`}
            onClick={open}
          >
            {!isDeleting ? (
              <span>Xóa báo cáo tiến độ</span>
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
                Xóa báo cáo tiến độ
              </>
            ) : (
              <span className="mx-auto">
                <SpinnerMini />
              </span>
            )}
          </button>
        )
      ) : (
        <div className="flex flex-col gap-3 px-4 py-2">
          <p>Bạn có muốn xóa báo cáo này? Việc này không thể hoàn tác</p>
          <div className="flex justify-end gap-2">
            <Button variant="danger" onClick={close}>
              Hủy thao tác
            </Button>
            <Button
              disabled={isDeleting}
              onClick={() => deleteBaoCaoTienDo({ baoCaoTienDoId })}
              variant="primary"
            >
              {isDeleting ? <SpinnerMini /> : 'Xóa báo cáo tiến độ'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
