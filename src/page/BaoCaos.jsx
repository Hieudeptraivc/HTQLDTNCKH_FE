import { useNavigate } from 'react-router-dom';

import Filter from '../ui/Filter';
import SortBy from '../ui/SortBy';
import Search from '../ui/Search';
import Button from '../ui/Button';
import { FaPlus } from 'react-icons/fa';
import GiangVienTable from '../features/QuanLyGiangVien/GiangVienTable';
import { useBaoCaos } from '../features/QuanLyBaoCao/useBaoCaos';
import BaoCaoTable from '../features/QuanLyBaoCao/BaoCaoTable';

function BaoCaos() {
  const navigate = useNavigate();
  const { allBaoCao, count, isPending } = useBaoCaos();
  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between pb-1">
          <p className="font-poppins w-58 text-xl font-semibold">
            Danh sách báo cáo
          </p>
        </div>

        <div className="flex flex-10/12 items-center justify-between">
          <div className="flex flex-row items-center justify-between gap-5 px-2">
            <div className="flex items-center gap-1">
              <span className="font-montserrat text-[14px] font-semibold">
                Trạng thái
              </span>
              <Filter
                filterField="baoCaoTienDo_trangThai"
                options={[
                  { value: 'all', label: 'Tất cả' },
                  { value: 'Đã mở', label: 'Đã mở' },
                  { value: 'Đã đóng', label: 'Đã đóng' },
                ]}
              />
            </div>
            <div className="flex items-center gap-1">
              <span className="font-montserrat text-[14px] font-semibold">
                Loại báo cáo
              </span>
              <Filter
                filterField="baoCaoTienDo_loaiBaoCao"
                options={[
                  { value: 'all', label: 'Tất cả' },
                  { value: 'Sơ bộ', label: 'Sơ bộ' },
                  { value: 'Chi tiết', label: 'Chi tiết' },
                  { value: 'Cuối cùng', label: 'Cuối cùng' },
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
              placeholder="Nhập tên đề tài, sinh viên, báo cáo"
              filterField="keyword"
            />
          </div>
        </div>
      </div>
      <BaoCaoTable allBaoCao={allBaoCao} count={count} isPending={isPending} />
    </>
  );
}

export default BaoCaos;
