import { useForm } from 'react-hook-form';
import Input from '../../ui/Input';
import Label from '../../ui/Label';
import Button from '../../ui/Button';
import { useQueryClient } from '@tanstack/react-query';
import { useAccount } from '../../auth/useAccount';
import { useEditSinhVien } from './useEditSinhVien';
import SpinnerMini from '../../ui/SpinnerMini';
import { useCreateSinhVien } from './useCreateSinhVien';
import Spinner from '../../ui/Spinner';
import { useNavigate } from 'react-router-dom';

function FormEditSinhVien({ sinhVien = {} }) {
  const navigate = useNavigate();
  const { data, isPending } = useAccount();
  const { editSinhVien, editError, isEditError, isEditing } = useEditSinhVien();
  const { createSinhVien, createError, isCreateError, isCreating } =
    useCreateSinhVien();
  const isEdit = Object.keys(sinhVien).length > 0;
  const formattedNgaySinh = sinhVien.ngaySinh
    ? sinhVien.ngaySinh.split('T')[0]
    : '';
  const { register, handleSubmit } = useForm({
    defaultValues: sinhVien ? { ...sinhVien, ngaySinh: formattedNgaySinh } : '',
  });
  if (isPending) return <Spinner />;
  const khoaId = data?.user?.khoa._id;
  const { acc } = data;

  function onSubmit(data) {
    if (isEdit) {
      let email;
      let {
        _id: sinhVienId,
        khoa,
        hocLuc,
        lop,
        mssv,
        taiKhoan,
        ...rest
      } = data;
      if (acc.vaiTro === 'Cán bộ khoa' || acc.vaiTro === 'Admin') {
        email = taiKhoan?.email;
      } else {
        email = sinhVien.taiKhoan?.email;
        hocLuc = sinhVien.hocLuc;
        lop = sinhVien.lop;
      }
      const editData = {
        ...rest,
        hocLuc,
        lop,
        email,
      };
      editSinhVien({ sinhVienId, editData });
      // console.log(editData, sinhVienId);
    } else {
      const { taiKhoan, ...rest } = data;
      const newData = { ...rest, khoa: khoaId, email: data.taiKhoan?.email };
      // console.log(newData);
      createSinhVien({ newData });
    }
  }

  // console.log(sinhVien);
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
            <Label>Lớp</Label>
            <Input register={register} type="text" id="lop" name="lop" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Học lực</Label>
            <select
              className="rounded-xl border-1 border-gray-200 px-3 py-1.5 text-[14px] shadow-lg"
              name="hocLuc"
              id="hocLuc"
              defaultValue="Khá"
              {...register('hocLuc')}
            >
              <option value="Xuất sắc">Xuất sắc</option>
              <option value="Giỏi">Giỏi</option>
              <option value="Khá">Khá</option>
              <option value="Trung bình">Trung bình</option>
              <option value="Yếu">Yếu</option>
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
            <div className="flex flex-col gap-2">
              <Label>Mã số sinh viên</Label>
              <Input
                register={register}
                disable={isEdit}
                type="number"
                id="mssv"
                name="mssv"
              />
            </div>
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
            Sau khi nhập thông tin sinh viên thì tài khoản sinh viên sẽ được tạo
            tự động với <strong>tên tài khoản</strong> là mã số sinh viên và{' '}
            <strong>mật khẩu</strong> là ngày sinh của sinh viên.{' '}
            <strong>Ví dụ:</strong> Tên tài khoản: 211121514156. Mật khẩu:
            29062003{' '}
          </p>
        </div>
      ) : null}
    </>
  );
}

export default FormEditSinhVien;
