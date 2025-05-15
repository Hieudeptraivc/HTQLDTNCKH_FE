import Filter from '../ui/Filter';
import SpinnerMini from '../ui/SpinnerMini';
import SortBy from '../ui/SortBy';
import Search from '../ui/Search';
import { useDsKhoa } from '../features/QuanLyKhoa/useDsKhoa';
import { useDsLinhVuc } from './../features/QuanLyLinhVuc/useDsLinhVuc';
import DeTaiTable from '../features/QuanLyDeTai/DeTaiTable';
import { generateYearRanges } from '../utils/generateYearRanges';
import { useQueryClient } from '@tanstack/react-query';
import { useDeTaiCapTruong } from '../features/QuanLyDeTaiCapTruong/useDeTaisCapTruong';
import DeTaiCapTruongTable from '../features/QuanLyDeTaiCapTruong/DeTaiCapTruongTable';

function DeTaiCapTruong() {
  const queryClient = useQueryClient();
  const accountData = queryClient.getQueryData(['account']);
  const { acc } = accountData;
  const { allDeTaiCapTruong, count, isPending } = useDeTaiCapTruong();

  const { isPending: isLoadingDsLinhVuc, data: dsLinhVuc } = useDsLinhVuc();
  const { isPending: isLoadingDsKhoa, data: dsKhoa } = useDsKhoa();
  const dsKhoaTen = dsKhoa?.map((k) => {
    return { value: k._id, label: k.ten };
  });
  const dsLinhVucTen = dsLinhVuc?.map((k) => {
    return { value: k._id, label: k.ten };
  });
  const dsNamHoc = generateYearRanges(2027, 2020);
  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <p className="font-poppins w-58 text-xl font-semibold">
            Danh sách đề tài
          </p>
          {acc?.vaiTro === 'Admin' && (
            <Search placeholder="Nhập tên đề tài" filterField="keyword" />
          )}
        </div>

        <div className="flex items-center justify-between">
          <div
            className={`$ flex w-full flex-wrap items-center justify-between gap-5 px-2 pt-3`}
          >
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
            {isLoadingDsLinhVuc ? (
              <div className="font-montserrat rounded-md bg-gray-300 px-2 py-1 text-sm font-semibold text-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none">
                <SpinnerMini />
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <span className="font-montserrat text-[14px] font-semibold">
                  Lĩnh vực
                </span>
                <Filter
                  filterField="linhVuc"
                  options={[{ value: 'all', label: 'Tất cả' }, ...dsLinhVucTen]}
                />
              </div>
            )}

            <div className="flex items-center gap-1">
              <span className="font-montserrat text-[14px] font-semibold">
                Sắp xếp
              </span>
              <SortBy
                options={[
                  { value: 'ngayTao', label: 'Ngày tạo (xa nhất)' },
                  { value: '-ngayTao', label: 'Ngày tạo (gần nhất)' },
                ]}
              />
            </div>

            {acc?.vaiTro === 'Admin' && (
              <div className="flex items-center gap-1">
                <span className="font-montserrat text-[14px] font-semibold">
                  Khoa
                </span>
                {isLoadingDsKhoa ? (
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
            )}
            {acc?.vaiTro !== 'Admin' && (
              <Search placeholder="Nhập tên đề tài" filterField="keyword" />
            )}
          </div>
        </div>
      </div>

      <DeTaiCapTruongTable
        acc={acc}
        allDeTaiCapTruong={allDeTaiCapTruong}
        count={count}
        isPending={isPending}
      />
    </>
  );
}

export default DeTaiCapTruong;
