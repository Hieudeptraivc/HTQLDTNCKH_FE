import { useForm } from 'react-hook-form';
import Input from '../../ui/Input';
import Label from '../../ui/Label';
import Button from '../../ui/Button';
import { useAccount } from '../../auth/useAccount';
import SpinnerMini from '../../ui/SpinnerMini';

import { useEditGiangVien } from './useEditGiangVien';
import { useCreateGiangVien } from './useCreateGiangVien';
import { isPending } from '@reduxjs/toolkit';
import Spinner from '../../ui/Spinner';
import { useNavigate } from 'react-router-dom';

function FormEditGiangVien({ giangVien = {} }) {
  const navigate = useNavigate();
  const { data, isPending } = useAccount();
  const { editGiangVien, editError, isEditError, isEditing } =
    useEditGiangVien();
  const { createGiangVien, createError, isCreateError, isCreating } =
    useCreateGiangVien();
  const isEdit = Object.keys(giangVien).length > 0;
  const formattedNgaySinh = giangVien.ngaySinh
    ? giangVien.ngaySinh.split('T')[0]
    : '';

  const { register, handleSubmit } = useForm({
    defaultValues: giangVien
      ? { ...giangVien, ngaySinh: formattedNgaySinh }
      : '',
  });
  if (isPending) return <Spinner />;
  const khoaId = data?.user?.khoa._id;
  const { acc } = data;
  function onSubmit(data) {
    let email;
    if (isEdit) {
      let { _id: giangVienId, khoa, taiKhoan, hocVi, ...rest } = data;
      if (acc.vaiTro === 'Cán bộ khoa' || acc.vaiTro === 'Admin') {
        email = taiKhoan?.email;
      } else {
        email = giangVien.taiKhoan?.email;
        hocVi = giangVien.hocVi;
      }
      const editData = {
        ...rest,
        hocVi,
        email,
      };
      editGiangVien({ giangVienId, editData });
      // console.log(editData, giangVienId);
    } else {
      const { taiKhoan, ...rest } = data;
      const newData = { ...rest, khoa: khoaId, email: data.taiKhoan?.email };
      // console.log(newData);
      createGiangVien({ newData });
    }
  }

  // console.log(giangVien);
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
            <Label>Họ và tên</Label>
            <Input register={register} type="text" id="ten" name="ten" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Email</Label>
            <Input
              register={register}
              type="email"
              id="taiKhoan.email"
              name="taiKhoan.email"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Số điện thoại</Label>
            <Input
              register={register}
              type="text"
              id="soDienThoai"
              name="soDienThoai"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Ngày sinh</Label>
            <Input
              register={register}
              type="date"
              id="ngaySinh"
              name="ngaySinh"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Học vị</Label>
            <select
              className="rounded-xl border-1 border-gray-200 px-3 py-1.5 text-[14px] shadow-lg"
              name="hocVi"
              id="hocVi"
              {...register('hocVi')}
            >
              <option value="Tú tài">Tú Tài</option>
              <option value="Cử nhân">Cử Nhân</option>
              <option value="Thạc sĩ">Thạc Sĩ</option>
              <option value="Tiến sĩ">Tiến Sĩ</option>
              <option value="Phó giáo sư-Tiến sĩ">Phó giáo sư - Tiến Sĩ</option>
              <option value="Giáo sư-Tiến sĩ">Giáo sư - Tiến Sĩ</option>
            </select>
          </div>

          {isEdit ? (
            <div className="flex flex-col gap-2">
              <Label>Khoa</Label>
              <Input
                register={register}
                type="text"
                disabled
                id="khoa.ten"
                name="khoa.ten"
              />
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="my-3 flex items-center justify-end gap-6 px-2 md:px-6">
          <Button
            variant="danger"
            onClick={() => navigate(-1)}
            className={`${isEdit ? 'w-2/10' : 'w-2/15'} text-xs font-extrabold md:text-[15px]`}
          >
            {isEdit ? 'Hủy chỉnh sửa' : 'Hủy tạo mới'}
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={isEditing || isCreating}
            className={`${isEdit ? 'w-2/10' : 'w-2/15'} text-xs font-extrabold md:text-[15px]`}
          >
            {isEditing || isCreating ? (
              <SpinnerMini />
            ) : isEdit ? (
              'Lưu chỉnh sửa'
            ) : (
              'Lưu thông tin'
            )}
          </Button>
        </div>
      </form>
      {!isEdit ? (
        <div className="font-montserrat flex">
          <span className="w-23 font-bold text-red-600">Lưu ý:</span>
          <p>
            Sau khi nhập thông tin sinh viên thì tài khoản giảng viên sẽ được
            tạo tự động với <strong>tên tài khoản</strong> là email và{' '}
            <strong>mật khẩu</strong> là ngày sinh của giảng viên.{' '}
            <strong>Ví dụ:</strong> Tên tài khoản: nvanhieu29@gmail.com. Mật
            khẩu: 29062003{' '}
          </p>
        </div>
      ) : null}
    </>
  );
}

export default FormEditGiangVien;
