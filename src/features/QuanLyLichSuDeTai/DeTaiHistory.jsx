import { useQuery } from '@tanstack/react-query';
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  FileEditIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  EyeIcon,
  ArrowLeftRightIcon,
  XIcon,
  SearchIcon,
  FilterIcon,
  CalendarRangeIcon,
  CheckCircleIcon,
  RefreshCwIcon,
} from 'lucide-react';
import { useState, useEffect } from 'react';

const apiUrl = import.meta.env.VITE_API_URL;

// ─────────────────────────────────────────
// API call helpers
const fetchHistoryList = async (deTaiId) => {
  const res = await fetch(`${apiUrl}/de-tai/lich-su/${deTaiId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Không thể lấy dữ liệu lịch sử');

  return await res.json();
};

const fetchHistoryDetail = async (historyId) => {
  const res = await fetch(`${apiUrl}/de-tai/lich-su/chi-tiet/${historyId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Không thể lấy chi tiết lịch sử');
  return await res.json();
};

// ─────────────────────────────────────────
// Helpers
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date);
};

// Badge component cho hiển thị thay đổi
const ChangeBadge = ({ type }) => {
  const styles = {
    'Thêm mới': 'bg-green-100 text-green-700 border-green-200',
    Xóa: 'bg-red-100 text-red-700 border-red-200',
    'Thay đổi vai trò': 'bg-blue-100 text-blue-700 border-blue-200',
    default: 'bg-gray-100 text-gray-700 border-gray-200',
  };

  const style = styles[type] || styles.default;

  return (
    <span
      className={`rounded-full border px-2 py-1 text-xs font-semibold ${style}`}
    >
      {type}
    </span>
  );
};

// Component hiển thị giá trị
const DisplayValue = ({ label, value }) => (
  <div className="mb-2">
    <span className="text-base font-semibold text-gray-900">{label}:</span>
    <span className="ml-2 w-full min-w-0 overflow-hidden text-[15px] break-words break-all whitespace-normal text-gray-800">
      {value || '(Không có)'}
    </span>
  </div>
);

// Component hiển thị mảng dữ liệu (sinh viên, giảng viên)
const DisplayArray = ({ title, array, displayFields }) => {
  if (!array || array.length === 0) {
    return (
      <div className="mb-4 text-base">
        <div className="mb-1 font-semibold text-gray-900">{title}</div>
        <div className="text-sm text-gray-700 italic">(Không có dữ liệu)</div>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <div className="mb-2 font-semibold text-gray-900">{title}</div>
      <div className="space-y-2">
        {array.map((item, index) => {
          return (
            <div key={index} className="rounded-2xl bg-white p-3 text-sm">
              {displayFields.map((field) => {
                const value = field.path
                  .split('.')
                  .reduce((obj, key) => obj?.[key], item);
                return value ? (
                  <div key={field.label} className="mb-1">
                    <span className="font-semibold text-gray-800">
                      {field.label}:
                    </span>{' '}
                    {value}
                  </div>
                ) : null;
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Component hiển thị thay đổi
const ChangeItem = ({ change }) => {
  console.log(change);
  // Xử lý hiển thị dựa trên loại thay đổi
  if (change.change) {
    // Thay đổi phức tạp (thêm/xóa/sửa người)
    return (
      <div className="mb-3 rounded-lg bg-gray-50 p-4 shadow-sm transition-all hover:shadow-md">
        <div className="mb-2 flex items-center justify-between">
          <h4 className="font-semibold text-gray-800">
            {change.field}{' '}
            <span className="ml-2">
              <ChangeBadge type={change.change} />
            </span>
          </h4>
        </div>
        {change.details && Array.isArray(change.details) ? (
          <ul className="ml-4 list-disc space-y-1 text-sm text-gray-800">
            {change.details.map((detail, idx) => (
              <li key={idx}>{detail}</li>
            ))}
          </ul>
        ) : (
          <div className="text-sm text-gray-800">{change.details}</div>
        )}
      </div>
    );
  } else {
    // Thay đổi giá trị đơn giản
    return (
      <div className="mb-3 rounded-lg bg-gray-50 p-4 shadow-sm transition-all hover:shadow-md">
        <h4 className="mb-2 font-semibold text-gray-800">{change.field}</h4>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-red-200 bg-red-100 p-3">
            <div className="mb-1 text-xs font-semibold text-red-600">
              Giá trị cũ:
            </div>
            <div className="w-full min-w-0 overflow-hidden break-words break-all whitespace-normal text-gray-800">
              {change.oldValue?.ten || change.oldValue || '(Không có)'}
            </div>
          </div>

          <div className="rounded-xl border border-green-200 bg-green-100 p-3">
            <div className="mb-1 text-xs font-semibold text-green-600">
              Giá trị mới:
            </div>
            <div className="w-full min-w-0 overflow-hidden break-words break-all whitespace-normal text-gray-800">
              {change.newValue?.ten || change.newValue || '(Không có)'}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

// ─────────────────────────────────────────
// Full Detail Modal
const FullDetailModal = ({ duLieuCu, duLieuMoi, onClose }) => {
  return (
    <div className="items-center justify-center rounded-lg bg-gray-50 p-4 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">Chi tiết đầy đủ</h2>
        <button
          onClick={onClose}
          className="rounded-full p-2 transition-colors hover:bg-gray-100"
        >
          <XIcon size={20} className="text-gray-500" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
        <div className="rounded-lg bg-red-50 shadow-sm">
          <div className="flex items-center rounded-t-lg bg-red-100 p-3 font-semibold text-red-700">
            <ArrowLeftRightIcon size={18} className="mr-2" />
            Dữ liệu cũ
          </div>

          <div className="p-4">
            <div className="mb-6">
              <h3 className="mb-3 flex items-center text-lg font-semibold text-gray-800">
                <div className="mr-2 rounded-full bg-gray-100 p-1">
                  <FileEditIcon size={16} className="text-gray-600" />
                </div>
                Thông tin cơ bản
              </h3>
              <div className="rounded-lg bg-gray-50 p-4">
                <DisplayValue label="Tên đề tài" value={duLieuCu.ten} />
                <DisplayValue label="Trạng thái" value={duLieuCu.trangThai} />
                <DisplayValue label="Đề tài cấp" value={duLieuCu.deTaiCap} />
                <DisplayValue
                  label="Trạng thái duyệt"
                  value={duLieuCu.trangThaiDuyet}
                />
                <DisplayValue label="Lĩnh vực" value={duLieuCu.linhVuc?.ten} />
                <DisplayValue label="Khoa" value={duLieuCu.khoa?.ten} />
              </div>
            </div>

            <div className="mb-6">
              <h3 className="mb-3 flex items-center text-lg font-semibold text-gray-800">
                <div className="mr-2 rounded-full bg-gray-100 p-1">
                  <FileEditIcon size={16} className="text-gray-600" />
                </div>
                Mô tả đề tài
              </h3>
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="mb-3">
                  <div className="mb-1 font-semibold text-gray-700">
                    Tính cấp thiết
                  </div>
                  <div className="w-full min-w-0 overflow-hidden rounded-2xl bg-white px-3 py-2 text-sm break-words break-all whitespace-normal">
                    {duLieuCu.tinhCapThiet || '(Không có)'}
                  </div>
                </div>

                <div className="mb-3">
                  <div className="mb-1 font-semibold text-gray-700">
                    Mục tiêu
                  </div>
                  <div className="w-full min-w-0 overflow-hidden rounded-2xl bg-white px-3 py-2 text-sm break-words break-all whitespace-normal">
                    {duLieuCu.mucTieu || '(Không có)'}
                  </div>
                </div>

                <div className="mb-1">
                  <div className="mb-1 font-semibold text-gray-700">
                    Nội dung chính
                  </div>
                  <div className="w-full min-w-0 overflow-hidden rounded-2xl bg-white px-3 py-2 text-sm break-words break-all whitespace-normal">
                    {duLieuCu.noiDungChinh || '(Không có)'}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="mb-3 flex items-center text-lg font-semibold text-gray-800">
                  <div className="mr-2 rounded-full bg-gray-100 p-1">
                    <UserIcon size={16} className="text-gray-600" />
                  </div>
                  Thành viên tham gia
                </h3>
                <div className="rounded-lg bg-gray-50 p-4">
                  <DisplayArray
                    title="Sinh viên"
                    array={duLieuCu.sinhVien}
                    displayFields={[
                      { label: 'Tên', path: 'sinhVienId.ten' },
                      { label: 'MSSV', path: 'sinhVienId.mssv' },
                      { label: 'Lớp', path: 'sinhVienId.lop' },
                      { label: 'Vai trò', path: 'vaiTro' },
                    ]}
                  />
                </div>
              </div>

              <div>
                <h3 className="mb-3 flex items-center text-lg font-semibold text-gray-800">
                  <div className="mr-2 rounded-full bg-gray-100 p-1">
                    <UserIcon size={16} className="text-gray-600" />
                  </div>
                  Giảng viên hướng dẫn
                </h3>
                <div className="rounded-lg bg-gray-50 p-4">
                  <DisplayArray
                    title="Giảng viên"
                    array={duLieuCu.giangVien}
                    displayFields={[
                      { label: 'Tên', path: 'giangVienId.ten' },
                      { label: 'Học vị', path: 'giangVienId.hocVi' },
                      { label: 'Vai trò', path: 'vaiTro' },
                    ]}
                  />
                </div>
              </div>
              <div>
                <h3 className="mb-3 flex items-center text-lg font-semibold text-gray-800">
                  <div className="mr-2 rounded-full bg-gray-100 p-1">
                    <UserIcon size={16} className="text-gray-600" />
                  </div>
                  Giảng viên hướng dẫn mong muốn
                </h3>
                <div className="rounded-lg bg-gray-50 p-4">
                  <DisplayArray
                    title="Giảng viên"
                    array={duLieuCu.giangVienMongMuon}
                    displayFields={[
                      { label: 'Tên', path: 'giangVienMongMuonId.ten' },
                      { label: 'Học vị', path: 'giangVienMongMuonId.hocVi' },
                      { label: 'Vai trò', path: 'vaiTro' },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-green-50 shadow-sm">
          <div className="flex items-center rounded-t-lg bg-green-100 p-3 font-semibold text-green-700">
            <ArrowLeftRightIcon size={18} className="mr-2" />
            Dữ liệu mới
          </div>

          <div className="p-4">
            <div className="mb-6">
              <h3 className="mb-3 flex items-center text-lg font-semibold text-gray-800">
                <div className="mr-2 rounded-full bg-gray-100 p-1">
                  <FileEditIcon size={16} className="text-gray-600" />
                </div>
                Thông tin cơ bản
              </h3>
              <div className="rounded-lg bg-gray-50 p-4">
                <DisplayValue label="Tên đề tài" value={duLieuMoi.ten} />
                <DisplayValue label="Trạng thái" value={duLieuMoi.trangThai} />
                <DisplayValue label="Đề tài cấp" value={duLieuMoi.deTaiCap} />
                <DisplayValue
                  label="Trạng thái duyệt"
                  value={duLieuMoi.trangThaiDuyet}
                />
                <DisplayValue label="Lĩnh vực" value={duLieuMoi.linhVuc?.ten} />
                <DisplayValue label="Khoa" value={duLieuMoi.khoa?.ten} />
              </div>
            </div>

            <div className="mb-6">
              <h3 className="mb-3 flex items-center text-lg font-semibold text-gray-800">
                <div className="mr-2 rounded-full bg-gray-100 p-1">
                  <FileEditIcon size={16} className="text-gray-600" />
                </div>
                Mô tả đề tài
              </h3>
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="mb-3">
                  <div className="mb-1 font-semibold text-gray-700">
                    Tính cấp thiết
                  </div>
                  <div className="w-full min-w-0 overflow-hidden rounded-2xl bg-white px-3 py-2 text-sm break-words break-all whitespace-normal">
                    {duLieuMoi.tinhCapThiet || '(Không có)'}
                  </div>
                </div>

                <div className="mb-3">
                  <div className="mb-1 font-semibold text-gray-700">
                    Mục tiêu
                  </div>
                  <div className="w-full min-w-0 overflow-hidden rounded-2xl bg-white px-3 py-2 text-sm break-words break-all whitespace-normal">
                    {duLieuMoi.mucTieu || '(Không có)'}
                  </div>
                </div>

                <div className="mb-1">
                  <div className="mb-1 font-semibold text-gray-700">
                    Nội dung chính
                  </div>
                  <div className="w-full min-w-0 overflow-hidden rounded-2xl bg-white px-3 py-2 text-sm break-words break-all whitespace-normal">
                    {duLieuMoi.noiDungChinh || '(Không có)'}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="mb-3 flex items-center text-lg font-semibold text-gray-800">
                  <div className="mr-2 rounded-full bg-gray-100 p-1">
                    <UserIcon size={16} className="text-gray-600" />
                  </div>
                  Thành viên tham gia
                </h3>
                <div className="rounded-lg bg-gray-50 p-4">
                  <DisplayArray
                    title="Sinh viên"
                    array={duLieuMoi.sinhVien}
                    displayFields={[
                      { label: 'Tên', path: 'sinhVienId.ten' },
                      { label: 'MSSV', path: 'sinhVienId.mssv' },
                      { label: 'Lớp', path: 'sinhVienId.lop' },
                      { label: 'Vai trò', path: 'vaiTro' },
                    ]}
                  />
                </div>
              </div>

              <div>
                <h3 className="mb-3 flex items-center text-lg font-semibold text-gray-800">
                  <div className="mr-2 rounded-full bg-gray-100 p-1">
                    <UserIcon size={16} className="text-gray-600" />
                  </div>
                  Giảng viên hướng dẫn
                </h3>
                <div className="rounded-lg bg-gray-50 p-4">
                  <DisplayArray
                    title="Giảng viên"
                    array={duLieuMoi.giangVien}
                    displayFields={[
                      { label: 'Tên', path: 'giangVienId.ten' },
                      { label: 'Học vị', path: 'giangVienId.hocVi' },
                      { label: 'Vai trò', path: 'vaiTro' },
                    ]}
                  />
                </div>
              </div>
              <div>
                <h3 className="mb-3 flex items-center text-lg font-semibold text-gray-800">
                  <div className="mr-2 rounded-full bg-gray-100 p-1">
                    <UserIcon size={16} className="text-gray-600" />
                  </div>
                  Giảng viên hướng dẫn mong muốn
                </h3>
                <div className="rounded-lg bg-gray-50 p-4">
                  <DisplayArray
                    title="Giảng viên"
                    array={duLieuMoi.giangVienMongMuon}
                    displayFields={[
                      { label: 'Tên', path: 'giangVienMongMuonId.ten' },
                      { label: 'Học vị', path: 'giangVienMongMuonId.hocVi' },
                      { label: 'Vai trò', path: 'vaiTro' },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────
// HistoryChanges Component
const HistoryChanges = ({ historyId, animation = true }) => {
  const [showFullDetail, setShowFullDetail] = useState(false);
  const { data, isLoading, error } = useQuery({
    queryKey: ['historyDetail', historyId],
    queryFn: () => fetchHistoryDetail(historyId),
    enabled: !!historyId,
  });

  if (isLoading)
    return (
      <div className="flex justify-center py-4">
        <div className="flex items-center space-x-2 text-blue-600">
          <RefreshCwIcon size={20} className="animate-spin" />
          <span>Đang tải chi tiết...</span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
        <div className="flex items-center">
          <XIcon size={20} className="mr-2" />
          Lỗi: {error.message}
        </div>
      </div>
    );

  const { duLieuCu, duLieuMoi, thayDoi } = data?.data || {};
  const hasChanges = thayDoi && thayDoi.length > 0;

  return (
    <div className={`px-4 py-3 ${animation ? 'animate-fadeIn' : ''}`}>
      {!hasChanges ? (
        <div className="flex items-center rounded-lg border bg-yellow-50 p-4 text-yellow-700">
          <EyeIcon size={18} className="mr-2" />
          Không tìm thấy thông tin chi tiết về các thay đổi.
        </div>
      ) : (
        <div>
          <div className="mb-4 flex justify-end">
            <button
              onClick={() => setShowFullDetail(true)}
              className="flex items-center rounded-lg bg-blue-50 px-2 py-2 text-sm font-semibold text-blue-600 shadow-sm transition-colors hover:bg-blue-100"
            >
              <EyeIcon size={18} className="mr-2" />
              Xem chi tiết đầy đủ
            </button>
          </div>

          <div className="space-y-2">
            {thayDoi.map((change, index) => (
              <ChangeItem key={index} change={change} />
            ))}
          </div>
        </div>
      )}

      {showFullDetail && (
        <FullDetailModal
          duLieuCu={duLieuCu}
          duLieuMoi={duLieuMoi}
          onClose={() => setShowFullDetail(false)}
        />
      )}
    </div>
  );
};

// ─────────────────────────────────────────
// HistoryList Component
const HistoryListItem = ({ item, isSelected, onSelect }) => {
  //   console.log(item);
  return (
    <div
      className={`border-l-4 transition-all duration-200 ${
        isSelected
          ? 'border-l-blue-500 bg-blue-50'
          : 'border-l-transparent hover:bg-gray-50'
      }`}
    >
      <div
        className="flex cursor-pointer items-center justify-between p-4"
        onClick={onSelect}
      >
        <div className="flex items-start space-x-3">
          <div
            className={`mt-1 rounded-full ${
              isSelected ? 'bg-blue-200' : 'bg-blue-100'
            } p-2`}
          >
            <FileEditIcon size={18} className="text-blue-600" />
          </div>
          <div>
            <div className="font-semibold text-gray-800">{item.ghiChu}</div>
            <div className="mt-1 flex items-center gap-3">
              <div className="flex items-center text-sm text-gray-600">
                <UserIcon size={15} className="mr-1" />
                <span>
                  {item.nguoiThayDoi?.ten} (
                  {item.loaiNguoiDung === 'SinhVien'
                    ? 'Sinh viên'
                    : 'Cán bộ khoa'}
                  )
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <CalendarIcon size={14} className="mr-1" />
                <span>{formatDate(item.thoiGianThayDoi)}</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          {isSelected ? (
            <ChevronUpIcon size={20} className="text-gray-500" />
          ) : (
            <ChevronDownIcon size={20} className="text-gray-500" />
          )}
        </div>
      </div>
    </div>
  );
};

const HistoryList = ({ deTaiId, selectedHistoryId, onSelectHistory }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading, error } = useQuery({
    queryKey: ['historyList', deTaiId],
    queryFn: () => fetchHistoryList(deTaiId),
    enabled: !!deTaiId,
  });

  // Filter history based on search term
  const filteredHistory =
    data?.data?.lichSuDeTai?.filter(
      (item) =>
        item.ghiChu.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.nguoiThayDoi?.ten
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        item.loaiNguoiDung.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || [];

  if (isLoading)
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex flex-col items-center space-y-2">
          <RefreshCwIcon size={24} className="animate-spin text-blue-600" />
          <span className="text-gray-600">Đang tải dữ liệu lịch sử...</span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-600">
        <div className="flex items-center justify-center">
          <XIcon size={22} className="mr-2" />
          <span>Lỗi: {error.message}</span>
        </div>
      </div>
    );

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      {/* Search bar */}
      <div className="bg-white px-3 py-4">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon size={16} className="text-gray-700" />
          </div>
          <input
            type="text"
            className="block w-full rounded-xl border-1 border-gray-200 bg-gray-50 py-2 pr-4 pl-10 text-[14px] ring-1 ring-blue-100 outline-none invalid:border-2 invalid:border-pink-500 focus:ring-2 focus:ring-blue-300"
            placeholder="Tìm kiếm lịch sử..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* History list */}
      {filteredHistory.length === 0 ? (
        <div className="flex flex-col items-center p-8 text-center text-gray-500">
          <FileEditIcon size={48} className="mb-3 text-gray-300" />
          <span className="text-lg">
            {searchTerm
              ? 'Không tìm thấy lịch sử phù hợp'
              : 'Không có lịch sử thay đổi nào'}
          </span>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="mt-2 flex items-center text-sm text-blue-600 hover:underline"
            >
              <RefreshCwIcon size={14} className="mr-1" />
              Xóa bộ lọc
            </button>
          )}
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {filteredHistory.map((item) => (
            <div key={item.id}>
              <HistoryListItem
                item={item}
                isSelected={selectedHistoryId === item.id}
                onSelect={() =>
                  onSelectHistory(
                    selectedHistoryId === item.id ? null : item.id,
                  )
                }
              />

              {selectedHistoryId === item.id && (
                <div className="border-t border-gray-100 bg-white">
                  <HistoryChanges historyId={item.id} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────
// Export component tổng hợp
export const DeTaiHistory = ({ deTaiId }) => {
  const [selectedHistoryId, setSelectedHistoryId] = useState(null);

  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="font-montserrat items-center justify-between px-4">
        <h2 className="flex items-center pb-4 text-xl font-bold text-gray-800">
          <CalendarRangeIcon size={22} className="mr-2 text-blue-600" />
          Lịch sử thay đổi đề tài
        </h2>
        <HistoryList
          deTaiId={deTaiId}
          selectedHistoryId={selectedHistoryId}
          onSelectHistory={setSelectedHistoryId}
        />
      </div>
    </div>
  );
};

// Adding new HistoryModalContent component to integrate with your modal system
export const HistoryModalContent = ({ deTaiId, onCloseModal }) => {
  return <DeTaiHistory deTaiId={deTaiId} onCloseModal={onCloseModal} />;
};
