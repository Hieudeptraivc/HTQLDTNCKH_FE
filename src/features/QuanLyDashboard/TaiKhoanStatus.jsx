import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

// Định nghĩa các trạng thái và màu sắc tương ứng
const STATUS_TAIKHOAN = [
  { name: 'Đang hoạt động', color: '#22cc60' },
  { name: 'Vô hiệu hóa', color: '#ef4444' },
];

function TaiKhoanStatus({ allTaiKhoan = [] }) {
  // Tính toán dữ liệu cho biểu đồ
  const chartData = allTaiKhoan
    .reduce(
      (result, taiKhoan) => {
        const status = taiKhoan.trangThai ? 'Đang hoạt động' : 'Vô hiệu hóa';
        const existingStatus = result.find((item) => item.name === status);
        if (existingStatus) {
          existingStatus.value += 1;
        }
        return result;
      },
      STATUS_TAIKHOAN.map((status) => ({ ...status, value: 0 })),
    )
    .filter((item) => item.value > 0);

  // Hiển thị thông báo nếu không có dữ liệu
  if (chartData.length === 0) {
    return (
      <div className="col-span-2 h-full rounded-lg bg-gray-50 shadow-lg">
        <div className="w-full rounded-t-lg bg-gray-100 px-4 py-3 text-center shadow-md">
          <h2 className="font-montserrat text-center text-xl font-semibold text-gray-800">
            Thống kê trạng thái tài khoản
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
          Thống kê trạng thái tài khoản
        </h2>
      </div>
      <div className="my-5 h-86 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              nameKey="name"
              dataKey="value"
              innerRadius={85}
              outerRadius={110}
              cx="53%"
              cy="50%"
              className="font-montserrat text-sm font-semibold"
              paddingAngle={1}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              labelLine={true}
            >
              {chartData.map((entry) => (
                <Cell
                  fill={entry.color}
                  stroke={entry.color}
                  key={entry.name}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [`${value} tài khoản`, `${name}`]}
              contentStyle={{
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                border: '1px solid #e5e7eb',
                padding: '0.5rem 1rem',
                fontWeight: '500',
              }}
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
                  {value} ({entry.payload.value})
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default TaiKhoanStatus;
