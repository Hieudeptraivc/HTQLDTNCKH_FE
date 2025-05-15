import { useState } from 'react';
import { FaFileImport, FaPenAlt } from 'react-icons/fa';
import FormEditGiangVien from './FormEditGiangVien';
import ImportGiangVienForm from './ImportGiangVienForm';

function CreateGiangVien() {
  const [isOpenImport, setIsOpenImport] = useState(false);

  const toggleImportForm = () => {
    setIsOpenImport(!isOpenImport);
  };

  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <p className="font-poppins text-xl font-semibold text-gray-800">
          Tạo mới giảng viên
        </p>
        <button
          onClick={toggleImportForm}
          className="font-montserrat flex items-center gap-2 rounded-lg bg-blue-500 px-2 py-1 text-[14px] text-white shadow-sm transition-colors duration-300 hover:bg-blue-600"
        >
          <span>
            {isOpenImport ? (
              <p className="flex items-center gap-1">
                <FaPenAlt size={16} />
                Nhập thủ công
              </p>
            ) : (
              <p className="flex items-center gap-1">
                <FaFileImport size={16} />
                Nhập tự động
              </p>
            )}
          </span>
        </button>
      </div>

      <div className="transition-all duration-300">
        {isOpenImport ? <ImportGiangVienForm /> : <FormEditGiangVien />}
      </div>
    </div>
  );
}

export default CreateGiangVien;
