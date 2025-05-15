import { FaPlus } from 'react-icons/fa';
import { useKhoas } from '../features/QuanLyKhoa/useKhoas';
import Button from './../ui/Button';
import KhoaTable from '../features/QuanLyKhoa/KhoaTable';
import { useNavigate } from 'react-router-dom';

function Khoas() {
  const navigate = useNavigate();
  const { allKhoa, count, isPending } = useKhoas();
  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex flex-10/12 items-center justify-between">
          <p className="font-poppins w-58 text-xl font-semibold">
            Danh sách khoa
          </p>
          <Button
            onClick={() => navigate('new')}
            className="flex items-center gap-2 text-[14px]"
          >
            <span>
              <FaPlus />
            </span>
            Tạo khoa
          </Button>
        </div>
      </div>

      <KhoaTable allKhoa={allKhoa} count={count} isPending={isPending} />
    </>
  );
}

export default Khoas;
