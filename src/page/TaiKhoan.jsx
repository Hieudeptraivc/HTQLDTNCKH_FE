import { useNavigate } from 'react-router-dom';

import Button from '../ui/Button';
import Spinner from '../ui/Spinner';
import { formatToVietnamDate } from '../utils/formatToVietNamDate';
import { useTaiKhoan } from '../features/QuanLyTaiKhoan/useTaiKhoan';
import { useDeleteTaiKhoan } from '../features/QuanLyTaiKhoan/useDeleteTaiKhoan';
import FormEditTaiKhoan from '../features/QuanLyTaiKhoan/FormEditTaiKhoan';
import UserInformation from '../ui/UserInformation';

function TaiKhoan() {
  const navigate = useNavigate();
  const { data, isPending, isError, error } = useTaiKhoan();
  const { isDeleting, deleteTaiKhoan, deleteError, isDeleteError } =
    useDeleteTaiKhoan();
  if (isPending) return <Spinner />;
  if (isError) return <p>{error}</p>;
  const { taiKhoan } = data;
  // console.log(data);
  const formattedNgayTao = taiKhoan.ngayTao
    ? formatToVietnamDate(taiKhoan.ngayTao)
    : '';
  return (
    <div className="items-center">
      <p className="font-poppins z-50 w-full text-xl font-semibold">
        Thông tin tài khoản
      </p>
      <div className="font-poppins mt-4 flex flex-row gap-4">
        <div className="w-full overflow-x-hidden rounded-lg border border-gray-300 shadow-lg">
          <div className="flex w-full flex-row items-center justify-between bg-gray-200 px-4 py-2">
            <p className="flex gap-2">
              Thông tin tài khoản:{' '}
              <span
                className="truncate font-semibold"
                title={taiKhoan.tenDangNhap}
              >
                {taiKhoan.tenDangNhap}
              </span>
              <span
                className={`font font-montserrat rounded-lg text-center text-[15px] font-medium ${taiKhoan.trangThai ? 'w-36 bg-green-600 text-green-100' : 'w-28 bg-red-600 text-red-100'} `}
              >
                {taiKhoan.trangThai ? 'Đang hoạt động' : 'Vô hiệu hóa'}
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
          <FormEditTaiKhoan taiKhoan={taiKhoan} />
          <div className="font-montserrat flex px-5 py-4">
            <span className="w-32 font-bold text-red-600">Lưu ý:</span>
            <p>
              Sau khi thay đổi mới gmail thì tài khoản sẽ được tự động đổi mới
              với
              <strong> tên tài khoản </strong> là email mới.
              <strong> Ví dụ: </strong> Email: cbkhoa@gmail.com - Tên đăng nhập
              sau khi đổi: cbkhoa@gmail.com
            </p>
          </div>
        </div>

        <div className="h-2/5 w-full flex-2/5 overflow-x-hidden rounded-lg border border-gray-300 shadow-lg">
          <p className="bg-gray-200 px-4 py-2">
            Thông tin người dùng:{' '}
            <span className="font-semibold">{taiKhoan.nguoiDung.ten}</span>
          </p>
          <UserInformation nguoiDung={taiKhoan.nguoiDung} />
        </div>
      </div>
    </div>
  );
}

export default TaiKhoan;
