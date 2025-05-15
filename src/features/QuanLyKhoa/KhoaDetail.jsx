import Label from '../../ui/Label';
import Button from '../../ui/Button';

import { useNavigate } from 'react-router-dom';
import Spinner from '../../ui/Spinner';
import { useDeleteKhoa } from './useDeleteKhoa';
import { useKhoa } from './useKhoa';
import { DeleteKhoa } from './DeleteKhoa';
import KhoaInformation from './KhoaInformation';

function KhoaDetail() {
  const navigate = useNavigate();
  const { isPending, data, isError, error } = useKhoa();
  const { isDeleting, deleteKhoa, deleteError, isDeleteError } =
    useDeleteKhoa();
  if (isPending) return <Spinner />;
  if (isError) return <p>{error}</p>;
  const { data: khoa } = data;
  // console.log(khoa);
  return (
    <div className="items-center antialiased">
      <p className="font-poppins w-full text-xl font-semibold">
        Thông tin của khoa
      </p>
      <div className="font-poppins mt-4 flex flex-row gap-4">
        <div className="w-full overflow-x-hidden rounded-lg border border-gray-300 shadow-lg">
          <div className="flex w-full flex-row items-center justify-between bg-gray-200 px-4 py-2">
            <p className="flex gap-2">
              Thông tin cán bộ:{' '}
              <span className="font-semibold">{khoa.ten}</span>
            </p>
            <Button
              variant="secondary"
              onClick={() => navigate(-1)}
              className={'text-[13.5px]'}
            >
              &larr; Trở về
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-6 px-6 py-4">
            <div className="flex flex-col gap-2">
              <Label>Tên</Label>
              <input
                className={`rounded-xl border-1 border-gray-200 px-3 py-1.5 text-[14px] shadow-lg ring-1 ring-blue-100 outline-none`}
                disabled={true}
                value={khoa.ten}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Khoa</Label>
              <textarea
                className="h-32 rounded-xl border-1 border-gray-200 px-3 py-1.5 text-[14px] shadow-lg ring-1 ring-blue-100 outline-none invalid:border-2 invalid:border-pink-500 focus:ring-2 focus:ring-blue-300"
                value={khoa.moTa}
                disabled={true}
                type="Multi-line text"
                id="moTa"
                name="moTa"
              />
            </div>
          </div>
          <div className="m-3 flex justify-end gap-4">
            <DeleteKhoa
              isDeleting={isDeleting}
              deleteKhoa={deleteKhoa}
              canBoKhoaId={khoa._id}
            >
              Xóa cán bộ khoa
            </DeleteKhoa>
            <Button
              onClick={() => navigate(`/admin/quan-ly-khoa/${khoa._id}`)}
              variant="primary"
              className={`items-end text-xs font-extrabold md:text-[16px]`}
            >
              Chỉnh sửa
            </Button>
          </div>
        </div>
        <KhoaInformation khoa={khoa} />
      </div>
    </div>
  );
}

export default KhoaDetail;
