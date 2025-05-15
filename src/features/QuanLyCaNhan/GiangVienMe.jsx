import { useNavigate } from 'react-router-dom';
import { useAccount } from '../../auth/useAccount';
import { formatToVietnamDate } from '../../utils/formatToVietNamDate';
import Spinner from '../../ui/Spinner';
import Button from './../../ui/Button';
import Label from '../../ui/Label';
import { useEffect, useState } from 'react';
import Input from '../../ui/Input';
import { useForm } from 'react-hook-form';
import { useEditGiangVienMe } from './useEditGiangVienMe';
import SpinnerMini from '../../ui/SpinnerMini';
import { useUpdatePasswordByMe } from './useUpdatePasswordByMe';
import { TiDeleteOutline } from 'react-icons/ti';
import { useDisableTaiKhoanByMe } from './useDisableAccountByMe';
import { ConfirmDisableAccount } from './ConfirmDisableAccount';
const API_URL = import.meta.env.VITE_API_URL;
function GiangVienMe() {
  const navigate = useNavigate();

  const [isEdit, setIsEdit] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const { isPending, data } = useAccount();
  const { editGiangVienMe, isEditing } = useEditGiangVienMe();
  const { updateMyPassword, isUpdating } = useUpdatePasswordByMe();
  const { isDisable, disableTaiKhoan } = useDisableTaiKhoanByMe();

  const {
    register: registerInfo,
    handleSubmit: handleSubmitInfo,
    setValue,
    formState: { errors: errorsInfo },
    reset: resetInfo,
  } = useForm();

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
    watch: watchPassword,
    reset: resetPassword,
  } = useForm();

  useEffect(() => {
    if (data?.user) {
      // Chuẩn bị dữ liệu mặc định cho form
      const defaultValues = {
        ten: data.user.ten,
        soDienThoai: data.user.soDienThoai,
        ngaySinh: data.user.ngaySinh?.split('T')[0] || '',
      };
      // Đặt giá trị mặc định cho form
      resetInfo(defaultValues);
    }
  }, [data, resetInfo]);

  useEffect(() => {
    if (user?.avatar && !avatarPreview) {
      setAvatarPreview(`${API_URL}/public/img/users/${user.avatar}`);
    }
  }, [data, avatarPreview]);

  // Hàm để reset form và avatar khi hủy chỉnh sửa
  const handleCancelEdit = () => {
    // Reset form về giá trị ban đầu
    resetInfo({
      ten: user.ten,
      soDienThoai: user.soDienThoai,
      ngaySinh: user.ngaySinh?.split('T')[0] || '',
    });

    // Reset avatar preview về giá trị ban đầu
    setAvatarPreview(
      user.avatar ? `${API_URL}/public/img/users/${user.avatar}` : null,
    );

    // Tắt chế độ chỉnh sửa
    setIsEdit(false);
  };

  if (isPending) return <Spinner />;

  const { user, acc } = data;

  const newPassword = watchPassword('matKhauMoi');
  // Định nghĩa rules validation cho form đổi mật khẩu
  const passwordRules = {
    matKhauHienTai: {
      required: 'Vui lòng nhập mật khẩu hiện tại',
    },
    matKhauMoi: {
      required: 'Vui lòng nhập mật khẩu mới',
      minLength: {
        value: 8,
        message: 'Mật khẩu phải có ít nhất 8 ký tự',
      },
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        message: 'Mật khẩu phải có ít nhất 1 chữ thường, 1 chữ hoa và 1 số',
      },
    },
    matKhauMoiXacNhan: {
      required: 'Vui lòng xác nhận mật khẩu mới',
      validate: (value) =>
        value === newPassword || 'Mật khẩu xác nhận không khớp',
    },
  };

  const registerPasswordField = (fieldName) => {
    return registerPassword(fieldName, passwordRules[fieldName]);
  };

  const handleAvatarChange = (e) => {
    // console.log(e.target.files);
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmitInfo = (formData) => {
    const payload = new FormData();
    payload.append('ten', formData.ten);
    payload.append('soDienThoai', formData.soDienThoai);
    payload.append('ngaySinh', formData.ngaySinh);

    if (formData.avatar instanceof File) {
      payload.append('avatar', formData.avatar);
    }

    editGiangVienMe(
      { payload },
      {
        onSuccess: () => {
          setIsEdit(false); // tắt chế độ chỉnh sửa
        },
      },
    );
  };

  const onSubmitPassword = (data) => {
    updateMyPassword(
      { editData: data },
      {
        onSuccess: () => {
          setIsChangePassword(false);
          resetPassword();
        },
      },
    );
  };

  return (
    <div className="items-center antialiased">
      <p className="font-poppins w-full text-xl font-semibold">
        Thông tin cá nhân và tài khoản
      </p>
      <div className="font-poppins mt-4 flex flex-row gap-4">
        <form
          className="h-6/7 w-full overflow-x-hidden rounded-lg border border-gray-300 shadow-lg"
          onSubmit={handleSubmitInfo(onSubmitInfo)}
        >
          <div className="flex w-full flex-row items-center justify-between bg-gray-200 px-4 py-2">
            <p className="flex gap-2">
              Thông tin cá nhân:{' '}
              <span className="font-semibold">{user.ten}</span>
              <span
                className={`font font-montserrat rounded-lg text-center text-[15px] font-medium ${user?.taiKhoan.trangThai ? 'w-36 bg-green-600 text-green-100' : 'w-28 bg-red-600 text-red-100'} `}
              >
                {user?.taiKhoan.trangThai ? 'Đang hoạt động' : 'Vô hiệu hóa'}
              </span>
            </p>
            <Button
              variant="secondary"
              onClick={() => navigate(-1)}
              className={'text-[13.5px]'}
              type="button"
            >
              &larr; Trở về
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-6 px-6 py-4">
            {/* Avatar upload section */}
            {isEdit && (
              <div className="col-span-2 flex flex-col items-center gap-2">
                <Label htmlFor="avatar">Ảnh đại diện</Label>
                <div className="flex flex-col items-center">
                  <div className="mb-2 flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-gray-100">
                    {avatarPreview ? (
                      <img
                        src={avatarPreview}
                        alt="Avatar preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="text-4xl text-gray-400">👤</div>
                    )}
                  </div>
                  <input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    {...registerInfo('avatar')}
                    onChange={(e) => {
                      handleAvatarChange(e);
                      setValue('avatar', e.target.files[0]);
                    }}
                  />
                  <label
                    htmlFor="avatar"
                    className="cursor-pointer rounded-lg bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
                  >
                    Chọn ảnh
                  </label>
                  {errorsInfo.avatar && (
                    <p className="mt-1 text-xs text-red-500">
                      {errorsInfo.avatar.message}
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <Label htmlFor="ten">Họ và tên</Label>
              <input
                id="ten"
                className={`rounded-xl ${errorsInfo.ten ? 'ring-red-500' : 'ring-blue-100'} border-1 border-gray-200 px-3 py-1.5 text-[14px] shadow-lg ring-1 ring-blue-100 outline-none invalid:border-2 invalid:border-pink-500 focus:ring-2 focus:ring-blue-300`}
                disabled={!isEdit}
                defaultValue={user.ten}
                {...(isEdit &&
                  registerInfo('ten', {
                    required: 'Họ và tên không được bỏ trống',
                  }))}
              />
              {errorsInfo.ten && (
                <p className="text-xs text-red-500">{errorsInfo.ten.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Email</Label>
              <input
                className={`rounded-xl border-1 border-gray-200 ${isEdit ? `bg-gray-100` : null} px-3 py-1.5 text-[14px] shadow-lg ring-1 ring-blue-100 outline-none`}
                disabled={true}
                value={acc.email}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="soDienThoai">Số điện thoại</Label>
              <input
                id="soDienThoai"
                className={`rounded-xl border-gray-200 px-3 py-1.5 text-[14px] shadow-lg ring-1 ${errorsInfo.soDienThoai ? 'ring-red-500' : 'ring-blue-100'} border-1 border-gray-200 px-3 py-1.5 text-[14px] shadow-lg ring-1 ring-blue-100 outline-none invalid:border-2 invalid:border-pink-500 focus:ring-2 focus:ring-blue-300`}
                disabled={!isEdit}
                defaultValue={user.soDienThoai}
                {...(isEdit &&
                  registerInfo('soDienThoai', {
                    required: 'Số điện thoại không được bỏ trống',
                    pattern: {
                      value: /^[0-9]{10,11}$/,
                      message: 'Số điện thoại không hợp lệ (10-11 số)',
                    },
                  }))}
              />
              {errorsInfo.soDienThoai && (
                <p className="text-xs text-red-500">
                  {errorsInfo.soDienThoai.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="ngaySinh">Ngày sinh</Label>
              <input
                id="ngaySinh"
                type="date"
                className={`rounded-xl border-1 border-gray-200 px-3 py-1.5 text-[14px] shadow-lg ring-1 ${errorsInfo.ngaySinh ? 'ring-red-500' : 'ring-blue-100'} outline-none focus:ring-2 focus:ring-blue-300`}
                disabled={!isEdit}
                defaultValue={user.ngaySinh?.split('T')[0] || ''}
                {...(isEdit &&
                  registerInfo('ngaySinh', {
                    required: 'Ngày sinh không được để trống',
                  }))}
              />
              {errorsInfo.ngaySinh && (
                <p className="text-xs text-red-500">
                  {errorsInfo.ngaySinh.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label>Học vị</Label>
              <input
                className={`rounded-xl border-1 border-gray-200 ${isEdit ? `bg-gray-100` : null} px-3 py-1.5 text-[14px] shadow-lg ring-1 ring-blue-100 outline-none`}
                disabled={true}
                value={user.hocVi}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Khoa</Label>
              <input
                className={`rounded-xl border-1 border-gray-200 ${isEdit ? `bg-gray-100` : null} px-3 py-1.5 text-[14px] shadow-lg ring-1 ring-blue-100 outline-none`}
                disabled={true}
                value={user.khoa.ten}
              />
            </div>
          </div>
          <div className="m-3 flex justify-between gap-4 px-3 pb-2">
            <div>
              <ConfirmDisableAccount
                isDisable={isDisable}
                disableTaiKhoan={disableTaiKhoan}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                onClick={() => (isEdit ? handleCancelEdit() : setIsEdit(true))}
                variant={!isEdit ? 'primary' : 'danger'}
                className={`items-end text-xs font-extrabold md:text-[16px]`}
              >
                {isEdit ? 'Huỷ chỉnh sửa' : 'Chỉnh sửa'}
              </Button>
              {isEdit && (
                <Button
                  type="submit"
                  variant="primary"
                  className={`items-end text-xs font-extrabold md:text-[16px]`}
                >
                  {isEditing ? <SpinnerMini /> : 'Lưu thông tin'}
                </Button>
              )}
            </div>
          </div>
        </form>
        <div className="h-2/5 w-full flex-2/5 overflow-x-hidden rounded-lg border border-gray-300 shadow-lg">
          <div className="bg-gray-200 px-4 py-2">
            Thông tin tài khoản cá nhân:{' '}
            <p className="truncate font-semibold">{acc.tenDangNhap}</p>
          </div>
          <div className="flex flex-col gap-3 px-6 py-3">
            <div className="border-b-1 pb-1">
              <Label>Tài khoản</Label>
              <p className="truncate">{acc.tenDangNhap}</p>
            </div>
            <div className="flex flex-col border-b-1 pb-1">
              <Label>Mật khẩu</Label>
              <div className="flex items-center justify-between">
                <p>********</p>
                {!isChangePassword ? (
                  <button
                    type="button"
                    onClick={() => {
                      setIsChangePassword(true);
                      if (!isChangePassword) resetPassword();
                    }}
                    className={`font-montserrat items-end text-[13px] font-medium text-blue-500 hover:text-blue-700`}
                  >
                    Đổi mật khẩu
                  </button>
                ) : null}
              </div>
              {isChangePassword && (
                <form
                  className="mt-2 mb-4 w-full overflow-x-hidden rounded-lg border border-gray-300 py-1.5 pr-2 pl-4 shadow-lg"
                  onSubmit={handleSubmitPassword(onSubmitPassword)}
                >
                  <div className="flex items-end justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setIsChangePassword(false);
                        if (!isChangePassword) resetPassword();
                      }}
                      className="items-end justify-end text-end text-red-500 hover:text-red-600"
                    >
                      <TiDeleteOutline size={20} />
                    </button>
                  </div>
                  <div className="mb-3">
                    <Label htmlFor="matKhauHienTai">Mật khẩu hiện tại</Label>
                    <Input
                      id="matKhauHienTai"
                      name="matKhauHienTai"
                      type="password"
                      register={registerPasswordField}
                    />
                    {errorsPassword.matKhauHienTai && (
                      <p className="mt-1 text-xs text-red-500">
                        {errorsPassword.matKhauHienTai.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-3">
                    <Label htmlFor="matKhauMoi">Mật khẩu mới</Label>
                    <Input
                      id="matKhauMoi"
                      name="matKhauMoi"
                      type="password"
                      register={registerPasswordField}
                    />
                    {errorsPassword.matKhauMoi && (
                      <p className="mt-1 text-xs text-red-500">
                        {errorsPassword.matKhauMoi.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <Label htmlFor="matKhauMoiXacNhan">
                      Xác nhận mật khẩu mới
                    </Label>
                    <Input
                      id="matKhauMoiXacNhan"
                      name="matKhauMoiXacNhan"
                      type="password"
                      register={registerPasswordField}
                    />
                    {errorsPassword.matKhauMoiXacNhan && (
                      <p className="mt-1 text-xs text-red-500">
                        {errorsPassword.matKhauMoiXacNhan.message}
                      </p>
                    )}
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" variant="primary" className="text-sm">
                      {isUpdating ? <SpinnerMini /> : 'Đổi mật khẩu'}
                    </Button>
                  </div>
                </form>
              )}
            </div>
            <div className="border-b-1 pb-1">
              <Label>Vai trò</Label>
              <p>{acc.vaiTro}</p>
            </div>
            <div>
              <Label>Ngày tạo</Label>
              <p>{formatToVietnamDate(acc.ngayTao)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GiangVienMe;
