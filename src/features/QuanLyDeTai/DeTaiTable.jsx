import Spinner from '../../ui/Spinner';
import DataTable from './../../ui/DataTable';
import { useDeleteDeTai } from './useDeleteDeTai';
import DeTaiRow from './DeTaiRow';

function DeTaiTable({ allDeTai, count, isPending, acc }) {
  const { isDeleting, deleteDeTai } = useDeleteDeTai();
  // console.log(isPending);
  if (isPending) {
    return <Spinner className="border-gray-400 border-r-white" />;
  }
  const headers = [
    'Tên',
    '',
    'Trạng thái duyệt',
    'Trạng thái',
    acc?.vaiTro !== 'Admin' ? 'Trưởng nhóm' : 'Khoa',
    'Lĩnh vực',
    '',
    'Năm học',
  ];
  return (
    <DataTable
      layout="grid-cols-deTai"
      footer={count}
      headers={headers}
      data={allDeTai}
      renderRow={(dt) => (
        <DeTaiRow
          key={dt._id}
          dt={dt}
          isDeleting={isDeleting}
          deleteDeTai={deleteDeTai}
        />
      )}
    />
  );
}

export default DeTaiTable;
