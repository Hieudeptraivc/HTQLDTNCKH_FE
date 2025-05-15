import { useState } from 'react';

import { HistoryModalContent } from '../features/QuanLyLichSuDeTai/DeTaiHistory';
import Window from './Window';

const LichSuModalWrapper = ({ deTaiId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);

  return (
    <div className="flex w-full items-center justify-end gap-2">
      <button
        onClick={open}
        className="font-montserrat text-[13px] font-semibold text-blue-500 underline hover:text-blue-700"
      >
        Lịch sử chỉnh sửa
      </button>

      {!isOpen ? null : (
        <Window
          className="max-h-[90vh] w-full max-w-5xl overflow-y-auto p-6"
          open={isOpen}
          close={close}
        >
          <HistoryModalContent deTaiId={deTaiId} />
        </Window>
      )}
    </div>
  );
};

export default LichSuModalWrapper;
