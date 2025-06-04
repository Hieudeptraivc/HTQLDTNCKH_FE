import { BiTrash } from 'react-icons/bi';
import Button from '../../ui/Button';
import Label from '../../ui/Label';
import { useDeTaiContext } from './DeTaiProvider';

function MemberInformation({ acc, type = 'edit' }) {
  const {
    sinhViens,
    isEditTv,
    setIsEditTv,
    giangViens,
    giangVienMongMuons,
    removeSinhVien,
    removeGiangVien,
    removeGiangVienMongMuon,
    changeRoleSinhVien,
    changeRoleGiangVien,
    changeRoleGiangVienMongMuon,
    saveOriginalState,
    resetToOriginal,
  } = useDeTaiContext();

  const handleCancelEdit = () => {
    resetToOriginal();
  };

  const handleSave = () => {
    saveOriginalState();
  };

  return (
    <div className="font-montserrat flex h-[706px] w-full flex-col rounded-lg border-1 border-gray-300 shadow-lg">
      {/* Header cố định */}
      <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-lg bg-gray-200 px-2 py-2">
        <p className="text-[18px] font-bold">Thành viên tham gia đề tài</p>
        {!isEditTv ? (
          type !== 'view' ? (
            <Button
              variant="primary"
              onClick={() => setIsEditTv(true)}
              className="text-[14px] font-semibold"
            >
              Thêm/Chỉnh sửa
            </Button>
          ) : null
        ) : (
          <Button
            variant="danger"
            onClick={handleCancelEdit}
            className="text-[14px] font-semibold"
          >
            Hủy chỉnh sửa
          </Button>
        )}
      </div>

      {/* Nội dung cuộn */}
      <div className="flex-1 overflow-y-auto px-4 py-5">
        {/* Phần Sinh viên tham gia đề tài */}
        {sinhViens.length > 0 ? (
          <div className="flex flex-col">
            <p className="text-[16px] font-semibold">
              Sinh viên tham gia đề tài
            </p>
            <div className="mt-4 flex flex-col gap-3">
              {sinhViens?.map((sv, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 rounded-lg border border-gray-200 p-3 shadow-sm ${
                    isEditTv ? 'hover:bg-gray-50' : ''
                  }`}
                >
                  <span className="w-6 text-center font-semibold text-gray-600">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold">{sv?.ten}</p>
                    <p className="text-sm text-gray-500">{sv?.mssv}</p>
                    <p className="text-sm text-gray-500">{sv?.khoa?.ten}</p>
                  </div>
                  <div className="flex flex-col gap-1 text-right text-[13px] font-medium text-gray-700">
                    <Label className="pr-1">Vai trò</Label>
                    <select
                      disabled={!isEditTv}
                      value={sv.vaiTro}
                      onChange={(e) =>
                        changeRoleSinhVien(sv._id, e.target.value)
                      }
                      className="w-full appearance-none rounded-xl border-1 border-gray-200 px-3 py-1.5 text-[14px] shadow-xs ring-1 ring-blue-100 outline-none invalid:border-2 invalid:border-pink-500 focus:ring-2 focus:ring-blue-300"
                      name="vaiTro"
                      id="vaiTro"
                    >
                      <option value="Trưởng nhóm">Trưởng nhóm</option>
                      <option value="Thành viên">Thành viên</option>
                    </select>
                  </div>
                  {type !== 'view' && isEditTv && (
                    <button
                      disabled={!isEditTv}
                      onClick={() => removeSinhVien(sv._id)}
                    >
                      <BiTrash
                        className={`text-red-600 ${isEditTv ? 'hover:text-red-800' : ''}`}
                        size="20"
                      />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* Phần Giảng viên mong muốn tham gia đề tài */}
        {giangVienMongMuons.length > 0 && (
          <div className="mt-6 flex flex-col">
            <p className="text-[16px] font-semibold">
              Giảng viên mong muốn tham gia đề tài
            </p>
            <div className="mt-4 flex flex-col gap-3">
              {giangVienMongMuons.map((gv, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 rounded-lg border border-gray-200 p-3 shadow-sm ${
                    isEditTv ? 'hover:bg-gray-50' : ''
                  }`}
                >
                  <span className="w-6 text-center font-semibold text-gray-600">
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{gv?.ten}</p>
                    <p className="text-sm break-words text-gray-500">
                      {gv?.taiKhoan?.email || 'N/A'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {gv?.khoa?.ten || 'N/A'}
                    </p>
                  </div>
                  <div className="flex w-36 flex-shrink-0 flex-col text-right text-[13px] font-medium text-gray-700">
                    <Label className="pr-1">Vai trò</Label>
                    <select
                      disabled={!isEditTv}
                      value={gv.vaiTro}
                      onChange={(e) =>
                        changeRoleGiangVienMongMuon(gv._id, e.target.value)
                      }
                      className="w-full appearance-none truncate rounded-xl border-1 border-gray-200 px-2 py-1.5 text-[14px] ring-1 ring-blue-100 outline-none invalid:border-2 invalid:border-pink-500 focus:ring-2 focus:ring-blue-300"
                      name="vaiTro"
                      id="vaiTro"
                    >
                      <option value="Giảng viên hướng dẫn chính">
                        Giảng viên chính
                      </option>
                      <option value="Giảng viên hướng dẫn phụ">
                        Giảng viên phụ
                      </option>
                    </select>
                  </div>
                  {type !== 'view' && isEditTv && (
                    <button
                      disabled={!isEditTv}
                      onClick={() => removeGiangVienMongMuon(gv._id)}
                    >
                      <BiTrash
                        className={`text-red-600 ${isEditTv ? 'hover:text-red-800' : ''}`}
                        size="20"
                      />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Phần Giảng viên chính thức tham gia đề tài */}
        {giangViens.length > 0 && (
          <div className="mt-6 flex flex-col">
            <p className="text-[16px] font-semibold">
              Giảng viên chính thức tham gia đề tài
            </p>
            <div className="mt-4 flex flex-col gap-3">
              {giangViens.map((gv, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 rounded-lg border border-gray-200 p-3 shadow-sm ${
                    isEditTv ? 'hover:bg-gray-50' : ''
                  }`}
                >
                  <span className="w-6 text-center font-semibold text-gray-600">
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{gv?.ten}</p>
                    <p className="text-sm break-words text-gray-500">
                      {gv?.taiKhoan?.email || 'N/A'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {gv?.khoa?.ten || 'N/A'}
                    </p>
                  </div>
                  <div className="flex w-36 flex-shrink-0 flex-col text-right text-[13px] font-medium text-gray-700">
                    <Label className="pr-1">Vai trò</Label>
                    <select
                      disabled={
                        (acc?.vaiTro === 'Cán bộ khoa' && !isEditTv) ||
                        ((acc?.vaiTro === 'Sinh viên' ||
                          acc?.vaiTro === 'Admin') &&
                          true)
                      }
                      value={gv.vaiTro}
                      onChange={(e) =>
                        changeRoleGiangVien(gv._id, e.target.value)
                      }
                      className="w-full appearance-none truncate rounded-xl border-1 border-gray-200 px-2 py-1.5 text-[14px] ring-1 ring-blue-100 outline-none invalid:border-2 invalid:border-pink-500 focus:ring-2 focus:ring-blue-300"
                      name="vaiTro"
                      id="vaiTro"
                    >
                      <option value="Giảng viên hướng dẫn chính">
                        Giảng viên chính
                      </option>
                      <option value="Giảng viên hướng dẫn phụ">
                        Giảng viên phụ
                      </option>
                    </select>
                  </div>
                  {type !== 'view' && isEditTv && (
                    <button
                      disabled={
                        acc?.vaiTro === 'Cán bộ khoa' ? !isEditTv : true
                      }
                      onClick={() => removeGiangVien(gv._id)}
                    >
                      <BiTrash
                        className={`text-red-600 ${isEditTv ? 'hover:text-red-800' : ''}`}
                        size="20"
                      />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {isEditTv ? (
        <div className="sticky bottom-0 z-10 flex items-center justify-end rounded-b-lg bg-gray-200 px-2 py-1">
          <Button
            onClick={handleSave}
            className="w-24 text-[14px] font-semibold"
          >
            Lưu
          </Button>
        </div>
      ) : null}
    </div>
  );
}

export default MemberInformation;
