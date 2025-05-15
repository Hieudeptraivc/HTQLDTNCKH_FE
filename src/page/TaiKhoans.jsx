import Filter from '../ui/Filter';
import SortBy from '../ui/SortBy';
import Search from '../ui/Search';
import { useDsKhoa } from '../features/QuanLyKhoa/useDsKhoa';
import SpinnerMini from '../ui/SpinnerMini';
import { useTaiKhoans } from '../features/QuanLyTaiKhoan/useTaiKhoans';
import TaiKhoanTable from '../features/QuanLyTaiKhoan/TaiKhoanTable';

function TaiKhoans() {
  const { allTaiKhoan, count, isPending } = useTaiKhoans();

  const { isPending: isLoadingDs, data: dsKhoa } = useDsKhoa();

  const dsKhoaTen = dsKhoa?.map((k) => {
    return { value: k._id, label: k.ten };
  });
  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="mb-2 flex justify-between py-2">
          <p className="font-poppins w-72 text-xl font-semibold">
            Danh sách tài khoản
          </p>
          <Search
            placeholder="Nhập tên đăng nhập, email"
            filterField="keyword"
          />
        </div>
        <div className="flex flex-10/12 items-center">
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
                Vai trò
              </span>
              <Filter
                filterField="vaiTro"
                options={[
                  { value: 'all', label: 'Tất cả' },
                  { value: 'Sinh viên', label: 'Sinh viên' },
                  { value: 'Giảng viên', label: 'Giảng viên' },
                  { value: 'Cán bộ khoa', label: 'Cán bộ khoa' },
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
          </div>
        </div>
      </div>
      <TaiKhoanTable
        allTaiKhoan={allTaiKhoan}
        count={count}
        isPending={isPending}
      />
    </>
  );
}

export default TaiKhoans;
