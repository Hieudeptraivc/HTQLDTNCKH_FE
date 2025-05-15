import { LuCloudDownload, LuEye } from 'react-icons/lu';
import Button from '../../ui/Button';
import ReadOnlyInput from '../../ui/ReadOnlyInput';
import SpinnerMini from '../../ui/SpinnerMini';
import { useDownloadBaoCao } from './useDownloadBaoCao';
import { useViewBaoCaoFile } from './useViewBaoCaoFile';
import Label from '../../ui/Label';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useUpdateBaoCao } from './useUpdateBaoCao';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import Input from '../../ui/Input';
import FileUploadComponent from '../../ui/FileUploadComponent';

function FormEditBaoCao({ baoCao, fileInfo }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();
  const [isEditing, setIsEditing] = useState(false);
  const { updateBaoCao, isUpdating } = useUpdateBaoCao();
  const { viewBaoCao, isLoading } = useViewBaoCaoFile();
  const { downloadBaoCao, isDownloading } = useDownloadBaoCao();
  const accountData = queryClient.getQueryData(['account']);
  const { acc } = accountData;

  const { sinhVien, baoCaoTienDo, ngayTao, _id, ten } = baoCao;

  // Thiết lập giá trị mặc định cho form khi báo cáo được tải
  useEffect(() => {
    if (baoCao) {
      setValue('ten', ten);
    }
  }, [baoCao, setValue]);

  const handleViewBaoCao = () => {
    viewBaoCao(
      { baoCaoId: _id },
      {
        onSuccess: ({ blob }) => {
          const url = URL.createObjectURL(blob);
          window.open(url);
        },
      },
    );
  };

  const handleDownload = () => {
    downloadBaoCao(
      { baoCaoId: _id },
      {
        onSuccess: ({ blob, filename }) => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = filename;
          a.click();
          URL.revokeObjectURL(url);
        },
      },
    );
  };

  //Hành động onsubmit
  const onSubmit = (formValues) => {
    const form = new FormData();
    form.append('ten', formValues.ten);

    if (formValues.fileBaoCao?.[0]) {
      form.append('fileBaoCao', formValues.fileBaoCao[0]);
    }
    updateBaoCao(
      { baoCaoId: _id, form },
      {
        onSuccess: () => {
          setIsEditing(false);
          queryClient.invalidateQueries(['baoCao', _id]);
        },
      },
    );
  };

  // Hàm đóng form và reset trạng thái
  const handleCloseForm = () => {
    setIsEditing(false);
    reset({
      ten: ten,
    });
  };

  // Hàm bắt đầu chỉnh sửa
  const handleStartEditing = () => {
    setIsEditing(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 px-6 py-4 md:grid-cols-2">
        <ReadOnlyInput label="Tên sinh viên" value={sinhVien?.ten} />
        <ReadOnlyInput label="MSSV" value={sinhVien?.mssv} />
        <ReadOnlyInput label="Lớp" value={sinhVien?.lop} />
        <ReadOnlyInput
          label="Ngày tạo"
          value={new Date(ngayTao).toLocaleString('vi-VN')}
        />

        {!isEditing ? (
          <>
            <ReadOnlyInput label="Tên báo cáo" value={baoCao?.ten} />
            <ReadOnlyInput
              label="Tên báo cáo tiến độ"
              value={baoCaoTienDo?.ten}
            />
            <ReadOnlyInput
              label="Trạng thái báo cáo"
              value={baoCaoTienDo?.trangThai}
            />
            <ReadOnlyInput
              label="Loại báo cáo"
              value={baoCaoTienDo?.loaiBaoCao}
            />
            <ReadOnlyInput label="Lần thứ" value={baoCaoTienDo?.lanThu} />
            <div className="flex flex-col gap-1">
              <Label>File báo cáo</Label>
              <div className="font-poppins flex-col gap-1 overflow-y-auto rounded-xl border-1 border-gray-200 bg-gray-50 px-2 py-1.5 text-[14px] font-[400px] break-words whitespace-pre-wrap shadow-lg ring-1 ring-blue-100 outline-none invalid:border-2 invalid:border-pink-500 focus:ring-2 focus:ring-blue-300">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-poppins max-h-48 overflow-y-auto rounded-xl px-3 py-1.5 text-[14px] font-[400px] break-words whitespace-pre-wrap">
                    {fileInfo.filename || 'Chưa có dữ liệu'}
                  </p>
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      className="h-8 items-center bg-gray-400 text-xs hover:bg-gray-500"
                      onClick={handleDownload}
                    >
                      {isDownloading ? (
                        <SpinnerMini />
                      ) : (
                        <LuCloudDownload size={19} />
                      )}
                    </Button>
                    <Button
                      className="h-8 items-center bg-gray-400 text-xs hover:bg-gray-500"
                      onClick={handleViewBaoCao}
                    >
                      {isLoading ? <SpinnerMini /> : <LuEye size={19} />}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="col-span-2 space-y-4 text-left"
          >
            <div>
              <Label className="block text-sm font-medium">Tên báo cáo</Label>
              <Input
                disabled={isUpdating}
                type="text"
                name="ten"
                register={register}
                className="mt-1 w-full rounded-md border px-3"
                required
                defaultValue={baoCao?.ten}
              />
            </div>

            <div>
              <Label>File báo cáo hiện tại</Label>
              <p className="mb-2 text-sm text-gray-600">
                {fileInfo.filename || 'Chưa có dữ liệu'}
              </p>

              {isUpdating ? (
                <p className="text-center">Vui lòng đợi trong giây lát...</p>
              ) : (
                <FileUploadComponent
                  register={register}
                  errors={errors}
                  required={false}
                />
              )}

              <p className="mt-1 text-xs text-gray-500 italic">
                Chỉ tải lên file nếu bạn muốn thay đổi file báo cáo
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="danger"
                onClick={handleCloseForm}
                className="text-[15px]"
                disabled={isUpdating}
              >
                Hủy
              </Button>
              <Button
                type="submit"
                className="text-[15px]"
                disabled={isUpdating}
              >
                {isUpdating ? <SpinnerMini /> : 'Lưu thay đổi'}
              </Button>
            </div>
          </form>
        )}
      </div>

      {baoCao?.sinhVien._id === acc.nguoiDung &&
      baoCao?.baoCaoTienDo.trangThai !== 'Đã đóng' &&
      !isEditing ? (
        <div className="mx-7 mt-2 mb-6 flex items-end justify-end gap-4">
          <Button
            variant="danger"
            onClick={() => navigate(-1)}
            className="text-[15px]"
          >
            Hủy chỉnh sửa
          </Button>
          <Button className="text-[15px]" onClick={handleStartEditing}>
            Chỉnh sửa
          </Button>
        </div>
      ) : null}
    </>
  );
}

export default FormEditBaoCao;
