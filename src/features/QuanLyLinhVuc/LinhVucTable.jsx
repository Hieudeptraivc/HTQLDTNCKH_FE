import DataTable from '../../ui/DataTable';
import Spinner from '../../ui/Spinner';
import LinhVucRow from './LinhVucRow';
import { useDeleteLinhVuc } from './useDeleteLinhVuc';

function LinhVucTable({ allLinhVuc, count, isPending }) {
  const { isDeleting, deleteLinhVuc, deleteError, isDeleteError } =
    useDeleteLinhVuc();
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
      data={allLinhVuc}
      renderRow={(lv) => (
        <LinhVucRow
          key={lv._id}
          linhVuc={lv}
          isDeleting={isDeleting}
          deleteLinhVuc={deleteLinhVuc}
        />
      )}
    />
  );
}

export default LinhVucTable;
