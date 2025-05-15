import { formatToVietnamDate } from '../utils/formatToVietNamDate';
import Label from './Label';

function UserInformation({ nguoiDung = {} }) {
  if (!nguoiDung) return null;
  // console.log(nguoiDung);
  return (
    <div className="flex flex-col gap-3 px-6 py-3">
      <div className="border-b-1 pb-1">
        <Label>Tên chủ tài khoản</Label>
        <p className="">{nguoiDung.ten}</p>
      </div>

      {nguoiDung.hocLuc || nguoiDung.hocVi ? (
        <div className="border-b-1 pb-1">
          <Label>{nguoiDung.hocLuc ? 'Học lực' : 'Học vị'}</Label>
          <p>{nguoiDung.hocLuc || nguoiDung.hocVi}</p>
        </div>
      ) : null}
      <div>
        <Label>Ngày sinh</Label>
        <p>{formatToVietnamDate(nguoiDung.ngaySinh)}</p>
      </div>
    </div>
  );
}

export default UserInformation;
