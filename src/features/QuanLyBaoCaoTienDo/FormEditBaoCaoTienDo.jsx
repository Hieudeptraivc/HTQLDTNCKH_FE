import { useForm } from 'react-hook-form';
import Input from '../../ui/Input';
import Label from '../../ui/Label';
import Button from '../../ui/Button';
import { useNavigate, useParams } from 'react-router-dom';
import SpinnerMini from '../../ui/SpinnerMini';
import Spinner from '../../ui/Spinner';
import { useAccount } from '../../auth/useAccount';
import {
  formatDateHour,
  formatToVietnamDate,
} from './../../utils/formatToVietNamDate';
import { useEditBaoCaoTienDo } from './useEditBaoCaoTienDo';
import { useCreateBaoCaoTienDo } from './useCreateBaoCaoTienDo';

function FormEditBaoCaoTienDo({ baoCaoTienDo = {} }) {
  const isEdit = Object.keys(baoCaoTienDo).length > 0;
  const navigate = useNavigate();
  const { deTaiId } = useParams();

  const { data, isPending } = useAccount();
  const { editBaoCaoTienDo, isEditing } = useEditBaoCaoTienDo();
  const { createBaoCaoTienDo, isCreating } = useCreateBaoCaoTienDo();

  const { register, handleSubmit } = useForm({
    defaultValues: isEdit
      ? {
          ten: baoCaoTienDo?.ten || '',
          trangThai: baoCaoTienDo?.trangThai || '',
          loaiBaoCao: baoCaoTienDo?.loaiBaoCao || '',
          ghiChu: baoCaoTienDo?.ghiChu || '',
          lanThu: baoCaoTienDo?.lanThu || 1,
          noiDungChinh: baoCaoTienDo?.noiDungChinh || '',
          hanNop: baoCaoTienDo?.hanNop ? baoCaoTienDo.hanNop.slice(0, 10) : '', // date input
        }
      : {},
  });

  if (isPending) return <Spinner />;

  const khoaId = data?.user?.khoa._id;
  function onSubmit(formData) {
    if (isEdit) {
      const { _id, ...editData } = baoCaoTienDo;
      editBaoCaoTienDo({
        baoCaoTienDoId: _id,
        editData: formData,
      });
    } else {
      const newData = {
        ...formData,
        deTai: deTaiId,
        khoa: khoaId,
      };
      createBaoCaoTienDo({ newData });
    }
  }
  //   console.log(baoCaoTienDo);
  return (
    <div className="gap-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
          }
        }}
      >
        <div className="grid grid-cols-2 gap-4 px-4 py-2">
          <div className="col-span-2 flex flex-col gap-2">
            <Label>Tên báo cáo</Label>
            <Input register={register} id="ten" name="ten" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Trạng thái</Label>
            <select
              {...register('trangThai')}
              id="trangThai"
              className="rounded-xl border-1 border-gray-200 px-3 py-1.5 text-[14px] shadow-lg ring-1 ring-blue-100 outline-none invalid:border-2 invalid:border-pink-500 focus:ring-2 focus:ring-blue-300"
            >
              {['Đã mở', 'Đã đóng'].map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Loại báo cáo</Label>
            <select
              {...register('loaiBaoCao')}
              id="loaiBaoCao"
              className="rounded-xl border-1 border-gray-200 px-3 py-1.5 text-[14px] shadow-lg ring-1 ring-blue-100 outline-none invalid:border-2 invalid:border-pink-500 focus:ring-2 focus:ring-blue-300"
            >
              {['Sơ bộ', 'Chi tiết', 'Cuối cùng'].map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Lần thứ</Label>
            <Input
              type="number"
              register={register}
              id="lanThu"
              name="lanThu"
            />
          </div>
          <div className="col-span-2 flex flex-col gap-2">
            <Label>Ghi chú</Label>
            <Input register={register} id="ghiChu" name="ghiChu" />
          </div>
          <div className="col-span-2 flex flex-col gap-2">
            <Label>Nội dung chính</Label>
            <textarea
              {...register('noiDungChinh')}
              id="noiDungChinh"
              rows="4"
              className="rounded-xl border-1 border-gray-200 px-3 py-1.5 text-[14px] shadow-lg ring-1 ring-blue-100 outline-none invalid:border-2 invalid:border-pink-500 focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Hạn nộp</Label>
            <Input type="date" register={register} id="hanNop" name="hanNop" />
          </div>
        </div>

        <div className="my-4 flex items-center justify-end gap-6 px-2 md:px-6">
          <Button
            variant="danger"
            onClick={() => navigate(-1)}
            className="w-36 text-xs font-extrabold md:text-[15px]"
          >
            {isEdit ? 'Hủy chỉnh sửa' : 'Hủy tạo'}
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={isEditing || isCreating}
            className="w-32 text-xs font-extrabold md:text-[15px]"
          >
            {isEditing || isCreating ? (
              <SpinnerMini />
            ) : isEdit ? (
              'Chỉnh sửa'
            ) : (
              'Tạo báo cáo'
            )}
          </Button>
        </div>

        {isEdit && (
          <div className="flex flex-col justify-between px-2 py-2">
            <p className="font-montserrat text-[13px] font-semibold">
              Ngày tạo:
              <span className="pl-1 text-xs font-medium text-gray-500">
                {formatDateHour(baoCaoTienDo?.ngayTao)}
              </span>
            </p>
            {baoCaoTienDo?.ngayChinhSuaCuoi ? (
              <p className="font-montserrat text-[13px] font-semibold">
                Lần chỉnh sửa cuối:{' '}
                <span className="pl-1 text-xs font-medium text-gray-500">
                  {formatDateHour(baoCaoTienDo.ngayChinhSuaCuoi)}
                </span>
              </p>
            ) : null}
          </div>
        )}
      </form>
    </div>
  );
}

export default FormEditBaoCaoTienDo;
