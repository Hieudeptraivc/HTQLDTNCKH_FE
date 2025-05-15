import SpinnerMini from '../../ui/SpinnerMini';
import { useState } from 'react';

import Button from '../../ui/Button';
import Window from './../../ui/Window';
export function ConfirmDisableAccount({ isDisable, disableTaiKhoan }) {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);
  return (
    <>
      {!isOpen ? (
        <Button
          variant="danger"
          className="items-end text-[15px]"
          onClick={open}
        >
          {!isDisable ? (
            'Vô hiệu hóa'
          ) : (
            <span className="mx-auto">
              <SpinnerMini />
            </span>
          )}
        </Button>
      ) : (
        <Window open={isOpen} close={close}>
          <div className="font-montserrat flex w-88 flex-col gap-3 font-semibold">
            <h3 className="text-xl">Xác nhận vô hiệu hóa tài khoản này? </h3>
            <p className="text-md mb-3 text-gray-500">
              Bạn có muốn vô hiệu hóa tài khoản này? Việc này không thể bị hoàn
              tác. Và bạn không thể sử dụng tài khoản trừ khi liên hệ với cán bộ
              khoa hoặc admin kích hoạt!!!
            </p>

            <div className="flex justify-end gap-3">
              <Button
                variation="secondary"
                disabled={isDisable}
                onClick={close}
              >
                Hủy thao tác
              </Button>
              <Button
                variant="danger"
                disabled={isDisable}
                onClick={() => disableTaiKhoan()}
              >
                {isDisable ? <SpinnerMini className="w-6" /> : `Vô hiệu hóa`}
              </Button>
            </div>
          </div>
        </Window>
      )}
    </>
  );
}
