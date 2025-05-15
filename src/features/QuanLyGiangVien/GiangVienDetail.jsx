import Label from '../../ui/Label';
import Button from '../../ui/Button';
import Spinner from '../../ui/Spinner';
import { useNavigate } from 'react-router-dom';
import { useGiangVien } from './useGiangVien';

import GiangVienAccounInformation from './GiangVienAccountInformation';
import { formatToVietnamDate } from '../../utils/formatToVietNamDate';
import { useDeleteGiangVien } from './useDeleteGiangVien';
import { DeleteGiangVien } from './DeleteGiangVien';
import { useDisableTaiKhoan } from '../QuanLyTaiKhoan/useDisableTaiKhoan';
import { useActiveTaiKhoan } from '../QuanLyTaiKhoan/useActiveTaiKhoan';
import SpinnerMini from '../../ui/SpinnerMini';

function GiangVienDetail() {
  const navigate = useNavigate();
  const { data, isPending, isError, error } = useGiangVien();
  const { isDeleting, deleteGiangVien } = useDeleteGiangVien();
  const { isDisable, disableTaiKhoan } = useDisableTaiKhoan();
  const { isActive, activeTaiKhoan } = useActiveTaiKhoan();
  if (isPending) return <Spinner />;
  if (isError) return <p>{error}</p>;
  const { giangVien, taiKhoan } = data;
  // console.log(data);
  const formattedNgaySinh = giangVien.ngaySinh
    ? formatToVietnamDate(giangVien.ngaySinh)
    : '';
  return (
    <div className="items-center antialiased">
      <p className="font-poppins w-full text-xl font-semibold">
        Thông tin giảng viên và tài khoản
      </p>
      <div className="font-poppins mt-4 flex flex-row gap-4">
        <div className="w-full overflow-x-hidden rounded-lg border border-gray-300 shadow-lg">
          <div className="flex w-full flex-row items-center justify-between bg-gray-200 px-4 py-2">
            <p className="flex gap-2">
              Thông tin giảng viên:{' '}
              <span className="w-96 font-semibold">{giangVien.ten}</span>
              <span
                className={`font-montserrat flex items-center justify-center rounded-lg text-center text-[15px] font-medium ${giangVien.taiKhoan?.trangThai ? 'w-36 bg-green-600 text-green-100' : 'w-28 bg-red-600 text-red-100'} `}
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
          <div className="grid grid-cols-2 gap-6 px-6 py-4">
            <div className="flex flex-col gap-2">
              <Label>Họ và tên</Label>
              <input
                className={`rounded-xl border-1 border-gray-200 px-3 py-1.5 text-[14px] shadow-lg ring-1 ring-blue-100 outline-none`}
                disabled={true}
                value={giangVien.ten}
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
                value={giangVien.soDienThoai}
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
              <Label>Học vị</Label>
              <input
                className={`rounded-xl border-1 border-gray-200 px-3 py-1.5 text-[14px] shadow-lg ring-1 ring-blue-100 outline-none`}
                disabled={true}
                value={giangVien.hocVi}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Khoa</Label>
              <input
                className={`rounded-xl border-1 border-gray-200 px-3 py-1.5 text-[14px] shadow-lg ring-1 ring-blue-100 outline-none`}
                disabled={true}
                value={giangVien.khoa.ten}
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
              <DeleteGiangVien
                isDeleting={isDeleting}
                deleteGiangVien={deleteGiangVien}
                giangVienId={giangVien._id}
              >
                Xóa giảng viên
              </DeleteGiangVien>
              <Button
                onClick={() =>
                  navigate(`/can-bo-khoa/quan-ly-giang-vien/${giangVien._id}`)
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

export default GiangVienDetail;
