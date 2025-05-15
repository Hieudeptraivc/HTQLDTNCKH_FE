import { useForm } from 'react-hook-form';
import Input from '../../ui/Input';
import Label from '../../ui/Label';
import Button from '../../ui/Button';
import SpinnerMini from '../../ui/SpinnerMini';
import { useNavigate } from 'react-router-dom';
import { useEditLinhVuc } from './useEditLinhVuc';
import { useCreateLinhVuc } from './useCreateLinhVuc';

function FormEditLinhVuc({ linhVuc = {} }) {
  const navigate = useNavigate();
  const { editLinhVuc, editError, isEditError, isEditing } = useEditLinhVuc();
  const { createLinhVuc, createError, isCreateError, isCreating } =
    useCreateLinhVuc();
  const isEdit = Object.keys(linhVuc).length > 0;

  const { register, handleSubmit } = useForm({
    defaultValues: linhVuc ? linhVuc : '',
  });
  function onSubmit(data) {
    // console.log(data);
    if (isEdit) {
      const { _id: linhVucId, deTai, ...rest } = data;
      editLinhVuc({ linhVucId, editData: rest });
    } else {
      createLinhVuc({ newData: data });
    }
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
          e.preventDefault();
        }
      }}
    >
      <div className="grid grid-cols-2 gap-6 px-6 py-4">
        <div className="flex flex-col gap-2">
          <Label>Tên</Label>
          <Input register={register} type="text" id="ten" name="ten" />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Mô tả</Label>
          <textarea
            className="h-32 rounded-xl border-1 border-gray-200 px-3 py-1.5 text-[14px] shadow-lg ring-1 ring-blue-100 outline-none invalid:border-2 invalid:border-pink-500 focus:ring-2 focus:ring-blue-300"
            {...register('moTa')}
            type="Multi-line text"
            id="moTa"
            name="moTa"
          />
        </div>
      </div>
      <div className="my-3 flex items-center justify-end gap-6 px-2 md:px-6">
        <Button
          variant="danger"
          onClick={() => navigate(-1)}
          className={`${isEdit ? 'w-2/10' : 'w-2/15'} text-xs font-extrabold md:text-[15px]`}
        >
          {isEdit ? 'Hủy chỉnh sửa' : 'Hủy tạo mới'}
        </Button>
        <Button
          variant="primary"
          type="submit"
          disabled={isEditing || isCreating}
          className={`${isEdit ? 'w-2/10' : 'w-2/15'} text-xs font-extrabold md:text-[15px]`}
        >
          {isEditing || isCreating ? (
            <SpinnerMini />
          ) : isEdit ? (
            'Lưu chỉnh sửa'
          ) : (
            'Lưu thông tin'
          )}
        </Button>
      </div>
    </form>
  );
}

export default FormEditLinhVuc;
