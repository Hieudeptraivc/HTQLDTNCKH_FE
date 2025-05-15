import { useNavigate } from 'react-router-dom';
import { useCanBoKhoas } from '../features/QuanLyCanBoKhoa/useCanBoKhoas';
import Filter from '../ui/Filter';
import SortBy from '../ui/SortBy';
import Search from '../ui/Search';
import Button from '../ui/Button';
import { FaPlus } from 'react-icons/fa';
import CanBoKhoaTable from '../features/QuanLyCanBoKhoa/CanBoKhoaTable';
import { useDsKhoa } from '../features/QuanLyKhoa/useDsKhoa';
import SpinnerMini from '../ui/SpinnerMini';

function CanBoKhoas() {
  const navigate = useNavigate();
  const { allCanBoKhoa, count, isPending } = useCanBoKhoas();
  const { isPending: isLoadingDs, data: dsKhoa } = useDsKhoa();
  const dsKhoaTen = dsKhoa?.map((k) => {
    return { value: k._id, label: k.ten };
  });
  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between py-2">
          <p className="font-poppins w-72 text-xl font-semibold">
            Danh sách cán bộ khoa
          </p>
          <Button
            onClick={() => navigate('new')}
            className="flex items-center gap-2 text-[14px]"
          >
            <span>
              <FaPlus />
            </span>
            Tạo cán bộ khoa
          </Button>
        </div>
        <div className="flex flex-10/12 items-center justify-between">
          <div className="flex flex-row items-center justify-between gap-10 px-2">
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
            <Search
              placeholder="Nhập tên, số điện thoại"
              filterField="keyword"
            />
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
                Sắp xếp
              </span>
              <SortBy
                options={[
                  { value: 'ngayTao', label: 'Ngày tạo (xa nhất)' },
                  { value: '-ngayTao', label: 'Ngày tạo (gần nhất)' },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
      <CanBoKhoaTable
        allCanBoKhoa={allCanBoKhoa}
        count={count}
        isPending={isPending}
      />
    </>
  );
}

export default CanBoKhoas;
