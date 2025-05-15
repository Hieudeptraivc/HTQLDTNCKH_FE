import Button from '../../ui/Button';
import Label from '../../ui/Label';

function FormCreateRoleInDeTai({
  giangVien = [],
  giangVienMongMuon = [],
  sinhVien = [],
}) {
  // console.log(giangVien, giangVienMongMuon, sinhVien);

  return (
    <div className="font-montserrat flex-col gap-6 overflow-x-hidden rounded-lg border border-gray-300 shadow-lg">
      <div className="flex items-center justify-between bg-gray-200 px-2 py-2">
        <p className="text-[18px] font-bold">Thành viên tham gia đề tài</p>
        <Button className="w-2/6 text-[12px]">Thêm/Chỉnh sửa</Button>
      </div>
      {/* Phần Sinh viên tham gia đề tài */}
      {sinhVien.length > 0 ? (
        <div className="flex flex-col px-4 pb-5">
          <p className="text-[16px] font-semibold">Sinh viên tham gia đề tài</p>
          <div className="mt-4 flex flex-col gap-3">
            {sinhVien?.map((sv, index) => (
              <div
                key={index}
                className="flex items-center gap-4 rounded-lg border border-gray-200 p-3 shadow-sm hover:bg-gray-50"
              >
                <span className="w-8 text-center font-semibold text-gray-600">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <p className="font-semibold">{sv?.ten}</p>
                  <p className="text-sm text-gray-500">{sv?.mssv}</p>
                  <p className="text-sm text-gray-500">{sv?.khoa.ten}</p>
                </div>
                <div className="w-32 text-right text-[13px] font-medium text-gray-700">
                  <Label>Vai trò</Label>
                  <select
                    className="rounded-xl border-1 border-gray-200 px-3 py-1.5 text-[14px] shadow-lg"
                    name="vaiTro"
                    id="vaiTro"
                  >
                    <option value="Trưởng nhóm">Tú Tài</option>
                    <option value="Thành viên">Cử Nhân</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* Phần Giảng viên mong muốn tham gia đề tài */}
      {giangVienMongMuon.length > 0 ? (
        <div className="flex flex-col px-4 pb-5">
          <p className="text-[16px] font-semibold">
            Giảng viên mong muốn tham gia đề tài
          </p>
          <div className="mt-4 flex flex-col gap-3">
            {giangVienMongMuon?.map((gv, index) => (
              <div
                key={index}
                className="flex items-center gap-4 rounded-lg border border-gray-200 p-3 shadow-sm hover:bg-gray-50"
              >
                <span className="w-8 text-center font-semibold text-gray-600">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <p className="font-semibold">{gv?.giangVienMongMuonId.ten}</p>
                  <p className="text-sm text-gray-500">
                    {gv?.giangVienMongMuonId.taiKhoan.email}
                  </p>
                  <p className="text-sm text-gray-500">
                    {gv?.giangVienMongMuonId.khoa.ten}
                  </p>
                </div>
                <span className="w-32 text-right text-[13px] font-medium text-gray-700">
                  {gv?.vaiTro}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* Phần Giảng viên chính thức tham gia đề tài */}
      {giangVien.length > 0 ? (
        <div className="flex flex-col px-4 pb-5">
          <p className="text-[16px] font-semibold">
            Giảng viên chính thức tham gia đề tài
          </p>
          <div className="mt-4 flex flex-col gap-3">
            {giangVien?.map((gv, index) => (
              <div
                key={index}
                className="flex items-center gap-4 rounded-lg border border-gray-200 p-3 shadow-sm hover:bg-gray-50"
              >
                <span className="w-8 text-center font-semibold text-gray-600">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <p className="font-semibold">{gv.ten}</p>
                  <p className="text-sm text-gray-500">{gv?.taiKhoan.email}</p>
                  <p className="text-sm text-gray-500">{gv?.khoa.ten}</p>
                </div>
                <div className="w-32 text-right text-[13px] font-medium text-gray-700">
                  <Label>Vai trò</Label>
                  <select
                    className="rounded-xl border-1 border-gray-200 px-3 py-1.5 text-[14px] shadow-lg"
                    name="vaiTro"
                    id="vaiTro"
                  >
                    <option value="Giảng viên hướng dẫn chính">
                      Giảng viên hướng dẫn chính
                    </option>
                    <option value="Giảng viên hướng dẫn phụ">
                      Giảng viên hướng dẫn phụ
                    </option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default FormCreateRoleInDeTai;
