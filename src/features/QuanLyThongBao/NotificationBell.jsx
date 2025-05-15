import { useState } from 'react';

import NotificationDropdown from './NotificationDropdown';

import { useThongBaos } from './useThongBaos';
import { GoBell } from 'react-icons/go';
import { useOutsideClick } from '../../hooks/useOutsideClick';

function NotificationBell({ acc }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useOutsideClick(() => setIsOpen(false));
  const { isPending, data } = useThongBaos();
  // console.log(data?.thongBaos);
  const hasUnread = data?.thongBaos?.some((tb) => {
    if (acc.vaiTro === 'Sinh viên') {
      return !tb.readBySinhViens.includes(acc.nguoiDung);
    } else if (acc.vaiTro === 'Giảng viên') {
      return !tb.readByGiangViens.includes(acc.nguoiDung);
    } else if (acc.vaiTro === 'Cán bộ khoa') {
      return !tb.readByCanBoKhoas.includes(acc.nguoiDung);
    } else if (acc.vaiTro === 'Admin') {
      return !tb.readByAdmins.includes(acc.nguoiDung);
    }
    return false;
  });
  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="font-montserrat relative flex items-center gap-3 rounded-full text-[15px] font-semibold transition-all hover:bg-gray-100"
      >
        <GoBell className="h-[23px] w-[23px] text-[#1561A3]" />
        {hasUnread && (
          <span className="absolute top-0.5 right-1 h-2 w-2 rounded-full bg-red-500" />
        )}
      </button>

      {isOpen && (
        <NotificationDropdown
          isPending={isPending}
          thongBaos={data?.thongBaos}
          userRole={acc.vaiTro}
          userId={acc.nguoiDung}
        />
      )}
    </div>
  );
}

export default NotificationBell;
