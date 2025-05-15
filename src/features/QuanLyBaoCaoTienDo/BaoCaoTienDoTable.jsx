import Spinner from '../../ui/Spinner';
import DataTable from './../../ui/DataTable';
import { useDeleteBaoCaoTienDo } from './useDeleteBaoCaoTienDo';
import BaoCaoTienDoRow from './BaoCaoTienDoRow';

function BaoCaoTienDoTable({ allBaoCaoTienDo, count, isPending }) {
  const { isDeleting, deleteBaoCaoTienDo, deleteError, isDeleteError } =
    useDeleteBaoCaoTienDo();
  // console.log(isPending);
  if (isPending) {
    return <Spinner className="border-gray-400 border-r-white" />;
  }
  const headers = [
    'Tên',
    'Trạng thái',
    'Trạng thái nộp',
    'Loại báo cáo',
    'Lần thứ',
    'Ngày tạo',
    'Hạn nộp',
  ];
  return (
    <DataTable
      layout="grid-cols-baoCaoTienDo"
      footer={count}
      headers={headers}
      data={allBaoCaoTienDo}
      renderRow={(bctd) => (
        <BaoCaoTienDoRow
          key={bctd._id}
          bctd={bctd}
          isDeleting={isDeleting}
          deleteBaoCaoTienDo={deleteBaoCaoTienDo}
        />
      )}
    />
  );
}

export default BaoCaoTienDoTable;
