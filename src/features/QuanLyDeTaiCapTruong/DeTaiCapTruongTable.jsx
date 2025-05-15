import Spinner from '../../ui/Spinner';
import DataTable from './../../ui/DataTable';
import DeTaiCapTruongRow from './DeTaiCapTruongRow';

function DeTaiCapTruongTable({ allDeTaiCapTruong, count, isPending, acc }) {
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
      data={allDeTaiCapTruong}
      renderRow={(dt) => <DeTaiCapTruongRow key={dt._id} dt={dt} />}
    />
  );
}

export default DeTaiCapTruongTable;
