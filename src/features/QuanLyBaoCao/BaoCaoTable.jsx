import DataTable from '../../ui/DataTable';
import Spinner from '../../ui/Spinner';
import BaoCaoRow from './BaoCaoRow';

import { useDeleteBaoCao } from './useDeleteBaoCao';

function BaoCaoTable({ allBaoCao, count, isPending }) {
  const { isDeleting, deleteBaoCao, deleteError, isDeleteError } =
    useDeleteBaoCao();
  // console.log(isPending);
  if (isPending) {
    return <Spinner className="border-gray-400 border-r-white" />;
  }
  const headers = [
    'Tên đề tài',
    '',
    'Tên báo cáo',
    '',
    'Tên sinh viên',
    '',
    'Trạng thái',
    'Loại báo cáo',
    'Ngày tạo',
  ];
  return (
    <DataTable
      layout="grid-cols-baoCao"
      footer={count}
      headers={headers}
      data={allBaoCao}
      renderRow={(bc) => (
        <BaoCaoRow
          key={bc._id}
          bc={bc}
          isDeleting={isDeleting}
          deletebaoCao={deleteBaoCao}
        />
      )}
    />
  );
}

export default BaoCaoTable;
