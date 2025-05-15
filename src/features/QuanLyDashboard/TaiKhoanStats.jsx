import { TbLoader3, TbReport } from 'react-icons/tb';
import { IoMdCheckboxOutline } from 'react-icons/io';
import { GiCancel, GiTeacher } from 'react-icons/gi';
import Stat from '../../ui/Stat';
import { PiStudent } from 'react-icons/pi';
import { GoPeople } from 'react-icons/go';
import { BiSolidUserAccount } from 'react-icons/bi';

function TaiKhoanStats({ allTaiKhoan }) {
  // console.log(allTaiKhoan);
  const numTaiKhoan = allTaiKhoan?.length;
  const numCanBoKhoa = allTaiKhoan?.filter(
    (acc) => acc?.vaiTro === 'Cán bộ khoa',
  )?.length;
  const numDangChoDuyet = allTaiKhoan?.filter(
    (acc) => acc?.vaiTro === 'Sinh viên',
  )?.length;
  const numTuChoi = allTaiKhoan?.filter(
    (acc) => acc?.vaiTro === 'Giảng viên',
  )?.length;
  return (
    <>
      <Stat
        title="Tài khoản"
        color="indigo"
        icon={<BiSolidUserAccount size={32} />}
        value={numTaiKhoan}
      />
      <Stat
        title="Cán bộ khoa"
        color="green"
        icon={<GoPeople size={32} />}
        value={numCanBoKhoa}
      />
      <Stat
        title="Sinh viên"
        color="blue"
        icon={<PiStudent size={32} />}
        value={numDangChoDuyet}
      />
      <Stat
        title="Giảng viên"
        color="purple"
        icon={<GiTeacher size={32} />}
        value={numTuChoi}
      />
    </>
  );
}

export default TaiKhoanStats;
