import { useForm } from 'react-hook-form';
import Input from '../../ui/Input';
import Label from '../../ui/Label';
import Button from '../../ui/Button';
import SpinnerMini from '../../ui/SpinnerMini';
import { useNavigate } from 'react-router-dom';

import { useEditCanBoKhoa } from './useEditCanBoKhoa';
import { useCreateCanBoKhoa } from './useCreateCanBoKhoa';
import { useDsKhoa } from '../QuanLyKhoa/useDsKhoa';

function FormEditCanBoKhoa({ canBoKhoa = {} }) {
  const navigate = useNavigate();
  const { isPending, data: dsKhoa, isError, error } = useDsKhoa();
  const isEdit = Object.keys(canBoKhoa).length > 0;
  const formattedNgaySinh = canBoKhoa.ngaySinh
    ? canBoKhoa.ngaySinh.split('T')[0]
    : '';

  const { editCanBoKhoa, isEditing } = useEditCanBoKhoa();
  const { createCanBoKhoa, isCreating } = useCreateCanBoKhoa();

  const { register, handleSubmit } = useForm({
    defaultValues: canBoKhoa
      ? { ...canBoKhoa, ngaySinh: formattedNgaySinh, khoa: canBoKhoa.khoa?._id }
      : '',
  });

  function onSubmit(data) {
    if (isEdit) {
      const { _id: canBoKhoaId, email, taiKhoan, ...rest } = data;
      const editData = { ...rest };
      editCanBoKhoa({ canBoKhoaId, editData });
    } else {
      const { taiKhoan, ...rest } = data;
      const email = data.taiKhoan?.email;
      const newData = { ...rest, email };
      createCanBoKhoa({ newData });
    }
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
            <Label>Họ và tên</Label>
            <Input register={register} type="text" id="ten" name="ten" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Email</Label>
            <Input
              register={register}
              disabled={isEdit ? true : false}
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
            <Label>Khoa</Label>
            {isPending ? (
              <SpinnerMini className={'border-r-gray-400'} />
            ) : (
              <select
                {...register('khoa')} // lưu trực tiếp _id vào "khoa"
                id="khoa"
                name="khoa"
                defaultValue={canBoKhoa?.khoa?._id || ''}
                className="rounded-xl border-1 border-gray-200 px-3 py-1.5 text-[14px] shadow-lg ring-1 ring-blue-100 outline-none invalid:border-2 invalid:border-pink-500 focus:ring-2 focus:ring-blue-300"
              >
                {dsKhoa?.map((khoa) => (
                  <option key={khoa._id} value={khoa._id}>
                    {khoa.ten}
                  </option>
                ))}
              </select>
            )}
          </div>
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

      {!isEdit && (
        <div className="font-montserrat flex">
          <span className="w-23 font-bold text-red-600">Lưu ý:</span>
          <p>
            Sau khi nhập thông tin cán bộ khoa thì tài khoản sẽ được tạo tự động
            với
            <strong> tên tài khoản </strong> là email và
            <strong> mật khẩu </strong> là ngày sinh.
            <strong> Ví dụ: </strong> Email: cbkhoa@gmail.com - Mật khẩu:
            01011990
          </p>
        </div>
      )}
    </>
  );
}

export default FormEditCanBoKhoa;
