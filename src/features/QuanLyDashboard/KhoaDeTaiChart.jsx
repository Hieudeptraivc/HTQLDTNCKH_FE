import { useState, useEffect } from 'react';
import {
  FunnelChart,
  Funnel,
  LabelList,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import _ from 'lodash';

const KhoaDeTaiChart = ({ allDeTai }) => {
  const [khoaData, setKhoaData] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (allDeTai && allDeTai.length > 0) {
      // Group projects by khoa.ten
      const groupedByKhoa = _.groupBy(allDeTai, 'khoa.ten');

      // Count total projects for each khoa
      const totalByKhoa = Object.entries(groupedByKhoa).map(
        ([khoaName, projects]) => {
          return {
            name: khoaName,
            value: projects.length,
          };
        },
      );

      // Sort by count in descending order
      const sortedData = _.orderBy(totalByKhoa, ['value'], ['desc']);

      // If we have many departments, limit to top 10 and group the rest
      if (sortedData.length > 10) {
        const top10 = sortedData.slice(0, 10);
        const othersCount = sortedData
          .slice(10)
          .reduce((sum, item) => sum + item.value, 0);

        if (othersCount > 0) {
          top10.push({
            name: 'Khoa khác',
            value: othersCount,
          });
        }

        setKhoaData(top10);
      } else {
        setKhoaData(sortedData);
      }
    }
  }, [allDeTai]);

  // Colors for different sections of the funnel
  const COLORS = [
    '#8884d8',
    '#83a6ed',
    '#8dd1e1',
    '#82ca9d',
    '#a4de6c',
    '#d0ed57',
    '#ffc658',
    '#ff8042',
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
  ];

  // Dynamically adjust label size based on screen width
  const getFontSize = () => {
    if (windowWidth < 640) return 10; // Small screens
    if (windowWidth < 1024) return 12; // Medium screens
    return 14; // Large screens
  };

  // Determine if we should show labels based on screen size and data count
  const showAllLabels = windowWidth >= 768;
  const labelListProps = {
    fontSize: getFontSize(),
    fill: '#000',
    stroke: 'none',
  };

  return (
    <div className="col-span-2 flex flex-col items-center rounded-lg bg-gray-50 shadow-lg">
      <div className="w-full rounded-t-lg bg-gray-100 px-4 py-3 text-center shadow-md">
        <h2 className="font-montserrat text-xl font-semibold">
          Phân bố đề tài theo khoa
        </h2>
      </div>

      <div className="font-montserrat h-96 w-full text-sm font-semibold">
        {khoaData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <FunnelChart>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  borderRadius: '0.5rem',
                  border: '1px solid #e5e7eb',
                  padding: '0.5rem 1rem',
                }}
                formatter={(value) => [`${value} đề tài`]}
              />
              <Funnel dataKey="value" data={khoaData} isAnimationActive>
                {showAllLabels && (
                  <LabelList
                    position="right"
                    dataKey="name"
                    {...labelListProps}
                  />
                )}
                <LabelList
                  position="center"
                  fill="#fff"
                  stroke="none"
                  dataKey="value"
                  formatter={(value) => `${value}`}
                  fontSize={getFontSize()}
                />
                {khoaData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        ) : (
          <div className="font-montserrat flex h-64 justify-center py-11 text-base font-semibold text-gray-500">
            Không có dữ liệu để hiển thị
          </div>
        )}
      </div>
    </div>
  );
};

export default KhoaDeTaiChart;
