import { FaCheck } from 'react-icons/fa';
import { useDsGiangVien } from '../QuanLyGiangVien/useDsGiangVien';
import { useDsSinhVien } from '../QuanLySinhVien/useDsSinhVien';
import Search from '../../ui/Search';
import Pagination from '../../ui/Pagination';
import Spinner from '../../ui/Spinner';
import { useDeTaiContext } from './DeTaiProvider';
import { useQueryClient } from '@tanstack/react-query';

function FormCreateAttendant() {
  const queryClient = useQueryClient();
  const accountData = queryClient.getQueryData(['account']);
  const { acc } = accountData;
  const {
    sinhViens,
    isEditTv,
    addSinhVien,
    addGiangVien,
    addGiangVienMongMuon,
    giangViens,
    giangVienMongMuons,
  } = useDeTaiContext();
  const {
    isPending: isLoadingDsGiangVien,
    dsGiangVien,
    countGiangVien,
  } = useDsGiangVien();
  const {
    isPending: isLoadingDsSinhVien,
    dsSinhVien,
    countSinhVien,
  } = useDsSinhVien();
  //   console.log(dsGiangVien);
  if (!isEditTv) return null;
  return (
    <div className="flex flex-col gap-12">
      {/* Danh sách Sinh viên */}
      <div>
        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          Danh sách Sinh viên
        </h2>
        <Search
          placeholder="Tìm kiếm theo tên và mã số sinh viên"
          filterField="keywordSv"
        />

        <div className="font-montserrat mt-4 overflow-x-auto rounded-lg border border-gray-200 shadow-xl">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-gray-200 font-bold">
              <tr>
                <th className="px-6 py-4 text-left text-gray-700">Tên</th>
                <th className="px-6 py-4 text-left text-gray-700">
                  Mã số sinh viên
                </th>
                <th className="px-6 py-4 text-left text-gray-700">Lớp</th>
                <th className="px-6 py-4 text-left text-gray-700">Khoa</th>
                <th className="px-6 py-4 text-center text-gray-700">Chọn</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 font-medium">
              {isLoadingDsSinhVien ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-gray-500">
                    <Spinner className="border-gray-300 border-r-white" />
                  </td>
                </tr>
              ) : dsSinhVien?.length > 0 ? (
                dsSinhVien.map((sv) => (
                  <tr key={sv._id} className="hover:bg-gray-50">
                    <td className="px-6 py-3">{sv.ten}</td>
                    <td className="px-6 py-3">{sv.mssv}</td>
                    <td className="px-6 py-3">{sv.lop}</td>
                    <td title={sv.khoa?.ten} className="truncate px-6 py-3">
                      {sv.khoa?.ten}
                    </td>
                    <td className="px-6 py-3 text-center">
                      <button
                        onClick={() =>
                          addSinhVien({ ...sv, vaiTro: 'Thành viên' })
                        }
                        disabled={sinhViens.some(
                          (svien) => svien._id === sv._id,
                        )}
                        className={`inline-flex items-center ${sinhViens.some((svien) => svien._id === sv._id) ? 'bg-blue-500 text-white' : ''} gap-2 rounded border border-blue-200 px-3 py-1 font-semibold text-blue-400 ring-1 hover:bg-blue-500 hover:text-blue-50`}
                      >
                        <FaCheck />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Không có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {countSinhVien > 0 && (
            <div className="flex justify-center">
              <Pagination count={countSinhVien} filterField="pageSv" />
            </div>
          )}
        </div>
      </div>

      {/* Danh sách Giảng viên */}
      <div>
        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          Danh sách Giảng viên
        </h2>
        <Search
          placeholder="Tìm kiếm theo tên và số điện thoại"
          filterField="keywordGv"
        />

        <div className="font-montserrat mt-4 overflow-x-auto rounded-lg border border-gray-200 shadow-xl">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-gray-200 font-bold">
              <tr>
                <th className="px-6 py-4 text-left text-gray-700">Tên</th>
                <th className="px-6 py-4 text-left text-gray-700">Email</th>
                <th className="px-6 py-4 text-left text-gray-700">
                  Số điện thoại
                </th>
                <th className="px-6 py-4 text-left text-gray-700">Khoa</th>
                <th className="px-6 py-4 text-center text-gray-700">Chọn</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 font-medium">
              {isLoadingDsGiangVien ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    <Spinner className="border-gray-300 border-r-white" />
                  </td>
                </tr>
              ) : dsGiangVien?.length > 0 ? (
                dsGiangVien.map((gv) => (
                  <tr key={gv._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{gv.ten}</td>
                    <td
                      title={gv.taiKhoan?.email}
                      className="truncate px-6 py-4"
                    >
                      {gv.taiKhoan?.email}
                    </td>
                    <td className="px-6 py-4">{gv.soDienThoai}</td>
                    <td title={gv.khoa?.ten} className="truncate px-6 py-4">
                      {gv.khoa?.ten}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => {
                          if (acc?.vaiTro === 'Sinh viên') {
                            addGiangVienMongMuon({
                              ...gv,
                              vaiTro: 'Giảng viên hướng dẫn phụ',
                            });
                          } else {
                            addGiangVien({
                              ...gv,
                              vaiTro: 'Giảng viên hướng dẫn phụ',
                            });
                          }
                        }}
                        disabled={
                          acc?.vaiTro === 'Cán bộ khoa'
                            ? giangViens.some((gvien) => gvien._id === gv._id)
                            : giangVienMongMuons.some(
                                (gvienmm) => gvienmm._id === gv._id,
                              )
                        }
                        className={`inline-flex items-center ${
                          acc?.vaiTro === 'Cán bộ khoa' &&
                          giangViens.some((gvien) => gvien._id === gv._id)
                            ? 'bg-blue-500 text-white'
                            : ''
                        } ${
                          acc?.vaiTro === 'Sinh viên' &&
                          giangVienMongMuons.some(
                            (gvienmm) => gvienmm._id === gv._id,
                          )
                            ? 'bg-blue-500 text-white'
                            : ''
                        } gap-2 rounded border border-blue-200 px-3 py-1 font-semibold text-blue-400 ring-1 hover:bg-blue-500 hover:text-blue-50`}
                      >
                        <FaCheck />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Không có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {countGiangVien > 0 && (
            <div className="flex justify-center">
              <Pagination count={countGiangVien} filterField="pageGv" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FormCreateAttendant;
