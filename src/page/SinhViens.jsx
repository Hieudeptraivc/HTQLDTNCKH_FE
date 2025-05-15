import SinhVienTable from '../features/QuanLySinhVien/SinhVienTable';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import Filter from '../ui/Filter';
import { useSinhViens } from './../features/QuanLySinhVien/useSinhViens';
import SpinnerMini from '../ui/SpinnerMini';
import SortBy from '../ui/SortBy';
import Search from '../ui/Search';
import { useMemo } from 'react';
import { useRef } from 'react';

function SinhViens() {
  const navigate = useNavigate();
  const { allSinhVien, count, isPending } = useSinhViens();
  const lopRef = useRef([]);

  const dsLop = useMemo(() => {
    if (!allSinhVien) return [];

    const currentLops = [...new Set(allSinhVien.map((sv) => sv.lop))];
    const existingValues = lopRef.current.map((item) => item.value);

    // tìm các lớp mới chưa có trong lopRef
    const newLops = currentLops.filter((lop) => !existingValues.includes(lop));

    if (newLops.length > 0) {
      const newOptions = newLops.map((lop) => ({
        value: lop,
        label: lop,
      }));
      lopRef.current = [...lopRef.current, ...newOptions];
    }

    return lopRef.current;
  }, [allSinhVien]);

  return (
    <>
      <div className="flex flex-col gap-3">
        <p className="font-poppins w-58 text-xl font-semibold">
          Danh sách sinh viên
        </p>
        <div className="flex flex-10/12 items-center justify-between">
          <div className="flex flex-row items-center justify-between gap-5 px-2">
            <div className="flex items-center gap-1">
              <span className="font-montserrat text-[14px] font-semibold">
                Trạng thái
              </span>
              <Filter
                filterField="trangThai"
                options={[
                  { value: 'all', label: 'Tất cả' },
                  { value: false, label: 'Vô hiệu hóa' },
                  { value: true, label: 'Đang hoạt động' },
                ]}
              />
            </div>
            {isPending ? (
              <div className="font-montserrat rounded-md bg-gray-300 px-2 py-1 text-sm font-semibold text-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none">
                <SpinnerMini />
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <span className="font-montserrat text-[14px] font-semibold">
                  Lớp
                </span>
                <Filter
                  filterField="lop"
                  options={[{ value: 'all', label: 'Tất cả' }, ...dsLop]}
                />
              </div>
            )}
            <div className="flex items-center gap-1">
              <span className="font-montserrat text-[14px] font-semibold">
                Sắp xếp
              </span>
              <SortBy
                options={[
                  { value: '-mssvSort', label: 'Mã số sinh viên (giảm dần)' },
                  { value: 'mssvSort', label: 'Mã số sinh viên (tăng dần)' },
                  { value: 'ngayTao', label: 'Ngày tạo (xa nhất)' },
                  { value: '-ngayTao', label: 'Ngày tạo (gần nhất)' },
                ]}
              />
            </div>
            <Search
              placeholder="Nhập tên, mssv, số điện thoại"
              filterField="keyword"
            />
          </div>
          <Button
            onClick={() => navigate('new')}
            className="flex items-center gap-2 text-[14px]"
          >
            <span>
              <FaPlus />
            </span>
            Tạo sinh viên
          </Button>
        </div>
      </div>

      <SinhVienTable
        allSinhVien={allSinhVien}
        count={count}
        isPending={isPending}
      />
    </>
  );
}

export default SinhViens;
