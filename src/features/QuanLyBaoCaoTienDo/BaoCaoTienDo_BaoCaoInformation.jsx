import { useParams } from 'react-router-dom';
import ReadOnlyInput from '../../ui/ReadOnlyInput';
import { formatToVietnamDate } from '../../utils/formatToVietNamDate';
import Button from '../../ui/Button';
import { useViewBaoCaoFile } from '../QuanLyBaoCao/useViewBaoCaoFile';
import SpinnerMini from '../../ui/SpinnerMini';
import { useDownloadBaoCao } from '../QuanLyBaoCao/useDownloadBaoCao';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateBaoCao } from '../QuanLyBaoCao/useCreateBaoCao';
// import { useUpdateBaoCao } from '../QuanLyBaoCao/useUpdateBaoCao';
import Input from '../../ui/Input';
import FileUploadComponent from '../../ui/FileUploadComponent';
import { useUpdateBaoCao } from '../QuanLyBaoCao/useUpdateBaoCao';
import Label from '../../ui/Label';
import { useDeleteBaoCao } from '../QuanLyBaoCao/useDeleteBaoCao';
import { LuCloudDownload, LuEye } from 'react-icons/lu';
import { Plus } from 'lucide-react';

function BaoCaoTienDo_BaoCaoInformation({
  baoCao,
  acc,
  fileInfo,
  truongNhom,
  trangThai,
}) {
  const { createBaoCao, isCreating } = useCreateBaoCao();
  const { updateBaoCao, isUpdating } = useUpdateBaoCao();
  const { isDeleting, deleteBaoCao } = useDeleteBaoCao();
  const { baoCaoTienDoId } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();
  const { viewBaoCao, isLoading } = useViewBaoCaoFile();
  const { downloadBaoCao, isDownloading } = useDownloadBaoCao();
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const data = baoCao && baoCao.length > 0 ? baoCao[0] : null;
  const trangThaiNop = baoCao && baoCao.length > 0 ? 'Đã nộp' : 'Chưa nộp';
  const isSubmitting = isCreating || isUpdating;

  // Hàm xem báo cáo
  const handleViewBaoCao = () => {
    viewBaoCao(
      { baoCaoId: data?._id },
      {
        onSuccess: ({ blob }) => {
          const url = URL.createObjectURL(blob);
          window.open(url);
        },
      },
    );
  };

  // Hàm tải xuống báo cáo
  const handleDownload = () => {
    downloadBaoCao(
      { baoCaoId: data?._id },
      {
        onSuccess: ({ blob, filename }) => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = filename || 'default_filename';
          a.click();
          URL.revokeObjectURL(url);
        },
      },
    );
  };

  const handleEdit = () => {
    setValue('ten', data?.ten || '');
    setIsEditing(true);
    setIsOpenForm(true);
  };

  const onSubmit = (formValues) => {
    const form = new FormData();
    form.append('ten', formValues.ten);

    if (formValues.fileBaoCao?.[0]) {
      form.append('fileBaoCao', formValues.fileBaoCao[0]);
    }

    if (isEditing && data?._id) {
      updateBaoCao(
        { baoCaoId: data._id, form },
        {
          onSuccess: () => {
            reset();
            setIsOpenForm(false);
            setIsEditing(false);
          },
        },
      );
    } else {
      // Chế độ tạo mới
      form.append('baoCaoTienDo', baoCaoTienDoId);

      createBaoCao(
        { form },
        {
          onSuccess: () => {
            reset();
            setIsOpenForm(false);
            // Có thể refetch danh sách báo cáo sau khi tạo
          },
        },
      );
    }
  };

  // Hàm đóng form và reset trạng thái
  const handleCloseForm = () => {
    setIsOpenForm(false);
    setIsEditing(false);
    reset();
  };

  const BaoCaoForm = () => (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-4 space-y-3 text-left"
    >
      <div>
        <Label className="block text-sm font-medium">Tên báo cáo</Label>
        <Input
          disabled={isSubmitting}
          type="text"
          name="ten"
          register={register}
          className="mt-1 w-full rounded-md border px-3"
          required
        />
      </div>

      {isSubmitting ? (
        <p className="text-center">Vui lòng đợi trong giây lát...</p>
      ) : (
        <FileUploadComponent
          register={register}
          errors={errors}
          required={!isEditing} // Chỉ bắt buộc khi tạo mới
        />
      )}

      {isEditing && (
        <p className="text-xs text-gray-500 italic">
          Chỉ tải lên file nếu bạn muốn thay đổi file báo cáo
        </p>
      )}

      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <SpinnerMini className="w-6" />
          ) : isEditing ? (
            'Cập nhật'
          ) : (
            'Gửi'
          )}
        </Button>
        <Button
          type="button"
          variant="danger"
          onClick={handleCloseForm}
          className="bg-gray-300 text-gray-800"
        >
          Hủy
        </Button>
      </div>
    </form>
  );

  console.log(baoCao);
  // Nếu chưa có báo cáo hoặc đang mở form chỉnh sửa
  if (!baoCao || baoCao.length === 0 || (isEditing && isOpenForm)) {
    return (
      <div className="font-montserrat flex h-full w-2/6 flex-col items-center gap-4 rounded-lg border border-gray-300 p-4 text-center font-medium text-gray-800 shadow-lg">
        {!baoCao || baoCao.length === 0 ? (
          <p>
            {(acc?.vaiTro === 'Cán bộ khoa' &&
              'Chưa có báo cáo để hiển thị.') ||
              (acc?.vaiTro === 'Admin' && 'Chưa có báo cáo để hiển thị.')}
            {acc?.vaiTro === 'Sinh viên' &&
              (trangThai !== 'Đã đóng'
                ? 'Nhóm của bạn chưa nộp báo cáo cho tiến độ này. Vui lòng nộp báo cáo trước hạn.'
                : 'Đã quá hạn nộp báo cáo. Không thể nộp báo cáo!')}
            {acc?.vaiTro === 'Giảng viên' &&
              'Sinh viên chưa nộp báo cáo. Chưa có báo cáo để hiển thị.'}
          </p>
        ) : (
          <p>Chỉnh sửa báo cáo</p>
        )}

        {truongNhom === acc?.nguoiDung && trangThai !== 'Đã đóng' ? (
          !isOpenForm ? (
            <Button onClick={() => setIsOpenForm(true)}>
              {!baoCao || baoCao.length === 0
                ? 'Nộp báo cáo'
                : 'Chỉnh sửa báo cáo'}
            </Button>
          ) : (
            <BaoCaoForm />
          )
        ) : null}
      </div>
    );
  }

  // Hiển thị thông tin báo cáo nếu có
  return (
    <div className="font-montserrat h-full w-2/6 rounded-lg border border-gray-300 bg-gray-100 shadow-md">
      {/* Header */}
      <div className="rounded-t-lg border-b border-gray-200 bg-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="font-semibold">Thông tin báo cáo</span>
          <span
            className={`font-montserrat rounded-full px-3 py-1 text-sm font-medium ${
              trangThaiNop === 'Đã nộp'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {trangThaiNop}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="space-y-4 p-4">
        <ReadOnlyInput label="Tên file báo cáo" value={data.ten} />
        <div className="flex flex-col gap-2">
          <ReadOnlyInput label="File báo cáo" value={fileInfo?.filename} />
          <div className="flex justify-end gap-2">
            <Button
              className="h-6 items-center bg-gray-400 text-xs text-[10px] hover:bg-gray-500"
              onClick={handleDownload}
            >
              {isDownloading ? (
                <SpinnerMini className="w-3" />
              ) : (
                <LuCloudDownload size={19} />
              )}
            </Button>
            <Button
              className="h-6 items-center bg-gray-400 text-xs text-[10px] hover:bg-gray-500"
              onClick={handleViewBaoCao}
            >
              {isLoading ? (
                <SpinnerMini className="w-3" />
              ) : (
                <LuEye size={19} />
              )}
            </Button>
          </div>
        </div>
        <ReadOnlyInput
          label="Ngày tạo"
          value={formatToVietnamDate(data.ngayTao)}
        />
        <ReadOnlyInput label="Tên sinh viên nộp" value={data.sinhVien?.ten} />
        <ReadOnlyInput label="Vai trò" value="Trưởng nhóm đề tài" />
        <ReadOnlyInput label="MSSV" value={data.sinhVien?.mssv} />
        <ReadOnlyInput label="Lớp" value={data.sinhVien?.lop} />
        <ReadOnlyInput label="Khoa" value={data.sinhVien?.khoa?.ten} />

        {/* Nút chỉnh sửa chỉ hiển thị khi người dùng là trưởng nhóm */}
        {truongNhom === acc?.nguoiDung && trangThai !== 'Đã đóng' && (
          <>
            <div className="flex justify-end gap-2">
              {!isOpenDelete ? (
                <Button
                  variant="danger"
                  className="h-8 items-center text-[15px]"
                  onClick={() => setIsOpenDelete(true)}
                >
                  Xóa báo cáo
                </Button>
              ) : (
                <Button
                  variant="danger"
                  className="h-8 items-center text-[15px]"
                  onClick={() => setIsOpenDelete(false)}
                >
                  Hủy thao tác
                </Button>
              )}
              <Button
                className="h-8 items-center text-[15px]"
                onClick={handleEdit}
              >
                Chỉnh sửa
              </Button>
            </div>
            {isOpenDelete ? (
              <div className="flex flex-col items-end">
                <p className="py-2 font-bold">
                  Bạn có muốn xóa báo cáo này? Việc này không thể hoàn tác
                </p>

                <Button
                  variant="danger"
                  disabled={isDeleting}
                  className="h-8 w-40 items-center text-[16px] font-bold"
                  onClick={() => deleteBaoCao({ baoCaoId: data._id })}
                >
                  {isDeleting ? <SpinnerMini /> : 'Xóa báo cáo'}
                </Button>
              </div>
            ) : null}
          </>
        )}
        {acc?.vaiTro === 'Cán bộ khoa' && (
          <>
            <div className="flex justify-end">
              {!isOpenDelete ? (
                <Button
                  variant="danger"
                  className="h-8 items-center text-[15px]"
                  onClick={() => setIsOpenDelete(true)}
                >
                  Xóa báo cáo
                </Button>
              ) : null}
            </div>
            {isOpenDelete ? (
              <div className="flex flex-col items-center text-center">
                <p className="py-1 font-bold">
                  Bạn có muốn xóa báo cáo này? Việc này không thể hoàn tác
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="danger"
                    className="h-8 w-34 items-center text-[15px]"
                    onClick={() => setIsOpenDelete(false)}
                  >
                    Hủy thao tác
                  </Button>
                  <Button
                    variant="primary"
                    disabled={isDeleting}
                    className="h-8 w-32 items-center text-[15px] font-bold"
                    onClick={() => deleteBaoCao({ baoCaoId: data._id })}
                  >
                    {isDeleting ? <SpinnerMini /> : 'Xóa báo cáo'}
                  </Button>
                </div>
              </div>
            ) : null}
          </>
        )}
      </div>
      {data.ngayChinhSuaCuoi ? (
        <div className="flex justify-between px-3 pb-1">
          <p className="font-montserrat text-[13px] font-semibold">
            Lần chỉnh sửa cuối:
            <span className="pl-1 text-xs font-medium text-gray-500">
              {new Date(data.ngayChinhSuaCuoi).toLocaleString('vi-VN')}
            </span>
          </p>
        </div>
      ) : null}
    </div>
  );
}

export default BaoCaoTienDo_BaoCaoInformation;
