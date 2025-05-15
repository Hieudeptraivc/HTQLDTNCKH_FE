import { VscAccount } from 'react-icons/vsc';
import { IoExitOutline } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
import NotificationBell from '../features/QuanLyThongBao/NotificationBell';
import Logout from './Logout';
function HeaderMenu({ currentData }) {
  return (
    <ul className="flex items-center gap-4">
      <NotificationBell acc={currentData.acc} />
      <NavLink
        to="me"
        className={({ isActive }) =>
          `font-montserrat flex items-center gap-3 font-semibold text-[#1561A3] transition-all ${isActive ? 'rounded-md text-[#1561A3]' : 'text-gray-600'} hover:rounded-md hover:bg-gray-200 hover:text-[#1561A3]`
        }
      >
        <VscAccount className="h-[23px] w-[23px] text-[#1561A3]" size={20} />
      </NavLink>

      <Logout />
    </ul>
  );
}

export default HeaderMenu;
