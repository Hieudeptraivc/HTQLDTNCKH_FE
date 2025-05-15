import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';

import FormEditSinhVien from '../features/QuanLySinhVien/FormEditSinhVien';
import { useKhoa } from '../features/QuanLyKhoa/useKhoa';
import FormEditkhoa from '../features/QuanLyKhoa/FormEditKhoa';
import KhoaInformation from '../features/QuanLyKhoa/KhoaInformation';

function Khoa() {
  const navigate = useNavigate();
  const { data, isPending, isError, error } = useKhoa();
  if (isPending) return <Spinner />;
  if (isError) return <p>{error}</p>;
  const { data: khoa } = data;

  return (
    <div className="items-center">
      <p className="font-poppins w-full text-xl font-semibold">
        Thông tin của Khoa
      </p>
      <div className="font-poppins mt-4 flex flex-row gap-4">
        <div className="w-full overflow-x-hidden rounded-lg border border-gray-300 shadow-lg">
          <div className="flex w-full flex-row items-center justify-between bg-gray-200 px-4 py-2">
            <p className="flex gap-2">
              Thông tin khoa: <span className="font-semibold">{khoa.ten}</span>
            </p>
            <Button
              variant="secondary"
              onClick={() => navigate(-1)}
              className={'text-[13.5px]'}
            >
              &larr; Trở về
            </Button>
          </div>
          <FormEditkhoa khoa={khoa} />
        </div>
        <KhoaInformation khoa={khoa} />
      </div>
    </div>
  );
}

export default Khoa;
