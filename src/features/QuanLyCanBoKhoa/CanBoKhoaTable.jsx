import Spinner from '../../ui/Spinner';

import DataTable from '../../ui/DataTable';
import { useDeleteCanBoKhoa } from './useDeleteCanBoKhoa';
import CanBoKhoaRow from './CanBoKhoaRow';

function CanBoKhoaTable({ allCanBoKhoa, count, isPending }) {
  const { isDeleting, deleteCanBoKhoa } = useDeleteCanBoKhoa();

  if (isPending) {
    return <Spinner className="border-gray-400 border-r-white" />;
  }

  const headers = [
    'Tên',
    '',
    'Trạng thái',
    'Khoa',
    '',
    'Email',
    '',
    'Số điện thoại',
    'Ngày tạo',
  ];

  return (
    <DataTable
      layout="grid-cols-canBoKhoa"
      footer={count}
      headers={headers}
      data={allCanBoKhoa}
      renderRow={(cbk) => (
        <CanBoKhoaRow
          key={cbk._id}
          cbk={cbk}
          isDeleting={isDeleting}
          deleteCanBoKhoa={deleteCanBoKhoa}
        />
      )}
    />
  );
}

export default CanBoKhoaTable;
