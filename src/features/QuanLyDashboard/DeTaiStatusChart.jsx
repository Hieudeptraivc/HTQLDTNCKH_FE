import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

// Định nghĩa các trạng thái và màu sắc tương ứng
const STATUS_LINHVUC = [
  { name: 'Hoàn thành', color: '#22c55e' },
  { name: 'Đang triển khai', color: '#3b82f6' },
  { name: 'Chưa triển khai', color: '#eab308' },
  { name: 'Hủy bỏ', color: '#ef4444' },
];

function DeTaiStatusChart({ allDeTai = [] }) {
  // Tính toán dữ liệu cho biểu đồ
  const chartData = allDeTai
    .reduce(
      (result, detai) => {
        const linhVuc = result.find((item) => item.name === detai.trangThai);
        if (linhVuc) {
          linhVuc.value += 1;
        }
        return result;
      },
      STATUS_LINHVUC.map((linhVuc) => ({ ...linhVuc, value: 0 })),
    )
    .filter((item) => item.value > 0);

  // Hiển thị thông báo nếu không có dữ liệu
  if (chartData.length === 0) {
    return (
      <div className="col-span-2 h-full rounded-lg bg-gray-50 shadow-lg">
        <div className="w-full rounded-t-lg bg-gray-100 px-4 py-3 text-center shadow-md">
          <h2 className="font-montserrat text-center text-xl font-semibold text-gray-800">
            Thống kê trạng thái đề tài
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
          Thống kê trạng thái đề tài
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
              formatter={(value, name) => [`${value} đề tài`, `${name}`]}
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

export default DeTaiStatusChart;
