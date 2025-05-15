import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  FileSpreadsheet,
  CheckCircle,
  AlertCircle,
  Download,
  Loader2,
} from 'lucide-react';
import FileUploadExcel from '../../ui/FileUploadExcel';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateThongBao } from '../QuanLyThongBao/useCreateThongBao';

const apiUrl = import.meta.env.VITE_API_URL;

const ImportGiangVienForm = () => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [downloadTemplate, setDownloadTemplate] = useState(false);
  const { createThongBao } = useCreateThongBao();
  const accountData = queryClient.getQueryData(['account']);
  const { user, acc } = accountData;
  // Cleanup result when component unmounts
  useEffect(() => {
    return () => setResult(null);
  }, []);

  const onSubmit = async (data) => {
    // Kiểm tra xem data.fileBaoCao có tồn tại và có chứa file hay không
    if (!data.fileBaoCao || !data.fileBaoCao[0]) {
      toast.error('Vui lòng chọn file Excel.');
      return;
    }

    const formData = new FormData();
    formData.append('file', data.fileBaoCao[0]); // Truy cập file đầu tiên trong mảng files
    formData.append('userType', 'giangvien');

    setUploading(true);
    try {
      const response = await fetch(`${apiUrl}/import/gv-sv`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      const res = await response.json();

      if (res.status === 'success') {
        const giangVienIdArr = res.created.map((sv) => sv?.giangVien._id);
        createThongBao({
          message: `${acc.vaiTro} ${user.ten} vừa tạo mới bạn.`,
          giangViens: giangVienIdArr,
        });
        queryClient.invalidateQueries(['sinhviens']);
        toast.success(`Đã import thành công ${res.results} giảng viên`);
      } else {
        toast.error('Import không thành công', res?.message);
      }

      setResult(res);
    } catch (err) {
      console.error('Lỗi upload:', err);
      toast.error('Đã xảy ra lỗi khi upload.');
    } finally {
      setUploading(false);
    }
  };

  const handleDownloadTemplate = () => {
    setDownloadTemplate(true);
    // Giả lập download template
    setTimeout(() => {
      setDownloadTemplate(false);
      toast.success('Đã tải xuống mẫu Excel');
    }, 1000);
    window.location.href = `${apiUrl}/public/template/giangvien/temp-giang-vien.xlsx`;
  };

  const handleReset = () => {
    reset();
    setResult(null);
  };

  return (
    <div className="font-montserrat rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 bg-gray-50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileSpreadsheet className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-medium text-gray-800">
              Import danh sách giảng viên
            </h2>
          </div>
          <button
            type="button"
            onClick={handleDownloadTemplate}
            className="flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
            disabled={downloadTemplate}
          >
            {downloadTemplate ? (
              <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
            ) : (
              <Download className="mr-1.5 h-4 w-4" />
            )}
            Tải mẫu Excel
          </button>
        </div>
      </div>

      <div className="p-5">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-700">
              <p className="font-medium">Lưu ý:</p>
              <ul className="mt-1 list-disc space-y-1 pl-5">
                <li>File phải là định dạng Excel (.xlsx)</li>
                <li>
                  Các trường bắt buộc: Tên, Email, Số điện thoại, Học vị, Ngày
                  sinh.
                </li>
                <li>Email phải đúng định dạng và không trùng lặp</li>
                <li>Email sẽ được sử dụng làm tên đăng nhập</li>
                <li>
                  File phải đúng định dạng thông tin các trường như file mẫu.
                </li>
              </ul>
            </div>

            <FileUploadExcel
              resource="giảng viên"
              register={register}
              errors={errors}
              required={true}
            />
          </div>

          <div className="flex items-center justify-end space-x-3">
            {result && (
              <button
                type="button"
                onClick={handleReset}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                Nhập file mới
              </button>
            )}

            <button
              type="submit"
              disabled={uploading}
              className="flex items-center rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-600 disabled:bg-blue-400"
            >
              {uploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {uploading ? 'Đang xử lý...' : 'Import giảng viên'}
            </button>
          </div>
        </form>

        {result && (
          <div className="mt-6 rounded-lg border border-gray-200">
            <div className="border-b border-gray-200 bg-gray-50 p-3">
              <h3 className="font-medium text-gray-700">Kết quả import</h3>
            </div>

            <div className="p-4">
              <div className="mb-4 flex items-center space-x-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <p className="font-medium">
                  Đã tạo thành công {result.results} giảng viên
                </p>
              </div>

              {result.created && result.created.length > 0 && (
                <div className="mb-5">
                  <h4 className="mb-2 font-medium text-gray-700">
                    Danh sách giảng viên đã tạo:
                  </h4>
                  <div className="max-h-60 overflow-y-auto rounded-md border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                            Họ tên
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                            Email
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                            Số điện thoại
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                            Học vị
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                            Khoa
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {result.created.map((item, index) => (
                          <tr
                            key={index}
                            className={
                              index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                            }
                          >
                            <td className="px-4 py-2 text-sm text-gray-900">
                              {item.giangVien.ten}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-900">
                              {item.taiKhoan.email}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-900">
                              {item.giangVien.soDienThoai}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-900">
                              {item.giangVien.hocVi}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-900">
                              {item.giangVien.khoa?.ten || '-'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {result.errors && result.errors.length > 0 && (
                <div>
                  <div className="mb-2 flex items-center space-x-2 text-amber-600">
                    <AlertCircle className="h-5 w-5" />
                    <p className="font-medium">
                      Có {result.errors.length} dòng lỗi
                    </p>
                  </div>

                  <div className="max-h-60 overflow-y-auto rounded-md border border-amber-200 bg-amber-50">
                    <table className="min-w-full">
                      <thead className="bg-amber-100">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium tracking-wider text-amber-800 uppercase">
                            Dòng
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium tracking-wider text-amber-800 uppercase">
                            Lỗi
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium tracking-wider text-amber-800 uppercase">
                            Dữ liệu
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-amber-200">
                        {result.errors.map((err, idx) => (
                          <tr key={idx}>
                            <td className="px-4 py-2 text-sm font-medium text-amber-800">
                              {err.row}
                            </td>
                            <td className="px-4 py-2 text-sm text-amber-800">
                              {err.error}
                            </td>
                            <td className="px-4 py-2 text-sm text-amber-700">
                              {err.userData && (
                                <div className="font-mono text-xs">
                                  {Object.entries(err.userData).map(
                                    ([key, value], i) => (
                                      <div key={i}>
                                        <span className="font-medium">
                                          {key}:
                                        </span>{' '}
                                        {value?.toString().slice(0, 30)}
                                        {value?.toString().length > 30
                                          ? '...'
                                          : ''}
                                      </div>
                                    ),
                                  )}
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-4 text-sm text-gray-600">
                    <p>Vui lòng kiểm tra lại các dòng lỗi và thử import lại.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImportGiangVienForm;
