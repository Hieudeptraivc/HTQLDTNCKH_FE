import Label from '../../ui/Label';
import Button from '../../ui/Button';
import Spinner from '../../ui/Spinner';
import { useNavigate } from 'react-router-dom';
import { formatToVietnamDate } from '../../utils/formatToVietNamDate';
import { useSinhVien } from './useSinhVien';
import SinhVienAccounInformation from './SinhVienAccounInformation';
import { useDeleteSinhVien } from './useDeleteSinhVien';
import { DeleteSinhVien } from './DeleteSinhVien';
import { useActiveTaiKhoan } from '../QuanLyTaiKhoan/useActiveTaiKhoan';
import { useDisableTaiKhoan } from '../QuanLyTaiKhoan/useDisableTaiKhoan';
import SpinnerMini from '../../ui/SpinnerMini';

function SinhVienDetail() {
  const navigate = useNavigate();
  const { data, isPending, isError, error } = useSinhVien();
  const { isDeleting, deleteSinhVien } = useDeleteSinhVien();
  const { isActive, activeTaiKhoan } = useActiveTaiKhoan();
  const { isDisable, disableTaiKhoan } = useDisableTaiKhoan();
  if (isPending) return <Spinner />;
  if (isError) return <p>{error}</p>;
  const { sinhVien, taiKhoan } = data;
  // console.log(data);
  // console.log(taiKhoan);
  const formattedNgaySinh = sinhVien.ngaySinh
    ? formatToVietnamDate(sinhVien.ngaySinh)
    : '';

  return (
    <div className="items-center">
      <p className="font-poppins z-50 w-full text-xl font-semibold">
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
          <div className="grid grid-cols-2 gap-6 px-6 py-4">
            <div className="flex flex-col gap-2">
              <Label>Họ và tên</Label>
              <input
                className={`rounded-xl border-1 border-gray-200 px-3 py-1.5 text-[14px] shadow-lg ring-1 ring-blue-100 outline-none`}
                disabled={true}
                value={sinhVien.ten}
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
              <Label>Số điện thoại</Label>
              <input
                className={`rounded-xl border-1 border-gray-200 px-3 py-1.5 text-[14px] shadow-lg ring-1 ring-blue-100 outline-none`}
                disabled={true}
                value={sinhVien.soDienThoai}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Ngày sinh</Label>
              <input
                className={`rounded-xl border-1 border-gray-200 px-3 py-1.5 text-[14px] shadow-lg ring-1 ring-blue-100 outline-none`}
                disabled={true}
                value={formattedNgaySinh}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Lớp</Label>
              <input
                className={`rounded-xl border-1 border-gray-200 px-3 py-1.5 text-[14px] shadow-lg ring-1 ring-blue-100 outline-none`}
                disabled={true}
                value={sinhVien.lop}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Học lực</Label>
              <input
                className={`rounded-xl border-1 border-gray-200 px-3 py-1.5 text-[14px] shadow-lg ring-1 ring-blue-100 outline-none`}
                disabled={true}
                value={sinhVien.hocLuc}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Khoa</Label>
              <input
                className={`rounded-xl border-1 border-gray-200 px-3 py-1.5 text-[14px] shadow-lg ring-1 ring-blue-100 outline-none`}
                disabled={true}
                value={sinhVien.khoa.ten}
              />
            </div>
          </div>
          <div className="m-3 flex justify-between gap-4 px-3">
            {!taiKhoan.trangThai ? (
              <div>
                <Button
                  variant="primary"
                  className="w-32"
                  disabled={isActive}
                  onClick={() => activeTaiKhoan({ taiKhoanId: taiKhoan._id })}
                >
                  {isActive ? <SpinnerMini /> : 'Kích hoạt'}
                </Button>
              </div>
            ) : (
              <div>
                <Button
                  variant="danger"
                  className="w-32"
                  disabled={isDisable}
                  onClick={() => disableTaiKhoan({ taiKhoanId: taiKhoan._id })}
                >
                  {isDisable ? <SpinnerMini /> : 'Vô hiệu hóa'}
                </Button>
              </div>
            )}
            <div className="flex gap-4">
              <DeleteSinhVien
                isDeleting={isDeleting}
                deleteSinhVien={deleteSinhVien}
                sinhVienId={sinhVien._id}
              >
                Xóa sinh viên
              </DeleteSinhVien>
              <Button
                onClick={() =>
                  navigate(`/can-bo-khoa/quan-ly-sinh-vien/${sinhVien._id}`)
                }
                variant="primary"
                className={`items-end text-xs font-extrabold md:text-[16px]`}
              >
                Chỉnh sửa
              </Button>
            </div>
          </div>
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

export default SinhVienDetail;
