import Filter from '../../ui/Filter';
import Spinner from '../../ui/Spinner';
import { generateYearRanges } from '../../utils/generateYearRanges';

import { useDeTaisFromDashboard } from './useDeTaisFromDashboard';
import DeTaiStats from './DeTaiStats';
import DeTaiStatusChart from './DeTaiStatusChart';
import YearlyActivity from './YearlyActivity';
import LinhVucDeTaiChart from './LinhVucDeTaiChart';

function CanBoKhoaDashboard() {
  const { isPending, allDeTai } = useDeTaisFromDashboard();
  // console.log(allDeTai);
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
        <DeTaiStats allDetai={allDeTai} />
        <YearlyActivity allDeTai={allDeTai} />
        <DeTaiStatusChart allDeTai={allDeTai} />
        <LinhVucDeTaiChart allDeTai={allDeTai} />
      </div>
    </div>
  );
}

export default CanBoKhoaDashboard;
