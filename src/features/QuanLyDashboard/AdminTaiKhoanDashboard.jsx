import Filter from '../../ui/Filter';
import Spinner from '../../ui/Spinner';
import { generateYearRanges } from '../../utils/generateYearRanges';

import TaiKhoanStats from './TaiKhoanStats';

import { useDsKhoa } from '../QuanLyKhoa/useDsKhoa';
import { useTaiKhoanFromDashboard } from './useTaiKhoanFromDashboard';
import TaiKhoanStatus from './TaiKhoanStatus';
import VaiTroTrangThaiChart from './VaiTroTrangThaiChart';

function AdminTaiKhoanDashboard() {
  const { allTaiKhoan, isPending } = useTaiKhoanFromDashboard();
  const { isPending: isLoadingDsKhoa, data: dsKhoa } = useDsKhoa();

  const dsKhoaTen = dsKhoa?.map((k) => {
    return { value: k._id, label: k.ten };
  });
  const dsNamHoc = generateYearRanges(2027, 2020);
  if (isPending) return <Spinner />;
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-1">
        <div className="flex w-full items-center justify-between">
          <p className="font-poppins text-xl font-semibold">Tổng quan</p>
          <span className="font-montserrat text-[14px] font-semibold">
            Khoa
          </span>
        </div>
        <Filter
          filterField="khoa"
          isRangeYear
          options={[{ value: 'all', label: 'Tất cả' }, ...dsKhoaTen]}
        />
      </div>
      <div className="grid w-full grid-cols-4 items-center gap-5 py-5">
        <TaiKhoanStats allTaiKhoan={allTaiKhoan} />
        <TaiKhoanStatus allTaiKhoan={allTaiKhoan} />
        <VaiTroTrangThaiChart allTaiKhoan={allTaiKhoan} />
      </div>
    </div>
  );
}

export default AdminTaiKhoanDashboard;
