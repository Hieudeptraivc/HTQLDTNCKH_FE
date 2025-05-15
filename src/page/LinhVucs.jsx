import { FaPlus } from 'react-icons/fa';

import Button from './../ui/Button';
import { useNavigate } from 'react-router-dom';
import { useLinhVucs } from '../features/QuanLyLinhVuc/useLinhVucs';
import LinhVucTable from '../features/QuanLyLinhVuc/LinhVucTable';

function LinhVucs() {
  const navigate = useNavigate();
  const { allLinhVuc, count, isPending } = useLinhVucs();

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex flex-10/12 items-center justify-between">
          <p className="font-poppins w-64 text-xl font-semibold">
            Danh sách các lĩnh vực
          </p>
          <Button
            onClick={() => navigate('new')}
            className="flex items-center gap-2 text-[14px]"
          >
            <span>
              <FaPlus />
            </span>
            Tạo lĩnh vực
          </Button>
        </div>
      </div>

      <LinhVucTable
        allLinhVuc={allLinhVuc}
        count={count}
        isPending={isPending}
      />
    </>
  );
}

export default LinhVucs;
