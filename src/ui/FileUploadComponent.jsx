import { useState, useRef } from 'react';
import { File, Upload, Check, X } from 'lucide-react';

function FileUploadComponent({ register, errors, required = true }) {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState('');
  const inputRef = useRef(null);
  const { ref, onChange, ...rest } = register('fileBaoCao', { required });

  // Handler for file change
  const handleFileChange = (e) => {
    onChange(e); // Pass to react-hook-form

    if (e.target.files?.[0]) {
      setFileName(e.target.files[0].name);
    } else {
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
      fileInput.files = e.dataTransfer.files;
      const event = new Event('change', { bubbles: true });
      fileInput.dispatchEvent(event);
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

  // Get file icon based on extension
  const getFileIcon = () => {
    if (!fileName) return null;

    const extension = fileName.split('.').pop().toLowerCase();

    switch (extension) {
      case 'pdf':
        return (
          <div className="text-red-500">
            <File size={24} />
          </div>
        );
      case 'doc':
      case 'docx':
        return (
          <div className="text-blue-500">
            <File size={24} />
          </div>
        );
      default:
        return (
          <div className="text-gray-500">
            <File size={24} />
          </div>
        );
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {required ? 'Tệp báo cáo mới' : 'Cập nhật tệp báo cáo (nếu cần)'}
      </label>

      <div
        className={`relative rounded-lg border-2 border-dashed p-4 transition-colors ${
          dragActive
            ? 'border-blue-400 bg-blue-50'
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
          accept=".pdf,.doc,.docx"
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
              {getFileIcon()}
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
                Kéo thả file vào đây hoặc
                <span className="ml-1 cursor-pointer text-blue-500 hover:text-blue-700">
                  chọn file
                </span>
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Hỗ trợ PDF, DOC, DOCX (tối đa 100MB)
              </p>
            </div>
          </div>
        )}
      </div>

      {errors?.fileBaoCao && (
        <p className="mt-1 text-xs text-red-500">
          {required ? 'Vui lòng chọn file báo cáo' : ''}
        </p>
      )}
    </div>
  );
}

export default FileUploadComponent;
