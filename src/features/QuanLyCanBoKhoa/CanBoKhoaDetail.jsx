import Label from '../../ui/Label';
import Button from '../../ui/Button';

import { useNavigate } from 'react-router-dom';
import { DeleteCanBoKhoa } from './DeleteCanBoKhoa';
import { useDeleteCanBoKhoa } from './useDeleteCanBoKhoa';
import { useCanBoKhoa } from './useCanBoKhoa';
import CanBoKhoaAccounInformation from './CanBoKhoaAccountInformation';
import Spinner from '../../ui/Spinner';

function CanBoKhoaDetail() {
  const navigate = useNavigate();
  const { isPending, data, isError, error } = useCanBoKhoa();
  const { isDeleting, deleteCanBoKhoa, deleteError, isDeleteError } =
    useDeleteCanBoKhoa();
  if (isPending) return <Spinner />;
  if (isError) return <p>{error}</p>;
  const { canBoKhoa, taiKhoan } = data;
  const formattedNgaySinh = canBoKhoa.ngaySinh
    ? canBoKhoa.ngaySinh.split('T')[0]
    : '';
  // console.log(taiKhoan);
  return (
    <div className="items-center antialiased">
      <p className="font-poppins w-full text-xl font-semibold">
        Thông tin cán bộ khoa và tài khoản
      </p>
      <div className="font-poppins mt-4 flex flex-row gap-4">
        <div className="w-full overflow-x-hidden rounded-lg border border-gray-300 shadow-lg">
          <div className="flex w-full flex-row items-center justify-between bg-gray-200 px-4 py-2">
            <p className="flex gap-2">
              Thông tin cán bộ:{' '}
              <span className="font-semibold">{canBoKhoa.ten}</span>
              <span
                className={`font font-montserrat rounded-lg text-center text-[15px] font-medium ${canBoKhoa.taiKhoan?.trangThai ? 'w-36 bg-green-600 text-green-100' : 'w-28 bg-red-600 text-red-100'} `}
              >
                {canBoKhoa.taiKhoan?.trangThai
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
                value={canBoKhoa.ten}
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
                value={canBoKhoa.soDienThoai}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Ngày sinh</Label>
              <input
                type="date"
                className={`rounded-xl border-1 border-gray-200 px-3 py-1.5 text-[14px] shadow-lg ring-1 ring-blue-100 outline-none`}
                disabled={true}
                value={formattedNgaySinh}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Khoa</Label>
              <input
                className={`rounded-xl border-1 border-gray-200 px-3 py-1.5 text-[14px] shadow-lg ring-1 ring-blue-100 outline-none`}
                disabled={true}
                value={canBoKhoa.khoa.ten}
              />
            </div>
          </div>
          <div className="m-3 flex justify-end gap-4">
            <DeleteCanBoKhoa
              isDeleting={isDeleting}
              deleteCanBoKhoa={deleteCanBoKhoa}
              canBoKhoaId={canBoKhoa._id}
            >
              Xóa cán bộ khoa
            </DeleteCanBoKhoa>
            <Button
              onClick={() =>
                navigate(`/admin/quan-ly-can-bo-khoa/${canBoKhoa._id}`)
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
            Thông tin tài khoản:{' '}
            <span className="font-semibold">{taiKhoan.tenDangNhap}</span>
          </p>
          <CanBoKhoaAccounInformation taiKhoan={taiKhoan} />
        </div>
      </div>
    </div>
  );
}

export default CanBoKhoaDetail;
