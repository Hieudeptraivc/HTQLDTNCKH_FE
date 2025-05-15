import { useNavigate } from 'react-router-dom';
import { useGiangViens } from '../features/QuanLyGiangVien/useGiangViens';
import Filter from '../ui/Filter';
import SortBy from '../ui/SortBy';
import Search from '../ui/Search';
import Button from '../ui/Button';
import { FaPlus } from 'react-icons/fa';
import GiangVienTable from '../features/QuanLyGiangVien/GiangVienTable';

function GiangViens() {
  const navigate = useNavigate();
  const { allGiangVien, count, isPending } = useGiangViens();

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between pb-1">
          <p className="font-poppins w-58 text-xl font-semibold">
            Danh sách giảng viên
          </p>
          <Button
            onClick={() => navigate('new')}
            className="flex items-center gap-2 text-[14px]"
          >
            <span>
              <FaPlus />
            </span>
            Tạo giảng viên
          </Button>
        </div>

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
            <div className="flex items-center gap-1">
              <span className="font-montserrat text-[14px] font-semibold">
                Học vị
              </span>
              <Filter
                filterField="hocVi"
                options={[
                  { value: 'all', label: 'Tất cả' },
                  { value: 'Tú tài', label: 'Tú Tài' },
                  { value: 'Cử nhân', label: 'Cử nhân' },
                  { value: 'Thạc sĩ', label: 'Thạc sĩ' },
                  { value: 'Tiến sĩ', label: 'Tiến sĩ' },
                  {
                    value: 'Phó giáo sư-Tiến sĩ',
                    label: 'Phó giáo sư - Tiến Sĩ',
                  },
                  {
                    value: 'Giáo sư-Tiến sĩ',
                    label: 'Giáo sư - Tiến Sĩ',
                  },
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
            <Search
              placeholder="Nhập tên, số điện thoại"
              filterField="keyword"
            />
          </div>
        </div>
      </div>
      <GiangVienTable
        allGiangVien={allGiangVien}
        count={count}
        isPending={isPending}
      />
    </>
  );
}

export default GiangViens;
