import Filter from '../../ui/Filter';
import Spinner from '../../ui/Spinner';
import { generateYearRanges } from '../../utils/generateYearRanges';

import { useDeTaisFromDashboard } from './useDeTaisFromDashboard';
import Stats from './DeTaiStats';
import DeTaiStatusChart from './DeTaiStatusChart';
import YearlyActivity from './YearlyActivity';
import LinhVucDeTaiChart from './LinhVucDeTaiChart';
import { useDsKhoa } from '../QuanLyKhoa/useDsKhoa';
import KhoaDeTaiChart from './KhoaDeTaiChart';

function AdminDeTaiDashboard() {
  const { isPending, allDeTai } = useDeTaisFromDashboard();
  const { isPending: isLoadingDs, data: dsKhoa } = useDsKhoa();

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
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1">
              <span className="font-montserrat text-[14px] font-semibold">
                Trạng thái
              </span>
              <Filter
                filterField="trangThai"
                options={[
                  { value: 'all', label: 'Tất cả' },
                  { value: 'Hoàn thành', label: 'Hoàn thành' },
                  { value: 'Đang triển khai', label: 'Đang triển khai' },
                  { value: 'Chưa triển khai', label: 'Chưa triển khai' },
                  { value: 'Hủy bỏ', label: 'Hủy bỏ' },
                ]}
              />
            </div>
            <div className="flex items-center gap-1">
              <span className="font-montserrat text-[14px] font-semibold">
                Cấp đề tài
              </span>
              <Filter
                filterField="deTaiCap"
                options={[
                  { value: 'all', label: 'Tất cả' },
                  { value: 'Đề tài cấp trường', label: 'Đề tài cấp trường' },
                  { value: 'Đề tài cấp khoa', label: 'Đề tài cấp khoa' },
                ]}
              />
            </div>
            <div className="flex items-center gap-1">
              <span className="font-montserrat text-[14px] font-semibold">
                Khoa
              </span>
              {isLoadingDs ? (
                <div className="font-montserrat rounded-md bg-gray-300 px-2 py-1 text-sm font-semibold text-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none">
                  <SpinnerMini />
                </div>
              ) : (
                <Filter
                  filterField="khoa"
                  options={[{ value: 'all', label: 'Tất cả' }, ...dsKhoaTen]}
                />
              )}
            </div>
            <div className="flex items-center gap-1">
              <span className="font-montserrat text-[14px] font-semibold">
                Năm học
              </span>
              <Filter
                filterField="ngayTao"
                isRangeYear
                options={[{ value: 'all', label: 'Tất cả' }, ...dsNamHoc]}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="grid w-full grid-cols-4 items-center gap-5 py-5">
        <Stats allDetai={allDeTai} />

        {/* <YearlyActivity allDeTai={allDeTai} /> */}
        <KhoaDeTaiChart allDeTai={allDeTai} />
        <DeTaiStatusChart allDeTai={allDeTai} />
        <LinhVucDeTaiChart allDeTai={allDeTai} />
      </div>
    </div>
  );
}

export default AdminDeTaiDashboard;
