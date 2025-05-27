import { useState, useEffect } from 'react';
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

const LinhVucDeTaiChart = ({ allDeTai }) => {
  // console.log('allDeTai', allDeTai);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (allDeTai && allDeTai.length > 0) {
      // Group projects by linhVuc.ten
      const groupedByField = _.groupBy(allDeTai, 'linhVuc.ten');

      // Process data for each field
      const processedData = Object.entries(groupedByField).map(
        ([fieldName, projects]) => {
          // Count approved, pending, and rejected projects
          const approved = projects.filter(
            (project) => project.trangThaiDuyet === 'Đã duyệt',
          ).length;
          const pending = projects.filter(
            (project) => project.trangThaiDuyet === 'Đang chờ duyệt',
          ).length;
          const rejected = projects.filter(
            (project) => project.trangThaiDuyet === 'Từ chối',
          ).length;

          return {
            name: fieldName,
            'Đã duyệt': approved,
            'Chờ duyệt': pending,
            'Từ chối': rejected,
            total: approved + pending + rejected,
          };
        },
      );

      // Sort by total count for better visualization
      const sortedData = _.orderBy(processedData, ['total'], ['desc']);

      setChartData(sortedData);
    }
  }, [allDeTai]);

  return (
    <div className="col-span-4 flex flex-col items-center rounded-lg bg-gray-50 pb-4 shadow-lg">
      <div className="w-full rounded-t-lg bg-gray-100 px-4 py-4 text-center shadow-md">
        <h2 className="font-montserrat text-xl font-semibold">
          Phân bố đề tài theo lĩnh vực
        </h2>
      </div>

      {chartData.length > 0 ? (
        <div className="w-full overflow-x-auto p-4">
          <div className="font-montserrat min-w-max font-semibold">
            <ResponsiveContainer width="100%" height={500}>
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 10, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  angle={0}
                  height={80}
                  tick={{ fontSize: 13 }}
                />
                <YAxis
                  label={{
                    value: 'Số lượng đề tài',
                    angle: -90,
                    position: 'insideLeft',
                    style: { textAnchor: 'middle' },
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    borderRadius: '0.5rem',
                    border: '1px solid #e5e7eb',
                    padding: '0.5rem 1rem',
                  }}
                  formatter={(value, name) => [`${value} đề tài`, name]}
                />
                <Legend />
                <Bar dataKey="Đã duyệt" fill="#81e6a8" name="Đã duyệt" />
                <Bar dataKey="Chờ duyệt" fill="#6d66ef" name="Chờ duyệt" />
                <Bar dataKey="Từ chối" fill="#ff6b6b" name="Từ chối" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <div className="font-montserrat flex h-64 items-center justify-center font-semibold text-gray-500">
          Không có dữ liệu để hiển thị
        </div>
      )}
    </div>
  );
};

export default LinhVucDeTaiChart;
