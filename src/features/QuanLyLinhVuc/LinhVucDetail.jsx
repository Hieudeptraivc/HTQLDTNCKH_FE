import Label from '../../ui/Label';
import Button from '../../ui/Button';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../ui/Spinner';
import { useLinhVuc } from './useLinhVuc';
import { useDeleteLinhVuc } from './useDeleteLinhVuc';
import { DeleteLinhVuc } from './DeleteLinhVuc';
import ReadOnlyInput from '../../ui/ReadOnlyInput';

function LinhVucDetail() {
  const navigate = useNavigate();
  const { isPending, data, isError, error } = useLinhVuc();
  const { isDeleting, deleteLinhVuc, deleteError, isDeleteError } =
    useDeleteLinhVuc();
  if (isPending) return <Spinner />;
  if (isError) return <p>{error}</p>;
  const { data: linhVuc } = data;
  // console.log(linhVuc);
  return (
    <div className="items-center antialiased">
      <p className="font-poppins w-full text-xl font-semibold">
        Thông tin của lĩnh vực
      </p>
      <div className="font-poppins mt-4 flex flex-row gap-4">
        <div className="w-full overflow-x-hidden rounded-lg border border-gray-300 shadow-lg">
          <div className="flex w-full flex-row items-center justify-between bg-gray-200 px-4 py-2">
            <p className="flex gap-2">
              Thông tin lĩnh vực:{' '}
              <span className="font-semibold">{linhVuc.ten}</span>
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
              <ReadOnlyInput
                className={`rounded-xl border-1 border-gray-200 px-3 py-1.5 text-[14px] shadow-lg ring-1 ring-blue-100 outline-none`}
                disabled={true}
                value={linhVuc.ten}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Mô tả</Label>
              <textarea
                className="h-32 rounded-xl border-1 border-gray-200 px-3 py-1.5 text-[14px] shadow-lg ring-1 ring-blue-100 outline-none invalid:border-2 invalid:border-pink-500 focus:ring-2 focus:ring-blue-300"
                value={linhVuc.moTa}
                disabled={true}
                type="Multi-line text"
                id="moTa"
                name="moTa"
              />
            </div>
          </div>
          <div className="m-3 flex justify-end gap-4">
            <DeleteLinhVuc
              isDeleting={isDeleting}
              deleteLinhVuc={deleteLinhVuc}
              linhVucId={linhVuc._id}
            >
              Xóa lĩnh vực
            </DeleteLinhVuc>
            <Button
              onClick={() => navigate(`/admin/quan-ly-linh-vuc/${linhVuc._id}`)}
              variant="primary"
              className={`items-end text-xs font-extrabold md:text-[16px]`}
            >
              Chỉnh sửa
            </Button>
          </div>
        </div>
        <linhVucInformation linhVuc={linhVuc} />
      </div>
    </div>
  );
}

export default LinhVucDetail;
