import DataTable from '../../ui/DataTable';
import Spinner from '../../ui/Spinner';
import { useDeleteGiangVien } from './useDeleteGiangVien';
import GiangVienRow from './GiangVienRow';

function GiangVienTable({ allGiangVien, count, isPending }) {
  const { isDeleting, deleteGiangVien } = useDeleteGiangVien();
  // console.log(isPending);
  if (isPending) {
    return <Spinner className="border-gray-400 border-r-white" />;
  }
  const headers = [
    'Tên',
    'Học vị',
    'Trạng thái',
    'Email',
    '',
    'Số địện thoại',
    'Ngày tạo',
  ];
  return (
    <DataTable
      layout="grid-cols-giangVien"
      footer={count}
      headers={headers}
      data={allGiangVien}
      renderRow={(gv) => (
        <GiangVienRow
          key={gv._id}
          gv={gv}
          isDeleting={isDeleting}
          deleteGiangVien={deleteGiangVien}
        />
      )}
    />
  );
}

export default GiangVienTable;
