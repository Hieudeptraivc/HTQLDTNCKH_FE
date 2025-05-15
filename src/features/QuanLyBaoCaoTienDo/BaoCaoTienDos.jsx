import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

import { useBaoCaoTienDos } from './useBaoCaoTienDos';
import Button from '../../ui/Button';
import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';
import Search from '../../ui/Search';
import DeTaiTable from './BaoCaoTienDoTable';
import Spinner from '../../ui/Spinner';

function BaoCaoTienDos({ acc }) {
  const navigate = useNavigate();
  const { allBaoCaoTienDo, count, isPending } = useBaoCaoTienDos();
  //   console.log(allBaoCaoTienDo);
  return (
    <div className="my-12 border-t-[0.5px] pt-10">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="font-poppins w-84 text-xl font-semibold">
              Danh sách các tiến độ báo cáo
            </p>
            {acc?.vaiTro === 'Cán bộ khoa' ? (
              <Button
                onClick={() => navigate('bao-cao-tien-do/new')}
                className="flex items-center gap-2 text-[14px]"
              >
                <span>
                  <FaPlus />
                </span>
                Tạo báo cáo tiến bộ
              </Button>
            ) : null}
          </div>

          {!allBaoCaoTienDo?.length < 1 ? (
            <div className="flex flex-10/12 items-center justify-between">
              <div className="flex flex-wrap items-center justify-between gap-5 px-2 pt-3">
                <div className="flex items-center gap-1">
                  <span className="font-montserrat text-[14px] font-semibold">
                    Trạng thái
                  </span>
                  <Filter
                    filterField="trangThai"
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
                    filterField="loaiBaoCao"
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
                      { value: 'hanNop', label: 'Hạn nộp (xa nhất)' },
                      { value: '-hanNop', label: 'Hạn nộp (gần nhất)' },
                    ]}
                  />
                </div>
                <Search
                  placeholder="Nhập tên báo cáo tiến độ"
                  filterField="keyword"
                />
              </div>
            </div>
          ) : null}
        </div>
        {isPending ? (
          <Spinner />
        ) : !allBaoCaoTienDo?.length < 1 ? (
          <DeTaiTable
            allBaoCaoTienDo={allBaoCaoTienDo}
            count={count}
            isPending={isPending}
          />
        ) : (
          <p className="font-monserat text-center text-[17px] text-gray-700">
            {acc?.vaiTro === 'Cán bộ khoa'
              ? 'Chưa có báo cáo tiến độ báo cáo nào. Vui lòng tạo mới báo cáo tiến độ.'
              : 'Hiện tại chưa có báo cáo tiến độ nào cho đề tài này. Vui lòng đợi đến khi có báo cáo tiến độ mới.'}
          </p>
        )}
      </div>
    </div>
  );
}

export default BaoCaoTienDos;
