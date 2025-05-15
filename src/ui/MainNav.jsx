import { NavLink } from 'react-router-dom';
import { LuLayoutDashboard } from 'react-icons/lu';
import { FaChalkboardTeacher, FaBook, FaSchool } from 'react-icons/fa';
import { TbReportSearch } from 'react-icons/tb';
import { PiStudentBold } from 'react-icons/pi';
import { useQueryClient } from '@tanstack/react-query';
import { MdManageAccounts, MdOutlineRecommend } from 'react-icons/md';
import { HiMiniBuildingOffice } from 'react-icons/hi2';
import { AiFillDatabase } from 'react-icons/ai';
import { GiTeacher } from 'react-icons/gi';
const navItemsByRole = {
  'Sinh viên': [
    // { to: 'dashboard', icon: <LuLayoutDashboard />, label: 'Tổng quan' },
    { to: 'quan-ly-de-tai', icon: <FaBook />, label: 'Đề tài' },
    { to: 'quan-ly-bao-cao', icon: <TbReportSearch />, label: 'Báo cáo' },
  ],
  'Giảng viên': [
    // { to: 'dashboard', icon: <LuLayoutDashboard />, label: 'Tổng quan' },
    { to: 'quan-ly-de-tai', icon: <FaBook />, label: 'Đề tài' },
    { to: 'quan-ly-bao-cao', icon: <TbReportSearch />, label: 'Báo cáo' },
  ],
  'Cán bộ khoa': [
    { to: 'dashboard', icon: <LuLayoutDashboard />, label: 'Tổng quan' },
    { to: 'quan-ly-sinh-vien', icon: <PiStudentBold />, label: 'Sinh viên' },
    {
      to: 'quan-ly-giang-vien',
      icon: <FaChalkboardTeacher />,
      label: 'Giảng viên',
    },
    { to: 'quan-ly-de-tai', icon: <FaBook />, label: 'Đề tài' },
    { to: 'quan-ly-bao-cao', icon: <TbReportSearch />, label: 'Báo cáo' },

    {
      to: 'quan-ly-de-tai-cap-truong',
      icon: <MdOutlineRecommend />,
      label: 'Đề xuất cấp trường',
    },
  ],
  Admin: [
    { to: 'dashboard', icon: <LuLayoutDashboard />, label: 'Tổng quan' },
    { to: 'quan-ly-tai-khoan', icon: <MdManageAccounts />, label: 'Tài khoản' },

    { to: 'quan-ly-de-tai', icon: <FaBook />, label: 'Đề tài' },
    {
      to: 'quan-ly-de-tai-cap-truong',
      icon: <FaSchool />,
      label: 'Đề tài cấp trường',
    },
    {
      to: 'quan-ly-can-bo-khoa',
      icon: <GiTeacher />,
      label: 'Cán bộ khoa',
    },
    {
      to: 'quan-ly-linh-vuc',
      icon: <AiFillDatabase />,
      label: 'Lĩnh vực',
    },
    { to: 'quan-ly-khoa', icon: <HiMiniBuildingOffice />, label: 'Khoa' },
  ],
};

function MainNav() {
  const queryClient = useQueryClient();
  const accountData = queryClient.getQueryData(['account']);
  const { acc } = accountData;
  const navItems = navItemsByRole[acc.vaiTro] || [];
  return (
    <nav>
      <ul className="ml-1 flex flex-col gap-2">
        {navItems.map(({ to, icon, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `font-montserrat flex items-center gap-3 px-6 py-3 text-[15px] font-semibold transition-all ${isActive ? 'rounded-md bg-gray-200 text-[#1561A3]' : 'text-gray-600'} hover:rounded-md hover:bg-gray-200 hover:text-[#1561A3]`
              }
            >
              <span>{icon}</span>
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default MainNav;
