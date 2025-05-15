import Spinner from '../../ui/Spinner';
import DataTable from '../../ui/DataTable';
import { useDeleteTaiKhoan } from './useDeleteTaiKhoan';
import TaiKhoanRow from './TaiKhoanRow';

function TaiKhoanTable({ allTaiKhoan, count, isPending }) {
  const { isDeleting, deleteTaiKhoan } = useDeleteTaiKhoan();

  if (isPending) {
    return <Spinner className="border-gray-400 border-r-white" />;
  }

  const headers = [
    'Tên đăng nhập',
    'Trạng thái',
    'Khoa',
    '',
    'Vai trò',
    'Số điện thoại',
    'Ngày tạo',
  ];

  return (
    <DataTable
      layout="grid-cols-taiKhoan"
      footer={count}
      headers={headers}
      data={allTaiKhoan}
      renderRow={(tk) => (
        <TaiKhoanRow
          key={tk._id}
          tk={tk}
          isDeleting={isDeleting}
          deleteTaiKhoan={deleteTaiKhoan}
        />
      )}
    />
  );
}

export default TaiKhoanTable;
