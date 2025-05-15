import DataTable from '../../ui/DataTable';
import Spinner from '../../ui/Spinner';
import KhoaRow from './KhoaRow';
import { useDeleteKhoa } from './useDeleteKhoa';

function KhoaTable({ allKhoa, count, isPending }) {
  const { isDeleting, deleteKhoa, deleteError, isDeleteError } =
    useDeleteKhoa();
  // console.log(isPending);
  if (isPending) {
    return <Spinner className="border-gray-400 border-r-white" />;
  }
  const headers = ['Tên', 'Mô tả'];
  return (
    <DataTable
      layout="grid-cols-khoa"
      footer={count}
      headers={headers}
      data={allKhoa}
      renderRow={(khoa) => (
        <KhoaRow
          key={khoa._id}
          khoa={khoa}
          isDeleting={isDeleting}
          deleteKhoa={deleteKhoa}
        />
      )}
    />
  );
}

export default KhoaTable;
