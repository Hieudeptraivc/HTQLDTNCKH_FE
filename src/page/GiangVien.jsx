import { useNavigate } from 'react-router-dom';

import Button from '../ui/Button';
import Spinner from '../ui/Spinner';
import { useGiangVien } from '../features/QuanLyGiangVien/useGiangVien';
import FormEditGiangVien from '../features/QuanLyGiangVien/FormEditGiangVien';
import GiangVienAccounInformation from './../features/QuanLyGiangVien/GiangVienAccountInformation';

function GiangVien() {
  const navigate = useNavigate();
  const { data, isPending, isError, error } = useGiangVien();
  if (isPending) return <Spinner />;
  if (isError) return <p>{error}</p>;
  const { giangVien, taiKhoan } = data;
  // console.log(data);
  return (
    <div className="items-center">
      <p className="font-poppins w-full text-xl font-semibold">
        Thông tin giảng viên và tài khoản
      </p>
      <div className="font-poppins mt-4 flex flex-row gap-4">
        <div className="w-full overflow-x-hidden rounded-lg border border-gray-300 shadow-lg">
          <div className="flex w-full flex-row items-center justify-between bg-gray-200 px-4 py-2">
            <p className="flex gap-2">
              Thông tin giảng viên:{' '}
              <span className="font-semibold">{giangVien.ten}</span>
              <span
                className={`font font-montserrat flex items-center justify-center rounded-lg text-center text-[15px] font-medium ${giangVien.taiKhoan?.trangThai ? 'w-36 bg-green-600 text-green-100' : 'w-28 bg-red-600 text-red-100'} `}
              >
                {giangVien.taiKhoan?.trangThai
                  ? 'Đang hoạt động'
                  : 'Vô hiệu hóa'}
              </span>
            </p>
            <Button
              variant="secondary"
              onClick={() => navigate(-1)}
              className={'text-[13.5px]'}
            >
              &larr; Trở về
            </Button>
          </div>
          <FormEditGiangVien giangVien={giangVien} />
        </div>
        <div className="h-2/5 w-full flex-2/5 overflow-x-hidden rounded-lg border border-gray-300 shadow-lg">
          <p className="bg-gray-200 px-4 py-2 break-words whitespace-pre-wrap">
            Thông tin tài khoản:{' '}
            <span className="font-semibold">{taiKhoan.tenDangNhap}</span>
          </p>
          <GiangVienAccounInformation taiKhoan={taiKhoan} />
        </div>
      </div>
    </div>
  );
}

export default GiangVien;
