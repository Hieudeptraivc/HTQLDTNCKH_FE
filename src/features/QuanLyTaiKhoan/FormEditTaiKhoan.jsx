import { useForm } from 'react-hook-form';
import Input from '../../ui/Input';
import Label from '../../ui/Label';
import Button from '../../ui/Button';

import { useNavigate } from 'react-router-dom';

import { useDsKhoa } from '../QuanLyKhoa/useDsKhoa';
import { useEditTaiKhoan } from './useEditTaiKhoan';
import Spinner from '../../ui/Spinner';
import SpinnerMini from '../../ui/SpinnerMini';

function FormEditTaiKhoan({ taiKhoan = {} }) {
  const navigate = useNavigate();
  const { isPending, data: dsKhoa, isError, error } = useDsKhoa();
  const formattedNgayTao = taiKhoan.ngayTao
    ? taiKhoan.ngayTao.split('T')[0]
    : '';

  const { editTaiKhoan, isEditing } = useEditTaiKhoan();

  const { register, handleSubmit } = useForm({
    defaultValues: taiKhoan
      ? { ...taiKhoan, ngayTao: formattedNgayTao, khoa: taiKhoan.khoa?._id }
      : '',
  });
  // console.log(taiKhoan);
  function onSubmit(data) {
    const {
      _id: taiKhoanId,
      email,
      matKhauMoi,
      matKhauMoiXacNhan,
      tenDangNhap,
      ...rest
    } = data;
    const editData = { email, matKhauMoi, matKhauMoiXacNhan, tenDangNhap };
    // console.log(editData);
    editTaiKhoan({ taiKhoanId, editData });
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
          }
        }}
      >
        <div className="grid grid-cols-2 gap-6 px-6 py-4">
          <div className="flex flex-col gap-2">
            <Label>Tên đăng nhập</Label>
            <Input
              disabled={taiKhoan?.vaiTro !== 'Sinh viên'}
              register={register}
              type="text"
              id="tenDangNhap"
              name="tenDangNhap"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Email</Label>
            <Input register={register} type="email" id="email" name="email" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Vai trò</Label>
            <Input
              disabled={true}
              register={register}
              type="text"
              id="vaiTro"
              name="vaiTro"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Số điện thoại</Label>
            <Input
              register={register}
              disabled={true}
              type="text"
              id="nguoiDung.soDienThoai"
              name="nguoiDung.soDienThoai"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Ngày tạo</Label>
            <Input
              disabled={true}
              register={register}
              type="date"
              id="ngayTao"
              name="ngayTao"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Khoa</Label>
            <select
              {...register('khoa')} // lưu trực tiếp _id vào "khoa"
              id="khoa"
              name="khoa"
              disabled={true}
              defaultValue={taiKhoan?.khoa?._id || ''}
              className="rounded-xl border-1 border-gray-200 bg-gray-100 px-3 py-1.5 text-[14px] shadow-lg ring-1 ring-blue-100 outline-none invalid:border-2 invalid:border-pink-500 focus:ring-2 focus:ring-blue-300"
            >
              {dsKhoa?.map((khoa) => (
                <option key={khoa._id} value={khoa._id}>
                  {khoa.ten}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Mật khẩu mới</Label>
            <Input
              register={register}
              type="password"
              id="matKhauMoi"
              name="matKhauMoi"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Xác nhận mật khẩu mới</Label>
            <Input
              register={register}
              type="password"
              id="matKhauMoiXacNhan"
              name="matKhauMoiXacNhan"
            />
          </div>
        </div>

        <div className="my-3 flex items-center justify-end gap-6 px-2 md:px-6">
          <Button
            variant="danger"
            onClick={() => navigate(-1)}
            className={`w-2/10 text-xs font-extrabold md:text-[15px]`}
          >
            Hủy chỉnh sửa
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isEditing}
            className={`w-2/10 text-xs font-extrabold md:text-[15px]`}
          >
            {isEditing ? <SpinnerMini /> : 'Lưu chỉnh sửa'}
          </Button>
        </div>
      </form>
    </>
  );
}

export default FormEditTaiKhoan;
