import { formatToVietnamDate } from '../../utils/formatToVietNamDate';
import Label from '../../ui/Label';

function SinhVienAccounInformation({ taiKhoan = {} }) {
  if (!taiKhoan) return null;
  return (
    <div className="flex flex-col gap-3 px-6 py-3">
      <div className="border-b-1 pb-1">
        <Label>Tài khoản</Label>
        <p className="">{taiKhoan.tenDangNhap}</p>
      </div>
      <div className="border-b-1 pb-1">
        <Label>Mật khẩu</Label>
        <p>********</p>
      </div>
      <div className="border-b-1 pb-1">
        <Label>Vai trò</Label>
        <p>{taiKhoan.vaiTro}</p>
      </div>
      <div>
        <Label>Ngày tạo</Label>
        <p>{formatToVietnamDate(taiKhoan.ngayTao)}</p>
      </div>
    </div>
  );
}

export default SinhVienAccounInformation;
