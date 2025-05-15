import { useNavigate } from 'react-router-dom';
import { useSinhVien } from '../features/QuanLySinhVien/useSinhVien';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';

import FormEditSinhVien from '../features/QuanLySinhVien/FormEditSinhVien';

import SinhVienAccounInformation from '../features/QuanLySinhVien/SinhVienAccounInformation';

function SinhVien() {
  const navigate = useNavigate();
  const { data, isPending, isError, error } = useSinhVien();
  if (isPending) return <Spinner />;
  if (isError) return <p>{error}</p>;
  const { sinhVien, taiKhoan } = data;
  // console.log(data);
  return (
    <div className="items-center">
      <p className="font-poppins w-full text-xl font-semibold">
        Thông tin sinh viên và tài khoản
      </p>
      <div className="font-poppins mt-4 flex flex-row gap-4">
        <div className="w-full overflow-x-hidden rounded-lg border border-gray-300 shadow-lg">
          <div className="flex w-full flex-row items-center justify-between bg-gray-200 px-4 py-2">
            <p className="flex gap-2">
              Thông tin sinh viên:{' '}
              <span className="font-semibold">{sinhVien.ten}</span>
              <span
                className={`font font-montserrat rounded-lg text-center text-[15px] font-medium ${sinhVien.taiKhoan?.trangThai ? 'w-36 bg-green-600 text-green-100' : 'w-28 bg-red-600 text-red-100'} `}
              >
                {sinhVien.taiKhoan?.trangThai
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
          <FormEditSinhVien sinhVien={sinhVien} />
        </div>
        <div className="h-2/5 w-full flex-2/5 overflow-x-hidden rounded-lg border border-gray-300 shadow-lg">
          <p className="bg-gray-200 px-4 py-2">
            Thông tin tài khoản:{' '}
            <span className="font-semibold">{taiKhoan.tenDangNhap}</span>
          </p>
          <SinhVienAccounInformation taiKhoan={taiKhoan} />
        </div>
      </div>
    </div>
  );
}

export default SinhVien;
