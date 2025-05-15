import { useState } from 'react';
import { HiEllipsisVertical } from 'react-icons/hi2';
import { useOutsideClick } from '../hooks/useOutsideClick';

function MenuRow({ children }) {
  const [open, setOpen] = useState(false);
  const ref = useOutsideClick(() => setOpen(false));

  return (
    <div className="inline-block text-right" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-sm p-1 transition-all hover:bg-gray-200"
      >
        <HiEllipsisVertical className="h-6 w-6 text-gray-700" />
      </button>

      {open && (
        <ul className="absolute right-18 z-20 w-36 rounded-md bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)] transition-shadow duration-300 hover:shadow-[0_0_16px_rgba(0,0,0,0.5)]">
          {children}
        </ul>
      )}
    </div>
  );
}
export default MenuRow;
