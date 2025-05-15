import DataTable from '../../ui/DataTable';
import Spinner from '../../ui/Spinner';
import SinhVienRow from './SinhVienRow';
import { useDeleteSinhVien } from './useDeleteSinhVien';

function SinhVienTable({ allSinhVien, count, isPending }) {
  const { isDeleting, deleteSinhVien, deleteError, isDeleteError } =
    useDeleteSinhVien();
  // console.log(isPending);
  if (isPending) {
    return <Spinner className="border-gray-400 border-r-white" />;
  }
  const headers = [
    'Tên',
    'Mã số sinh viên',
    'Trạng thái',
    'Email',
    'Lớp',
    'Ngày tạo',
  ];
  return (
    <DataTable
      layout="grid-cols-sinhVien"
      footer={count}
      headers={headers}
      data={allSinhVien}
      renderRow={(sv) => (
        <SinhVienRow
          key={sv._id}
          sv={sv}
          isDeleting={isDeleting}
          deleteSinhVien={deleteSinhVien}
        />
      )}
    />
  );
}

export default SinhVienTable;
