import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import _ from 'lodash';

const VaiTroTrangThaiChart = ({ allTaiKhoan }) => {
  const chartData = useMemo(() => {
    if (!allTaiKhoan || allTaiKhoan.length === 0) return [];
    // Group theo vai trò
    const grouped = _.groupBy(allTaiKhoan, 'vaiTro');
    return Object.entries(grouped).map(([role, members]) => {
      const active = members.filter((m) => m.trangThai === true).length;
      const inactive = members.filter((m) => m.trangThai === false).length;
      return {
        vaiTro: role,
        'Hoạt động': active,
        'Vô hiệu hóa': inactive,
      };
    });
  }, [allTaiKhoan]);

  // Hiển thị thông báo nếu không có dữ liệu
  if (chartData.length === 0) {
    return (
      <div className="col-span-2 h-full rounded-lg bg-gray-50 shadow-lg">
        <div className="w-full rounded-t-lg bg-gray-100 px-4 py-3 text-center shadow-md">
          <h2 className="font-montserrat text-center text-xl font-semibold text-gray-800">
            Số lượng tài khoản theo vai trò và trạng thái
          </h2>
        </div>
        <p className="font-montserrat py-11 text-center font-semibold text-gray-500">
          Không có dữ liệu để hiển thị
        </p>
      </div>
    );
  }

  return (
    <div className="col-span-2 rounded-lg bg-gray-50 shadow-lg">
      <div className="w-full rounded-t-lg bg-gray-100 px-4 py-3 text-center shadow-md">
        <h2 className="font-montserrat text-center text-xl font-semibold text-gray-800">
          Số lượng tài khoản theo vai trò và trạng thái
        </h2>
      </div>
      <div className="my-5 h-86 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="vaiTro"
              className="font-montserrat text-sm font-semibold"
            />
            <YAxis className="font-montserrat text-sm" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                border: '1px solid #e5e7eb',
                padding: '0.5rem 1rem',
                fontWeight: '500',
              }}
              formatter={(value, name) => [`${value} tài khoản`, name]}
            />
            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              iconSize={10}
              wrapperStyle={{
                paddingTop: '1rem',
                fontSize: '0.875rem',
                color: '#374151',
              }}
              formatter={(value, entry) => (
                <span
                  style={{ color: entry.payload.fill }}
                  className="font-medium text-gray-800"
                >
                  {value}
                </span>
              )}
            />
            <Bar dataKey="Hoạt động" fill="#4e7de2" />
            <Bar dataKey="Vô hiệu hóa" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default VaiTroTrangThaiChart;
