import Label from '../../ui/Label';
import Button from '../../ui/Button';
import Spinner from '../../ui/Spinner';
import { useNavigate } from 'react-router-dom';
import { formatToVietnamDate } from '../../utils/formatToVietNamDate';
import { useTaiKhoan } from './useTaiKhoan';
import { useDeleteTaiKhoan } from './useDeleteTaiKhoan';
import { DeleteTaiKhoan } from './DeleteTaiKhoan';
import UserInformation from '../../ui/UserInformation';

function TaiKhoanDetail() {
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
                className={`font font-montserrat rounded-lg text-center text-[15px] font-medium ${taiKhoan?.trangThai ? 'w-36 bg-green-600 text-green-100' : 'w-28 bg-red-600 text-red-100'} `}
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
          <div className="grid grid-cols-2 gap-6 px-6 py-4">
            <div className="flex flex-col gap-2">
              <Label>Tên tài khoản</Label>
              <input
                className={`rounded-xl border-1 border-gray-200 px-3 py-1.5 text-[14px] shadow-lg ring-1 ring-blue-100 outline-none`}
                disabled={true}
                value={taiKhoan.tenDangNhap}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Email</Label>
              <input
                className={`rounded-xl border-1 border-gray-200 px-3 py-1.5 text-[14px] shadow-lg ring-1 ring-blue-100 outline-none`}
                disabled={true}
                value={taiKhoan.email}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Vai trò</Label>
              <input
                className={`rounded-xl border-1 border-gray-200 px-3 py-1.5 text-[14px] shadow-lg ring-1 ring-blue-100 outline-none`}
                disabled={true}
                value={taiKhoan.vaiTro}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Số điện thoại</Label>
              <input
                className={`rounded-xl border-1 border-gray-200 px-3 py-1.5 text-[14px] shadow-lg ring-1 ring-blue-100 outline-none`}
                disabled={true}
                value={taiKhoan.nguoiDung.soDienThoai}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Khoa</Label>
              <input
                className={`rounded-xl border-1 border-gray-200 px-3 py-1.5 text-[14px] shadow-lg ring-1 ring-blue-100 outline-none`}
                disabled={true}
                value={taiKhoan.nguoiDung.khoa.ten}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Ngày tạo</Label>
              <input
                className={`rounded-xl border-1 border-gray-200 px-3 py-1.5 text-[14px] shadow-lg ring-1 ring-blue-100 outline-none`}
                disabled={true}
                value={formattedNgayTao}
              />
            </div>
          </div>
          <div className="m-3 flex justify-end gap-4">
            <DeleteTaiKhoan
              isDeleting={isDeleting}
              deleteTaiKhoan={deleteTaiKhoan}
              taiKhoanId={taiKhoan._id}
            >
              Xoa Giang Vien
            </DeleteTaiKhoan>
            <Button
              onClick={() =>
                navigate(`/admin/quan-ly-tai-khoan/${taiKhoan._id}`)
              }
              variant="primary"
              className={`items-end text-xs font-extrabold md:text-[16px]`}
            >
              Chỉnh sửa
            </Button>
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

export default TaiKhoanDetail;
