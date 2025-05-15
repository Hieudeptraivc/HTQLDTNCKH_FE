import { useState } from 'react';
import AdminDeTaiDashboard from './AdminDeTaiDashboard';
import AdminTaiKhoanDashboard from './AdminTaiKhoanDashboard';

function AdminDashboard() {
  const [currentFilter, setCurrentFilter] = useState('taiKhoan');

  function handleClick(value) {
    setCurrentFilter(value);
  }

  const options = [
    { value: 'taiKhoan', label: 'Tài khoản' },
    { value: 'deTai', label: 'Đề tài' },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-start">
        <div className="inline-flex items-center gap-1 rounded-md bg-gray-100 p-1 shadow-sm">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleClick(option.value)}
              className={`font-montserrat px-3 py-1 text-sm font-bold transition-all ${
                option.value === currentFilter
                  ? 'rounded-md bg-white text-blue-700 shadow-sm'
                  : 'rounded-md text-gray-700 hover:bg-white hover:text-blue-600'
              }`}
              disabled={option.value === currentFilter}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-2">
        {currentFilter === 'taiKhoan' ? (
          <AdminTaiKhoanDashboard />
        ) : (
          <AdminDeTaiDashboard />
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
