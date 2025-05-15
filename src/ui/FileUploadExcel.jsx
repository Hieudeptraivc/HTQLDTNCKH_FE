import { useState, useRef } from 'react';
import { FileSpreadsheet, Upload, Check, X } from 'lucide-react';
import toast from 'react-hot-toast';

function FileUploadExcel({
  register,
  errors,
  required = true,
  resource = 'sinh viên',
}) {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState('');
  const inputRef = useRef(null);
  const { ref, onChange, ...rest } = register('fileBaoCao', { required });

  // Handler for file change
  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      // Create a FileList-like object that react-hook-form can handle
      const fileValue = Object.create(e.target.files);
      // Make sure the onChange passes the complete file object
      onChange({
        target: {
          name: e.target.name,
          value: fileValue,
          files: e.target.files,
        },
      });
      setFileName(e.target.files[0].name);
    } else {
      onChange({
        target: {
          name: e.target.name,
          value: null,
          files: null,
        },
      });
      setFileName('');
    }
  };

  // Handlers for drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // Handler for drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const fileInput = inputRef.current;
      // Check if the file extension is valid
      const fileName = e.dataTransfer.files[0].name;
      const extension = fileName.split('.').pop().toLowerCase();

      if (['xlsx', 'xls'].includes(extension)) {
        fileInput.files = e.dataTransfer.files;
        // Manually trigger our handleFileChange function instead of relying on event bubbling
        handleFileChange({
          target: {
            name: fileInput.name,
            files: e.dataTransfer.files,
          },
        });
      } else {
        toast.error('Chỉ chấp nhận file Excel (.xlsx, .xls)');
      }
    }
  };

  // Handler for clearing selected file
  const handleClearFile = () => {
    const fileInput = inputRef.current;
    fileInput.value = '';
    setFileName('');
    const event = new Event('change', { bubbles: true });
    fileInput.dispatchEvent(event);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {required
          ? `File Excel danh sách ${resource}`
          : 'Cập nhật file danh sách (nếu cần)'}
      </label>

      <div
        className={`relative rounded-lg border-2 border-dashed p-4 transition-colors ${
          dragActive
            ? 'border-green-400 bg-green-50'
            : 'border-gray-300 hover:border-gray-400'
        } ${errors?.fileBaoCao ? 'border-red-500' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
          accept=".xlsx,.xls"
          ref={(e) => {
            ref(e);
            inputRef.current = e;
          }}
          onChange={handleFileChange}
          {...rest}
        />

        {fileName ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="text-green-500">
                <FileSpreadsheet size={24} />
              </div>
              <span className="max-w-32 truncate text-sm">{fileName}</span>
              <span className="flex flex-shrink-0 items-center rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800">
                <Check size={12} className="mr-1" />
                Đã chọn
              </span>
            </div>
            <button
              type="button"
              onClick={handleClearFile}
              className="text-gray-500 hover:text-red-500"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="p-4 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-2">
              <p className="text-sm font-medium text-gray-900">
                Kéo thả file Excel vào đây hoặc
                <span className="ml-1 cursor-pointer text-blue-500 hover:text-blue-700">
                  chọn file
                </span>
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Hỗ trợ Excel (.xlsx, .xls) - Vui lòng theo đúng mẫu
              </p>
            </div>
          </div>
        )}
      </div>

      {errors?.fileBaoCao && (
        <p className="mt-1 text-xs text-red-500">
          {required ? 'Vui lòng chọn file Excel danh sách sinh viên' : ''}
        </p>
      )}
    </div>
  );
}

export default FileUploadExcel;
