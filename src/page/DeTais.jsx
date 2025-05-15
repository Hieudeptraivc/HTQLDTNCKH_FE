import SinhVienTable from '../features/QuanLySinhVien/SinhVienTable';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import Filter from '../ui/Filter';
import SpinnerMini from '../ui/SpinnerMini';
import SortBy from '../ui/SortBy';
import Search from '../ui/Search';

import { useDeTais } from '../features/QuanLyDeTai/useDeTais';
import { useDsKhoa } from '../features/QuanLyKhoa/useDsKhoa';
import { useDsLinhVuc } from './../features/QuanLyLinhVuc/useDsLinhVuc';
import DeTaiTable from '../features/QuanLyDeTai/DeTaiTable';
import { generateYearRanges } from '../utils/generateYearRanges';
import { useQueryClient } from '@tanstack/react-query';

function DeTais() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const accountData = queryClient.getQueryData(['account']);
  const { acc } = accountData;
  const { allDeTai, count, isPending } = useDeTais();

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
          {acc?.vaiTro !== 'Admin' ? (
            <Button
              onClick={() => navigate('new')}
              className="flex items-center gap-2 text-[14px]"
            >
              <span>
                <FaPlus />
              </span>
              Tạo đề tài
            </Button>
          ) : (
            <Search placeholder="Nhập tên đề tài" filterField="keyword" />
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className={`flex flex-wrap items-center gap-5 px-2 pt-3`}>
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
                Trạng thái duyệt
              </span>
              <Filter
                filterField="trangThaiDuyet"
                options={[
                  { value: 'all', label: 'Tất cả' },
                  { value: 'Đã duyệt', label: 'Đã duyệt' },
                  { value: 'Đang chờ duyệt', label: 'Đang chờ duyệt' },
                  { value: 'Từ chối', label: 'Từ chối' },
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

      <DeTaiTable
        acc={acc}
        allDeTai={allDeTai}
        count={count}
        isPending={isPending}
      />
    </>
  );
}

export default DeTais;
